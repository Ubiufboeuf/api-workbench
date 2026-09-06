import type { ComponentChildren } from 'preact'

export type TableColumnAlign =
  'start' |
  'center' |
  'end'

export interface TableProps<T> {
  id: string
  data: T[]
  columns: TableColumn<T>[]
  class?: string
  stickyHeader?: boolean
  footer?: () => ComponentChildren
  getRowKey?: (item: T, index: number) => string | number // para el key que pide preact (sino, index)
}

export interface TableColumn<T> {
  key: keyof T | string & {} // para saber qué propiedad de los items usar
  header: ComponentChildren
  align?: TableColumnAlign
  headerClass?: string
  class?: string
  width?: '1fr' | 'auto' | 'minmax()' | string & {}
  render?: (item: T, index: number) => ComponentChildren // para saber qué renderizar. Sino, usa item[key]
}

