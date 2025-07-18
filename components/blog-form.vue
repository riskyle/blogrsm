<script setup>
import { button } from "#build/ui";

definePageMeta({
  title: "Create a New Post",
  meta: [
    {
      name: "description",
      content: "Create a new blog post with a title and content.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});

const props = defineProps({
  fetch: {
    type: Promise,
    required: true,
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

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit", title.value, content.value);
};

const handleCancel = () => {
  emit("cancel");
  title.value = "";
  content.value = "";
};

onMounted(async () => {
  const blogPost = await props.fetch;
  if (blogPost) {
    title.value = blogPost.data?.title;
    content.value = blogPost.data?.content;
  }
});
</script>

<template>
  <div class="container">
    <div class="form-container">
      <h1>{{ props.header }}</h1>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <tiptap-editor v-model="content" :show-output="false" />
      </div>
      <div class="button-group">
        <button class="cancel-button" type="button" @click="handleCancel">
          Cancel
        </button>
        <button class="post-button" @click="handleSubmit">
          {{ props.button }}
        </button>
      </div>
    </div>

    <div class="preview">
      <h2>Preview</h2>
      <div class="preview-title">
        <h3>{{ title }}</h3>
      </div>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 1rem;
}

h3 {
  font-size: 30px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

label {
  font-size: 17px;
  color: #333;
}

.container {
  display: flex;
  padding-left: 30px;
}

.form-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 1300px;
  height: 100%;
  max-width: 100%;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
}

.form-group {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 10px;
}

.post-button:hover {
  background-color: #0056b3;
}

.cancel-button:hover {
  background-color: #4b4b4b;
}

#title {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 25px;
  margin-bottom: 30px;
}

#content {
  width: 500px;
  height: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 20px;
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
}

#content:focus,
#title:focus {
  border-color: #007bff;
  outline: none;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding-left: 35px;
  }

  .form-container,
  .preview {
    width: 100%;
    max-width: 800px;
  }

  .form-container {
    padding: 1rem;
  }

  .preview {
    padding-left: 20px;
    margin-top: 2rem;
  }

  .cancel-button {
    padding: 0.7rem 3rem;
    background-color: #939393;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
  }
}

@media (max-width: 500px) {
  .container {
    flex-direction: column;
    padding-left: 25px;
  }

  .post-button {
    align-self: flex-end;
    padding: 0.4rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;
  }

  .post-button,
  .cancel-button {
    padding: 0.7rem 2rem;
    font-size: 10px;
  }

  .preview-title,
  .preview {
    display: none;
  }
}

@media (min-width: 425px) {
  .post-button {
    align-self: flex-end;
    padding: 0.7rem 3rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    font-weight: bold;
  }

  .post-button,
  .cancel-button {
    padding: 0.7rem 2rem;
    font-size: 14px;
  }

  .preview {
    padding-left: 2rem;
    width: 100%;
    height: 100%;
  }

  .preview-title {
    width: 100%;
    max-width: 900px;
    margin-bottom: 1rem;
  }
}
</style>
