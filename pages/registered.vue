<script setup>
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (!!user.value == false) {
      return navigateTo("/login");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
  >
    <div class="flex flex-col w-full max-w-sm gap-6">
      <card>
        <card-header class="flex justify-center">
          <img class="h-16 w-16" src="../assets/img/check.png" />
        </card-header>
        <card-content>
          <p class="text-center text-md">
            Registered successfully, kindly go to your email for your
            confirmation.
          </p>
        </card-content>
        <card-footer class="flex justify-center">
          <nuxt-link to="/login" class="underline text-sm hover:text-green-500">
            Go to login
          </nuxt-link>
        </card-footer>
      </card>
    </div>
  </div>
</template>
