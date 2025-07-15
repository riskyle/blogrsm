<script setup>
definePageMeta({
  title: "My Blogs",
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
  <div class="blog-header">
    <h1>My Blog Post</h1>
  </div>
  <blog-post />
</template>

<style scoped>
.blog-header {
  margin-left: 50px;
  margin-top: 40px;
}
</style>
