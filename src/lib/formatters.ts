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
