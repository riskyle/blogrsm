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
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*, profiles(name)")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    blogs.value = data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
});
</script>

<template>
  <blog-post :blogs="blogs" @deleteBlog="deleteBlog" />
</template>
