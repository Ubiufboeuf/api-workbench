import { useEffect } from 'preact/hooks'
import { useRequestStore } from '../stores/requestStore'
import { Select, type SelectOption } from './ui/Select'

const methods: SelectOption[] = [
  { id: 'get', label: 'GET', color: 'var(--color-green-400)' },
  { id: 'post', label: 'POST', color: 'var(--color-blue-400)' },
  { id: 'put', label: 'PUT', color: 'var(--color-orange-400)' },
  { id: 'patch', label: 'PATCH', color: 'var(--color-orange-400)' },
  { id: 'delete', label: 'DELETE', color: 'var(--color-red-400)' }
]

export function HTTPMethod () {
  const setHttpMethod = useRequestStore((state) => state.setHttpMethod)

  function changeHttpMethod ({ id }: { id: string }) {
    setHttpMethod(id)
  }

  useEffect(() => {
    setHttpMethod(methods[0].id)
  }, [])
  
  return (
    <Select
      id='http-method'
      options={methods}
      class='w-28 font-semibold text-(--option-color) [--arrow-color:var(--color-base-content)]'
      onChange={changeHttpMethod}
    />
  )
}
