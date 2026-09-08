import { useEffect, useState } from 'preact/hooks'
import type { Tab } from '../../types/tabTypes'
import { Tabs } from '../ui/Tabs'
import { ResponseDisplay } from './ResponseDisplay'
import { ResponseView } from './ResponseView'
import { formatSize } from '../../lib/formatters'
import { Select, type SelectOption } from '../ui/Select'
import { useResponseStore } from '../../stores/responseStore'
import { isValidDisplay } from '../../validations/isValidDisplay'
import { DISPLAYS, RESPONSE_TYPES, SIGNATURES } from '../../constants/responseConstants'
import type { DisplayKey, ResponseType, SignatureKey } from '../../types/responseTypes'
import { IconNetwork } from '../ui/Icons'
import { Icon } from '../ui/Icon'

const responseTabList: Tab[] = [
  { id: 'response', label: 'Response', view: ResponseView },
  { id: 'otro', label: 'otro' }
]

const displays: SelectOption[] = []

for (const key in DISPLAYS) {
  const display = DISPLAYS[key as DisplayKey]
  displays.push({ id: key, label: display })
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

export function Response () {
  const [currentTab, setCurrentTab] = useState(responseTabList[0].id)

  const res = useResponseStore((state) => state.res)
  
  const data = useResponseStore((state) => state.data)
  const setData = useResponseStore((state) => state.setData)

  const setResponseType = useResponseStore((state) => state.setResponseType)

  const display = useResponseStore((state) => state.display)
  const setDisplay = useResponseStore((state) => state.setDisplay)

  const responseSize = 99
  
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
  
  useEffect(() => {
    handleResponse(res)
  }, [res])

  if (!data) {
    return (
      <div class='h-full w-full flex items-center justify-center lg:flex-col gap-4'>
        <Icon class='size-24 opacity-50'>
          <IconNetwork />
        </Icon>
        <div class='h-fit w-fit flex flex-col gap-2 bg-black/10'>

        </div>
      </div>
    )
  }
  
  return (
    <section class='w-full h-full px-4 overflow-auto flex flex-col'>
      <div class='flex items-center justify-between'>
        <Tabs
          tabs={responseTabList}
          state={currentTab}
          setter={setCurrentTab}
        />
        <div class='h-full w-fit flex items-center gap-4'>
          <Select
            id='select-display'
            options={displays}
            class='select-xs'
            option={display}
            onChange={({ id }) => isValidDisplay(id) && setDisplay(id)}
          />
          <span class='text-sm text-base-content/80'>{formatSize(responseSize)}</span>
        </div>
      </div>
      <ResponseDisplay
        tabs={responseTabList}
        currentTab={currentTab}
      />
    </section>
  )
}
