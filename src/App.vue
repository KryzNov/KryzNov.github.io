<script setup>
import ContactLinks from './components/ContactLinks.vue'
import ScreenshotGallery from './components/ScreenshotGallery.vue'
import ProjectCard from './components/ProjectCard.vue'
import SiteHeader from './components/SiteHeader.vue'
import { heroStack, profile, projects, skills } from './data/profile'

const year = new Date().getFullYear()
const [firstName, ...lastNames] = profile.name.split(' ')

const nav = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#sobre-mi', label: 'Sobre mí' },
]

const kw = 'text-accent-2'
const str = 'text-accent'
const punct = 'text-muted'
const key = 'text-ink'
const codeLines = [
  [{ t: 'const ', c: kw }, { t: 'dev', c: key }, { t: ' = {', c: punct }],
  [{ t: '  nombre', c: key }, { t: ': ', c: punct }, { t: `'${profile.name}'`, c: str }, { t: ',', c: punct }],
  ...Object.entries(heroStack).map(([name, items]) => [
    { t: `  ${name}`, c: key },
    { t: ': [', c: punct },
    ...items.flatMap((item, i) => [
      { t: `'${item}'`, c: str },
      ...(i < items.length - 1 ? [{ t: ', ', c: punct }] : []),
    ]),
    { t: '],', c: punct },
  ]),
  [{ t: '}', c: punct }],
]

const eyebrow = 'font-mono text-xs text-accent'
const sectionTitle = 'mt-2 text-3xl font-semibold tracking-tight sm:text-4xl'
</script>

<template>
  <a
    href="#contenido"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
  >
    Saltar al contenido
  </a>

  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div class="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"></div>
    <div class="aurora absolute -top-48 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"></div>
    <div class="aurora absolute -right-40 -top-24 h-[22rem] w-[28rem] rounded-full bg-accent-2/15 blur-3xl [animation-delay:-9s]"></div>
  </div>

  <div aria-hidden="true" class="scroll-progress fixed inset-x-0 top-0 z-50 h-0.5 bg-linear-to-r from-accent to-accent-2"></div>

  <SiteHeader :name="profile.name" :links="nav" />

  <main id="contenido" class="mx-auto max-w-6xl px-4 sm:px-8">
    <section id="inicio" class="grid items-center gap-12 pb-24 pt-14 sm:pt-24 lg:grid-cols-[1.2fr_1fr] lg:pb-32">
      <div>
        <p
          v-reveal
          class="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted backdrop-blur"
        >
          <span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
          {{ profile.role }}
        </p>
        <h1 v-reveal="80" class="mt-6 text-5xl font-semibold leading-[1.02] tracking-tighter sm:text-7xl lg:text-8xl">
          <span class="block">{{ firstName }}</span>
          <span class="block bg-linear-to-r from-accent to-accent-2 bg-clip-text pb-2 text-transparent">
            {{ lastNames.join(' ') }}
          </span>
        </h1>
        <p v-reveal="160" class="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {{ profile.intro }}
        </p>
        <ContactLinks v-reveal="240" class="mt-8" />
      </div>

      <div v-reveal="320" class="relative">
        <div
          aria-hidden="true"
          class="absolute -inset-px rounded-2xl bg-linear-to-br from-accent/50 via-transparent to-accent-2/50"
        ></div>
        <figure class="relative overflow-hidden rounded-2xl bg-surface/90 shadow-2xl shadow-accent/10 backdrop-blur">
          <figcaption class="flex items-center gap-2 border-b border-line px-4 py-3">
            <span class="size-2.5 rounded-full bg-line" aria-hidden="true"></span>
            <span class="size-2.5 rounded-full bg-line" aria-hidden="true"></span>
            <span class="size-2.5 rounded-full bg-line" aria-hidden="true"></span>
            <span class="ml-2 font-mono text-xs text-muted">perfil.js</span>
          </figcaption>
          <div class="overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:p-6 sm:text-[13px]">
            <div v-for="(line, i) in codeLines" :key="i" class="whitespace-pre">
              <span v-for="(token, j) in line" :key="j" :class="token.c">{{ token.t }}</span>
              <span
                v-if="i === codeLines.length - 1"
                class="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent motion-reduce:animate-none"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </figure>
      </div>
    </section>

    <section id="proyectos" aria-labelledby="titulo-proyectos" class="pb-28">
      <div v-reveal class="mb-10 flex items-end justify-between gap-4">
        <div>
          <p :class="eyebrow">01 / Proyectos</p>
          <h2 id="titulo-proyectos" :class="sectionTitle">Lo que he construido</h2>
        </div>
        <p class="hidden font-mono text-xs text-muted sm:block">{{ projects.length }} proyectos</p>
      </div>
      <div class="space-y-6">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.name"
          v-reveal
          :project="project"
          :number="index + 1"
        />
      </div>
    </section>

    <ScreenshotGallery />

    <section id="tecnologias" aria-labelledby="titulo-tecnologias" class="pb-28">
      <div v-reveal class="mb-10">
        <p :class="eyebrow">03 / Tecnologías</p>
        <h2 id="titulo-tecnologias" :class="sectionTitle">Con qué trabajo</h2>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(skill, index) in skills"
          :key="skill.group"
          v-reveal="(index % 3) * 80"
          class="rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
        >
          <h3 class="font-medium">{{ skill.group }}</h3>
          <ul class="mt-4 flex flex-wrap gap-1.5">
            <li
              v-for="item in skill.items"
              :key="item"
              class="rounded-md border border-line bg-bg/60 px-2 py-1 font-mono text-xs text-muted"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="sobre-mi" aria-labelledby="titulo-sobre-mi" class="pb-28">
      <div
        v-reveal
        class="relative overflow-hidden rounded-3xl border border-line bg-surface/60 p-8 backdrop-blur-sm sm:p-12"
      >
        <div
          aria-hidden="true"
          class="absolute -right-24 -top-24 size-72 rounded-full bg-accent/15 blur-3xl"
        ></div>
        <div class="relative">
          <p :class="eyebrow">04 / Sobre mí</p>
          <h2 id="titulo-sobre-mi" class="sr-only">Sobre mí</h2>
          <p class="mt-4 max-w-3xl text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {{ profile.about }}
          </p>
          <ContactLinks class="mt-8" />
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-6 font-mono text-xs text-muted sm:px-8">
      <p>© {{ year }} {{ profile.name }}</p>
      <p>Vue · Vite · Tailwind CSS</p>
    </div>
  </footer>
</template>
