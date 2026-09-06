import { create } from 'zustand'
import type { KV as NewParam, Param } from '../types/requestTypes'

interface RequestStore {
  params: Param[]
  addParam: (newParam: NewParam) => void
  deleteParam: (id: string) => void
}

let i = 0 // al menos por ahora no hace falta algo más complejo

export const useRequestStore = create<RequestStore>((set) => ({
  params: [{ id: `${0}++`, name: '', value: '' }],
  addParam (kv) {
    set(({ params }) => {
      const newParam: Param = { ...kv, id: `${i++}` }
      return {
        params: [...params, newParam]
      }
    })
  },
  deleteParam (id) {
    set(({ params }) => {
      const newParams = params.filter((p) => p.id !== id)
      return { params: newParams }
    })
  }
}))
