import type { Tab } from '../../types/tabTypes'

interface Props {
  tabs: Tab[]
  state: string
  setter: (newState: string) => void
}

export function Tabs ({ tabs, setter, state }: Props) {
  return (
    <div class='tabs tabs-border -ml-3'>
      { tabs.map(({ id, label }) => (
        <label key={id} class='tab' onInput={() => setter(id)}>
          <input name='tab-radio' type='radio' defaultChecked={id === state} hidden />
          {label}
        </label>
      )) }
    </div>
  )
}
