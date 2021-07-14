import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface Tournament {
  id: number
  name: string
  countryCode: string
  city: string
  images: string[]
}

export type GetTournamentsWithName = { kind: "ok", tournaments: Tournament[] } | GeneralApiProblem
