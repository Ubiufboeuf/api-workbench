import { useEffect, useRef, useState } from 'preact/hooks'
import type { Tab } from '../../types/tabTypes'
import { Tabs } from '../ui/Tabs'
import { ResponseDisplay } from './ResponseDisplay'
import { ResponseView } from './ResponseView'
import { formatDuration, formatSize } from '../../lib/formatters'
import { Select, type SelectOption } from '../ui/Select'
import { useResponseStore } from '../../stores/responseStore'
import { isValidDisplay } from '../../validations/isValidDisplay'
import { DISPLAYS, RESPONSE_TYPES, SIGNATURES, STATUS_TEXTS } from '../../constants/responseConstants'
import type { DisplayKey, ResponseType, SignatureKey } from '../../types/responseTypes'
import { IconCheck, IconCopy, IconDots, IconDownload, IconNetwork } from '../ui/Icons'
import { Icon } from '../ui/Icon'
import { tryParseHTML, tryParseJSON } from '../../lib/parsers'
import { Button } from '../ui/Button'
import { Popover } from '../ui/Popover'
import { getFileExtension, getMimeType } from '../../lib/fs'

const responseTabList: Tab[] = [
  { id: 'response', label: 'Response', view: ResponseView },
  { id: 'otro', label: 'otro' }
]

const displays: SelectOption[] = []

for (const key in DISPLAYS) {
  const display = DISPLAYS[key as DisplayKey]
  displays.push({ id: key, label: display })
}

function getStatusColor (status: number | undefined) {
  if (!status) return
  if (status >= 100 && status < 200) return 'text-blue-400'
  if (status >= 200 && status < 300) return 'text-green-400'
  if (status >= 300 && status < 400) return 'text-purple-400'
  if (status >= 400 && status < 500) return 'text-orange-400'
  if (status >= 500 && status < 600) return 'text-red-400'
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
  
  const responseTime = useResponseStore((state) => state.responseTime)

  const [status, setStatus] = useState<number | undefined>()
  const [responseSize, setResponseSize] = useState<number | undefined>()
  
  const [copyStatus, setCopyStatus] = useState<'success' | 'failure' | undefined>(undefined)
  const copyTimeoutRef = useRef<number>()
  
  const [downloadStatus, setDownloadStatus] = useState<'success' | 'failure' | undefined>(undefined)
  const downloadTimeoutRef = useRef<number>()
  
  function CopyAction () {
    const { data } = useResponseStore.getState()
    const clipboard = navigator.clipboard

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current)
    }

    try {
      clipboard.writeText(data)
      setCopyStatus('success')
    } catch {
      setCopyStatus('failure')
    } finally {
      copyTimeoutRef.current = setTimeout(() => {
        setCopyStatus(undefined)
      }, 1000)
    }
  }

  function DownloadAction () {
    const { data } = useResponseStore.getState()

    if (downloadTimeoutRef.current) {
      clearTimeout(downloadTimeoutRef.current)
    }

    try {
      if (!data) return

      const blob = new Blob([data], { type: getMimeType(display) })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `response${getFileExtension(display)}`
      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadStatus('success')
    } catch {
      setDownloadStatus('failure')
    } finally {
      downloadTimeoutRef.current = setTimeout(() => {
        setDownloadStatus(undefined)
      }, 1000)
    }
  }
  
  async function handleResponse (res: Response | null) {    
    if (!res) {
      // Mostrar algo como una pantalla inicial al usuario
      console.debug('no res')
      return
    }

    const { status } = res
    setStatus(status)
    
    const buffer = await res.arrayBuffer()
    const { responseType, extra } = await getResponseType(buffer)

    const responseSize = buffer.byteLength
    setResponseSize(responseSize)

    if (responseType === RESPONSE_TYPES.IMAGE) {
      setResponseType(RESPONSE_TYPES.IMAGE)

      const blob = new Blob([buffer], { type: extra.mimeType })
      const src = URL.createObjectURL(blob)

      setData(src)
      return
    }
    
    if (responseType === RESPONSE_TYPES.TEXT) {
      const text = new TextDecoder().decode(buffer)
      const json = tryParseJSON(text)

      if (json) {
        setResponseType(RESPONSE_TYPES.JSON)
        setData(json)

        return
      }

      const html = tryParseHTML(text)

      if (html) {
        setResponseType(RESPONSE_TYPES.HTML)
        setData(html)

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
        <div class='h-full w-fit min-w-fit flex items-center gap-3'>
          <Select
            id='select-display'
            options={displays}
            class='select-xs'
            option={display}
            onChange={({ id }) => isValidDisplay(id) && setDisplay(id)}
          />
          <span class={`${getStatusColor(status)} text-xs font-semibold w-fit min-w-fit`}>{status} {status ? STATUS_TEXTS[status] : ''}</span>
          <span class='text-xs text-base-content/80'>{responseTime ? formatDuration(responseTime) : '0ms'}</span>
          <span class='text-xs text-base-content/80'>{responseSize ? formatSize(responseSize) : '0B'}</span>
          <Popover buttonClass='btn-sm btn-square' buttonContent={<Icon class='size-5'><IconDots /></Icon>}>
            <div class='h-fit w-48 p-2 py-3 rounded-lg border border-base-content/20 bg-base-300'>
              <Button
                size='sm'
                fill='ghost'
                class='w-full justify-start px-3 text-base-content/70 hover:text-base-content'
                onClick={CopyAction}
              >
                <Icon class='size-4'>
                  { copyStatus === 'success'
                    ? <IconCheck />
                    : <IconCopy />
                  }
                </Icon>
                <span>Copiar respuesta</span>
              </Button>
              <Button
                size='sm'
                fill='ghost'
                class='w-full justify-start px-3 text-base-content/70 hover:text-base-content'
                onClick={DownloadAction}
              >
                <Icon class='size-4'>
                  { downloadStatus === 'success'
                    ? <IconCheck />
                    : <IconDownload />
                  }
                </Icon>
                <span>Descargar respuesta</span>
              </Button>
            </div>
          </Popover>
        </div>
      </div>
      <ResponseDisplay
        tabs={responseTabList}
        currentTab={currentTab}
      />
    </section>
  )
}
