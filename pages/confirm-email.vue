<script setup>
import { ref } from "vue";

const loading = ref(false);
const confirm = ref(false);
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="container">
    <div class="confirm-content">
      <div class="confirming">
        <p>Confirming your email...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.confirming {
  text-align: center;
  font-size: 18px;
}
</style>
