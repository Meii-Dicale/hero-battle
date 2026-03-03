export interface Hero {
  id: number
  name: string
  image: { url: string }
  powerstats: Powerstats
}

export interface Powerstats {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
}

