<script lang="tsx" setup>
import { useSidebar } from "~/composable/useSidebar";
import { ref, onMounted } from "vue";
import type { User } from "~/types/sidebar";

const { isCollapsed } = useSidebar();

const supabase = useSupabaseClient();
const user = ref<User | null>(null);

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
  } else {
    user.value = data.user.user_metadata as any;
  }
});
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
              :src="user?.avatar_url || '../assets/img/default.jpg'"
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
      <NuxtLink to="/todo/list">
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
