import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeputadosDetalhes, Home, PartidosDetalhes, PartidosList, PageNotFound } from "./pages/";
import { ProposicoesList } from "./pages/Proposicoes/ProposicoesList";
import { ProposicoesDetalhes } from "./pages/Proposicoes/ProposicoesDetalhes";
import Footer from "./components/Footer";
import ButtonTop from "./components/ButtonTop";
import ScrollToTop from "./components/ScrollToTop";
import LinearProgress from "./components/LinearProgress";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <LinearProgress />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalhes/:id" element={<DeputadosDetalhes />} />
            <Route path="/partidos" element={<PartidosList />} />
            <Route path="/partidos/:id" element={<PartidosDetalhes />} />
            <Route path="/proposicoes" element={<ProposicoesList />} />
            <Route path="/proposicoes/:id" element={<ProposicoesDetalhes />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <ButtonTop />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
