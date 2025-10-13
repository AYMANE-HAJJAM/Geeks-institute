import React, { useEffect, useState } from "react";
import { curatedPhotos } from "../api";
import PhotoList from "../components/PhotoList";
import Pagination from "../components/Pagination";

export default function Home() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 30;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function load(p = 1) {
        setLoading(true);
        setError("");
        try {
            const data = await curatedPhotos(p, perPage);
            setPhotos(data.photos || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(page); }, [page]);

    return (
        <section>
            <h2 className="title">Mountain Pictures</h2>
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
