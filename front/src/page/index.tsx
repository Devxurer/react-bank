import React from "react";
import "./index.css";

interface StageProps {
  children: React.ReactNode;
}

const Stage: React.FC<StageProps> = ({ children }) => {
  return (
    <div style={{ padding: "25px" }}>
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default Stage;
