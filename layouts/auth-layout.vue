<template>
  <Navbar />
  <Sidebar />
  <div class="main-container">
    <slot />
  </div>
</template>

<style scoped>
.main-container {
  padding-top: 72px;
  margin-left: 250px;
}

@media (max-width: 1100px) {
  .main-container {
    margin-left: 40px;
  }
}
</style>
