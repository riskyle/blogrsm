import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const slug: any = getRouterParam(event, 'slug');

    const body: any = await readBody(event);

    const supabase = await serverSupabaseClient(event);

    const { error } = await supabase
        .from('blogs')
        .update(body)
        .eq('slug', slug);

    if (error) {
        return { message: 'Failed to update blog post', statusCode: 500 };
    }

    return { message: 'Blog post updated successfully', statusCode: 200 };

});