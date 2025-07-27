import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
        .from("blogs")
        .select("*, profiles(name)")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching blogs:", error);
        return createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }

    return data;
});