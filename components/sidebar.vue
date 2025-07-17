<script lang="tsx" setup>
import defaultImg from "../assets/img/default.jpg";
import { useSidebar } from "~/composable/useSidebar";
import type { User } from "~/types/sidebar";
import { ref, onMounted } from "vue";

const { isCollapsed } = useSidebar();

const supabase = useSupabaseClient();
const user = ref<User | null>(null);

const toast: any = useNuxtApp().$toast;

const comingSoon = () => {
  toast.info("This feature is coming soon!", {
    position: "bottom-right",
    duration: 3000,
  });
};

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
  } else {
    user.value = data.user.user_metadata as any;
  }
});

watch(
  () => useSupabaseUser().value,
  (newUser) => {
    if (newUser) {
      user.value = newUser.user_metadata as User;
    } else {
      user.value = null;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div
      class="sidebar"
      :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]"
    >
      <NuxtLink to="/profile">
        <div class="sidebar-navbar">
          <div>
            <img
              class="profile-img"
              :src="user?.avatar_url || defaultImg"
              alt="pic"
            />
          </div>
          <div class="sidebar-item user-name">
            {{ user?.name || "............." }}
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/">
        <div class="sidebar-navbar">
          <div class="sidebar-icon">
            <img class="icon" src="../assets/icons/home-icon.svg" alt="" />
          </div>
          <div class="sidebar-item">Home</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/my-blogs">
        <div class="sidebar-navbar">
          <div class="sidebar-icon">
            <img class="icon" src="../assets/icons/blog-icon.svg" alt="" />
          </div>
          <div class="sidebar-item">My Blogs</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/blog/create">
        <div class="sidebar-navbar">
          <div class="sidebar-icon">
            <img class="icon" src="../assets/icons/post-sign-icon.svg" alt="" />
          </div>
          <div class="sidebar-item">Post</div>
        </div>
      </NuxtLink>
      <NuxtLink to="#" @click="comingSoon">
        <div class="sidebar-navbar">
          <div class="sidebar-icon">
            <img
              class="icon"
              src="../assets/icons/list-check-icon.svg"
              alt=""
            />
          </div>
          <div class="sidebar-item">Todo List</div>
        </div>
      </NuxtLink>
      <NuxtLink to="#" @click="comingSoon">
        <div class="sidebar-navbar">
          <div class="sidebar-icon">
            <img
              class="icon"
              src="../assets/icons/chat-round-line-icon.svg"
              alt=""
            />
          </div>
          <div class="sidebar-item">Chat</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px;
  padding-top: 70px;
  background-color: #f6f5f7;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  transition: width 0.3s ease;
}

@media (max-width: 1100px) {
  .sidebar {
    width: 60px;
  }

  .sidebar-item {
    display: none;
  }
}

.sidebar-collapsed {
  width: 60px;

  .sidebar-item {
    display: none;
  }
}

.sidebar-navbar {
  display: flex;
  vertical-align: middle;
  align-items: center;
  padding: 12px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  gap: 12px;
  border-bottom: 2px solid #e0e0e0;
}

.sidebar-navbar:hover {
  background-color: #e0e0e0;
}

.sidebar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.icon {
  width: 25px;
}

.profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  vertical-align: middle;
}

.user-name {
  font-weight: bold;
  text-overflow: ellipsis;
}
</style>
