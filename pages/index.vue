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

const supabase = useSupabaseClient();

const blogs = ref([]);

const deleteBlog = async (id) => {
  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      throw error;
    }
    blogs.value = blogs.value.filter((blog) => blog.id !== id);
  } catch (error) {
    console.error("Error deleting blog post:", error);
  }
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
