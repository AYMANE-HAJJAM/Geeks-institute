import React from "react";

export default function Pagination({ page, onPrev, onNext, totalResults }) {
    // Pexels doesn't always return total, but if present show pages.
    return (
        <div className="pagination">
            <button onClick={onPrev} disabled={page <= 1}>Prev</button>
            <span>Page {page}</span>
            <button onClick={onNext}>Next</button>
        </div>
    );
}
