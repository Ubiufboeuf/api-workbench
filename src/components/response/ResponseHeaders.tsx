import { useResponseStore } from '../../stores/responseStore'

export function ResponseHeaders () {
  const responseHeaders = useResponseStore((state) => state.responseHeaders) ?? []
  console.log([...responseHeaders])
  
  return (
    <section>
      <table class='table table-sm table-zebra bg-base-100'>
        <thead class='bg-base-200'>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { [...responseHeaders].map(([k, v]) => (
            <tr key={`${k}-${v}`}>
              <td>{k}</td>
              <td>{v}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </section>
  )
}
