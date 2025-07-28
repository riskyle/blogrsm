<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { BlogInterface } from "~/types/blog";

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

const blogs = ref<BlogInterface[]>([]);

onMounted(async () => {
  const data = await $fetch(`/api/blogs/${useSupabaseUser().value?.id}`, {
    headers: useRequestHeaders(["cookie"]),
  });

  blogs.value = data || [];
});
</script>

<template>
  <div class="blog-header">
    <h1>My Blog Post</h1>
  </div>
  <blog-post :blogs="blogs" />
</template>

<style scoped>
.blog-header {
  margin-left: 40px;
  margin-bottom: 0px;
}

@media (max-width: 600px) {
  .blog-header {
    font-size: 0.8em;
  }
}
</style>
