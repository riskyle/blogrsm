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

const route = useRoute();
const supabase = useSupabaseClient();
const toast = useNuxtApp().$toast;
const slug = ref(route.params.slug);

const handleUpdateBlog = async (title, content) => {
  if (!title || !content) {
    toast.error("Title and content cannot be empty.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("blogs")
      .update({
        title: title,
        content: content,
        slug: title
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()
          .replace(/^-+|-+$/g, ""),
      })
      .eq("slug", slug.value);

    if (error) {
      throw error;
    }

    toast.success("Blog post updated successfully!");
  } catch (error) {
    console.error("Error updating blog post:", error);
    toast.error(error.message || "Failed to update blog post.");
  }
};

const getBlogPost = async () => {
  return await supabase
    .from("blogs")
    .select("title, content, user_id")
    .eq("slug", slug.value)
    .single();
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
