import React, { useEffect, useState } from "react";
import "../../css/home.css";
import { getAllPartidos } from "../../service/partidos";
import "../../css/table.css";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

export const PartidosList = () => {
  const [partidos, setPartidos] = useState(null);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);

  useEffect(() => {
    getAllPartidos().then((response) => setPartidos(response));
  }, []);

  let lastIndex = page * perPage;
  let firstIndex = lastIndex - perPage;
  const totalPages = Math.ceil(partidos?.length / perPage);

  const paginado =
    partidos < perPage ? partidos : partidos?.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (page >= totalPages) {
      return null;
    }

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page <= 1) {
      return null;
    }

    setPage(page - 1);
  };

  if (!partidos) return <Loading />;

  return (
    <>
      <div className="div-fundo">
        <div className="cover">
          <h1>Listagem dos Partidos</h1>
        </div>
      </div>
      <div className="centralize">
        <div className="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>NUMERO</th>
                <th>SIGLA</th>
                <th>NOME</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {paginado?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.sigla}</td>
                  <td>{item.nome}</td>
                  <td>
                    <Link className="decoration-none" to={`/partidos/${item.id}`}>
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
        <button className="botao" onClick={prevPage}>
          Anterior
        </button>
        {page} / {totalPages}
        <button className="botao" onClick={nextPage}>
          Próxima
        </button>
      </div>
    </>
  );
};
