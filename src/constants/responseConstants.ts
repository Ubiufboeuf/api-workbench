export const RESPONSE_TYPES = {
  TEXT: 'TEXT',
  JSON: 'JSON',
  IMAGE: 'IMAGE',
  PDF: 'PDF',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  FILE: 'FILE',
  UNKNOWN: 'UNKNOWN'
} as const

export const SIGNATURES = {
  // Images
  PNG: { sig: '89504e47', type: 'IMAGE' },
  JPG: { sig: 'ffd8ff', type: 'IMAGE' },
  GIF: { sig: '47494638', type: 'IMAGE' },
  BMP: { sig: '424d', type: 'IMAGE' },
  TIFF_LE: { sig: '49492a00', type: 'IMAGE' },
  TIFF_BE: { sig: '4d4d002a', type: 'IMAGE' },

  // Documents
  PDF: { sig: '25504446', type: 'PDF' },

  // Archives / compression
  ZIP: { sig: '504b0304', type: '' },
  GZIP: { sig: '1f8b08', type: '' },
  RAR: { sig: '526172211a07', type: '' },
  SEVEN_Z: { sig: '377abcaf271c', type: '' },

  // Media
  RIFF: { sig: '52494646', type: '' },
  OGG: { sig: '4f676753', type: '' },
  FLAC: { sig: '664c6143', type: 'AUDIO' },
  WAV: { sig: '52494646', type: 'AUDIO' }
} as const
