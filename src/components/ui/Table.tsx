import type { TableProps } from '../../types/tableTypes'

export function Table<T> ({ id: tableId, data, columns, getRowKey, class: className = '', stickyHeader, footer: Footer }: TableProps<T>) {
  const cols = columns.map((c) => c.width || 'auto').join(' ')

  return (
    <div
      id={tableId}
      class={`${className} ${Footer ? 'f' : ''} relative [.f]:grid grid-rows-[1fr_auto]`}
    >
      <div class='h-full w-full overflow-auto bg-inherit'>
        <div
          class='main h-fit w-fit grid [&_.cell]:border [&_.cell]:border-base-content/10 bg-inherit'
          style={{ gridTemplateColumns: cols }}
        >

          {/* Cabecera */}
          { columns.map(({ key, header, headerClass, align }) => (
            <div
              key={key}
              class={`${headerClass} ${stickyHeader ? 'sh' : ''} [.sh]:sticky top-0 z-3 cell header-row p-4 py-3 bg-inherit`}
              style={{ textAlign: align ?? undefined }}
            >
              <strong class='text-base-content/60'>{header}</strong>
            </div>
          )) }

          {/* Celdas */}
          { data.map((item, rowIndex, arr) => {
            const rowKey = getRowKey ? getRowKey(item, rowIndex) : (item as any).id ?? rowIndex
            const lastRow = rowIndex === arr.length - 1
            
            return (
              <div key={`${rowKey}`} class='contents group'>
                { columns.map(({ key: k, render, align, class: className = '' }) => {
                  const key = k.toString()
                  const fallbackToRender = (item as Record<string, any>)[key] 

                  return (
                    <div
                      key={`${rowKey}-${key}`}
                      class={`${className} ${lastRow ? 'last-row' : ''} cell body-row group/cell w-full p-4 flex flex-col justify-center text-base-content/70`}
                      style={{ placeItems: align ?? undefined, justifySelf: align ?? undefined }}
                    >
                      { render
                        ? render(item, rowIndex)
                        : <span class='line-clamp-2'>{fallbackToRender}</span>
                      }
                    </div>
                  ) })
                }
              </div>
            ) 
          }) }
        </div>
      </div>
      { Footer && (
        <footer class='h-fit w-full border-t border-base-content/10'>
          <Footer />
        </footer>
      ) }
    </div>
  )
}
