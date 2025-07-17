<template>
  <Navbar />
  <Sidebar />
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding-top: 72px;
  margin-left: 250px;
}
</style>
