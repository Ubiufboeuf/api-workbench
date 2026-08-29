import type { TargetedMouseEvent } from 'preact'
import type { UIColors, UIFillMode, UIProps, UISizes, UIShapes, UIWidths } from './uiTypes'

export interface ButtonProps extends UIProps {
  label?: string
  
  color?: UIColors
  size?: UISizes
  width?: UIWidths
  fill?: UIFillMode
  shape?: UIShapes
  
  selected?: boolean
  disabled?: boolean
  focusable?: boolean

  onClick?: (event: TargetedMouseEvent<HTMLButtonElement>) => void
}

export interface ButtonLinkProps extends UIProps {
  href?: string
  label?: string
  
  color?: UIColors
  size?: UISizes
  width?: UIWidths
  fill?: UIFillMode
  shape?: UIShapes
  
  selected?: boolean
}
