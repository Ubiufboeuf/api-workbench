export function tryParseJSON (text: string): object | undefined {
  try {
    return JSON.parse(text)
  } catch { return }
}

export function tryParseHTML (text: string): string | undefined {
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')
  return doc ? text : undefined
}
