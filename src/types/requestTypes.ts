export interface KV {
  name: string
  value: string
  focus?: boolean
  enabled?: boolean
}

export interface Param extends KV {
  id: string
}
