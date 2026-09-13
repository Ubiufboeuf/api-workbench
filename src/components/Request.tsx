import { useState } from 'preact/hooks'
import { Tabs } from './ui/Tabs'
import type { Tab } from '../types/tabTypes'
import { RequestDisplay } from './request/RequestDisplay'
import { ParamsView } from './request/ParamsView'
import { PayloadView } from './request/PayloadView'

const requestTabList: Tab[] = [
  { id: 'params', label: 'Parámetros', view: ParamsView },
  { id: 'payload', label: 'Datos útiles', view: PayloadView }
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
