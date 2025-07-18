<script setup>
import { useSidebar } from "~/composable/useSidebar";

const { isCollapsed } = useSidebar();
</script>

<template>
  <Navbar />
  <Sidebar />
  <div :class="['main-container', { collapsed: isCollapsed }]">
    <slot />
  </div>
</template>

<style scoped>
.main-container {
  padding-top: 72px;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.collapsed {
  margin-left: 60px;
  transition: margin-left 0.3s ease;
}

@media (max-width: 1100px) {
  .main-container {
    margin-left: 40px;
  }
}
</style>
