<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "vue-icons-plus/fc";
import { Fa6Facebook } from "vue-icons-plus/fa6";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const name = ref("");
const email = ref("");
const pwd = ref("");
const confirmPwd = ref("");

const emit = defineEmits([
  "sign-in-with-facebook",
  "sign-in-with-google",
  "sign-up",
]);

const signInWithFacebook = () => {
  emit("sign-in-with-facebook");
};

const signInWithGoogle = () => {
  emit("sign-in-with-google");
};

const signUp = () => {
  emit("sign-up", name.value, email.value, pwd.value, confirmPwd.value);
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Welcome back </CardTitle>
        <CardDescription>
          Login with your Facebook or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="signUp">
          <div class="grid gap-6">
            <div class="flex flex-col gap-4">
              <Button
                type="button"
                variant="outline"
                class="w-full cursor-pointer"
                @click="signInWithFacebook"
              >
                <Fa6Facebook />
                Login with Facebook
              </Button>
              <Button
                type="button"
                variant="outline"
                class="w-full cursor-pointer"
                @click="signInWithGoogle"
              >
                <FcGoogle />
                Login with Google
              </Button>
            </div>
            <div
              class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
            >
              <span
                class="relative z-10 bg-background px-2 text-muted-foreground"
              >
                Or continue with
              </span>
            </div>
            <div class="grid gap-6">
              <div class="grid gap-2">
                <Label html-for="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jee Ann"
                  v-model="name"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label html-for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="prettygf@gmail.com"
                  v-model="email"
                  required
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label html-for="password">Password</Label>
                </div>
                <Input id="password" type="password" v-model="pwd" required />
              </div>
              <div class="grid gap-2">
                <Label html-for="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  v-model="confirmPwd"
                  required
                />
              </div>
              <Button
                v-if="!props.loading"
                type="submit"
                class="w-full cursor-pointer"
              >
                Register
              </Button>
              <Button v-if="props.loading" disabled>
                <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            </div>
            <div class="text-center text-sm">
              Don't have an account?
              <nuxt-link to="/login" class="underline underline-offset-4">
                Sign in
              </nuxt-link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
