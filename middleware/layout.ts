export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();

    if (user.value) {
        setPageLayout("auth-layout")
    } else {
        setPageLayout("guest-layout")
    }
})