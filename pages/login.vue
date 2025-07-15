<script setup>
definePageMeta({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login to your account to access exclusive features.",
    },
  ],
  middleware: "auth",
});

import { ref } from "vue";
import { BsFacebook, BsGoogle, BsGithub } from "vue-icons-plus/bs";
import { useAuth } from "~/composable/useAuth";

const { signInWithPassword, loginWithGoogle, loginWithFacebook } = useAuth();

const toast = useNuxtApp().$toast;
const email = ref("");
const pwd = ref("");
const loading = ref(false);

const signIn = async () => {
  loading.value = true;

  const { data, error } = await signInWithPassword({
    email: email.value,
    password: pwd.value,
  });

  loading.value = false;

  email.value = "";
  pwd.value = "";

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
  <div class="login-container">
    <form @submit.prevent="signIn">
      <h1>Sign in</h1>
      <div class="social-container">
        <a href="#" @click="signInWithFacebook" class="social"
          ><i class="facebook-icon"><BsFacebook /></i
        ></a>
        <a href="#" @click="signInWithGoogle" class="social">
          <i class="google-icon"><BsGoogle /></i>
        </a>
        <a href="#" class="social"
          ><i class="github-icon"><BsGithub /></i
        ></a>
      </div>
      <span>or use your account</span>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="pwd" />
      <a href="#">Forgot your password?</a>
      <button type="submit" :disabled="loading">
        {{ loading ? "Signing In..." : "Sign In" }}
      </button>
      <p href="#">
        Don't have an account? <NuxtLink to="/register">Sign up</NuxtLink>
      </p>
    </form>
  </div>
  <Toast />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

.login-container {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  margin: 15px 0;
}

a:hover {
  text-decoration: none;
  color: blue;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 70vh;
  width: 500px;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 600px;
  max-width: 100%;
  min-height: 480px;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container .sign-in-container {
  transform: translateX(100%);
}

.container .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social {
  display: inline-block;
}
</style>
