import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);

    const user_id: any = getRouterParam(event, 'user_id')

    try {
        const { data, error } = await supabase
            .from("blogs")
            .select("*, profiles(name)")
            .eq("user_id", user_id)
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
})
