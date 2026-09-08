import { DISPLAYS } from '../constants/responseConstants'
import type { Display } from '../types/responseTypes'

export function isValidDisplay (data: unknown): data is Display {
  return Boolean(DISPLAYS[data as Display])
}
