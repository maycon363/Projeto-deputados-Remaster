import React from "react";
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="spinner" />
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
