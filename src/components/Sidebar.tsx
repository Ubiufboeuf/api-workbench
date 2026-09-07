import { useUIStore } from '../stores/uiStore'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconTheme } from './ui/Icons'

export function Sidebar () {
  const theme = useUIStore((state) => state.theme)
  
  return <>
    <input id='sidebar-checkbox' type='checkbox' class='peer' hidden />
    <aside class='not-md:fixed not-peer-checked:-left-64 z-6 h-full w-64 flex flex-col border-r border-base-content/20 bg-base-100'>
      <div class='w-full h-12.5 md:h-14 flex justify-end items-center p-2'>
        <Button id='toggle-theme' class='h-full' shape='square'>
          <Icon>
            <IconTheme theme={theme} />
          </Icon>
        </Button>
      </div>
      <div class='mt-auto text-sm text-center pb-4'>
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
