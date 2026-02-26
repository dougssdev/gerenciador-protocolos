import { useEffect, useState } from "react";
import ProtocoloForm from "../components/ProtocoloForm";
import TabelaProtocolos from "../components/TabelaProtocolos";
import { buscarProtocolos, excluirProtocolo } from "../service/protocoloService";

function ListaProtocolos() {
  const [protocolos, setProtocolos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  async function carregar() {
    const dados = await buscarProtocolos();
    setProtocolos(dados);
  }

  useEffect(() => {
  function onStorage(e) {
    if (e.key === "protocolosAtualizados") {
      carregar();
    }
  }

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);

  useEffect(() => {
    carregar();
  }, []);

  async function excluir(id) {
    await excluirProtocolo(id);
    carregar();
  }

  return (
    <div className="container">
      <h1>Gerenciador de Protocolos</h1>

      <ProtocoloForm onSalvarCadastro={carregar} />

      <input
        className="pesquisa"
        placeholder="Pesquisar..."
        value={pesquisa}
        onChange={e => setPesquisa(e.target.value)}
      />

      <TabelaProtocolos
        protocolos={protocolos}
        pesquisa={pesquisa}
        onExcluir={excluir}
      />
    </div>
  );
}

export default ListaProtocolos;