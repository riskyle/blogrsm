<script setup>
definePageMeta({
  title: "User Profile",
  meta: [
    {
      name: "description",
      content: "View and edit your profile information.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});
import { ref, onMounted } from "vue";

const user = useSupabaseUser();
const userData = ref(user.value || {});

console.log(userData);
</script>

<template>
  <div>
    <h1>User Profile</h1>
  </div>
</template>

<style scoped></style>
