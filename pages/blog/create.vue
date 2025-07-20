<script setup>
definePageMeta({
  title: "Create Blog Post",
  meta: [
    {
      name: "description",
      content: "Create a new blog post with our easy-to-use editor.",
    },
  ],
  layout: "auth-layout",
});

const toast = useNuxtApp().$toast;

const submitPost = async (title, content) => {
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

  const { message, statusCode } = await $fetch("/api/blog", {
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
