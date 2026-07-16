import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ url }) => {
    const query = url.searchParams.get("q")?.trim() ?? "";

    if (query.length < 2) {
        return new Response(JSON.stringify([]), {
            headers: { "Content-Type": "application/json" },
        });
    }

    const { data: products } = await supabase
        .from("products")
        .select("id, name, price, image_urls")
        .ilike("name", `%${query}%`)
        .limit(6);

    return new Response(JSON.stringify(products ?? []), {
        headers: { "Content-Type": "application/json" },
    });
};