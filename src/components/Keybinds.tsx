import { useEffect } from 'preact/compat' // O 'preact/hooks' si usas Preact
import type { UISizes } from '../types/uiTypes'

interface KeybindsProps {
  keys: string
  size?: 'sm' | 'md' | 'lg'
  onBind?: (event: KeyboardEvent) => void
  when?: boolean | (() => boolean)
  class?: string
}

const KEYBIND_SIZES: Record<UISizes, string> = {
  xs: 'kbd-xs',
  sm: 'kbd-sm',
  md: 'kbd-md',
  lg: 'kbd-lg',
  xl: 'kbd-xl'
}

export function Keybinds ({ keys, size = 'sm', onBind, when = true, class: className = '' }: KeybindsProps) {
  const kbdSize = size ? KEYBIND_SIZES[size] : ''
  
  useEffect(() => {
    if (!onBind) return

    function handleKeyDown (event: KeyboardEvent) {
      const isAllowed = typeof when === 'function' ? when() : when
      if (!isAllowed) return
      
      const keyArray = keys.toLowerCase().split(/[\s+]+/)
      
      const requiresCtrl = keyArray.includes('ctrl') || keyArray.includes('control')
      const requiresShift = keyArray.includes('shift')
      const requiresAlt = keyArray.includes('alt')
      const requiresMeta = keyArray.includes('cmd') || keyArray.includes('meta') || keyArray.includes('command')

      if (event.ctrlKey !== requiresCtrl) return
      if (event.shiftKey !== requiresShift) return
      if (event.altKey !== requiresAlt) return
      if (event.metaKey !== requiresMeta) return

      const modifierNames = ['ctrl', 'control', 'shift', 'alt', 'cmd', 'meta', 'command']
      const mainKeys = keyArray.filter(k => !modifierNames.includes(k))

      if (mainKeys.includes(event.key.toLowerCase())) {
        event.preventDefault()
        onBind?.(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keys, onBind, when])

  const displayKeys = keys.split(/[\s+]+/)

  return (
    <span class={`${className} flex items-center gap-1 pointer-events-none select-none`}>
      { displayKeys.map((k, i) => <kbd key={`${k}-${i}`} class={`kbd ${kbdSize}`}>{k}</kbd>) }
    </span>
  )
}
