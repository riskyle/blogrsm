<script setup lang="ts">
definePageMeta({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login to your account to access exclusive features.",
    },
  ],
  layout: "guest-layout",
  middleware: "auth",
});

import { ref } from "vue";
import { useAuth } from "~/composable/useAuth";
import { toast } from "vue-sonner";

const { signInWithPassword, loginWithGoogle, loginWithFacebook } = useAuth();

const loading = ref(false);

const signIn = async (email: string, pwd: string) => {
  loading.value = true;
  const { data, error }: any = await signInWithPassword({
    email: email,
    password: pwd,
  });

  loading.value = false;
  if (error) {
    toast.error(error.message || "Failed to sign in. Please try again.");
    return;
  }
  toast.success(`Welcome back, ${data.user.user_metadata.name}!`);
  navigateTo("/");
};

const signInWithGoogle = () => {
  loginWithGoogle()
    .then(() => {
      navigateTo("/");
    })
    .catch((error) => {
      toast.error(error.message || "Failed to sign in with Google.");
    });
};

const signInWithFacebook = () => {
  loginWithFacebook()
    .then(() => {
      navigateTo("/");
    })
    .catch((error) => {
      toast.error(error.message || "Failed to sign in with Facebook.");
    });
};
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
  >
    <div class="flex w-full max-w-sm flex-col gap-6">
      <nuxt-link to="/" class="flex items-center flex-col gap-6">
        <h1 class="text-2xl font-bold">Blochatod</h1>
      </nuxt-link>
      <login-form
        @sign-in-with-facebook="signInWithFacebook"
        @sign-in-with-google="signInWithGoogle"
        @sign-in="signIn"
        :loading="loading"
      />
    </div>
  </div>
</template>
