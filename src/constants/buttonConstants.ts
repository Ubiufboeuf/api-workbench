import type { UIColors, UISizes, UIFillMode, UIShapes, UIWidths } from '../types/uiTypes'

export const BUTTON_COLORS: Record<UIColors, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error'
}

export const BUTTON_SIZES: Record<UISizes, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl'
}

export const BUTTON_FILL_MODES: Record<UIFillMode, string> = {
  soft: 'btn-soft',
  outline: 'btn-outline',
  dash: 'btn-dash',
  ghost: 'btn-ghost',
  link: 'btn-link'
}

export const BUTTON_SHAPES: Record<UIShapes, string> = {
  circle: 'btn-circle',
  square: 'btn-square'
}

export const BUTTON_WIDTHS: Record<UIWidths, string> = {
  block: 'btn-block',
  wide: 'btn-wide'
}
