<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  number: { type: Number, required: true },
})

const card = ref(null)
const label = computed(() => String(props.number).padStart(2, '0'))
const hasDetails = computed(
  () => props.project.problem || props.project.role || props.project.features.length,
)
const hasAside = computed(
  () =>
    props.project.role ||
    props.project.features.length ||
    props.project.repo ||
    props.project.demo,
)

function onPointerMove(event) {
  const rect = card.value.getBoundingClientRect()
  card.value.style.setProperty('--x', `${event.clientX - rect.left}px`)
  card.value.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

const headingClass = 'font-mono text-xs uppercase tracking-wider text-accent'
const linkClass =
  'inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-ink'
</script>

<template>
  <article
    ref="card"
    class="spotlight relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 sm:p-8"
    @pointermove="onPointerMove"
  >
    <div class="relative grid gap-8 md:grid-cols-[1fr_1.15fr]">
      <div>
        <p class="font-mono text-xs text-muted">
          <span class="text-accent">{{ label }}</span> / {{ project.type }}
        </p>
        <h3 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{{ project.name }}</h3>
        <p v-if="project.problem" class="mt-3 leading-relaxed text-muted">{{ project.problem }}</p>
        <p v-if="!hasDetails" class="mt-3 text-muted">Detalles próximamente.</p>

        <ul v-if="project.stack.length" class="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          <li
            v-for="tech in project.stack"
            :key="tech"
            class="rounded-md border border-line bg-bg/60 px-2 py-1 font-mono text-xs text-muted"
          >
            {{ tech }}
          </li>
        </ul>
      </div>

      <div v-if="hasAside" class="space-y-5">
        <div v-if="project.role">
          <h4 :class="headingClass">Mi papel</h4>
          <p class="mt-2 leading-relaxed text-muted">{{ project.role }}</p>
        </div>

        <details v-if="project.features.length" class="group rounded-xl border border-line bg-bg/40">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden"
          >
            <span>
              Funcionalidades
              <span class="ml-1 font-mono text-xs text-muted">{{ project.features.length }}</span>
            </span>
            <svg class="size-4 text-muted transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <ul class="space-y-2 border-t border-line px-4 py-4 text-sm text-muted">
            <li v-for="feature in project.features" :key="feature" class="flex gap-3">
              <span class="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
              {{ feature }}
            </li>
          </ul>
        </details>

        <p v-if="project.repo || project.demo" class="flex gap-5">
          <a v-if="project.demo" :href="project.demo" :class="linkClass">Ver demo ↗</a>
          <a v-if="project.repo" :href="project.repo" :class="linkClass">Ver código ↗</a>
        </p>
      </div>
    </div>
  </article>
</template>
