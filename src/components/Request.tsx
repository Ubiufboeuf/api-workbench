import { useState } from 'preact/hooks'
import { Tabs } from './ui/Tabs'
import type { Tab } from '../types/tabTypes'
import { RequestDisplay } from './request/RequestDisplay'
import { ParamsView } from './request/ParamsView'

const requestTabList: Tab[] = [
  { id: 'params', label: 'Params', view: ParamsView },
  { id: 'otro', label: 'otro' }
]

export function Request () {
  const [currentTab, setCurrentTab] = useState(requestTabList[0].id)
  
  return (
    <section class='w-full h-full max-w-full max-h-full px-4 flex flex-col gap-2 overflow-auto'>
      <Tabs
        tabs={requestTabList}
        state={currentTab}
        setter={setCurrentTab}
      />
      <RequestDisplay
        tabs={requestTabList}
        currentTab={currentTab}
      />
    </section>
  )
}
