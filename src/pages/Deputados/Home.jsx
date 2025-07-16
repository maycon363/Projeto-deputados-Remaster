import { useEffect, useState } from "react";
import CardDeputados from "../../components/CardDeputados";
import "../../css/home.css";
import { getAllDeputados, getDeputadoByid } from "../../service/deputados";
import Loading from "../../components/Loading";

export function Home() {
  const [todosDeputados, setTodosDeputados] = useState([]);
  const [deputados, setDeputados] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    getAllDeputados().then((response) => {
      setTodosDeputados(response.dados);
      setDeputados(response.dados); // inicia com todos
    });
  }, []);

  const buscarDeputado = () => {
    const termo = query.toLowerCase();
    const filtrados = todosDeputados.filter((dep) =>
      dep.nome.toLowerCase().includes(termo)
    );
    setDeputados(filtrados);
    setPage(1);
  };

  if (!deputados) return <Loading />;

  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const totalPages = Math.ceil(deputados.length / perPage);
  const paginado = deputados.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <div className="div-fundo">
        <div className="cover">
          <h1>
            Descubra o que os deputados estão fazendo com o nosso dinheiro!
          </h1>
        </div>
      </div>
      <div className="input-search">
        <i className="fa fa-search fa-2x" aria-hidden="true"></i>
        <input
          type="text"
          placeholder="Buscar deputado por nome"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={buscarDeputado}>Buscar</button>
      </div>
      <div className="container" id="deputados">
        {paginado.map((item) => (
          <CardDeputados
            key={item.id}
            id={item.id}
            img={item.urlFoto}
            nome={item.nome}
            partido={item.siglaPartido}
          />
        ))}
      </div>
      <div className="paginacao">
        <button className="botao" onClick={prevPage}>Anterior</button>
        <p className="page">{page} / {totalPages}</p>
        <button className="botao" onClick={nextPage}>Próxima</button>
      </div>
    </>
  );
}
