import { useUIStore } from '../stores/uiStore'
import type { SavedRequest } from '../types/requestTypes'
import { methods } from './HTTPMethod'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconAdd, IconTheme } from './ui/Icons'

const savedRequests: SavedRequest[] = [
  { id: 'a', method: 'get', name: 'http://localhost:5173/' },
  { id: 'b', method: 'get', name: 'http://localhost:5173/' },
  { id: 'c', method: 'post', name: 'http://localhost:5173/' }
]

export function Sidebar () {
  const theme = useUIStore((state) => state.theme)
  const currentRequest = 'a'
  
  return <>
    <input id='sidebar-checkbox' type='checkbox' class='peer' hidden />
    <aside class='not-md:fixed not-peer-checked:-left-64 z-6 h-full w-64 flex flex-col border-r border-base-content/20 bg-base-100'>
      <div class='flex items-center h-13 px-2 border-b border-base-content/20'>
        <h1 class='font-semibold flex-1 px-2'>Peticiones</h1>
        <Button shape='square' fill='ghost' title='Crear nueva petición'>
          <Icon class='size-5'>
            <IconAdd />
          </Icon>
        </Button>
      </div>
      <div class='flex-1 overflow-y-auto'>
        <div class='h-full min-h-fit py-2'>
          { savedRequests.map(({ id, method: _method, name }) => {
            const method = methods.find((m) => m.id === _method)
            const isCurrent = currentRequest === id
            return (
              <Button
                key={id}
                fill={isCurrent ? 'soft' : 'ghost'}
                color={isCurrent ? 'primary' : undefined}
                class={`${isCurrent ? 'isCurrent' : ''} w-full flex flex-nowrap items-center justify-start gap-2 p-2 px-4 not-[.isCurrent]:font-normal`}
                focusable={!isCurrent}
                title={`${method?.label} ${name}`}
              >
                <span class='text-xs font-semibold text-(--color)' style={{'--color': method?.color}}>{method?.label}</span>
                <span class='text-sm text-nowrap line-clamp-1 text-ellipsis'>{name}</span>
              </Button>
            )
          }) }
        </div>
      </div>
      <div class='w-full h-12.5 md:h-14 flex items-center p-2'>
        <Button id='toggle-theme' class='h-full' fill='ghost' shape='square'>
          <Icon>
            <IconTheme theme={theme} />
          </Icon>
        </Button>
      </div>
      <div class='mt-auto text-sm text-center py-4 border-t border-base-content/20'>
        Diseño basado en&nbsp;
        <a
          href='https://www.usebruno.com/'
          class='link link-accent'
        >
          Bruno
        </a>
      </div>
    </aside>
    <label class='md:hidden not-peer-checked:hidden fixed z-5 h-full w-full bg-black/30' htmlFor='sidebar-checkbox' />
  </>
}
