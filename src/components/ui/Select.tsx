import { useId } from 'preact/hooks'

export interface SelectOption {
  id: string
  label: string | number
  default?: boolean
  selectable?: boolean
}

interface SelectProps {
  id: string
  options: (SelectOption | string)[]
  class?: string
}

export function Select ({ id, options, class: className = '' }: SelectProps) {
  const selectId = useId()

  return (
    <select id={id} class={`${className} select cursor-pointer`}>
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
