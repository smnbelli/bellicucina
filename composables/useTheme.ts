export const useTheme = () => {
  const isDark = useState('dark-mode', () => false)
  const initialized = useState('theme-initialized', () => false)

  const applyTheme = () => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('belli-theme', isDark.value ? 'dark' : 'light')
  }

  const initialize = () => {
    if (!import.meta.client || initialized.value) return
    const saved = localStorage.getItem('belli-theme')
    isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    initialized.value = true
    applyTheme()
  }

  const toggle = () => { isDark.value = !isDark.value; applyTheme() }
  onMounted(initialize)

  return { isDark, toggle }
}
