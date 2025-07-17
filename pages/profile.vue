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

const { updateUserInfo, updateUserPassword } = useUserUpdate();
const { deleteSelf, getLoginMethod } = useAuth();

const user = useSupabaseUser().value;
const toast = useNuxtApp().$toast;

const name = ref(user?.user_metadata?.name || "");
const avatar = ref(user?.user_metadata?.avatar_url || defaultImg);
const email = ref(user?.user_metadata?.email || "");
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

// watch(
//   () => user.value,
//   (newUser) => {
//     userData.value = newUser || {};
//     console.log("User data updated:", userData.value);
//   }
// );
</script>

<template>
  <div class="profile">
    <h1>User Profile</h1>
    <p>{{ userData?.bio || "No Bio Available" }}</p>
    <div class="profile-container">
      <div class="profile-box">
        <div class="profile-header">
          <img class="profile-img" alt="Profile Picture" :src="avatar" />
          <div class="profile-info">
            <div class="name">{{ name }}</div>
            <div class="email">{{ email }}</div>
          </div>
        </div>
        <form @submit.prevent="updateInfo()">
          <div class="form-group">
            <label for="">Name</label>
            <input
              class="form-input"
              type="text"
              name="name"
              id="name"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input
              class="form-input"
              type="email"
              name="email"
              id="email"
              v-model="email"
            />
          </div>
          <div class="profile-actions">
            <button type="submit" class="save-btn">Save</button>
          </div>
        </form>
      </div>

      <div class="profile-box" v-if="method === 'email'">
        <div class="profile-description">
          <p class="profile-info-title">Update Password</p>
          <p class="profile-info-subtitle">
            Change your password to enhance account security.
          </p>
        </div>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="">Current Password</label>
            <input
              class="form-input"
              type="password"
              name="current-password"
              id="current-password"
              v-model="currentPassword"
            />
          </div>
          <div class="form-group">
            <label for="">New Password</label>
            <input
              class="form-input"
              type="password"
              name="new-password"
              id="new-password"
              v-model="newPassword"
            />
          </div>
          <div class="form-group">
            <label for="">Confirm Password</label>
            <input
              class="form-input"
              type="password"
              name="confirm-password"
              id="confirm-password"
              v-model="confirmPassword"
            />
          </div>
          <div class="profile-actions">
            <button type="submit" class="save-btn">Save</button>
          </div>
        </form>
      </div>

      <div class="profile-box">
        <div class="profile-description">
          <p class="profile-info-title">Delete Account</p>
          <p class="profile-info-subtitle">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <button class="delete-btn" @click="deleteAccount">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  font-size: 15px;
  color: #1a1a1a;
}

.profile {
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 50px;
  padding-left: 20px;
}

@media (max-width: 1100px) {
  .profile {
    padding: 0px 40px;
  }
  .form-input {
    min-width: 250px;
  }
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: start;
  margin-top: 20px;
}

.profile-box {
  width: 100%;
  max-width: 1200px;
  padding: 30px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-img {
  width: 80px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.profile-description {
  margin-bottom: 30px;
}

.profile-info-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}
.profile-info-subtitle {
  font-size: 1em;
  color: #666;
}

.name {
  font-size: 1.5em;
  font-weight: bold;
}

.email {
  color: #666;
}

@media (max-width: 600px) {
  .profile-img {
    width: 60px;
  }

  .name {
    font-size: 1em;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 7px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 50%;
}

.save-btn {
  background-color: #5b5b57;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn,
.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
