<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Separator from "./ui/separator/Separator.vue";
import { Ellipsis, MessageCircle } from "lucide-vue-next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const props = defineProps({
  blogs: {
    required: false,
    type: Array as () => {
      user_id: string;
      id: string;
      title: string;
      content: string;
      slug: string;
      created_at: Date;
      profiles: {
        name: string;
      };
    }[],
  },
});

dayjs.extend(relativeTime);

const user = useSupabaseUser();

const slug = ref(null);
const showConfirm = ref(false);
const message = ref("Are you sure you want to delete this item?");

const emit = defineEmits(["deleteBlog"]);

const dateTimeFormat = (date: any) => {
  return dayjs(date).fromNow();
};

const confirmDelete = async () => {
  showConfirm.value = false;
  emit("deleteBlog", slug.value);
};

const isAuthor = (authorId: string) => {
  return user.value && user.value.id === authorId;
};

const stripHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};
</script>

<template>
  <main>
    <div v-for="blog in blogs" :key="blog.id">
      <Separator class="max-w-3xl my-0.5" />
      <card
        class="max-[1050px]:max-w-full max-w-3xl py-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 border-0 shadow-white"
      >
        <nuxt-link :to="`blog/${blog.slug}`">
          <card-header class="flex items-center max-[426px]:px-4">
            <p class="text-sm capitalize">{{ blog.profiles.name }}</p>
            <span>&middot; </span>
            <p class="flex-1 text-sm text-muted-foreground">
              {{ dateTimeFormat(blog.created_at) }}
            </p>
            <dropdown-menu class="text-sm">
              <dropdown-menu-trigger class="cursor-pointer">
                <ellipsis class="w-4 h-4" />
              </dropdown-menu-trigger>
              <dropdown-menu-content>
                <dropdown-menu-item class="cursor-pointer"
                  >Read</dropdown-menu-item
                >
                <dropdown-menu-item
                  v-if="isAuthor(blog.user_id)"
                  @click="navigateTo(`/blog/edit/${blog.slug}`)"
                  class="cursor-pointer"
                >
                  Edit
                </dropdown-menu-item>
                <dropdown-menu-item
                  v-if="isAuthor(blog.user_id)"
                  class="cursor-pointer"
                >
                  Delete
                </dropdown-menu-item>
              </dropdown-menu-content>
            </dropdown-menu>
          </card-header>

          <card-content class="mb-2 max-[426px]:px-4">
            <p class="text-xl max-[456px]:text-[16px] font-bold mb-1">
              {{ blog.title }}
            </p>
            <p
              class="text-sm max-[500px]:text-[12px] text-muted-foreground line-clamp-15"
            >
              {{ stripHtml(blog.content) }}
            </p>
          </card-content>
          <card-footer class="flex justify-start max-[426px]:px-4">
            <div
              class="flex items-center justify-center gap-1 bg-amber-500 rounded-2xl px-3 py-2 text-white"
            >
              <MessageCircle :size="16" />
              <span class="text-[13px]">4</span>
            </div>
          </card-footer>
        </nuxt-link>
      </card>
    </div>
    <Separator class="max-w-3xl mt-0.5" />
  </main>
</template>
