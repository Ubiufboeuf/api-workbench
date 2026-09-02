import type { ComponentChildren, JSX } from 'preact'
import { useRef } from 'preact/hooks'
import { Highlight } from './Highlight'

interface LineProps {
  openObject?: boolean
  closeObject?: boolean
  comma: boolean
  children?: ComponentChildren
}

const INDENTATION = ' '
const INDENTATION_SPACES = 2

const isObject = (data: any): data is object => data && typeof data === 'object'

export function JSONViewer ({ data }: { data: object }) {
  const lineNumberRef = useRef(0)
  const indentationLevelRef = useRef(0)

  const getNewerIndentation = () => INDENTATION.repeat(Math.max(0, indentationLevelRef.current) * INDENTATION_SPACES)
  const addIndentation = () => indentationLevelRef.current += 1
  const removeIndentation = () => indentationLevelRef.current -= 1

  function Line ({ openObject, closeObject, comma, children }: LineProps) {
    const lineNumber = ++lineNumberRef.current
    let indentation = getNewerIndentation()

    if (openObject) addIndentation()
    if (closeObject) {
      removeIndentation()
      indentation = getNewerIndentation()
    }
    
    return (
      <pre data-prefix={lineNumber}>
        {indentation}
        <code class='font-code'>
          {children}
        </code>
        {comma && ','}
      </pre>
    )
  }

  function wrap (v: any) {
    if (typeof v === 'string') return <Highlight is='text'>{v}</Highlight>
    if (typeof v === 'number') return <Highlight is='number'>{v}</Highlight>
    if (typeof v === 'boolean') return <Highlight is='pure'>{v}</Highlight>
    if (v == undefined) return <Highlight is='pure'>null</Highlight>
    return v
  }
  
  function render (data: any, isLast = true, fromObject = false): JSX.Element | string | undefined {
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return <Line comma={isLast !== true}>
          <Highlight is='bracket'>{'[]'}</Highlight>
        </Line>
      }

      if (fromObject) {
        return <>
          { data.map((item, idx, arr) => render(item, idx === arr.length - 1)) }
        </>
      }
      
      return <>
        <Line comma={false} openObject>
          <Highlight is='bracket' openObject>{'['}</Highlight>
        </Line>
        { data.map((item, idx, arr) => render(item, idx === arr.length - 1)) }
        <Line closeObject comma={isLast !== true}>
          <Highlight is='bracket' closeObject>{']'}</Highlight>
        </Line>
      </>
    }

    if (typeof data === 'object') {
      if (Object.keys(data).length === 0) {
        return <Highlight is='bracket'>{'{}'}</Highlight>
      }

      return <>
        { !fromObject && <Line comma={false} openObject>
          <Highlight is='bracket' openObject>{'{'}</Highlight>
        </Line> }
        { Object.entries(data).map(([k, v], idx, arr) => {
          const isLast = idx === arr.length - 1
          const key = `"${k}": `

          if (Array.isArray(v)) { 
            if (v.length === 0) {
              return <Line comma={isLast !== true}>
                <Highlight is='key'>{key}</Highlight>
                <Highlight is='bracket'>{'[]'}</Highlight>
              </Line>
            }

            return <>
              <Line openObject comma={false}>
                <Highlight is='key'>{key}</Highlight>
                <Highlight is='bracket' openObject>{'['}</Highlight>
              </Line>
              {render(v, undefined, true)}
              <Line closeObject comma={isLast !== true}>
                <Highlight is='bracket' closeObject>{']'}</Highlight>
              </Line>
            </>
          }
          
          if (isObject(v) && Object.keys(v).length === 0) {
            return <Line comma={isLast !== true}>
              <Highlight is='key' noReduce>{k}</Highlight>
              <Highlight is='bracket' noReduce>{'{}'}</Highlight>
            </Line>
          }


          if (isObject(v)) {
            return <>
              <Line openObject comma={isLast !== true}>
                <Highlight is='key'>{key}</Highlight>
                <Highlight is='bracket' openObject>{'{'}</Highlight>
              </Line>
              {render(v, undefined, true)}
              <Line closeObject comma={isLast !== true}>
                <Highlight is='bracket' closeObject>{'}'}</Highlight>
              </Line>
            </> 
          }
          
          return <>
            <Line comma={isLast !== true}>
              <Highlight is='key'>{key}</Highlight>
              {wrap(v)}
            </Line>
          </>
        }) }
        { !fromObject && <Line closeObject comma={isLast !== true}>
          <Highlight is='bracket' closeObject>{'}'}</Highlight>
        </Line> }
      </>
    }

    return <Line comma={isLast !== true}>{wrap(data)}</Line>
  }
  
  return render(data)
}
