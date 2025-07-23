import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event: any) => {
    const supabase = await serverSupabaseClient(event);

    const body = await readBody(event)

    try {
        const { error } = await supabase.from("blogs").insert(body);

        if (error) {
            throw error;
        }
    } catch (error: any) {
        console.error("Error processing event:", error)

        return { message: error.message, statusCode: 500 };
    }

    return { message: "Blog post created successfully", statusCode: 201 };
})
