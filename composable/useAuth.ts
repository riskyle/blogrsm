import type { AuthCredentials } from "~/types/useAuth";

export const useAuth = () => {
    const supabase = useSupabaseClient();

    const register = async (credentials: AuthCredentials) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: credentials.email,
                password: credentials.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/confirm-email`,
                    data: {
                        name: credentials.name,
                        phone: credentials.contact_number,
                    },
                }
            });

            if (error) {
                throw error;
            }

            return { data, error };
        } catch (error: any) {
            console.error("Error signing up:", error);
            alert(error.message);
        }
    }

    const signInWithPassword = async (credentials: AuthCredentials) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
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

    return {
        register,
        signInWithPassword,
        signOut,
        verifyOtp,
        loginWithGoogle,
        loginWithFacebook,
    }
}