<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "Blog - Nuxt + Supabase Todo App";
const description =
  "A simple blog application built with Nuxt 3 and Supabase, featuring user authentication, CRUD operations, and a responsive design.";

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>
