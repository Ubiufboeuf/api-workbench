import { Header } from './components/Header'
import { Request } from './components/Request'
import { Response } from './components/Response'
import { Search } from './components/Search'
import { Sidebar } from './components/Sidebar'

export function App () {
  return (
    <div class='h-full w-full flex bg-base-200'>
      <Sidebar />
      <div class='h-auto w-full flex-1 flex flex-col'>
        <Header />
        <main class='h-full w-full flex-1 flex flex-col overflow-auto'>
          <Search />
          <div class='w-full flex-1 flex'>
            <Request />
            <Response />
          </div>
        </main>
      </div>
    </div>
  )
}
