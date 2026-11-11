<script setup>
import { profile } from '../data/profile'

const links = [
  { href: profile.github, label: 'GitHub', icon: 'github' },
  { href: profile.email && `mailto:${profile.email}`, label: 'Correo', icon: 'mail' },
  { href: profile.cv, label: 'Descargar CV', icon: 'download', download: true },
].filter((link) => link.href)
</script>

<template>
  <ul class="flex flex-wrap gap-3">
    <li v-for="(link, index) in links" :key="link.label">
      <a
        :href="link.href"
        :download="link.download || undefined"
        :class="[
          'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition',
          index === 0
            ? 'bg-accent text-bg shadow-lg shadow-accent/25 hover:-translate-y-0.5 hover:shadow-accent/40'
            : 'border border-line bg-surface/60 hover:border-accent/50',
        ]"
      >
        <svg v-if="link.icon === 'github'" class="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        <svg v-else-if="link.icon === 'mail'" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <svg v-else class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        {{ link.label }}
      </a>
    </li>
  </ul>
</template>
