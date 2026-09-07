import type { Theme } from '../types/uiTypes'
import { useUIStore } from '../stores/uiStore'

window.addEventListener('load', async () => {
  const toggleTheme = document.querySelector('#toggle-theme')

  loadInitialTheme()
  
  if (toggleTheme instanceof HTMLButtonElement) {
    toggleTheme.onclick = handleClick
  }
})

function loadInitialTheme () {
  const preference: Theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const { dataset } = document.documentElement
  dataset.theme = preference
  useUIStore.setState({ theme: preference })
}

async function handleClick () {
  const { dataset } = document.documentElement
  const currentTheme = dataset.theme as (Theme | undefined)

  const theme = currentTheme === 'dark' ? 'light' : 'dark'

  dataset.theme = theme
  useUIStore.setState({ theme })
}
