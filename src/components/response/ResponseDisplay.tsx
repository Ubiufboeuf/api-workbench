import { useEffect, useState } from 'preact/hooks'
import { useResponseStore } from '../../stores/responseStore'
import { JSONViewer } from './JSONViewer'

const dataType = 'json'

export function ResponseDisplay () {
  const res = useResponseStore((state) => state.res)
  const [data, setData] = useState<object>()

  async function convertResponse () {
    const data = await res?.json()
    console.log({ data })
    setData(data)
  }
  
  useEffect(() => {
    convertResponse()
  }, [res])
  
  if (!data) return 'no data'
  
  return (
    <div class='w-fit h-fit mockup-code bg-base-100 [&::before]:[content:unset] [&_pre]:[content-visibility:auto]'>
      { dataType === 'json' && <JSONViewer data={data} /> }
    </div>
  )
}
