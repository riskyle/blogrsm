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

const email = ref<any>("");
const pwd = ref<any>("");

const emit = defineEmits([
  "sign-in-with-facebook",
  "sign-in-with-google",
  "sign-in",
]);

const signInWithFacebook = () => {
  emit("sign-in-with-facebook");
};
const signInWithGoogle = () => {
  emit("sign-in-with-google");
};
const signIn = () => {
  emit("sign-in", email.value, pwd.value);
  email.value = "";
  pwd.value = "";
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
        <form @submit.prevent="signIn">
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
                <Label html-for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  v-model="email"
                  required
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label html-for="password">Password</Label>
                  <a
                    href="#"
                    class="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" v-model="pwd" required />
              </div>
              <Button v-if="!props.loading" type="submit" class="w-full">
                Login
              </Button>
              <Button v-else disabled>
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            </div>
            <div class="text-center text-sm">
              Don't have an account?
              <nuxt-link to="/register" class="underline underline-offset-4">
                Sign up
              </nuxt-link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
