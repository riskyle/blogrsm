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

const blogs = ref<BlogInterface[]>([]);
const user = useSupabaseUser();

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

  const data = await $fetch("/api/blogs", { headers });
  blogs.value = data || [];
});
</script>

<template>
  <div
    :class="{ 'items-center': !!user == false }"
    class="flex flex-col gap-1 mx-8 max-[1050px]:mx-10 min-[501px]:max-[769px]:mx-1 max-[500px]:mx-0 my-2"
  >
    <div></div>
    <blog-post :blogs="blogs" @deleteBlog="deleteBlog" />
  </div>
</template>
