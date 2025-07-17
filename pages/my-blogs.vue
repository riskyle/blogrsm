<script setup>
import { onMounted, ref } from "vue";

definePageMeta({
  title: "My Blogs",
  meta: [
    {
      name: "description",
      content: "Welcome to my blog, where I share my thoughts and ideas.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});

const blogs = ref([]);
const supabase = useSupabaseClient();

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*, profiles(name)")
      .eq("user_id", useSupabaseUser().value?.id)
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
  <div class="blog-header">
    <h1>My Blog Post</h1>
  </div>
  <blog-post :blogs="blogs" />
</template>

<style scoped>
.blog-header {
  margin-left: 40px;
  margin-bottom: 0px;
}

@media (max-width: 600px) {
  .blog-header {
    font-size: 0.8em;
  }
}
</style>
