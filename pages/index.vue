<script setup lang="ts">
import type { BlogInterface } from "~/types/blog";

definePageMeta({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Welcome to my blog, where I share my thoughts and ideas.",
    },
  ],
  middleware: "auth",
});

const user = useSupabaseUser();

const blogs = ref<BlogInterface[]>([]);
const loading = ref(false);

const deleteBlog = async (slug: string) => {
  await $fetch(`/api/blog/${slug}`, {
    method: "DELETE",
    headers: useRequestHeaders(["cookie"]),
  });

  blogs.value = blogs.value?.filter(
    (blog: BlogInterface) => blog.slug !== slug
  );
};

onMounted(async () => {
  const headers = useRequestHeaders(["cookie"]);
  loading.value = true;
  const data = await $fetch("/api/blogs", { headers });
  blogs.value = data || [];
  loading.value = false;
});
</script>

<template>
  <div
    v-if="!loading"
    :class="{ 'items-center': !!user == false }"
    class="flex flex-col gap-1 mx-8 max-[1050px]:mx-10 min-[501px]:max-[769px]:mx-1 max-[500px]:mx-0 my-2"
  >
    <blog-post :blogs="blogs" @deleteBlog="deleteBlog" />
  </div>
  <div v-if="loading" class="flex justify-center items-center w-full h-140">
    <img
      src="../assets/img/logo.png"
      class="w-12 h-12 animate-spin rounded-full"
    />
  </div>
</template>
