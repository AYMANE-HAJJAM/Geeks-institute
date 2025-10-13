import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";

export default function Header() {
    const navigate = useNavigate();
    const categories = ["Mountain", "Beaches", "Birds", "Food"];

    function goCategory(cat) {
        navigate(`/category/${encodeURIComponent(cat)}`);
    }

    return (
        <header className="header">
            <div className="logo">SnapShot</div>
            <SearchForm />
            <nav className="category-bar">
                {categories.map((c) => (
                    <button key={c} className="cat-btn" onClick={() => goCategory(c)}>
                        {c}
                    </button>
                ))}
                <NavLink to="/" className="cat-link">Home</NavLink>
            </nav>
        </header>
    );
}
