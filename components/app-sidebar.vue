<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import {
  Group,
  Newspaper,
  Blocks,
  MessageCircle,
  BadgePlus,
} from "lucide-vue-next";
import NavMain from "~/components/nav-main.vue";
import NavUser from "~/components/nav-user.vue";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import type { User } from "~/types/sidebar";
import { ref, onMounted } from "vue";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const { state } = useSidebar();

const supabaseUser = useSupabaseUser();

const user = ref<User | null>(null);

onMounted(async () => {
  const data = await supabaseUser.value;

  if (!data) {
    console.error("Error fetching user: User not found.");
  } else {
    user.value = data.user_metadata as any;
  }
});

watch(
  () => supabaseUser.value,
  (newUser) => {
    if (newUser) {
      user.value = newUser.user_metadata as User;
    } else {
      user.value = null;
    }
  },
  { immediate: true }
);

const data = {
  user: {
    name: user.value?.name || "",
    email: user.value?.email || "",
    avatar: user.value?.avatar_url || "",
  },
  navs: [
    {
      name: "Home",
      url: "/",
      icon: Blocks,
    },
    {
      name: "New Blog",
      url: "/blog/create",
      icon: BadgePlus,
    },
    {
      name: "Chat",
      url: "/chat",
      icon: MessageCircle,
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <header
        data-slot="sidebar-header"
        data-sidebar="header"
        class="flex h-12 shrink-0 items-center transition-[width,height] ease-linear group-data-[collapsible=icon]/sidebar-wrapper:h-6"
      >
        <div v-if="state === 'collapsed'" class="group">
          <img
            class="h-8 w-8 rounded-full group-hover:hidden"
            src="../assets/img/logo.png"
            alt=""
          />
          <SidebarTrigger
            v-if="state === 'collapsed'"
            class="hidden group-hover:block items-center ml-2 cursor-e-resize"
          />
        </div>

        <div
          v-if="state === 'expanded'"
          class="flex items-center justify-between px-0 w-full"
        >
          <img
            v-if="state === 'expanded'"
            class="h-8 w-8 rounded-full"
            src="../assets/img/logo.png"
            alt=""
          />
          <SidebarTrigger
            v-if="state === 'expanded'"
            class="-ml-1 cursor-e-resize"
          />
        </div>
      </header>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :navs="data.navs" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
