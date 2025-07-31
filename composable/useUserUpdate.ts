export const useUserUpdate = () => {
    const client = useSupabaseClient()

    const updateUserInfo = async (userInfo: Record<string, any>) => {
        try {
            const { data, error } = await client.auth.updateUser({
                data: {
                    name: userInfo.full_name,
                    avatar_url: userInfo.avatar_url,
                }
            });

            if (error) {
                throw new Error(`Error updating user: ${error.message}`)
            }

            return data
        } catch (error: any) {
            console.error("Error updating user:", error);
        }
    };

    const updateUserPassword = async (password: { currentPassword: string, confirmPassword: string, newPassword: string }) => {
        const isVerified = await verifyUserPassword(password.currentPassword);

        if (!!isVerified) {
            try {
                const { data, error } = await client.auth.updateUser({
                    password: password.newPassword,
                });

                if (error) {
                    throw new Error(`Error updating user password: ${error.message}`)
                }

                return data
            } catch (error: any) {
                console.error("Error updating user password:", error);
            }
        } else {
            return null;
        }
    };

    const verifyUserPassword = async (password: string) => {
        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: useSupabaseUser().value?.email || '',
                password
            });

            if (error) {
                throw error;
            }

            return data.user
        } catch (error: any) {
            console.error("Error verifying user password:", error);
        }
    }

    return {
        updateUserInfo,
        updateUserPassword,
    }
}