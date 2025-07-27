<script setup lang="ts">
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Separator from "./ui/separator/Separator.vue";
import type { LucideIcon } from "lucide-vue-next";

defineProps<{
  navs: {
    name: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}>();
</script>

<template>
  <SidebarGroup class="pt-3">
    <SidebarMenu>
      <Separator />
      <SidebarMenuItem v-for="nav in navs" :key="nav.name" :tooltip="nav.name">
        <nuxt-link :href="nav.url" class="flex items-center gap-2">
          <SidebarMenuButton class="gap-6 mb-3 cursor-pointer">
            <component :is="nav.icon" />
            <span class="text-sm">{{ nav.name }}</span>
          </SidebarMenuButton>
        </nuxt-link>
        <Separator />
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
