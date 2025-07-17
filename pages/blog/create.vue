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

const supabase = useSupabaseClient();
const toast = useNuxtApp().$toast;

const submitPost = async (title, content) => {
  const slug = title
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");

  const id = useSupabaseUser().value?.id;

  try {
    const { data, error } = await supabase.from("blogs").insert({
      title: title,
      content: content,
      slug: slug,
      user_id: id,
    });

    if (error) {
      throw error;
    }

    toast.success("Post created successfully!");
    navigateTo(`/`);
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post. Please try again.");
  }
};
</script>
<template>
  <blog-form @submit="submitPost" />
</template>
