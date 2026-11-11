<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const props = defineProps({
  name: { type: String, required: true },
  links: { type: Array, required: true },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .map((word) => word[0])
    .join(''),
)

const active = ref('')
const scrolled = ref(false)
let observer

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) active.value = entry.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const link of props.links) {
    const section = document.getElementById(link.href.slice(1))
    if (section) observer.observe(section)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-40 border-b transition-colors duration-300',
      scrolled ? 'border-line bg-bg/70 backdrop-blur-xl' : 'border-transparent',
    ]"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
      <a href="#inicio" class="font-mono text-sm font-semibold" :aria-label="`${name}, ir al inicio`">
        <span class="sm:hidden">{{ initials }}</span>
        <span class="hidden sm:inline">{{ name }}</span>
        <span class="text-accent">_</span>
      </a>

      <div class="flex items-center gap-4 sm:gap-6">
        <nav aria-label="Principal">
          <ul class="flex gap-4 text-sm sm:gap-6">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                :aria-current="active === link.href.slice(1) ? 'true' : undefined"
                :class="[
                  'transition-colors hover:text-ink',
                  active === link.href.slice(1) ? 'text-ink' : 'text-muted',
                ]"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
