import React from "react";
import "./index.css";

interface Head {
  title?: string;
  text?: string;
  className?: string;
}

const Header: React.FC<Head> = ({ title, text, className = "" }) => {
  return (
    <header className={`heading ${className}`}>
      <h1 className={`heading__title ${className}`}>{title}</h1>
      <p className={`heading__text ${className}`}>{text}</p>
    </header>
  );
};

export default Header;
