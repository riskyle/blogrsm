<script setup lang="ts">
import { Home } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";
</script>

<template>
  <header
    class="sticky top-0 z-10 bg-gray-100 px-5 border-b border-gray-300 dark:bg-gray-800 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16"
  >
    <div class="flex flex-row items-center">
      <p class="text-2xl uppercase font-bold max-md:hidden">Bloch</p>
    </div>

    <div class="flex gap-3 items-center">
      <nuxt-link to="/">
        <Home
          class="mr-2 max-md:mr-15 hover:bg-gray-500 rounded-4xl cursor-pointer"
          :size="20"
        />
      </nuxt-link>
      <nuxt-link to="/login">
        <Button class="cursor-pointer" variant="ghost"> Log In </Button>
      </nuxt-link>
      <nuxt-link to="register">
        <Button class="cursor-pointer"> Sign Up </Button>
      </nuxt-link>
      <mode />
    </div>
  </header>
  <slot />
</template>
