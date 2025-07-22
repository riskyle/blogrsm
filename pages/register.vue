<script setup>
definePageMeta({
  title: "Register",
  meta: [
    {
      name: "description",
      content: "Create a new account to access exclusive features.",
    },
  ],
  middleware: "auth",
});

import { useAuth } from "~/composable/useAuth";
import { toast } from "vue-sonner";

const { register, loginWithGoogle, loginWithFacebook } = useAuth();

const loading = ref(false);

const signUp = async (name, email, pwd, confirmPwd) => {
  if (!name || !email || !pwd || !confirmPwd) {
    toast.error("All fields are required.");
    return;
  }

  if (pwd !== confirmPwd) {
    toast.error("Passwords do not match.");
    return;
  }

  loading.value = true;

  const { error } = await register({
    name: name,
    email: email,
    password: pwd,
  });

  if (error) {
    loading.value = false;
    toast.error(error.message || "Failed to create account.");
    return;
  }

  loading.value = false;

  toast("Account created successfully!", {
    description: "Please check your email to confirm your account.",
    duration: 5000,
  });
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
      <register-form
        @sign-in-with-facebook="signInWithFacebook"
        @sign-in-with-google="signInWithGoogle"
        @sign-up="signUp"
        :loading="loading"
      />
    </div>
  </div>
</template>
