<script setup>
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

const router = useRouter();

const blogPost = ref(null);

onMounted(async () => {
  const data = await $fetch(
    `/api/blog/${router.currentRoute.value.params.slug}`,
    {
      headers: useRequestHeaders(["cookie"]),
    }
  );

  blogPost.value = data;
});
</script>

<template>
  <div class="max-w-6xl px-10 py-5 max-[768px]:px-3" v-if="blogPost">
    <div class="">
      <p class="font-bold text-3xl max-[768px]:text-2xl">
        {{ blogPost?.title }}
      </p>
    </div>

    <div class="">
      <div
        class="content text-xl max-[768px]:text-sm"
        v-html="blogPost?.content"
      ></div>
    </div>

    <footer>
      <div class="">
        <p>
          Posted by:
          {{
            blogPost?.profiles?.is_anon === true
              ? "Anonymous"
              : blogPost?.profiles?.name
          }}
        </p>
        <p>On: {{ new Date(blogPost?.created_at).toLocaleDateString() }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
h1 {
  font-size: revert;
  font-weight: revert;
}

.content * {
  all: revert;
  font-size: revert;
  font-weight: revert;
  font-family: revert;
  line-height: revert;
  color: inherit;
  background: transparent;
  text-decoration: revert;
  margin: revert;
  padding: revert;
  border: revert;
  list-style: revert;
  vertical-align: revert;
  box-sizing: border-box;
}

.content ol,
.content ul,
.content menu {
  padding-left: revert;
}

.content img,
.content video {
  max-width: 100%;
  height: auto;
  display: block;
}

.content table {
  border-collapse: collapse;
  text-indent: 0;
  border-color: inherit;
}

.content b,
.content strong {
  font-weight: bolder;
}

.content code,
.content kbd,
.content samp {
  font-family: monospace;
  font-size: 1em;
}

.content pre {
  background-color: #0f0f0f;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  overflow-x: auto;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
}

.content small {
  font-size: 80%;
}

.content a {
  color: inherit;
  text-decoration: inherit;
}

.content sub,
.content sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.content sub {
  bottom: -0.25em;
}

.content sup {
  top: -0.5em;
}

.content blockquote {
  all: revert;
  margin: revert;
  padding: revert;
  border: revert;
  font-style: revert;
  quotes: revert;
}
</style>
