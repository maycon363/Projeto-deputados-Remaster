import React, { useEffect, useState } from "react";
import { getProposicoes } from "../../service/proposicoes";
import { Link } from "react-router-dom";
import "../../css/table.css";
import "../../css/home.css";
import Loading from "../../components/Loading";

export const ProposicoesList = () => {
  const [proposicoes, setProposicoes] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    getProposicoes(page, perPage).then((data) => {
      setProposicoes(data.dados);
      setTotalPages(data.links.last ? parseInt(new URL(data.links.last).searchParams.get('pagina')) : 1);
    });
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (!proposicoes) return <Loading />;

  return (
    <>
      <div className="div-fundo">
        <div className="cover">
          <h1>Proposições em Tramitação</h1>
        </div>
      </div>

      <div className="centralize">
        <div className="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Número</th>
                <th>Ano</th>
                <th>Ementa</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {proposicoes.map((item) => (
                <tr key={item.id}>
                  <td>{item.siglaTipo}</td>
                  <td>{item.numero}</td>
                  <td>{item.ano}</td>
                  <td>{item.ementa}</td>
                  <td>
                    <Link className="decoration-none" to={`/proposicoes/${item.id}`}>
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="paginacao">
        <button className="botao" onClick={prevPage} disabled={page <= 1}>
          Anterior
        </button>
        <span>{page} / {totalPages}</span>
        <button className="botao" onClick={nextPage} disabled={page >= totalPages}>
          Próxima
        </button>
      </div>
    </>
  );
};
