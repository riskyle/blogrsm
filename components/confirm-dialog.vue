<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  message: string;
}>();

const emit = defineEmits(["confirm", "cancel"]);

function confirm() {
  emit("confirm");
}
function cancel() {
  emit("cancel");
}
</script>

<template>
  <div v-if="visible" class="dialog">
    <div class="dialog-content">
      <p class="dialog-message">{{ message }}</p>
      <div class="dialog-actions">
        <button
          @click="cancel"
          class="dialog-cancel-button px-3 py-1 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          @click="confirm"
          class="dialog-confirm-button px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.dialog-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  width: 400px;
}

.dialog-message {
  margin-bottom: 30px;
  text-align: center;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.dialog-cancel-button {
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 4px;
}

.dialog-confirm-button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
}

.dialog-cancel-button,
.dialog-confirm-button {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
