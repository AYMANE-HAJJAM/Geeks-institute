import React from "react";
import posts from "./poste.json";

function PostList() {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title">{post.title}</h4>
                        <p className="card-text">{post.content}</p>
                        <small className="text-muted">{post.date}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;
