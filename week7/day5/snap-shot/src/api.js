const BASE = "https://api.pexels.com/v1";

const KEY = process.env.REACT_APP_PEXELS_API_KEY;

if (!KEY) {
    console.warn("No PEXELS API key found. Set REACT_APP_PEXELS_API_KEY in .env");
}

async function fetchFromPexels(path, params = {}) {
    const url = new URL(BASE + path);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    const res = await fetch(url.toString(), {
        headers: {
            Authorization: KEY || "",
        },
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Pexels error ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data;
}

export async function searchPhotos(query, page = 1, per_page = 30) {
    return fetchFromPexels("/search", { query, page, per_page });
}

export async function curatedPhotos(page = 1, per_page = 30) {
    return fetchFromPexels("/curated", { page, per_page });
}
