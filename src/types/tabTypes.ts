import type { ComponentChildren } from 'preact'

export interface Tab {
  id: string
  label: string
  view?: () => ComponentChildren
}
