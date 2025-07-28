<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import type { BlogInterface } from "~/types/blog";

const props = defineProps({
  blogs: {
    required: false,
    type: Array as () => BlogInterface[],
  },
});

dayjs.extend(relativeTime);

const user = useSupabaseUser();

const emit = defineEmits(["deleteBlog"]);

const dateTimeFormat = (date: any) => {
  return dayjs(date).fromNow();
};

const confirmDelete = async (slug: string) => {
  emit("deleteBlog", slug);
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
        class="max-[800px]:max-w-2xl max-[700px]:max-w-md max-[600px]:max-w-lg max-[500px]:max-w-md max-[445px]:max-w-sm max-[400px]:max-w-[390px] max-[321px]:max-w-[300px] max-w-3xl py-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 border-0"
      >
        <nuxt-link :to="`blog/${blog.slug}`">
          <card-header class="flex items-center max-[426px]:px-4 px-3">
            <p class="text-sm capitalize">
              {{
                blog.profiles.is_anon == true ? "Anonymous" : blog.profiles.name
              }}
            </p>
            <span>&middot; </span>
            <p class="flex-1 text-sm text-muted-foreground">
              {{ dateTimeFormat(blog.created_at) }}
            </p>
            <dropdown-menu class="text-sm">
              <dropdown-menu-trigger class="cursor-pointer">
                <ellipsis class="w-4 h-4" />
              </dropdown-menu-trigger>
              <dropdown-menu-content>
                <dropdown-menu-item
                  class="cursor-pointer"
                  @click="navigateTo(`/blog/${blog.slug}`)"
                  >Read</dropdown-menu-item
                >
                <dropdown-menu-item
                  v-if="isAuthor(blog.user_id)"
                  @click="navigateTo(`/blog/edit/${blog.slug}`)"
                  class="cursor-pointer"
                >
                  Edit
                </dropdown-menu-item>

                <AlertDialog v-if="isAuthor(blog.user_id)">
                  <AlertDialogTrigger
                    class="pl-2 pr-18 py-1 align-middle text-sm rounded-sm hover:bg-accent focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >Delete</AlertDialogTrigger
                  >
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle
                        >Are you absolutely sure?</AlertDialogTitle
                      >
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel class="cursor-pointer"
                        >Cancel</AlertDialogCancel
                      >
                      <AlertDialogAction
                        @click="confirmDelete(blog.slug)"
                        class="cursor-pointer"
                        >Yes, I wanted to delete it</AlertDialogAction
                      >
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </dropdown-menu-content>
            </dropdown-menu>
          </card-header>

          <card-content class="mb-2 max-[426px]:px-4 px-3">
            <p class="text-xl max-[456px]:text-[16px] font-bold mb-1">
              {{ blog.title }}
            </p>
            <p
              class="text-sm max-[500px]:text-[12px] text-muted-foreground line-clamp-15"
            >
              {{ stripHtml(blog.content) }}
            </p>
          </card-content>
          <!-- <card-footer class="flex justify-start max-[426px]:px-4">
            <div
              class="flex items-center justify-center gap-1 bg-amber-500 rounded-2xl px-3 py-2 text-white"
            >
              <MessageCircle :size="16" />
              <span class="text-[13px]">4</span>
            </div>
          </card-footer> -->
        </nuxt-link>
      </card>
    </div>
    <Separator class="max-w-3xl mt-0.5" />
  </main>
</template>
