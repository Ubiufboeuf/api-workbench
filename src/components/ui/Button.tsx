import type { ButtonProps } from '../../types/buttonTypes'
import { BUTTON_FILL_MODES, BUTTON_SHAPES, BUTTON_SIZES, BUTTON_COLORS, BUTTON_WIDTHS } from '../../constants/buttonConstants'

export function Button ({ children, id, title, label, color, size, fill, shape, width, selected, disabled, focusable = true, class: className = '', onClick, style }: ButtonProps) {
  const btnColor = color ? BUTTON_COLORS[color] : ''
  const btnSize = size ? BUTTON_SIZES[size] : ''
  const btnFill = fill ? BUTTON_FILL_MODES[fill] : ''
  const btnShape = shape ? BUTTON_SHAPES[shape] : ''
  const btnWidth = width ? BUTTON_WIDTHS[width] : ''
  const btnSelected = selected ? 'btn-active' : ''
  const btnDisabled = disabled ? 'btn-disabled' : ''

  const canFocus = focusable ? '' : 'pointer-events-none'

  return (
    <button
      id={id}
      title={title}
      class={`btn ${btnColor} ${btnSize} ${btnFill} ${btnShape} ${btnWidth} ${btnSelected} ${btnDisabled} ${canFocus} ${className}`}
      style={style}
      disabled={disabled}
      tabIndex={focusable ? undefined : -1}
      onClick={onClick}
    >
      { children || <span>
        {label}
      </span> }
    </button>
  )
}
