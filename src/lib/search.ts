import { useRequestStore } from '../stores/requestStore'
import { useResponseStore } from '../stores/responseStore'

function getProtocol (query: string) {
  try {
    return new URL(query).protocol
  } catch {
    return
  }
}

async function Fetch (url: string | URL, protocol: string | undefined, options: object | RequestInit) {
  if (!protocol || protocol === 'localhost:') {
    return Promise.any([
      fetch(`http://${url}`, options),
      fetch(`https://${url}`, options)
    ])
  }
  
  if (protocol.startsWith('http')) {
    return fetch(url)
  }

  // if ws | sql | ...
}

export async function search (query: string) {
  const protocol = getProtocol(query)
  
  let url
  try {
    url = new URL(query)
  } catch { /* empty */ }
  
  const { httpMethod } = useRequestStore.getState()
  console.log({ httpMethod })
  
  const res = await Fetch(url ?? query, protocol, { method: httpMethod })
  useResponseStore.setState({ res })  
}
