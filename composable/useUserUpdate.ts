export const useUserUpdate = () => {
    const client = useSupabaseClient()

    const updateUserInfo = async (userInfo: Record<string, any>) => {
        try {
            const { data, error } = await client.auth.updateUser({
                email: userInfo.email,
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

    const updateUserPassword = async (password: string) => {
        const response = await verifyUserPassword(password);

        // try {
        //     const { data, error } = await client.auth.updateUser({
        //         password
        //     });

        //     if (error) {
        //         throw new Error(`Error updating user password: ${error.message}`)
        //     }

        //     return data
        // } catch (error: any) {
        //     console.error("Error updating user password:", error);
        // }
    };

    const verifyUserPassword = async (password: string) => {
        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: useSupabaseUser().value?.email || '',
                password
            });
        } catch (error: any) {
            console.error("Error verifying user password:", error);
            return { error: error.message };
        }
    }

    return {
        updateUserInfo,
        updateUserPassword,
    }
}