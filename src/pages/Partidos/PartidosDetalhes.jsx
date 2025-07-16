import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPartidosByID, getPartidosMembros } from "../../service/partidos";
import "../../css/detalhes.css";
import "../../css/home.css";
import "../../css/partidosdetalhes.css"
import CardDeputados from "../../components/CardDeputados";
import Loading from "../../components/Loading";

export const PartidosDetalhes = () => {
  const [partido, setPartido] = useState(null);
  const [partidoMembro, setPartidoMembro] = useState(null);
  const params = useParams();

  useEffect(() => {
    getPartidosByID(params.id).then((results) => setPartido(results));
  }, [params.id]);

  useEffect(() => {
    getPartidosMembros(params.id).then((results) => setPartidoMembro(results));
  }, [params.id]);

  if (!partido, !partidoMembro) return <Loading />;

  return (
    <div>
      <div className="partido-container">
        <div className="partido-header">
          <h1>{partido.sigla}</h1>
          {partido.urlLogo && 
          <img className="img-urlFoto-partido" src={partido.urlLogo} alt="Imagem do Partido" />
          }
        </div>
        <div className="partido-voltar">
          <Link to={-1} className="botao">Voltar</Link>
        </div>  
        <div >
         <h2 className="title">Membros do partido {partido.sigla}</h2>
        </div>
        <div className="container">
          {partidoMembro.map((item) => (
            <CardDeputados
              key={item.id}
              id={item.id}
              img={item.urlFoto}
              nome={item.nome}
              partido={item.siglaPartido}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
