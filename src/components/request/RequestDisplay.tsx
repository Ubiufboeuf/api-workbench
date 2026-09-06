import type { Tab } from '../../types/tabTypes'

interface Props {
  tabs: Tab[]
  currentTab: string
}

export function RequestDisplay ({ tabs, currentTab }: Props) {
  const View = tabs.find((t) => t.id === currentTab)!.view ?? (() => null)
  
  return (
    <div class='flex flex-col gap-3 py-2 h-fit'>
      <View />
    </div>
  )
}
