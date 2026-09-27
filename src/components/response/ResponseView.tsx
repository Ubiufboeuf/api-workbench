import { useEffect } from 'preact/hooks'
import { useResponseStore } from '../../stores/responseStore'
import { JSONViewer } from './JSONViewer'
import { RESPONSE_TYPES } from '../../constants/responseConstants'
import { isValidDisplay } from '../../validations/isValidDisplay'
import { TEXTViewer } from './TEXTViewer'
import { HTMLViewer } from './HTMLViewer'
import { BinaryViewer } from './BinaryViewer'

export function ResponseView () {
  const data = useResponseStore((state) => state.data)
  const display = useResponseStore((state) => state.display)
  const setDisplay = useResponseStore((state) => state.setDisplay)
  const responseType = useResponseStore((state) => state.responseType)
  
  useEffect(() => {
    const display = isValidDisplay(responseType) ? responseType : null
    setDisplay(display)
  }, [responseType])

  if (display === RESPONSE_TYPES.TEXT) {
    return <TEXTViewer data={data.text} responseType={responseType} />
  }

  if (display === RESPONSE_TYPES.JSON) {
    return <JSONViewer data={data.parsed} />
  }

  if (display === RESPONSE_TYPES.HTML) {
    return <HTMLViewer data={data.parsed} />
  }

  if (display === RESPONSE_TYPES.IMAGE) {
    return (
      <img src={data} />
    )
  }

  if (display === RESPONSE_TYPES.BINARY) {
    return <BinaryViewer data={data.rawBuffer} />
  }
}
