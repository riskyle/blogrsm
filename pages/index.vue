<script setup>
definePageMeta({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Welcome to my blog, where I share my thoughts and ideas.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});
</script>

<template>
  <blog-post />
</template>
