import type { TargetedEvent } from 'preact'
import { useEffect, useId, useRef } from 'preact/hooks'

export interface SelectOption {
  id: string
  label: string | number
  default?: boolean
  selectable?: boolean
}

interface SelectProps {
  id: string
  options: (SelectOption | string)[]
  option?: string | null
  class?: string
  onChange?: (option: SelectOption) => void
}

export function Select ({ id, options, option, class: className = '', onChange }: SelectProps) {
  const selectId = id ?? useId()
  const selectRef = useRef<HTMLSelectElement>(null)

  function handleChange (event: TargetedEvent<HTMLSelectElement>) {
    const select = event.currentTarget
    let option: SelectOption

    if (typeof options[0] === 'string') {
      const o = (options as string[]).find((o) => o === select.value)!
      option = { id: o, label: o }
    } else {
      const o = (options as SelectOption[]).find((o) => o.id === select.value)!
      option = o
    }

    onChange?.(option)
  }

  useEffect(() => {
    const select = selectRef.current
    if (!option || !select) return
    select.value = option
  }, [option])

  return (
    <select
      ref={selectRef}
      id={id}
      class={`${className} select cursor-pointer`}
      onChange={handleChange}
    >
      { options.map((option) => {
        if (typeof option === 'string') {
          return (
            <option key={`select-${selectId}-optionstr-${option}`} value={option}>
              {option}
            </option>
          )
        }

        const { id, label, default: defaultOpt, selectable = true } = option
        return (
          <option key={id} value={id} selected={defaultOpt} disabled={!selectable}>
            {label}
          </option>
        )
      }) }
    </select>
  )
}
