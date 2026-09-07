import { useResponseStore } from '../stores/responseStore'

function getProtocol (query: string) {
  try {
    return new URL(query).protocol
  } catch {
    return
  }
}

async function Fetch (url: string | URL, protocol?: string) {
  if (!protocol || protocol === 'localhost:') {
    return Promise.any([
      fetch(`http://${url}`),
      fetch(`https://${url}`)
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
  
  const res = await Fetch(url ?? query, protocol)
  useResponseStore.setState({ res })  
}
