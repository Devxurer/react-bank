import React from "react";
import "./index.css";

interface Heading {
    title ?: string,
    text ?: string,
    className ?: string,
}

const Header: React.FC<Heading> = ({title, text, className = ""}) => {
    return (
        <header className="heading">
            <h1 className="heading__title">{title}</h1>
            <p className="heading__text">{text}</p>
        </header>
    )
}

export default Header;