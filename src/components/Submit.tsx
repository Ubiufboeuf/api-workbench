import { Button } from './ui/Button'
import { Icon } from './ui/Icon'
import { IconArrow } from './ui/Icons'

export function Submit () {
  return (
    <Button fill='outline' shape='square' class='bg-base-100 border-base-content/20'>
      <Icon>
        <IconArrow />
      </Icon>
    </Button>
  )
}
