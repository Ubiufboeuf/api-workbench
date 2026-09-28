import { useState, useMemo } from 'preact/hooks'

interface BinaryViewerProps {
  data: ArrayBuffer
}

const BYTES_PER_ROW = 16
const PREVIEW_LIMIT = 2048 // Muestra los primeros 2KB para evitar lag

export function BinaryViewer ({ data }: BinaryViewerProps) {
  const [showAll, setShowAll] = useState(false)
  const uint8Array = useMemo(() => new Uint8Array(data), [data])

  const bytesToDisplay = showAll ? uint8Array : uint8Array.subarray(0, PREVIEW_LIMIT)
  const rowsCount = Math.ceil(bytesToDisplay.length / BYTES_PER_ROW)

  return (
    <div class='space-y-4 font-mono text-sm p-2'>
      <div class='overflow-x-auto rounded-lg border border-base-content/10 bg-base-300/30 p-3'>
        <table class='w-full text-left border-collapse select-text'>
          <thead>
            <tr class='text-xs text-base-content/50 border-b border-base-content/10'>
              <th class='pb-2 w-20'>Offset</th>
              <th class='pb-2'>Hexadecimal</th>
              <th class='pb-2 w-44'>ASCII</th>
            </tr>
          </thead>
          <tbody class='divide-y divide-base-content/5 text-xs'>
            {Array.from({ length: rowsCount }).map((_, rowIndex) => {
              const start = rowIndex * BYTES_PER_ROW
              const rowBytes = bytesToDisplay.subarray(start, start + BYTES_PER_ROW)
              
              const offsetHex = start.toString(16).padStart(8, '0')
              
              const hexParts: string[] = []
              let asciiStr = ''

              for (let i = 0; i < BYTES_PER_ROW; i++) {
                if (i < rowBytes.length) {
                  const b = rowBytes[i]
                  hexParts.push(b.toString(16).padStart(2, '0').toUpperCase())
                  asciiStr += b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'
                } else {
                  hexParts.push('  ')
                  asciiStr += ' '
                }
              }

              return (
                <tr key={start} class='hover:bg-base-200/50'>
                  <td class='py-1 text-primary/70 font-bold'>{offsetHex}</td>
                  <td class='py-1 tracking-wider'>
                    {hexParts.slice(0, 8).join(' ')} &nbsp; {hexParts.slice(8).join(' ')}
                  </td>
                  <td class='py-1 text-base-content/70 whitespace-pre font-mono'>
                    {asciiStr}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {!showAll && uint8Array.length > PREVIEW_LIMIT && (
        <div class='flex items-center justify-between text-xs text-base-content/60 pt-1'>
          <span>Mostrando primeros {PREVIEW_LIMIT} bytes</span>
          <button 
            onClick={() => setShowAll(true)}
            class='btn btn-ghost btn-xs text-primary'
          >
            Cargar buffer completo ({data.byteLength.toLocaleString()} bytes)
          </button>
        </div>
      )}
    </div>
  )
}
