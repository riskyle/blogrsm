import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event: any) => {
    const user = await serverSupabaseUser(event);

    if (!user) {
        throw createError({
            status: 500,
            statusText: 'Auth missing'
        })
    }

    const client = await serverSupabaseClient(event);

    const data = client
        .from('profiles')
        .select('is_anon')
        .eq('id', user.id)
        .single();

    return data;
});