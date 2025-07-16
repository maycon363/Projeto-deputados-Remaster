import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProposicaoById } from "../../service/proposicoes";
import "../../css/proposicaoDetalhes.css"; // você pode criar esse ou reaproveitar com cuidado
import Loading from "../../components/Loading";

export const ProposicoesDetalhes = () => {
    const { id } = useParams();
    const [proposicao, setProposicao] = useState(null);

    useEffect(() => {
        getProposicaoById(id).then(setProposicao);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProposicaoById(id);
                setProposicao(data);
            } catch (error) {
                console.error("Erro ao buscar proposição:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!proposicao) return <Loading />;

    return (
        <div className="container-detalhes">
            <div className="info-detalhes">
                <h1>{proposicao.ementa}</h1>
                <p><strong>ID:</strong> {proposicao.id}</p>
                <p><strong>Data de Apresentação:</strong> {proposicao.dataApresentacao}</p>
                <p><strong>Status:</strong> {proposicao.statusProposicao?.descricaoSituacao}</p>

                <Link className="botao" to={-1}>Voltar</Link>
            </div>
        </div>
    );
};
