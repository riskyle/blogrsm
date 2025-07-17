<script setup>
import { useSidebar } from "../composable/useSidebar";
import { useAuth } from "../composable/useAuth";

const { signOut } = useAuth();
const { toggleSidebar } = useSidebar();

const user = useSupabaseUser();
const isLoggedIn = computed(() => !!user.value);
const email = computed(() => user.value?.email);

const logout = async () => {
  await signOut();
  navigateTo("/login");
};
</script>

<template>
  <nav>
    <div class="navbar">
      <div class="logo">
        <img
          v-if="isLoggedIn"
          class="burger-icon"
          src="../assets/icons/burger-icon.svg"
          alt="Banner"
          @click="toggleSidebar"
        />
        <div class="blog-title">BloChaTod</div>
      </div>
      <ul>
        <li class="user-info" v-if="isLoggedIn">
          <strong>Hello,</strong> <i>{{ email }}</i>
        </li>
        <li v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </li>
        <li v-if="!isLoggedIn"><NuxtLink to="/login">Login</NuxtLink></li>
        <li v-if="!isLoggedIn"><NuxtLink to="/register">Register</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

li {
  margin: 0;
}

@media (max-width: 700px) {
  li .user-info {
    display: none;
  }
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: red;
  border-radius: 4px;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.navbar {
  background-color: #f6f5f7;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ccc;
  padding: 3px 15px;
  z-index: 9999;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.blog-title {
  text-shadow: #333;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.burger-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
