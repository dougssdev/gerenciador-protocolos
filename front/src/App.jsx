import { useEffect, useState } from "react";
import ProtocoloForm from "./components/ProtocoloForm";
import TabelaProtocolos from "./components/TabelaProtocolos";
import { atualizarProtocolo, buscarProtocolos, excluirProtocolo } from "./service/protocoloService";
import "./App.css";

function App() {
  const [protocolos, setProtocolos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [protocoloEditando, setProtocoloEditando] = useState(null);

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

  function editarProtocolo(protocoloAtualizado) {
  atualizarProtocolo(protocoloAtualizado.id, protocoloAtualizado)
    .then(() => carregar());
}

  return (
    <div className="container">
      <h1>Gerenciador de Protocolos</h1>

      <h2>Incluir Novo Protocolo</h2>
      <div className="form-card">
        <ProtocoloForm onSalvar={carregar} />
      </div>
      
      <h2>Protocolos Registrados</h2>
      
      <input className="pesquisa"
        placeholder="Pesquisar..."
        value={pesquisa}
        onChange={e => setPesquisa(e.target.value)}
      />

      <TabelaProtocolos
        protocolos={protocolos}
        pesquisa={pesquisa}
        onExcluir={excluir}
        onEditar={editarProtocolo}
      />
    </div>
  );
}

export default App;
