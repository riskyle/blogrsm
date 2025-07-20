<script lang="tsx" setup>
import defaultImg from "../assets/img/default.jpg";
import { useSidebar } from "~/composable/useSidebar";
import type { User } from "~/types/sidebar";
import { ref, onMounted } from "vue";

const { isCollapsed, collapseSidebar } = useSidebar();

const toast: any = useNuxtApp().$toast;
const supabaseUser = useSupabaseUser();

const user = ref<User | null>(null);
const trigger = ref(window?.innerWidth <= 425);

const comingSoon = () => {
  toast.info("This feature is coming soon!");
};

onMounted(async () => {
  const data = await supabaseUser.value;

  if (!data) {
    console.error("Error fetching user: User not found.");
  } else {
    user.value = data.user_metadata as any;
  }
});

watch(
  () => supabaseUser.value,
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
  <div
    class="sidebar"
    :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]"
  >
    <NuxtLink to="/profile" @click="trigger ? collapseSidebar() : null">
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
    <NuxtLink to="/" @click="trigger ? collapseSidebar() : null">
      <div class="sidebar-navbar">
        <div class="sidebar-icon">
          <img class="icon" src="../assets/icons/home-icon.svg" alt="" />
        </div>
        <div class="sidebar-item">Home</div>
      </div>
    </NuxtLink>
    <NuxtLink to="/my-blogs" @click="trigger ? collapseSidebar() : null">
      <div class="sidebar-navbar">
        <div class="sidebar-icon">
          <img class="icon" src="../assets/icons/blog-icon.svg" alt="" />
        </div>
        <div class="sidebar-item">My Blogs</div>
      </div>
    </NuxtLink>
    <NuxtLink to="/blog/create" @click="trigger ? collapseSidebar() : null">
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
          <img class="icon" src="../assets/icons/list-check-icon.svg" alt="" />
        </div>
        <div class="sidebar-item">Todo List</div>
      </div>
    </NuxtLink>
    <NuxtLink to="/chat" @click="trigger ? collapseSidebar() : null">
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
</template>

<style scoped>
.router-link-active {
  color: #f6f5f7;
  background-color: #d8b02e;
}

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

.user-name {
  text-transform: capitalize;
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

@media (max-width: 500px) {
  .sidebar {
    width: 48px;
  }

  .sidebar-collapsed {
    width: 100%;

    .sidebar-item {
      display: block;
    }
  }

  .icon {
    width: 20px;
  }

  .profile-img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    vertical-align: middle;
  }
}

@media (min-width: 500px) {
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

.user-name {
  font-weight: bold;
  text-overflow: ellipsis;
}
</style>
