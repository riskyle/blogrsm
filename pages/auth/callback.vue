<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();

onMounted(async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (data.session) {
      await router.push("/");
    } else {
      await router.push("/login");
    }
  } catch (error) {
    console.error("Auth callback error:", error);
    await router.push("/login");
  }
});
</script>

<template>
  <div>
    <p>Processing authentication...</p>
  </div>
</template>
