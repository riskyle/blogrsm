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

const blogs = ref([]);

const deleteBlog = async (slug) => {
  await $fetch(`/api/blog/${slug}`, {
    method: "DELETE",
    headers: useRequestHeaders(["cookie"]),
  });

  blogs.value = blogs.value.filter((blog) => blog.slug !== slug);
};

onMounted(async () => {
  const headers = useRequestHeaders(["cookie"]);

  const data = await $fetch("/api/blogs", { headers });

  blogs.value = data || [];
});
</script>

<template>
  <blog-post :blogs="blogs" @deleteBlog="deleteBlog" />
</template>
