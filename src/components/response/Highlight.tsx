import type { ComponentChildren } from 'preact'

type Is = 'key' | 'pure' | 'text' | 'number' | 'bracket' | 'symbol'

interface Props {
  openObject?: boolean
  closeObject?: boolean
  is?: Is
  noReduce?: boolean
  children: ComponentChildren
}

const colors: Record<Is, string> = {
  key: 'text-coral',
  pure: 'text-whiskey',
  text: 'text-green',
  number: 'text-whiskey',
  bracket: 'text-whiskey',
  symbol: 'text-fountainBlue'
}

const bracketColors: string[] = [
  'text-whiskey',
  'text-purple',
  'text-fountainBlue'
]

const indentationColor: Record<number, string> = {}
let indentationLevel = 0

function getRandomColor (openObject = false, closeObject = false) {
  let level = indentationLevel

  if (openObject) indentationLevel += 1
  if (closeObject) {
    indentationLevel -= 1
    level = indentationLevel
  }

  const savedColor = indentationColor[level % 3]
  if (savedColor) {
    return savedColor
  }

  const color = bracketColors[level]
  indentationColor[level] = color
  
  return color 
}

export function Highlight ({ openObject, closeObject, is, noReduce, children }: Props) {
  if (!is) return children
  
  if (is === 'bracket') {
    const color = getRandomColor(openObject, closeObject)
    return (
      <span>
        <mark class={`${color} bg-transparent`}>{children}</mark>
      </span>
    )
  }

  const str = children?.toString()
  let content = str
  
  if (is === 'key' && !noReduce) content = str?.slice(0, -2)
  if (is === 'text') content = `"${str}"`

  return (
    <span>
      <mark class={`${colors[is]} bg-transparent`}>{content}</mark>
      {is === 'key' ? ': ' : ''}
    </span>
  )
}
