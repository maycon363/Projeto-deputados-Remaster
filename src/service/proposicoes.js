import axios from "axios";

const api = axios.create({
    baseURL: "https://dadosabertos.camara.leg.br/api/v2",
});

const getProposicoes = async (pagina = 1, itens = 10, ano = null) => {
    const response = await api.get ("/proposicoes", {
        params: {
            pagina,
            itens,
            ano,
            ordenarPor: "id",
        },
    });
    return response.data;
};

const getProposicaoById  = async (id) => {
    const response = await api.get(`/proposicoes/${id}`);
    return response.data.dados;
};


export { getProposicoes, getProposicaoById };
