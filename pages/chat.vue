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

const fetchMessages = async () => {
  try {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      throw error;
    }

    if (data) {
      messages.value = data;
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    return;
  }

  const id = user.value?.id;
  const email = user.value?.email;
  const name = user.value?.user_metadata?.name;

  try {
    const { error } = await supabase.from("chats").insert([
      {
        message: newMessage.value,
        user_id: id,
        email: email,
        name: name,
      },
    ]);

    if (error) {
      throw error;
    }

    newMessage.value = "";
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(
  messages,
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true }
);

onMounted(async () => {
  await fetchMessages();
  scrollToBottom();

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
  <div class="chat-container">
    <div ref="messagesContainer" class="messages-list">
      <div v-for="message in messages" :key="message.id" class="message">
        <span>User:</span> {{ message.message }}
      </div>
    </div>
    <div class="input-area">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button class="send-button" @click="sendMessage">
        <img class="send-icon" src="../assets/icons/send-icon.svg" alt="Send" />
      </button>
    </div>
  </div>
</template>

<style scoped>
span {
  font-weight: bold;
}

.chat-container {
  max-width: 1285px;
  margin: 0 auto;
  padding-top: 10px;
  padding-left: 10px;
  display: flex;
  height: 81vh;
  flex-direction: column;
  justify-content: end;
}

.messages-list {
  overflow-y: auto;
  padding: 0px;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  padding-left: 20px;
  border-radius: 4px;
}

.input-area {
  padding: 12px;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1275px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.send-icon {
  width: 40px;
  cursor: pointer;
}

.send-button {
  background-color: transparent;
  border: none;
  border-radius: 4px;
  padding: 2px 13px;
  cursor: pointer;
}

input {
  width: 100%;
  max-width: 1200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
