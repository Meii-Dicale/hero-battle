import type { Powerstats } from '@/types/heroTypes'

export interface BattleStats {
  hpMax: number
  attaque: number
  defense: number
  vitesse: number
}

const HP_BASE = 50
const DURABILITY_HP_FACTOR = 2
const POWER_ATTACK_FACTOR = 2
const DEFENSE_STATS_DIVISOR = 2


export function getBattleStats(powerstats: Powerstats): BattleStats {
  const { strength, speed, durability, power, combat } = powerstats

  return {
    hpMax: HP_BASE + durability * DURABILITY_HP_FACTOR,
    attaque: strength + Math.floor(power / POWER_ATTACK_FACTOR),
    defense: Math.floor((durability + combat) / DEFENSE_STATS_DIVISOR),
    vitesse: speed,
  }
}
