import type { TargetedKeyboardEvent } from 'preact'
import { search } from '../lib/search'
import { useRef } from 'preact/hooks'
import { useRequestStore } from '../stores/requestStore'
import type { KV } from '../types/requestTypes'

export function getQueryParamsFromQueryString (query: string): KV[] {
  const queryIndex = query.indexOf('?')
  if (queryIndex === -1) return []

  const search = query.slice(queryIndex + 1)
  if (!search) return [{ name: '', value: '' }]

  const params: KV[] = []
  
  for (const qp of search.split('&')) {
    if (!qp) continue

    const match = qp.match(/^([^=]+)(?:=(.*))?$/)
    if (!match) continue

    const [, name, value = ''] = match
    params.push({ name, value })
  }

  return params
}

export function QueryURL () {
  const inputRef = useRef<HTMLInputElement>(null)
  
  function handleKeyDown (event: TargetedKeyboardEvent<HTMLInputElement>) {
    const input = inputRef.current
    if (!input) return
    
    const query = input.value.trim().toLowerCase()    
    if (!query) return
    
    const { key } = event
    if (key !== 'Enter') return

    search(query)
  }

  function handleInput () {
    const input = inputRef.current
    if (!input) return

    const query = input.value.trim().toLowerCase()
    const queryParams = getQueryParamsFromQueryString(query)
    const { setParams } = useRequestStore.getState()
    setParams(queryParams)
  }
  
  return (
    <label class='w-full'>
      <input
        id='search'
        ref={inputRef}
        class='input w-full font-code'
        placeholder='https://...., 192.168.1...., localhost:5173/api....'
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
    </label>
  )
}
