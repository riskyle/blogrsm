<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "BloChaTod - A Blog Application with Todo and Chat Features";
const description =
  "A blog application that mixed with todo and chat features.";
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>
