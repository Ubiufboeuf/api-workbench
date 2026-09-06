import type { RESPONSE_TYPES, SIGNATURES } from '../constants/responseConstants'

export type ResponseType = typeof RESPONSE_TYPES[keyof typeof RESPONSE_TYPES] | undefined
export type SignatureKey = keyof typeof SIGNATURES
export type Signature = typeof SIGNATURES[SignatureKey]['sig']
export type SignatureType = typeof SIGNATURES[SignatureKey]['type']
