<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({
  title: "Create Blog Post",
  meta: [
    {
      name: "description",
      content: "Create a new blog post with our easy-to-use editor.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});

const submitPost = async (title: string, content: string) => {
  if (!title || !content || content.length < 8) {
    toast.error("Title and content cannot be empty.");
    return;
  }

  const slug = title
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");

  const id = useSupabaseUser().value?.id;

  const { message, statusCode }: any = await $fetch("/api/blog", {
    method: "POST",
    body: {
      title,
      content,
      slug,
      user_id: id,
    },
  });

  if (statusCode !== 201) {
    toast.error(message);
    return;
  }

  toast.success(message);
  navigateTo(`/`);
};
</script>
<template>
  <blog-form @submit="submitPost" />
</template>
