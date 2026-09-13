import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { IconAdd, IconTrash } from '../ui/Icons'
import { Table } from '../ui/Table'
import type { Param } from '../../types/requestTypes'
import type { TableColumn } from '../../types/tableTypes'
import { useRequestStore } from '../../stores/requestStore'
import { useEffect, useRef } from 'preact/hooks'

const columns: TableColumn<Param>[] = [
  {
    key: 'name',
    header: 'Clave',
    headerClass: 'pl-11',
    class: 'p-0!',
    render: ({ id, name, focus: wantsToFocus, value }, idx) => {
      const nameRef = useRef<HTMLInputElement>(null)
      const toFocus = useRequestStore((state) => state.toFocus)
      const modifyParam = useRequestStore((state) => state.modifyParam)

      function handleInput () {
        const input = nameRef.current
        if (!input) return

        const { value: inputValue } = input
        modifyParam(id, idx, { name: inputValue, value, focus: wantsToFocus })
      }
      
      useEffect(() => {
        const focus = wantsToFocus && toFocus === id
        if (focus) nameRef.current?.focus()
      }, [toFocus])

      return (
        <div class='h-full w-full flex items-center gap-3 p-2 px-3'>
          <input type='checkbox' class='checkbox checkbox-accent checkbox-sm' />
          <input
            id={`${id}-key`}
            ref={nameRef}
            type='text'
            class='input input-sm'
            placeholder='Nombre...'
            defaultValue={name}
            contentEditable
            onInput={handleInput}
          />
        </div>
      )
    }
  },
  {
    key: 'value',
    header: 'Valor',
    class: 'p-0!',
    render: ({ id, value, name, focus: wantsToFocus }, idx) => {
      const keyRef = useRef<HTMLInputElement>(null)
      const modifyParam = useRequestStore((state) => state.modifyParam)
      
      function handleInput () {
        const input = keyRef.current
        if (!input) return

        const { value: inputValue } = input
        modifyParam(id, idx, { name, value: inputValue, focus: wantsToFocus})
      }
      
      return (
        <label class='h-full w-full flex items-center p-2 px-3'>
          <input
            id={`${id}-value`}
            ref={keyRef}
            type='text'
            class='input input-sm'
            placeholder='Valor...'
            defaultValue={value}
            contentEditable
            onInput={handleInput}
          />
        </label>
      )
    }
  },
  {
    key: 'delete',
    header: '',
    width: '60px',
    align: 'center',
    render: ({ id }) => (
      <Button fill='soft' color='error' shape='square' size='sm' onClick={() => useRequestStore.getState().deleteParam(id)}>
        <Icon class='size-5'>
          <IconTrash />
        </Icon>
      </Button>
    )
  }
]

export function ParamsView () {
  const params = useRequestStore((state) => state.params)
  const addParam = useRequestStore((state) => state.addParam)
  const clearAllFocus = useRequestStore((state) => state.clearAllFocus)
  
  function handleClick () {
    clearAllFocus()
    addParam({ name: '', value: '', focus: true })
  }

  return <>
    <span class='text-sm text-base-content/50'>Query</span>
    <Table
      id='products-table'
      columns={columns}
      data={params}
      footer={() => <div class='h-12 flex items-end'>
        <Button
          class='w-full h-10 border border-base-content/10 flex items-center justify-center gap-2 text-base-content/70 text-sm'
          onClick={handleClick}
        >
          <Icon class='size-5 text-base-content opacity-50'>
            <IconAdd />
          </Icon>
        </Button>
      </div> }
      class='w-full [&_.main]:w-full [&_.header-row]:text-sm [&_.body-row]:py-1 h-fit'
      stickyHeader
    />
  </>
}
