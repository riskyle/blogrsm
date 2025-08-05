<script lang="ts">
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full";
</script>

<script setup lang="ts">
import AppSidebar from "~/components/app-sidebar.vue";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16"
      >
        <div class="flex flex-row items-center gap-2">
          <SidebarTrigger
            class="pt-1 ml-3 cursor-e-resize min-[1050px]:hidden"
          />
          <p
            class="text-2xl uppercase font-bold max-[426px]:text-xl min-[1050px]:ml-4"
          >
            Bloch
          </p>
        </div>
        <div class="pr-4">
          <mode />
        </div>
      </header>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
