/* eslint-disable react/no-unknown-property */
import type { SVGAttributes } from 'preact'
import type { ReactNode } from 'preact/compat'
import type { Theme } from '../../types/uiTypes'

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

export const IconTrash = () => (
  <Svg>
    <path d='M4 7l16 0' />
    <path d='M10 11l0 6' />
    <path d='M14 11l0 6' />
    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
  </Svg>
)

export const IconAdd = () => (
  <Svg>
    <path d='M9 12h6' />
    <path d='M12 9v6' />
    <path d='M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14' />
  </Svg>
)

export const IconMenu = () => (
  <Svg>
    <path d='M4 6l16 0' />
    <path d='M4 12l16 0' />
    <path d='M4 18l16 0' />
  </Svg>
)

export const IconTheme = ({ theme }: { theme: Theme }) => (
  <Svg>
    { theme === 'dark' && <><path d='M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' /><path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' /></> }
    { theme === 'light' && <><path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008' /></> }
  </Svg>
)
