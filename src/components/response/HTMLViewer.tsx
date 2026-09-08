export function HTMLViewer ({ data }: { data: string }) {
  return (
    <iframe
      srcDoc={typeof data === 'string' ? data : (JSON.stringify(data) || data)}
      sandbox=''
      class='h-full w-full border border-base-content/20 rounded-lg p-2'
    />
  )
}
