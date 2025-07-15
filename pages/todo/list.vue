<script setup>
definePageMeta({
  title: "Todo List",
  meta: [
    {
      name: "description",
      content: "Manage your tasks efficiently with our Todo List.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});
</script>

<template>
  <h1>Your Todo List</h1>
  <p>Manage your tasks efficiently.</p>
  <!-- Todo list content goes here -->
</template>

<style scope></style>
