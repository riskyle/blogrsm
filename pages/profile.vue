<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ref } from "vue";
import { useUserUpdate } from "~/composable/useUserUpdate";
import { useAuth } from "~/composable/useAuth";
import defaultImg from "~/assets/img/default.jpg";
import { toast } from "vue-sonner";
import Label from "~/components/ui/label/Label.vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { User } from "@supabase/supabase-js";

definePageMeta({
  title: "User Profile",
  meta: [
    {
      name: "description",
      content: "View and edit your profile information.",
    },
  ],
  middleware: "auth",
  layout: "auth-layout",
});

const { updateUserInfo, updateUserPassword } = useUserUpdate();
const { deleteSelf, getLoginMethod } = useAuth();

const user: Ref<User | null> = useSupabaseUser();

const name = ref(user.value?.user_metadata.name || "");
const avatar = ref(user.value?.user_metadata.avatar_url || defaultImg);
const email = ref(user.value?.email || "");
const isOpen = ref(false);
const count = ref(3);
const method = ref(getLoginMethod());

const currentPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");

const updateInfo = async () => {
  await updateUserInfo({
    full_name: name.value,
    email: email.value,
    avatar_url: avatar.value,
  });
  toast.success("Profile updated successfully!");
};

const deleteAccount = () => {
  isOpen.value = true;

  const interval = setInterval(async () => {
    count.value -= 1;
    if (count.value <= 0) {
      clearInterval(interval);
      isOpen.value = false;
      await deleteSelf();
    }
  }, 1000);
};

const changePassword = async () => {
  if (!(!!currentPassword && !!newPassword && !!confirmPassword)) {
    toast.error("Empty fields!");
    return;
  }

  if (confirmPassword.value !== newPassword.value) {
    toast.error("Password is not match");
    return;
  }

  const response = await updateUserPassword({
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  });

  if (!response) {
    toast.error("Invalid current password.");
  } else {
    toast.success("Successfully change password");
  }
};
</script>

<template>
  <div class="flex flex-col p-10 max-md:p-5 gap-7">
    <div>
      <p class="font-bold text-3xl mb-3">User Profile</p>
      <p class="font-thin text-sm">No Bio Available</p>
    </div>
    <card>
      <card-header class="flex flex-row items-center">
        <img
          class="rounded-full h-15 w-15"
          alt="Profile Picture"
          :src="avatar"
        />
        <div class="overflow-hidden">
          <div class="text-2xl font-bold">{{ name }}</div>
          <div class="text-sm">{{ email }}</div>
        </div>
      </card-header>
      <card-content>
        <form @submit.prevent="updateInfo()">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <Label for="">Name</Label>
              <Input
                class="w-2/4 max-md:w-full"
                type="text"
                name="name"
                id="name"
                v-model="name"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label for="">Email</Label>
              <Input
                class="w-2/4 max-md:w-full"
                type="email"
                name="email"
                id="email"
                v-model="email"
              />
            </div>
            <div>
              <Button type="submit" class="cursor-pointer">Save</Button>
            </div>
          </div>
        </form>
      </card-content>
    </card>

    <card>
      <card-header class="flex flex-row items-center">
        <div class="overflow-hidden">
          <div class="text-2xl font-bold">Update Password</div>
          <div class="text-sm">
            Update your password regularly like
            <span class="italic">6 months</span> after for security purposes.
          </div>
        </div>
      </card-header>
      <card-content>
        <form @submit.prevent="changePassword">
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <Label for="">Current Password</Label>
              <Input
                class="w-2/4 max-md:w-full"
                type="password"
                name="current-password"
                id="current-password"
                v-model="currentPassword"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label for="">New Password</Label>
              <Input
                class="w-2/4 max-md:w-full"
                type="password"
                name="new-password"
                id="new-password"
                v-model="newPassword"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label for="">Confirm Password</Label>
              <Input
                class="w-2/4 max-md:w-full"
                type="password"
                name="confirm-password"
                id="confirm-password"
                v-model="confirmPassword"
              />
            </div>
            <div>
              <Button
                class="cursor-pointer"
                type="submit"
                :disabled="
                  !(!!currentPassword && !!newPassword && !!confirmPassword)
                "
                >Save</Button
              >
            </div>
          </div>
        </form>
      </card-content>
    </card>

    <card>
      <card-header class="flex flex-row items-center">
        <div class="overflow-hidden">
          <div class="text-2xl font-bold">Delete Account</div>
          <div class="text-sm">
            Delete account means that your account will be forever vanish and
            you can't ever revert it.
          </div>
        </div>
      </card-header>
      <card-content>
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                class="cursor-pointer"
                type="button"
                variant="destructive"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel class="cursor-pointer"
                  >Cancel</AlertDialogCancel
                >
                <AlertDialogAction @click="deleteAccount" class="cursor-pointer"
                  >Yes, I wanted to delete it</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </card-content>
    </card>
  </div>

  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >You are gonna redirect in {{ count }}.</AlertDialogTitle
        >
        <AlertDialogDescription>
          Thank you for everything, bye!
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>
