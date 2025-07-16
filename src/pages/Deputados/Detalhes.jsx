import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/detalhes.css";
import {
  getDeputadoDespesas,
  getDeputadoDetail,
} from "../../service/deputados";
import { BarChart } from "../../components/Charts";
import { getPartidosByID } from "../../service/partidos";
import Loading from "../../components/Loading";

export const DeputadosDetalhes = () => {
  const [deputados, setDeputados] = useState(null);
  const [despesas, SetDespesas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const params = useParams();

  const data = {
    labels: despesas.map(item => item.mes),
    datasets: [
      {
        label: "Dados de Gastos",
        data: despesas.map(item => item.valorDocumento),
        backgroundColor: [
          "rgb(255, 0, 0)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(0, 255, 127)",
          "rgb(0, 0, 255)",
          "rgb(0, 0, 0)",
          "rgb(138, 43, 226)",
          "rgb(255, 255, 0)",
          "rgb(255, 69, 0)",
          "rgb(255, 20, 147)",
          "rgb(123, 104, 238)",
          "rgb(139, 69, 19)",
          "rgb(154, 205, 50)",
          "rgb(0, 255, 255)",
          "rgb(128, 128, 128)"
        ],
        hoverOffset: 4,
      },
    ],
  };

  const getPartido = () => {
    if (deputados?.ultimoStatus?.idPartido) {
      getPartidosByID(deputados.ultimoStatus.idPartido).then((results) =>
        setPartidos(results)
      );
    }
  };

  useEffect(() => {
    getDeputadoDetail(params.id).then((response) => setDeputados(response));
  }, [params.id]);

  useEffect(() => {
    getPartido();
  }, [deputados]);

  useEffect(() => {
    getDeputadoDespesas(params.id).then((response) => SetDespesas(response));
  }, [params.id]);

  if (!deputados) return <Loading />;

  return (
    <>
      <div className="container-detalhes">
        <div className="perfil-deputado">
          <img className="img-detalhes" src={deputados.ultimoStatus?.urlFoto} alt="Foto do Deputado" />

          <div className="info-detalhes">
            <h1>{deputados.nomeCivil}</h1>
            <h4>Município/Origem: {deputados.municipioNascimento}/{deputados.ufNascimento}</h4>
            <h4>Escolaridade: {deputados.escolaridade}</h4>
            <h4>Data de Nascimento: {deputados.dataNascimento}</h4>
            <h4>Estado Eleito(a): {deputados.ultimoStatus?.siglaUf}</h4>
            <h4>Partido Afiliado(a): {deputados.ultimoStatus?.siglaPartido}</h4>

            <Link to={-1} className="botao">Voltar</Link>
          </div>
        </div>

        <div className="textosub">
          <h2>Gastos feitos pelo Deputado {deputados.nomeCivil}</h2>
        </div>

        <div className="grafico">
          <div>
            <BarChart chartData={data} />
          </div>
        </div>
      </div>
    </>
  );
};