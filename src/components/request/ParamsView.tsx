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
    render: ({ name, focus }) => {
      const nameRef = useRef<HTMLInputElement>(null)
      useEffect(() => (focus) ? nameRef.current?.focus() : undefined, [])
      
      return (
        <div class='h-full w-full flex items-center gap-3 p-2 px-3'>
          <input type='checkbox' class='checkbox checkbox-accent checkbox-sm' />
          <input
            ref={nameRef}
            type='text'
            class='input input-sm'
            placeholder='Nombre...'
            defaultValue={name}
            contentEditable
            />
        </div>
      )
    }
  },
  {
    key: 'value',
    header: 'Valor',
    class: 'p-0!',
    render: ({ value }) => (
      <label class='h-full w-full flex items-center p-2 px-3'>
        <input
          type='text'
          class='input input-sm'
          placeholder='Valor...'
          defaultValue={value}
          contentEditable
        />
      </label>
    )
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
  
  function handleClick () {
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
