import { serverSupabaseClient } from "#supabase/server";
import type { BlogInterface } from "~/types/blog";

export default defineEventHandler(async (event) => {
    const slug: any = getRouterParam(event, 'slug');

    const supabase = await serverSupabaseClient(event);

    const { data, error }: { data: BlogInterface | null, error: any } = await supabase
        .from("blogs")
        .select("*, profiles(name, is_anon)")
        .eq("slug", slug)
        .single();


    if (error) {
        console.error("Error fetching blog post:", error);
        return;
    }

    return data?.profiles.is_anon == true ? {
        user_id: data?.user_id,
        title: data?.title,
        content: data?.content,
        created_at: data?.created_at,
        id: data?.id,
        slug: data?.slug,
        profiles: { is_anon: data?.profiles.is_anon }
    } : data;
})