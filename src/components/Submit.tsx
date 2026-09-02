import { useRef } from 'preact/hooks'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconArrow } from './ui/Icons'
import { search } from '../lib/search'

export function Submit () {
  const inputRef = useRef<HTMLInputElement>(null)
  
  function handleClick () {
    if (!inputRef.current) {
      const input = document.querySelector('#search')
      if (!(input instanceof HTMLInputElement)) return

      inputRef.current = input
    }

    const input = inputRef.current
    if (!input) return

    const query = input.value.trim().toLowerCase()
    if (!query) return

    search(query)
  }
  
  return (
    <Button
      fill='outline'
      shape='square'
      class='bg-base-100 border-base-content/20'
      onClick={handleClick}
    >
      <Icon>
        <IconArrow />
      </Icon>
    </Button>
  )
}
