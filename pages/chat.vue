<script setup>
definePageMeta({
  title: "Chat",
  meta: [
    {
      name: "description",
      content: "Chat with others in real-time.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});

import { ref, nextTick, watch } from "vue";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const messages = ref([]);
const newMessage = ref("");
const messagesContainer = ref(null);
const scrollTarget = ref(null);

const scrollToBottom = async () => {
  await nextTick();
  messagesContainer.value?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    return;
  }

  const id = user?.value.id;
  const email = user?.value.email;
  const name = user?.value.user_metadata.name;

  await $fetch("/api/chat", {
    method: "POST",
    body: {
      message: newMessage.value,
      user_id: id,
      email: email,
      name: name,
    },
  });

  newMessage.value = "";
};

// const scrollToBottom = () => {
//   if (messagesContainer.value) {
//     messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
//   }
// };

watch(
  messages,
  async () => {
    scrollToBottom();
  },
  { deep: true }
);

onMounted(async () => {
  const chats = await $fetch("/api/chats", {
    headers: useRequestHeaders(["cookie"]),
  });

  messages.value = chats.reverse() || [];

  await scrollToBottom();

  const channel = await supabase
    .channel("chats")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chats",
      },
      (payload) => {
        messages.value.push(payload.new);
        scrollToBottom();
      }
    )
    .subscribe();

  onUnmounted(() => {
    supabase.removeChannel(channel);
  });
});
</script>

<template>
  <div class="flex flex-col">
    <div ref="messagesContainer" class="h-max w-full pl-5 overflow-y-auto">
      <div class="pb-3" v-for="message in messages" :key="message.id">
        <span>User:</span> {{ message.message }}
      </div>
    </div>

    <div
      class="flex items-center gap-5 sticky bottom-0 border p-5 bg-white dark:bg-gray-700 h-auto"
    >
      <input
        class="w-full bg-gray-400 dark:bg-black rounded-2xl h-10 px-5 align-middle"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button
        class="dark:bg-white rounded-sm p-1 cursor-pointer"
        @click="sendMessage"
      >
        <NuxtImg
          src="/icons/send-icon.svg"
          width="30"
          height="30"
          alt="image"
        />
      </button>
    </div>
  </div>
</template>
