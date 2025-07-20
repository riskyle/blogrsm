<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ConfirmDialog from "~/components/confirm-dialog.vue";

const props = defineProps({
  blogs: {
    type: Array,
    required: false,
  },
});

dayjs.extend(relativeTime);

const user = useSupabaseUser();
const toast = useNuxtApp().$toast;

const slug = ref(null);
const showConfirm = ref(false);
const message = ref("Are you sure you want to delete this item?");

const openDropdowns = ref({});
const dropdownRefs = ref([]);

const emit = defineEmits(["deleteBlog"]);

const dateTimeFormat = (date) => {
  return dayjs(date).fromNow();
};

const confirmDelete = async () => {
  showConfirm.value = false;
  emit("deleteBlog", slug.value);
  toast.success("Blog post deleted successfully!");
};

const cancelDelete = () => {
  showConfirm.value = false;
};

const uSureToDelete = async (_slug, title) => {
  slug.value = _slug;
  message.value = `Are you sure you want to delete this ${title} blog?`;
  showConfirm.value = true;
};

const isAuthor = (authorId) => {
  return user.value && user.value.id === authorId;
};

const toggle = (index) => {
  Object.keys(openDropdowns.value).forEach((key) => {
    if (key != index) openDropdowns.value[key] = false;
  });

  openDropdowns.value[index] = !openDropdowns.value[index];
};

const handleClickOutside = (event) => {
  let clickedInside = false;

  dropdownRefs.value.forEach((ref) => {
    if (ref && ref.contains(event.target)) {
      clickedInside = true;
    }
  });

  if (!clickedInside) {
    openDropdowns.value = {};
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <main>
    <div class="container">
      <div class="content" v-if="props.blogs.length > 0">
        <div
          class="blog-posts"
          v-for="(blog, index) in props.blogs"
          :key="blog.id"
          :ref="(el) => (dropdownRefs[index] = el)"
        >
          <div class="post-header">
            <div class="post-author">
              <div class="post-author-name">
                {{ blog.profiles.name }}
              </div>
              <span class="post-author-separator">&middot;</span>
              <div class="post-author-date">
                Posted {{ dateTimeFormat(blog.created_at) }}
              </div>
            </div>
            <div class="dropdown">
              <div class="dropbtn" @click="toggle(index)">
                <img src="../assets/icons/dots-horizontal-icon.svg" alt="" />
              </div>
              <div v-if="openDropdowns[index]" class="dropdown-content">
                <a @click="navigateTo(`/blog/${blog.slug}`)">Read</a>
                <a
                  @click="navigateTo(`/blog/edit/${blog.slug}`)"
                  v-if="isAuthor(blog.user_id)"
                  >Edit</a
                >
                <a
                  @click="uSureToDelete(blog.id, blog.title)"
                  v-if="isAuthor(blog.user_id)"
                  >Delete</a
                >
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
                @click="uSureToDelete(blog.slug, blog.title)"
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
      <div v-else>
        No blogs available. Create your first blog post! Go to
        <NuxtLink class="create-blog-link" to="/blog/create"
          >Create Blog</NuxtLink
        >
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
.create-blog-link {
  color: #520c00;
  font-weight: bold;
  text-decoration: underline;
}

.post-author {
  display: flex;
  gap: 10px;
}

.post-author-name {
  text-transform: capitalize;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 20px;
}

.blog-posts {
  width: 100%;
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
  margin-bottom: 10px;
}

.post-title {
  font-size: 1.5em;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
}

.post-description {
  color: #666;
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

@media (max-width: 426px) {
  .container {
    padding: 15px 5px 15px 20px;
  }

  .post-header {
    margin-bottom: 5px;
  }

  .post-title {
    font-size: 1em;
  }

  .post-description {
    font-size: 0.7em;
  }

  .post-author-name,
  .post-author-separator,
  .post-author-date {
    font-size: 8px;
  }

  .post-author-date {
    max-width: 100px;
  }
}

@media (min-width: 200px) {
  .container {
    padding-left: 35px;
    padding-right: 10px;
  }

  .blog-posts {
    max-width: 900px;
  }
}

@media (max-width: 757px) {
  .post-actions button {
    display: none;
  }

  .dropdown {
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 400px;
  }

  .dropbtn {
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn img {
    width: 20px;
    vertical-align: middle;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 50px;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown .dropdown-content {
    display: block;
  }
}

@media (min-width: 756px) {
  .dropbtn,
  .dropdown-content a {
    display: none;
  }
}

@media (max-width: 915px) {
  .post-author-name {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }

  .post-author-date {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 1100px) and (min-width: 500px) {
  .blog-header,
  .container {
    padding-left: 50px;
  }
}
</style>
