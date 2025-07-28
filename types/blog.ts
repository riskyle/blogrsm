export interface Profile {
    name?: string | null | undefined;
    is_anon: boolean;
}

export interface BlogInterface {
    user_id: string;
    title: string;
    content: string;
    created_at: string;
    id: string;
    slug: string;
    profiles: Profile;
}
