<script setup lang="ts">
import type { BlogInterface } from "~/types/blog";
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
import Label from "./ui/label/Label.vue";

const props = defineProps({
  fetch: {
    type: Promise<BlogInterface | undefined>,
    required: false,
  },
  header: {
    type: String,
    default: "Create a New Post",
  },
  button: {
    type: String,
    default: "Post",
  },
});

const title = ref("");
const content = ref("");

const emit = defineEmits(["submit", "cancel"]);

const handleSubmit = () => {
  emit("submit", title.value, content.value);
};

const handleCancel = () => {
  emit("cancel");
  title.value = "";
  content.value = "";
};

const blogPost: BlogInterface | undefined = await props.fetch;

if (blogPost) {
  title.value = blogPost?.title;
  content.value = blogPost?.content;
}
</script>

<template>
  <div class="flex flex-col max-w-2xl mt-10 mx-15 max-md:mx-5">
    <div class="flex flex-col gap-10 mb-5">
      <h1>{{ props.header }}</h1>
      <div class="flex flex-col gap-2">
        <Label>Title</Label>
        <Input id="" v-model:model-value="title" />
      </div>
      <div class="flex flex-col gap-2">
        <Label class="pl-1">Content</Label>
        <tiptap-editor v-model="content" :show-output="false" />
      </div>
    </div>
    <div class="flex justify-end gap-3 mb-10">
      <Button
        class="bg-red-500 cursor-pointer"
        type="button"
        @click="handleCancel"
      >
        Cancel
      </Button>
      <Button class="cursor-pointer" @click="handleSubmit">
        {{ props.button }}
      </Button>
    </div>
  </div>
</template>
