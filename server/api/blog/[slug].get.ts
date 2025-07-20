import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const slug: any = getRouterParam(event, 'slug');

    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
        .from("blogs")
        .select("*, profiles(name)")
        .eq("slug", slug)
        .single();


    if (error) {
        console.error("Error fetching blog post:", error);
        return;
    }

    return data;
})