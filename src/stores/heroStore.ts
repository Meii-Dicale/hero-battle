import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Battle, Hero } from '../types/heroTypes'
import { getBattleStats } from '@/utils/battleRules'
import api from '@/service/ApiService'

const PAGE_SIZE = 30
/** IDs API Superhero : 1 à 731 (pas 0). */
const TOTAL_HEROES = 731
const FIRST_ID = 1

export const useHeroStore = defineStore('hero', () => {
  const heroes = ref<Hero[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const nextOffset = ref(FIRST_ID)
  const firstHero = ref<Hero | null>(null)
  const secondHero = ref<Hero | null>(null)
  const winner = ref<Hero | null>(null)
  const loser = ref<Hero | null>(null)
  const draw = ref(false)

  const historyBattles = ref<Battle[]>([])
  const combatLog = ref<string[]>([])

  const hasMore = computed(() => nextOffset.value <= TOTAL_HEROES)

  const getRandomHero = async () => {
    const randomIndex = Math.floor(Math.random() * heroes.value.length)
    return heroes.value[randomIndex]
  }

  /**
   * Lance le combat tour par tour. Le héros avec la vitesse la plus élevée commence.
   * En cas d'égalité, firstHero commence.
   * Dégâts = max(1, attaque_attaquant - défense_défenseur/2).
   * Met à jour winner, loser, combatLog et ajoute à historyBattles.
   */
  function runCombat() {
    const heroA = firstHero.value
    const heroB = secondHero.value
    if (!heroA || !heroB) return

    const statsA = getBattleStats(heroA.powerstats)
    const statsB = getBattleStats(heroB.powerstats)

    let hpA = statsA.hpMax
    let hpB = statsB.hpMax
    const log: string[] = []

    let attackerIsA = statsB.vitesse > statsA.vitesse ? false : true

    while (hpA > 0 && hpB > 0) {
      const attaqueAtt = attackerIsA ? statsA.attaque : statsB.attaque
      const defenseDef = attackerIsA ? statsB.defense : statsA.defense
      const degats = Math.max(1, Math.floor(attaqueAtt - defenseDef / 2))

      const nameAtt = attackerIsA ? heroA.name : heroB.name
      const nameDef = attackerIsA ? heroB.name : heroA.name

      if (attackerIsA) {
        hpB -= degats
        const hpRestants = Math.max(0, hpB)
        log.push(`${nameAtt} attaque ${nameDef} et inflige ${degats} dégâts. ${nameDef} a ${hpRestants} HP restants.`)
      } else {
        hpA -= degats
        const hpRestants = Math.max(0, hpA)
        log.push(`${nameAtt} attaque ${nameDef} et inflige ${degats} dégâts. ${nameDef} a ${hpRestants} HP restants.`)
      }
      attackerIsA = !attackerIsA
    }

    combatLog.value = log
    if (hpA <= 0) {
      winner.value = heroB
      loser.value = heroA
    } else {
      winner.value = heroA
      loser.value = heroB
    }
    draw.value = false

    historyBattles.value.push({
      id: Date.now(),
      winner: winner.value,
      loser: loser.value,
      draw: false,
      date: new Date(),
    })
  }

  /** Charge un lot d’IDs (API : 1 à 731). */
  async function fetchHeroBatch(start: number): Promise<Hero[]> {
    const count = Math.min(PAGE_SIZE, TOTAL_HEROES - start + 1)
    const results = await Promise.allSettled(
      Array.from({ length: count }, (_, i) =>
        api.get(`/${start + i}`).then((res) =>
          normalizeHero(res.data as Record<string, unknown>)
        )
      )
    )
    const fulfilled = results.filter((r): r is PromiseFulfilledResult<Hero> => r.status === 'fulfilled')
    const batch = fulfilled.map((r) => r.value)
    return batch.filter((h) => h.name || h.image.url)
  }

  function normalizeHero(raw: Record<string, unknown>): Hero {
    const image = raw.image
    const ps = raw.powerstats as Record<string, unknown> | undefined
    const num = (v: unknown) => (typeof v === 'string' ? parseInt(v, 10) : Number(v)) || 0
    const powerstats: Hero['powerstats'] = ps
      ? {
          intelligence: num(ps.intelligence),
          strength: num(ps.strength),
          speed: num(ps.speed),
          durability: num(ps.durability),
          power: num(ps.power),
          combat: num(ps.combat),
        }
      : {
          intelligence: 0,
          strength: 0,
          speed: 0,
          durability: 0,
          power: 0,
          combat: 0,
        }
    const name = String(raw.name ?? '')
    const imageUrl = typeof image === 'string' ? image : (image as { url?: string })?.url ?? ''
    return {
      id: Number(raw.id) || 0,
      name,
      image: { url: imageUrl },
      powerstats,
    }
  }

  /** Charge les 30 premiers héros (réinitialise la liste). */
  async function getHeroes() {
    try {
      loading.value = true
      nextOffset.value = FIRST_ID
      heroes.value = []
      const batch = await fetchHeroBatch(FIRST_ID)
      heroes.value = batch
      nextOffset.value = FIRST_ID + PAGE_SIZE
    } catch (error) {
      // erreur silencieuse ou à remonter à l’UI
    } finally {
      loading.value = false
    }
  }

  /** Charge les 30 héros suivants (à appeler au scroll). */
  async function loadMoreHeroes() {
    if (loadingMore.value || !hasMore.value || nextOffset.value > TOTAL_HEROES) return
    try {
      loadingMore.value = true
      const start = nextOffset.value
      const batch = await fetchHeroBatch(start)
      heroes.value.push(...batch)
      nextOffset.value = start + PAGE_SIZE
    } catch (error) {
      // erreur silencieuse ou à remonter à l’UI
    } finally {
      loadingMore.value = false
    }
  }

  function setFirstHero(hero: Hero | null) {
    firstHero.value = hero
  }
  function setSecondHero(hero: Hero | null) {
    secondHero.value = hero
  }
  function clearFirstHero() {
    firstHero.value = null
  }
  function clearSecondHero() {
    secondHero.value = null
  }
  function clearHistoryBattles() {
    historyBattles.value = []
  }

  return {
    heroes,
    firstHero,
    secondHero,
    winner,
    loser,
    combatLog,
    loading,
    loadingMore,
    hasMore,
    historyBattles,
    getHeroes,
    loadMoreHeroes,
    getRandomHero,
    setFirstHero,
    setSecondHero,
    clearFirstHero,
    clearSecondHero,
    clearHistoryBattles,
    runCombat,
  }
})
