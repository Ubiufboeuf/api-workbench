import type { TargetedKeyboardEvent } from 'preact'
import { search } from '../lib/search'
import { useEffect, useRef } from 'preact/hooks'
import { useRequestStore } from '../stores/requestStore'
import type { KV } from '../types/requestTypes'
import { Keybinds } from './Keybinds'

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
  const params = useRequestStore((state) => state.params)
  const url = useRequestStore((state) => state.url)
  const setURL = useRequestStore((state) => state.setURL)
  const setParams = useRequestStore((state) => state.setParams)

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

    const fullUrl = input.value.trim()

    const queryIndex = fullUrl.indexOf('?')
    const baseUrl = queryIndex === -1 ? fullUrl : fullUrl.slice(0, queryIndex)
    
    const queryParams = getQueryParamsFromQueryString(fullUrl)

    setURL(baseUrl)
    setParams(queryParams)
  }

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    // Para evitar cambiar algo si están usando el input principal
    if (document.activeElement === input) return

    const activeParams = params.filter((p) => p.name !== '' || p.value !== '')

    if (activeParams.length === 0) {
      input.value = url
      return
    }

    const searchParams = new URLSearchParams()
    for (const p of activeParams) {
      searchParams.append(p.name, p.value)
    }

    input.value = `${url}?${searchParams.toString()}`
  }, [url, params])
  
  return (
    <label class='relative flex gap-3 items-center w-full input'>
      <input
        id='search'
        ref={inputRef}
        class='peer w-full font-code'
        placeholder='https://...., 192.168.1...., localhost:5173/api....'
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <Keybinds
        keys='CTRL K'
        onBind={() => inputRef.current?.focus()}
        size='sm'
        class='peer-focus:hidden'
      />
      <Keybinds
        keys='ESCAPE'
        when={() => inputRef.current === document.activeElement}
        onBind={() => inputRef.current?.blur()}
        class='hidden'
      />
    </label>
  )
}
