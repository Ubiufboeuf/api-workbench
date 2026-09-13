import type { TargetedEvent } from 'preact'
import { useEffect, useId, useRef, useState } from 'preact/hooks'

export interface SelectOption {
  id: string
  label: string | number
  default?: boolean
  selectable?: boolean
  class?: string
  color?: string
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
  const firstOption = (option ?? options[0])
  const defaultColor = typeof firstOption === 'string' ? undefined : firstOption.color
  const [optionColor, setOptionColor] = useState<string | undefined>(defaultColor)

  function handleChange (event: TargetedEvent<HTMLSelectElement>) {
    const select = event.currentTarget
    let option: SelectOption

    if (typeof options[0] === 'string') {
      const o = (options as string[]).find((o) => o === select.value)!
      option = { id: o, label: o }
    } else {
      const o = (options as SelectOption[]).find((o) => o.id === select.value)!
      option = o
      setOptionColor(o.color)
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
      style={{ '--option-color': optionColor }}
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

        const { id, label, default: defaultOpt, selectable = true, color, class: className = '' } = option
        
        return (
          <option key={id} value={id} selected={defaultOpt} disabled={!selectable} class={className} style={{ color }}>
            {label}
          </option>
        )
      }) }
    </select>
  )
}
