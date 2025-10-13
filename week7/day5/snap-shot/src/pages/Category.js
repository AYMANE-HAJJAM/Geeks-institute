import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPhotos } from "../api";
import PhotoList from "../components/PhotoList";
import Pagination from "../components/Pagination";

export default function Category() {
    const { name } = useParams();
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 30;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true); setError("");
            try {
                const data = await searchPhotos(name, page, perPage);
                setPhotos(data.photos || []);
            } catch (err) {
                setError(err.message);
            } finally { setLoading(false); }
        }
        load();
    }, [name, page]);

    return (
        <section>
            <h2 className="title">{name} Pictures</h2>
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
