import { RESPONSE_TYPES } from '../constants/responseConstants'

export type ResponseType = typeof RESPONSE_TYPES[keyof typeof RESPONSE_TYPES]

const TYPE_CONFIG: Record<ResponseType, { mime: string; ext: string }> = {
  [RESPONSE_TYPES.TEXT]: {
    mime: 'text/plain;charset=utf-8',
    ext: '.txt'
  },
  [RESPONSE_TYPES.JSON]: {
    mime: 'application/json;charset=utf-8',
    ext: '.json'
  },
  [RESPONSE_TYPES.HTML]: {
    mime: 'text/html;charset=utf-8',
    ext: '.html'
  },
  [RESPONSE_TYPES.IMAGE]: {
    mime: 'image/png',
    ext: '.png'
  },
  [RESPONSE_TYPES.PDF]: {
    mime: 'application/pdf',
    ext: '.pdf'
  },
  [RESPONSE_TYPES.VIDEO]: {
    mime: 'video/mp4',
    ext: '.mp4'
  },
  [RESPONSE_TYPES.AUDIO]: {
    mime: 'audio/mpeg',
    ext: '.mp3'
  },
  [RESPONSE_TYPES.FILE]: {
    mime: 'application/octet-stream',
    ext: '.bin'
  },
  [RESPONSE_TYPES.UNKNOWN]: {
    mime: 'application/octet-stream',
    ext: ''
  }
}

function resolveResponseType (type: string | null): ResponseType {
  if (!type) return RESPONSE_TYPES.UNKNOWN

  const normalized = type.toUpperCase().trim()

  if (normalized === 'TXT') return RESPONSE_TYPES.TEXT
  if (normalized === 'IMG') return RESPONSE_TYPES.IMAGE

  if (Object.values(RESPONSE_TYPES).includes(normalized as ResponseType)) {
    return normalized as ResponseType
  }

  return RESPONSE_TYPES.UNKNOWN
}

export function getMimeType (d: string | null): string {
  const resolvedType = resolveResponseType(d)
  return TYPE_CONFIG[resolvedType].mime
}

export function getFileExtension (d: string | null): string {
  const resolvedType = resolveResponseType(d)
  return TYPE_CONFIG[resolvedType].ext
}
