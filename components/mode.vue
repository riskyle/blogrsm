<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();

const setColorMode = () => {
  if (colorMode.value === "dark") {
    colorMode.value = "light";
  } else {
    colorMode.value = "dark";
  }
};
</script>

<template>
  <Button
    class="cursor-pointer border-0 bg-inherit"
    variant="outline"
    @click="setColorMode"
  >
    <Icon
      icon="radix-icons:moon"
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <Icon
      icon="radix-icons:sun"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
