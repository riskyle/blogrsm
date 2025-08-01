<script setup lang="ts">
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

import type { User } from "@supabase/supabase-js";
import { ref, nextTick, watch } from "vue";
import Input from "~/components/ui/input/Input.vue";

const SCROLL_THRESHOLD = 100;
const SCROLL_DEBOUNCE = 150;

const supabase = useSupabaseClient();
const user: Ref<User | null> = useSupabaseUser();

const messages = ref<any>([]);
const newMessage = ref("");

const messagesContainer = ref<any>(null);
const showScrollButton = ref(false);
const scrollAnchor: any = ref(null);
const unreadCount = ref(0);
const isUserScrolling = ref(false);
const scrollTimeout: any = ref(null);

const isNearBottom = () => {
  if (!messagesContainer.value) return true;

  const container = messagesContainer.value;
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight;
  const clientHeight = container.clientHeight;

  return scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD;
};

const scrollToBottom = (force = false) => {
  if (!messagesContainer.value) return;

  if (force || isNearBottom()) {
    const container = messagesContainer.value;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
    showScrollButton.value = false;
    unreadCount.value = 0;
  }
};

const handleScroll = () => {
  if (!messagesContainer.value) return;

  isUserScrolling.value = true;

  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }

  scrollTimeout.value = setTimeout(() => {
    isUserScrolling.value = false;
  }, SCROLL_DEBOUNCE);

  const nearBottom = isNearBottom();
  showScrollButton.value = !nearBottom;

  if (nearBottom) {
    unreadCount.value = 0;
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    return;
  }

  const id = user?.value?.id;
  const email = user?.value?.email;
  const name = user?.value?.user_metadata.name;

  try {
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

    nextTick(() => {
      scrollToBottom(true);
    });
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

watch(
  messages,
  async (newMessages, oldMessages) => {
    if (!oldMessages?.length || messages.value.length === 1) {
      await nextTick();
      scrollToBottom(true);
    }
  },
  { deep: true }
);

onMounted(async () => {
  const channel = supabase
    .channel("chats")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chats",
      },
      (payload) => {
        const newMsg = payload.new;
        messages.value.push(newMsg);

        nextTick(() => {
          const isOwnMessage = newMsg.user_id === user?.value?.id;

          if (isOwnMessage) {
            scrollToBottom(true);
          } else if (isNearBottom() && !isUserScrolling.value) {
            scrollToBottom(true);
          } else {
            unreadCount.value++;
            showScrollButton.value = true;
          }
        });
      }
    )
    .subscribe();

  onUnmounted(() => {
    supabase.removeChannel(channel);
    if (scrollTimeout.value) {
      clearTimeout(scrollTimeout.value);
    }
  });

  try {
    const chats = await $fetch("/api/chats", {
      headers: useRequestHeaders(["cookie"]),
    });

    messages.value = chats.reverse() || [];

    await nextTick();
    scrollToBottom(true);
  } catch (error) {
    console.error("Failed to load chats:", error);
  }
});

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="flex flex-col h-140 relative border">
    <div
      ref="messagesContainer"
      class="flex-1 w-full pl-1 pr-5 overflow-y-auto pb-0"
      @scroll="handleScroll"
    >
      <div class="flex flex-col space-y-0 py-1">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex flex-col"
        >
          <div class="flex flex-col h-full overflow-x-auto">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      class="relative ml-3 text-sm bg-white dark:bg-gray-600 dark:text-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>{{ message.message }}</div>
                      <div class="text-xs opacity-70 mt-1">
                        {{ formatTime(message.created_at) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref="scrollAnchor" class="scroll-anchor h-1"></div>
      </div>
    </div>

    <Transition name="fade">
      <button
        v-if="showScrollButton"
        @click="scrollToBottom(true)"
        class="fixed bottom-24 right-6 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10"
        aria-label="Scroll to bottom"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 14l5 5 5-5z" />
        </svg>
        <span
          v-if="unreadCount > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ unreadCount > 99 ? "99+" : unreadCount }}
        </span>
      </button>
    </Transition>

    <div
      class="flex items-center w-full max-w-305 gap-5 fixed bottom-0 p-5 bg-white dark:bg-gray-700 h-auto"
    >
      <Input
        class="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl h-10 px- w-full"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer transition-colors duration-200"
        @click="sendMessage"
        :disabled="!newMessage.trim()"
      >
        <NuxtImg
          src="/icons/send-icon.svg"
          width="24"
          height="24"
          alt="Send message"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.scroll-anchor {
  scroll-margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
