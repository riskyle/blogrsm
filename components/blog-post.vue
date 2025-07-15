<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ConfirmDialog from "~/components/confirm-dialog.vue";

dayjs.extend(relativeTime);

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const toast = useNuxtApp().$toast;

const blogId = ref(null);
const blogs = ref([]);
const showConfirm = ref(false);
const message = ref("Are you sure you want to delete this item?");

const dateTimeFormat = (date) => {
  return dayjs(date).fromNow();
};

const getBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("blogs_with_users")
      .select("*")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    blogs.value = data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
};

const confirmDelete = async () => {
  showConfirm.value = false;
  blogs.value = blogs.value.filter((blog) => blog.id !== blogId.value);
  toast.success("Blog post deleted successfully!");
  await supabase.from("blogs").delete().eq("id", blogId.value);
};

const cancelDelete = () => {
  showConfirm.value = false;
};

const uSureToDelete = async (id, title) => {
  blogId.value = id;
  message.value = `Are you sure you want to delete this ${title} blog?`;
  showConfirm.value = true;
};

const isAuthor = (authorId) => {
  return user.value && user.value.id === authorId;
};

onMounted(async () => {
  await getBlogPosts();
});
</script>

<template>
  <main>
    <div class="container">
      <div class="content">
        <div class="blog-posts" v-for="blog in blogs" :key="blog.id">
          <div class="post-header">
            <div class="post-author">
              <div class="post-author-name">
                {{ blog.name }}
              </div>
              &middot;
              <div class="post-author-date">
                Posted {{ dateTimeFormat(blog.created_at) }}
              </div>
            </div>
            <div class="post-actions">
              <button
                class="read-more"
                @click="navigateTo(`/blog/${blog.slug}`)"
              >
                Read More
              </button>
              <button
                class="edit"
                @click="navigateTo(`/blog/edit/${blog.slug}`)"
                v-if="isAuthor(blog.user_id)"
              >
                Edit
              </button>
              <button
                class="delete"
                @click="uSureToDelete(blog.id, blog.title)"
                v-if="isAuthor(blog.user_id)"
              >
                Delete
              </button>
            </div>
          </div>
          <div class="post-content">
            <p class="post-title">
              {{ blog.title }}
            </p>
            <div class="post-description" v-html="blog.content"></div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <ConfirmDialog
    v-if="showConfirm"
    :visible="showConfirm"
    :message="message"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 20px;
  padding-left: 50px;
}

.blog-posts {
  width: 800px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-author {
  display: flex;
  gap: 10px;
}

.post-title {
  font-size: 1.5em;
  font-weight: bold;
  max-width: 700px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0;
}

.post-description {
  color: #666;
  max-width: 900px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.read-more,
.edit,
.delete {
  background-color: #ff4b2b;
  color: white;
  border: none;
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
}

/* edit modal */
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

.post-button:hover {
  background-color: #0056b3;
}

.update-form {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

#title {
  width: 400px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 25px;
  max-width: 100%;
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
</style>
