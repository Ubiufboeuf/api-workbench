export function formatSize (bytes: number) {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']
  let index = 0
  let value = bytes

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024
    index++
  }

  return new Intl.NumberFormat('es-UY', {
    style: 'unit',
    unit: units[index],
    unitDisplay: 'narrow',
    maximumFractionDigits: 2
  }).format(value)
}

export function formatDuration (ms: number) {
  let value = ms
  let unit = 'millisecond'

  if (value >= 1000) {
    value /= 1000
    unit = 'second'
  }

  return new Intl.NumberFormat('es-UY', {
    style: 'unit',
    unit: unit,
    unitDisplay: 'narrow',
    maximumFractionDigits: 0
  }).format(value)
}
