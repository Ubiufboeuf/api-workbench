window.onload = () => {
  const toggleSidebar = document.querySelector('#toggle-sidebar')
  if (toggleSidebar instanceof HTMLButtonElement) {
    toggleSidebar.onclick = handleClick
  }
}

function handleClick () {
  const sidebarCheckbox = document.querySelector('#sidebar-checkbox')
  if (sidebarCheckbox instanceof HTMLInputElement) {
    sidebarCheckbox.checked = !sidebarCheckbox.checked
  }
}
