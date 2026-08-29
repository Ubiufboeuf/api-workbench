/* eslint-disable react/no-unknown-property */
import type { SVGAttributes } from 'preact'
import type { ReactNode } from 'preact/compat'

export interface SVGProps {
  children: ReactNode
  id?: string
  viewBox?: string
  class?: string
  width?: string
  height?: string
  fill?: string
  stroke?: string
  strokeWidth?: string | number
  strokeLinecap?: SVGAttributes<SVGSVGElement>['strokeLinecap']
  strokeLinejoin?: SVGAttributes<SVGSVGElement>['strokeLinejoin']
  hidden?: boolean
}

export type IconThickness = string | number

const Svg = ({
  children, id, viewBox = '0 0 24 24',
  class: className, hidden,
  width = '24', height = '24',
  fill = 'transparent', stroke = 'currentColor', strokeWidth = '2', strokeLinecap = 'round', strokeLinejoin = 'round'
}:
  SVGProps
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    id={id}
    viewBox={viewBox}
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    stroke-width={strokeWidth}
    stroke-linejoin={strokeLinejoin}
    stroke-linecap={strokeLinecap}
    hidden={hidden}
    class={`${className} h-full w-full pointer-events-none`}
  >
    {children}
  </svg>
)


export function IconArrow () {
  return (
    <Svg>
      <path d='M5 12l14 0' />
      <path d='M13 18l6 -6' />
      <path d='M13 6l6 6' />
    </Svg>
  )
}
