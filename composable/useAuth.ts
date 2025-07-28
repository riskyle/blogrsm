import type { AuthCredentials } from "~/types/useAuth";

export const useAuth = () => {
    const supabase = useSupabaseClient();

    const register = async (credentials: AuthCredentials) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: credentials.email || '',
                password: credentials.password || '',
                options: {
                    emailRedirectTo: `${window.location.origin}/confirm-email`,
                    data: {
                        name: credentials.name,
                    },
                }
            });

            if (error) {
                throw error;
            }

            return { data, error };
        } catch (error: any) {
            console.error("Error signing up:", error);
            return { error }
        }
    }

    const signInWithPassword = async (credentials: AuthCredentials) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email || '',
                password: credentials.password || '',
            });

            return { data, error };
        } catch (error: any) {
            console.error("Error signing in:", error);
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
            navigateTo('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    const verifyOtp = async (token_hash: string, type: any) => {
        try {
            const { data, error } = await supabase.auth.verifyOtp({
                token_hash,
                type
            });

            if (error) {
                throw error;
            }

            return { data, error };
        } catch (error) {
            console.error("Error verifying OTP:", error);
            return { error };
        }
    }

    const loginWithGoogle = async () => {
        try {

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error("Error logging in with Google:", error);
            return { error: error as Error };
        }

    }

    const loginWithFacebook = async () => {
        try {

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error("Error logging in with Facebook:", error);
            return { error: error as Error };
        }

    }


    const deleteSelf = async () => {
        try {
            // const { error } = await supabase.auth.admin.deleteUser()
            // if (error) throw error

            // Redirect to login or home page
            await navigateTo('/login')
            return { success: true }
        } catch (error: any) {
            console.error('Error deleting user:', error)
            return { success: false, error: error.message }
        }
    }

    const getLoginMethod = () => {
        const user = useSupabaseUser();
        if (!user.value || !user.value.app_metadata) {
            return null;
        }

        const provider = user.value.app_metadata?.provider
        return provider === 'email' ? 'email' : provider
    }

    return {
        register,
        signInWithPassword,
        signOut,
        verifyOtp,
        loginWithGoogle,
        loginWithFacebook,
        deleteSelf,
        getLoginMethod,
    }
}