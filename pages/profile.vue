<script setup>
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
import { ref, onMounted } from "vue";
import { useUserUpdate } from "~/composable/useUserUpdate";
import { useAuth } from "~/composable/useAuth";
import defaultImg from "~/assets/img/default.jpg";
import { toast } from "vue-sonner";
import Label from "~/components/ui/label/Label.vue";
import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";

const { updateUserInfo, updateUserPassword } = useUserUpdate();
const { deleteSelf, getLoginMethod } = useAuth();

const user = useSupabaseUser();

const name = ref(user.value.user_metadata.name || "");
const avatar = ref(user.value.user_metadata.avatar_url || defaultImg);
const email = ref(user.value.email || "");
const method = ref(getLoginMethod());

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const updateInfo = async () => {
  await updateUserInfo({
    full_name: name.value,
    email: email.value,
    avatar_url: avatar.value,
  });
  toast.success("Profile updated successfully!");
};

const deleteAccount = async () => {
  await deleteSelf();
};

const changePassword = async () => {
  await updateUserPassword({
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  });
};
</script>

<template>
  <div class="flex flex-col p-10 max-md:p-5 gap-7">
    <div>
      <p class="font-bold text-3xl mb-3">User Profile</p>
      <p class="font-thin text-sm">{{ userData?.bio || "No Bio Available" }}</p>
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
        <form @submit.prevent="">
          <div class="flex flex-col gap-5">
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
              <Button class="cursor-pointer" type="submit">Save</Button>
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
          <Button class="cursor-pointer" type="submit" variant="destructive"
            >Delete</Button
          >
        </div>
      </card-content>
    </card>
  </div>
</template>
