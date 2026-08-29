import type { TargetedKeyboardEvent } from 'preact'
import { search } from '../lib/search'
import { useRef } from 'preact/hooks'

export function QueryURL () {
  const inputRef = useRef<HTMLInputElement>(null)
  
  function handleInput (event: TargetedKeyboardEvent<HTMLInputElement>) {
    const input = inputRef.current
    if (!input) return
    
    const query = input.value.trim().toLowerCase()
    if (!query) return
    
    const { key } = event
    if (key !== 'Enter') return

    search(query)
  }
  
  return (
    <label class='w-full'>
      <input
        id='search'
        ref={inputRef}
        class='input w-full font-code'
        placeholder='https://...., 192.168.1...., localhost:5173/api....'
        onKeyDown={handleInput}
      />
    </label>
  )
}
