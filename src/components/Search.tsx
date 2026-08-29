import { HTTPMethod } from './HTTPMethod'
import { QueryURL } from './QueryURL'
import { Submit } from './Submit'

export function Search () {
  return (
    <div class='h-16 flex items-center p-2 px-3 gap-2'>
      <HTTPMethod />
      <QueryURL />
      <Submit />
    </div>
  )
}
