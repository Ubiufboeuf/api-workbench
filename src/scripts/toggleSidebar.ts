window.addEventListener('load', () => {
  const toggleSidebar = document.querySelector('#toggle-sidebar')
  if (toggleSidebar instanceof HTMLButtonElement) {
    toggleSidebar.onclick = handleClick
  }

  const closeSidebar = document.querySelector('#close-sidebar')
  if (closeSidebar instanceof HTMLButtonElement) {
    closeSidebar.onclick = handleClick
  }
})

function handleClick () {
  const sidebarCheckbox = document.querySelector('#sidebar-checkbox')
  if (sidebarCheckbox instanceof HTMLInputElement) {
    sidebarCheckbox.checked = !sidebarCheckbox.checked
  }
}
