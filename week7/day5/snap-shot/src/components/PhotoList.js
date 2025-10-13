import React from "react";
import PhotoItem from "./PhotoItem";

export default function PhotoList({ photos }) {
    if (!photos || photos.length === 0) {
        return <div className="no-results">No images found.</div>;
    }
    return (
        <div className="grid">
            {photos.map((p) => (
                <PhotoItem key={p.id} photo={p} />
            ))}
        </div>
    );
}
