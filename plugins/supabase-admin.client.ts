import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const url = config.public.supabase.url;
    const serviceKey = config.public.serviceKey;

    return {
        provide: {
            supabaseAdmin: createClient(url, serviceKey)
        }
    }
})

