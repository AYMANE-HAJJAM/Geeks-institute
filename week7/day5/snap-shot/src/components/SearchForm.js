import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
    const [q, setQ] = useState("");
    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();
        if (!q.trim()) return;
        navigate(`/search?q=${encodeURIComponent(q.trim())}`);
        setQ("");
    }

    return (
        <form className="search-form" onSubmit={submit}>
            <input
                aria-label="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
            />
            <button type="submit">🔍</button>
        </form>
    );
}
