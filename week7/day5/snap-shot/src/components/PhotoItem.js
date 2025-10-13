import React from "react";

export default function PhotoItem({ photo }) {
    // use small/medium src
    const src = photo.src.medium || photo.src.small;
    const alt = photo.alt || "photo";
    return (
        <figure className="photo-card">
            <img src={src} alt={alt} />
            <figcaption className="caption">
                <div className="photographer">{photo.photographer}</div>
                <a href={photo.url} target="_blank" rel="noreferrer">View</a>
            </figcaption>
        </figure>
    );
}
