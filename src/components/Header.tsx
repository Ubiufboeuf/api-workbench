import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconMenu } from './ui/Icons'

export function Header () {
  return (
    <header class='h-14 p-2 md:p-0 md:h-10 w-full border-b border-base-content/20 bg-base-100'>
      <Button id='toggle-sidebar' shape='square' class='h-full md:hidden z-10 relative'>
        <Icon class='size-5'>
          <IconMenu />
        </Icon>
      </Button>
    </header>
  )
}
