import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="left">
          &copy; {new Date().getFullYear()} Lupa dos Gastos. Todos os direitos reservados.
        </div>
        <div className="right">
          <a href="https://dadosabertos.camara.leg.br" target="_blank" rel="noopener noreferrer">
            API Dados Abertos Câmara
          </a>
          <a href="https://github.com/maycon363" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/maycon-borges-4a6022338/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
