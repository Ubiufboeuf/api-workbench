import { useRef } from 'preact/hooks'
import { useRequestStore } from '../../stores/requestStore'

export function PayloadView () {
  const payloadRef = useRef<HTMLTextAreaElement>(null)
  const setPayload = useRequestStore((state) => state.setPayload)

  function handleInput () {
    const payloadElement = payloadRef.current
    if (!payloadElement) return

    const payload = payloadElement.value
    setPayload(payload)
  }
  
  return <>
    <span class='text-sm text-base-content/50'>Cuerpo de la petición</span>
    <textarea
      ref={payloadRef}
      id='payload'
      placeholder='...'
      class='textarea w-full'
      onInput={handleInput}
    />
  </>
}
