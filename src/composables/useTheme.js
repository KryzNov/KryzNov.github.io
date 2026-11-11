import { nextTick, ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

function apply(dark) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {}
}

export function useTheme() {
  async function toggle(event) {
    const next = !isDark.value
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduceMotion) return apply(next)

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(async () => {
      apply(next)
      await nextTick()
    })
    await transition.ready
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
    )
  }

  return { isDark, toggle }
}
