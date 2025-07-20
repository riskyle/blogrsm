import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (body.message === undefined || body.email === undefined || body.name === undefined || body.user_id === undefined) {
        return createError({
            statusCode: 400,
            statusMessage: 'Bad Request: Missing required fields'
        });
    }

    const supabase = await serverSupabaseClient(event);

    try {
        const { error } = await supabase.from('chats').insert(body);

        if (error) {
            throw error;
        }

    } catch (error: any) {
        console.error(error);
    }
});