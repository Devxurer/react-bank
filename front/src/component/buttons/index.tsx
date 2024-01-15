import React from "react";
import "./index.css"

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({children, className = "", onClick, type = "button" }) => {
    return (
        <button type={type} className={`button button--${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;