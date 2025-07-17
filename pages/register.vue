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

import { BsFacebook, BsGoogle, BsGithub } from "vue-icons-plus/bs";
import { useAuth } from "~/composable/useAuth";

const toast = useNuxtApp().$toast;

const { register, loginWithGoogle, loginWithFacebook } = useAuth();

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const contact_number = ref("");
const password = ref("");
const status = ref("");

const signUp = async () => {
  await register({
    name: `${firstname.value} ${lastname.value}`,
    contact_number: contact_number.value,
    email: email.value,
    password: password.value,
  });

  firstname.value = "";
  lastname.value = "";
  contact_number.value = "";
  email.value = "";
  password.value = "";

  toast.success(`Account created successfully! Confirm your email to log in.`);
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
  <div class="container" id="container">
    <form @submit.prevent="signUp">
      <h1>Create Account</h1>
      <div class="social-container">
        <a href="#" @click="signInWithFacebook" class="social"
          ><i class="facebook-icon"><BsFacebook /></i
        ></a>
        <a href="#" @click="signInWithGoogle" class="social"
          ><i class="google-icon"><BsGoogle /></i
        ></a>
        <a href="#" class="social"
          ><i class="github-icon"><BsGithub /></i
        ></a>
      </div>
      <span>or use your email for registration</span>
      <input type="text" placeholder="First Name" v-model="firstname" />
      <input type="text" placeholder="Last Name" v-model="lastname" />
      <input type="email" placeholder="Email" v-model="email" />
      <input
        type="number"
        placeholder="Contact Number"
        v-model="contact_number"
        maxlength="11"
      />
      <input type="password" placeholder="Password" v-model="password" />
      <p class="status">{{ status }}</p>
      <button type="submit">Sign Up</button>
      <p>Have an account already? <NuxtLink to="/login">Sign in</NuxtLink></p>
    </form>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

h1 {
  font-weight: bold;
  margin-top: 50px;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 60px;
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
  margin-top: 10px;
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
  padding-top: 30px;
  height: 660px;
  width: 600px;
  max-height: 707px;
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
  background: #f6f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  min-height: 480px;
  font-family: "Montserrat", sans-serif;
  padding-top: 40px;
}

.container .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
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

.status {
  display: flex;
  justify-content: baseline;
  width: 100%;
  max-width: 700px;
  margin: 0;
  font-size: 12px;
  color: red;
}
</style>
