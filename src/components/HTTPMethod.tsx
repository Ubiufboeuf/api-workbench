import { Select } from './ui/Select'

const methods = ['get', 'post', 'put', 'patch', 'delete' /* query */]

export function HTTPMethod () {
  return (
    <Select
      id='http-method'
      options={methods}
      class='w-28 uppercase font-semibold'
    />
  )
}
