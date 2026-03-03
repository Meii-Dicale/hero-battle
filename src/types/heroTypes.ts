/** Réponse brute de l’API Superhero (superheroapi.com) pour un héros par ID */
export interface ApiHeroResponse {
  response: string
  id: string
  name: string
  powerstats: {
    intelligence: string
    strength: string
    speed: string
    durability: string
    power: string
    combat: string
  }
  biography?: {
    'full-name': string
    'alter-egos': string
    aliases: string[]
    'place-of-birth': string
    'first-appearance': string
    publisher: string
    alignment: string
  }
  appearance?: {
    gender: string
    race: string
    height: string[]
    weight: string[]
    'eye-color': string
    'hair-color': string
  }
  work?: {
    occupation: string
    base: string
  }
  connections?: {
    'group-affiliation': string
    relatives: string
  }
  image: {
    url: string
  }
}

export interface Hero {
  id: number
  name: string
  image: { url: string }
  powerstats: Powerstats
  biography?: Biography
  appearance?: Appearance
  work?: Work
  connections?: Connections
}

export interface Biography {
  'full-name': string
  'alter-egos': string
  aliases: string[]
  'place-of-birth': string
  'first-appearance': string
  publisher: string
  alignment: string
}

export interface Appearance {
  gender: string
  race: string
  height: string[]
  weight: string[]
  'eye-color': string
  'hair-color': string
}

export interface Work {
  occupation: string
  base: string
}

export interface Connections {
  'group-affiliation': string
  relatives: string
}

export interface Powerstats {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
}

export interface Battle {
  id: number
  winner: Hero
  loser: Hero
  draw: boolean
  date: Date
}

