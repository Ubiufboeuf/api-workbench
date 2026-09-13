import { useRequestStore } from '../stores/requestStore'
import { useResponseStore } from '../stores/responseStore'

const optionsWithBody = ['post', 'patch', 'put']

function getProtocol (query: string) {
  try {
    return new URL(query).protocol
  } catch {
    return
  }
}

function getFetchOptions (options: any) {
  let fetchOptions: RequestInit | undefined = undefined
  
  if (optionsWithBody.includes(options.method.toLowerCase())) {
    fetchOptions = {
      body: options.payload,
      method: options.method
    }
  }

  return fetchOptions
}

async function Fetch<T extends string> (url: string | URL, protocol: T | undefined, options: any) {
  const fetchOptions = getFetchOptions(options)

  if (!protocol || protocol === 'localhost:') {  
    try {
      return await fetch(`http://${url}`, fetchOptions)
    } catch {
      return await fetch(`https://${url}`, fetchOptions)
    }
  }
  
  if (protocol.startsWith('http')) {
    return fetch(url, fetchOptions)
  }

  // if ws | sql | ...
}

export async function search (query: string) {
  const protocol = getProtocol(query)
  
  let url
  try {
    url = new URL(query)
  } catch { /* empty */ }

  const { httpMethod, payload } = useRequestStore.getState()
  console.log({ httpMethod })
  
  const res = await Fetch(url ?? query, protocol, { method: httpMethod, payload })
  useResponseStore.setState({ res })  
}
