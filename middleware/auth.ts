export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    const publicPages = ['/login', '/register', '/confirm-email'];
    const isPublicPage = publicPages.includes(to.path);
    const isAuthenticated = !!user.value;

    if (!isPublicPage && !isAuthenticated) {
        return navigateTo('/login');
    }

    if (isPublicPage && user.value) {
        return navigateTo('/');
    }
})