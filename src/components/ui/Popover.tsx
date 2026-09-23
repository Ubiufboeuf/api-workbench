import type { ComponentChildren } from 'preact'
import { Button } from './Button'
import { useId } from 'preact/hooks'

interface Props {
  class?: string
  buttonClass?: string
  buttonContent?: ComponentChildren
  children: ComponentChildren
}

export function Popover ({ class: className = '', buttonClass, buttonContent, children }: Props) {
  const id = useId()
  
  return <>
    <Button class={buttonClass} popoverTarget={`popover-${id}`} style={{ anchorName: `--anchor-${id}` }}>{buttonContent}</Button>
    <div id={`popover-${id}`} popover='auto' class={`${className} dropdown menu`} style={{ positionAnchor: `--anchor-${id}` }}>
      {children}
    </div>
  </>
}
