<script setup>
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

const route = useRoute();
const slug = ref(route.params.slug);

const handleUpdateBlog = async (title, content) => {
  if (!title || !content) {
    toast.error("Title and content cannot be empty.");
    return;
  }

  try {
    const { message, statusCode } = await $fetch(`/api/blog/${slug.value}`, {
      method: "PUT",
      body: {
        title,
        content,
        slug: title
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()
          .replace(/^-+|-+$/g, ""),
      },
    });

    if (statusCode !== 200) {
      throw new Error(message || "Failed to update blog post.");
    }

    toast.success("Blog post updated successfully!");
  } catch (error) {
    console.error("Error updating blog post:", error);
    toast.error(error.message || "Failed to update blog post.");
  }
};

const getBlogPost = async () => {
  return await $fetch(`/api/blog/${slug.value}`, {
    headers: useRequestHeaders(["cookie"]),
  });
};
</script>
<template>
  <blog-form
    @submit="handleUpdateBlog"
    :fetch="getBlogPost()"
    header="Update Blog Post"
    button="Update"
  />
</template>
