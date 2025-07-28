import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);

    if (!user) {
        throw createError({
            status: 500,
            statusText: 'Auth missing'
        })
    }

    const body = await readBody(event)

    const client = await serverSupabaseClient(event);

    const data = client
        .from('profiles')
        .update({ is_anon: body.is_anon })
        .eq('id', user.id)
        .select()

    return data
});