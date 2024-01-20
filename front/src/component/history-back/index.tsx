import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const ArrowBack: React.FC = () => {

    const navigate = useNavigate()

    return <span style={{display: "inline"}}><img onClick={() => navigate(-1)} src="/svg/back-arrow.svg" alt="back button" className="arrow-back__image"/></span>
}

export default ArrowBack;