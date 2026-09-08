import { RESPONSE_TYPES } from '../../constants/responseConstants'
import type { ResponseType } from '../../types/responseTypes'

export function TEXTViewer ({ data, responseType }: { data: unknown, responseType: ResponseType }) {
  console.log(data, { data })
  
  if (responseType === RESPONSE_TYPES.JSON) {
    return <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  }

  if (data === 'page not found' || data === 'page not found\n') {
    return <span class='h-full w-full flex items-center justify-center text-warning'>Página no encontrada</span>
  }

  if (typeof data === 'string') {
    return <span class='h-full w-full'>{data}</span>
  }

  return <span class='h-full w-full flex items-center justify-center text-error'>Contenido inválido</span>
}
