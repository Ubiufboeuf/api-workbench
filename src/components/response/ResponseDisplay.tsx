import { useEffect, useState } from 'preact/hooks'
import { useResponseStore } from '../../stores/responseStore'
import { JSONViewer } from './JSONViewer'
import type { ResponseType, SignatureKey } from '../../types/responseTypes'
import { RESPONSE_TYPES, SIGNATURES } from '../../constants/responseConstants'

export function ResponseDisplay () {
  const res = useResponseStore((state) => state.res)
  const [data, setData] = useState<any>()
  const [responseType, setResponseType] = useState<ResponseType>()

  async function handleResponse (res: Response | null) {    
    if (!res) {
      // Mostrar algo como una pantalla inicial al usuario
      console.debug('no res')
      return
    }

    const buffer = await res.arrayBuffer()
    const { responseType, extra } = await getResponseType(buffer)

    if (responseType === RESPONSE_TYPES.IMAGE) {
      setResponseType(RESPONSE_TYPES.IMAGE)

      const blob = new Blob([buffer], { type: extra.mimeType })
      const src = URL.createObjectURL(blob)

      setData(src)
      return
    }
    
    if (responseType === RESPONSE_TYPES.TEXT) {
      const text = new TextDecoder().decode(buffer)
      let json

      try {
        json = JSON.parse(text)
      } catch {/* empty */}

      if (json) {
        setResponseType(RESPONSE_TYPES.JSON)
        setData(json)

        return
      }

      setResponseType(RESPONSE_TYPES.TEXT)
      setData(text)

      return
    } 
  }

  async function getResponseType (buffer: ArrayBuffer): Promise<{ responseType: ResponseType, extra?: any }> {
    const bytes = new Uint8Array(buffer).subarray(0, 4)
    const header = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
    let type: ResponseType = 'TEXT'

    for (const key in SIGNATURES) {
      const signature = SIGNATURES[key as SignatureKey]

      if (signature.sig.includes(':')) {
        // webp, por ejemplo (por como está la constante SIGNATURES)
        continue
      }

      if (header.startsWith(signature.sig) && signature.type) {
        type = signature.type
      }
    }

    let extra
    if (type === RESPONSE_TYPES.IMAGE) {
      extra = 'image/png'
    }

    return {
      responseType: type,
      extra
    }
  }
  
  useEffect(() => {
    handleResponse(res)
  }, [res])
  
  if (responseType === RESPONSE_TYPES.JSON) {
    return <JSONViewer data={data} />
  }

  if (responseType === RESPONSE_TYPES.IMAGE) {
    return (
      <img src={data} />
    )
  }
  
  return 'no data'
}
