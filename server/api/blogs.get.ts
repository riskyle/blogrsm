import { serverSupabaseClient } from "#supabase/server";
import type { BlogInterface } from "~/types/blog";

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
        .from("blogs")
        .select("*, profiles(name, is_anon)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching blogs:", error);
        return createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }

    return data?.map((row: BlogInterface) => row.profiles.is_anon == true ? {
        user_id: row.user_id,
        title: row.title,
        content: row.content,
        created_at: row.created_at,
        id: row.id,
        slug: row.slug,
        profiles: { is_anon: row.profiles.is_anon }
    } : row);
});