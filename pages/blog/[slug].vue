<script setup lang="ts">
definePageMeta({
  title: "Blog Post",
  meta: [
    {
      name: "description",
      content: "Read our latest blog posts and updates.",
    },
  ],
  middleware: "layout",
});

import { onMounted } from "vue";
import type { BlogInterface } from "~/types/blog";

const router = useRouter();

const blogPost = ref<BlogInterface | null | undefined>(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const data = await $fetch(
    `/api/blog/${router.currentRoute.value.params.slug}`,
    {
      headers: useRequestHeaders(["cookie"]),
    }
  );

  blogPost.value = data;
});
loading.value = false;
</script>

<template>
  <div class="max-w-6xl px-10 py-5 max-[768px]:px-3" v-if="blogPost && loading">
    <div class="mb-5">
      <p class="font-bold text-4xl max-[768px]:text-2xl">
        {{ blogPost?.title }}
      </p>
    </div>

    <div class="prose dark:prose-invert" v-html="blogPost?.content"></div>

    <footer>
      <div class="">
        <p class="text-md italic">
          Posted by:
          {{
            blogPost?.profiles?.is_anon === true
              ? "Anonymous"
              : blogPost?.profiles?.name
          }}
        </p>
        <p class="text-sm">
          On: {{ new Date(blogPost?.created_at).toLocaleDateString() }}
        </p>
      </div>
    </footer>
  </div>
  <div v-else class="flex justify-center items-center w-full h-140">
    <img
      src="../../assets/img/logo.png"
      class="w-12 h-12 animate-spin rounded-full"
    />
  </div>
</template>
