
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    const publicPages = ['/login', '/register', '/registered', '/confirm-email'];
    const isPublicPage = publicPages.includes(to.path);

    const isAuthenticated = !!user.value;

    if (isAuthenticated) {
        setPageLayout('auth-layout');
    } else {
        setPageLayout('guest-layout');
    }

    if (to.path == '/') {
        return;
    }

    if (!isPublicPage && !isAuthenticated) {
        return navigateTo('/login');
    }
})