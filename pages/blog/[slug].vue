<script setup>
definePageMeta({
  title: "Blog Post",
  meta: [
    {
      name: "description",
      content: "Read our latest blog posts and updates.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});

import { onMounted } from "vue";

const router = useRouter();

const blogPost = ref(null);

onMounted(async () => {
  const data = await $fetch(
    `/api/blog/${router.currentRoute.value.params.slug}`,
    {
      headers: useRequestHeaders(["cookie"]),
    }
  );

  console.log(data);

  blogPost.value = data;
});
</script>

<template>
  <div class="blog-post" v-if="blogPost">
    <div class="post-header">
      <h1>{{ blogPost?.title }}</h1>
    </div>

    <div class="post-content">
      <div v-html="blogPost?.content"></div>
    </div>

    <footer>
      <div class="post-footer">
        <p>Posted by: {{ blogPost?.profiles?.name }}</p>
        <p>On: {{ new Date(blogPost?.created_at).toLocaleDateString() }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.blog-post {
  max-width: 1290px;
}

.post-header {
  margin-bottom: 40px;
}

.post-content {
  padding-right: 50px;
  padding-bottom: 30px;
  border-radius: 8px;
  font-size: 1.2em;
}

.post-footer {
  font-size: 0.9em;
  color: #666;
}

@media (max-width: 500px) {
  .blog-post {
    padding-left: 35px;
  }

  .post-header {
    margin-bottom: 20px;
    font-size: 12px;
  }

  .post-content {
    padding-right: 5px;
    padding-bottom: 20px;
    font-size: 0.8em;
  }
}

@media (min-width: 500px) {
  .blog-post {
    padding-left: 30px;
    padding-right: 0px;
  }

  .post-header {
    margin-bottom: 20px;
    font-size: 10px;
  }

  .post-content {
    padding-right: 5px;
    padding-bottom: 20px;
    font-size: 0.9em;
  }
}

@media (min-width: 768px) {
  .blog-post {
    padding-left: 35px;
    padding-right: 5px;
  }

  .post-header {
    margin-bottom: 20px;
    font-size: 1em;
  }

  .post-content {
    padding-right: 5px;
    padding-bottom: 10px;
    white-space: wrap;
    font-size: 1.2em;
  }
}

@media (max-width: 1100px) and (min-width: 500px) {
  .blog-post {
    padding-left: 55px;
    padding-right: 5px;
  }
}
</style>
