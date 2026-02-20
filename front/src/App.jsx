import { useEffect, useState } from "react";
import ProtocoloForm from "./ProtocoloForm";
import TabelaProtocolos from "./TabelaProtocolos";
import { buscarProtocolos, excluirProtocolo } from "./protocoloService";

function App() {
  const [protocolos, setProtocolos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await buscarProtocolos();
    setProtocolos(dados);
  }

  async function excluir(id) {
    await excluirProtocolo(id);
    carregar();
  }

  return (
    <div className="container">
      <h1>Gerenciador de Protocolos</h1>

      <ProtocoloForm onSalvar={carregar} />

      <input
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

export default App;
