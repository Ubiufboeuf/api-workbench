import { useResponseStore } from '../stores/responseStore'

export async function search (query: string) {
  let isValidUrl
  try {
    isValidUrl = new URL(query)
  } catch {/* empty */}

  if (!isValidUrl) return
  
  const res = await fetch(query) 
  useResponseStore.setState({ res })
}
