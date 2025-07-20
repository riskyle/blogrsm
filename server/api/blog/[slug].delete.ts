import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);
    const slug: any = getRouterParam(event, 'slug');

    const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("slug", slug);

    if (error) {
        console.error("Error deleting blog post:", error);
        throw createError({ statusCode: 500, statusMessage: "Failed to delete blog post." });
    }

    return { message: "Blog post deleted successfully!" };
});
