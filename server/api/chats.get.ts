import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authentication required'
        })
    }

    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
        .from('chats')
        .select('message, created_at, id')
        .range(0, 20)
        .order('created_at', { ascending: false });

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,

        });
    }

    return data;
});