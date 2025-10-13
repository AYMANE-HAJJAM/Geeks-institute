import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPhotos } from "../api";
import PhotoList from "../components/PhotoList";
import Pagination from "../components/Pagination";

export default function SearchPage() {
    const [params] = useSearchParams();
    const q = params.get("q") || "";
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 30;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setPage(1);
    }, [q]);

    useEffect(() => {
        if (!q) return;
        async function load() {
            setLoading(true); setError("");
            try {
                const data = await searchPhotos(q, page, perPage);
                setPhotos(data.photos || []);
            } catch (err) {
                setError(err.message);
            } finally { setLoading(false); }
        }
        load();
    }, [q, page]);

    if (!q) return <div className="hint">Enter a search term.</div>;

    return (
        <section>
            <h2 className="title">Search: {q}</h2>
            {error && <div className="error">{error}</div>}
            {loading ? <div>Loading...</div> : <PhotoList photos={photos} />}
            <Pagination
                page={page}
                onPrev={() => setPage((s) => Math.max(1, s - 1))}
                onNext={() => setPage((s) => s + 1)}
            />
        </section>
    );
}
