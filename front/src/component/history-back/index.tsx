import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const ArrowBack: React.FC = () => {

    const navigate = useNavigate()

    return <div><img onClick={() => navigate(-1)} src="/svg/back-arrow.svg" alt="back button" className="arrow-back__image"/></div>
}

export default ArrowBack;