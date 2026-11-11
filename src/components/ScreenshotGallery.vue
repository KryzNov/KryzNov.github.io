<script setup>
import { computed, ref } from 'vue'
import { projects } from '../data/profile'

const files = import.meta.glob('../assets/proyectos/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

function captionFrom(path) {
  const text = path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  return text && text[0].toUpperCase() + text.slice(1)
}

const galleries = projects.map((project) => ({
  name: project.name,
  slug: project.slug,
  shots: Object.keys(files)
    .filter((path) => path.split('/').at(-2) === project.slug)
    .sort()
    .map((path, i) => {
      const caption = captionFrom(path)
      return {
        src: files[path],
        caption,
        alt: caption ? `${project.name}: ${caption}` : `${project.name}: captura ${i + 1}`,
      }
    }),
}))

const selected = ref(galleries.find((g) => g.shots.length)?.slug ?? galleries[0].slug)
const gallery = computed(() => galleries.find((g) => g.slug === selected.value))

const dialog = ref(null)
const index = ref(0)
const shot = computed(() => gallery.value.shots[index.value])

function open(i) {
  index.value = i
  dialog.value.showModal()
}

function step(delta) {
  const total = gallery.value.shots.length
  index.value = (index.value + delta + total) % total
}

function onDialogClick(event) {
  if (event.target === dialog.value) dialog.value.close()
}

const iconButton =
  'grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink'
</script>

<template>
  <section id="capturas" aria-labelledby="titulo-capturas" class="pb-28">
    <div v-reveal class="mb-8">
      <p class="font-mono text-xs text-accent">02 / Capturas</p>
      <h2 id="titulo-capturas" class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Los sistemas en acción
      </h2>
    </div>

    <div v-reveal class="mb-6 flex flex-wrap gap-2" role="group" aria-label="Elegir sistema">
      <button
        v-for="item in galleries"
        :key="item.slug"
        type="button"
        :aria-pressed="item.slug === selected"
        :class="[
          'rounded-full border px-4 py-1.5 text-sm transition-colors',
          item.slug === selected
            ? 'border-accent bg-accent/10 text-ink'
            : 'border-line text-muted hover:border-accent/50 hover:text-ink',
        ]"
        @click="selected = item.slug"
      >
        {{ item.name }}
        <span class="ml-1 font-mono text-xs text-muted">{{ item.shots.length }}</span>
      </button>
    </div>

    <div v-if="gallery.shots.length" class="grid gap-4 sm:grid-cols-2">
      <button
        v-for="(item, i) in gallery.shots"
        :key="item.src"
        type="button"
        :class="[
          'group relative overflow-hidden rounded-2xl border border-line bg-surface/60 text-left transition-colors hover:border-accent/50',
          i === 0 && gallery.shots.length > 1 ? 'sm:col-span-2' : '',
        ]"
        :aria-label="`Ampliar ${item.alt}`"
        @click="open(i)"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          loading="lazy"
          class="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span
          v-if="item.caption"
          class="absolute inset-x-0 bottom-0 bg-linear-to-t from-bg/90 to-transparent px-4 pb-3 pt-8 text-sm"
        >
          {{ item.caption }}
        </span>
      </button>
    </div>

    <div
      v-else
      class="grid aspect-video max-h-96 w-full place-items-center rounded-2xl border border-dashed border-line bg-surface/40 text-center"
    >
      <div class="px-6">
        <svg class="mx-auto size-8 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" />
        </svg>
        <p class="mt-3 text-muted">Capturas de {{ gallery.name }} próximamente.</p>
      </div>
    </div>

    <dialog
      ref="dialog"
      class="m-auto w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-bg/80 backdrop:backdrop-blur-sm"
      :aria-label="shot?.alt"
      @click="onDialogClick"
      @keydown.left="step(-1)"
      @keydown.right="step(1)"
    >
      <template v-if="shot">
        <img :src="shot.src" :alt="shot.alt" class="max-h-[78vh] w-full bg-bg object-contain" />
        <div class="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
          <p class="min-w-0 truncate text-sm">
            <span class="font-mono text-xs text-muted">{{ index + 1 }} / {{ gallery.shots.length }}</span>
            <span class="ml-2">{{ shot.caption || gallery.name }}</span>
          </p>
          <div class="flex shrink-0 gap-2">
            <template v-if="gallery.shots.length > 1">
              <button type="button" :class="iconButton" aria-label="Anterior" @click="step(-1)">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" :class="iconButton" aria-label="Siguiente" @click="step(1)">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </template>
            <button type="button" :class="iconButton" aria-label="Cerrar" @click="dialog.close()">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </template>
    </dialog>
  </section>
</template>
