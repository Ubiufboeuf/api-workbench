import { Header } from './components/Header'
import { Request } from './components/Request'
import { Response } from './components/response/Response'
import { Search } from './components/Search'
import { Sidebar } from './components/Sidebar'

export function App () {
  return (
    <div class='h-full w-full flex bg-base-200'>
      <Sidebar />
      <div class='h-auto w-full flex-1 flex flex-col'>
        <Header />
        <main class='h-full w-full grid grid-rows-[auto_1fr] overflow-hidden'>
          <Search />
          <div class='w-full h-full min-h-0 flex-1 grid not-lg:grid-rows-[1fr_1px_1fr] lg:grid-cols-[1fr_auto_1fr]'>
            <Request />
            <div class='flex h-px w-full lg:w-px lg:h-full bg-base-content/20' />
            <Response />
          </div>
        </main>
      </div>
    </div>
  )
}
