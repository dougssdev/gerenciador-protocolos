import { useEffect, useRef, useState } from "react";
import ProtocoloForm from "./ProtocoloForm";
import TabelaProtocolos from "./TabelaProtocolos";
import {
  buscarProtocolos,
  excluirProtocolo,
  atualizarProtocolo
} from "../service/protocoloService";

function ProtocolosPage() {
  const [protocolos, setProtocolos] = useState([]);
  const [protocoloEmEdicao, setProtocoloEmEdicao] = useState(null);
  const formRef = useRef(null);

  async function carregar() {
    const dados = await buscarProtocolos();
    setProtocolos(dados);
  }

  useEffect(() => {
    carregar();
  }, []);

  function editar(protocolo) {
    setProtocoloEmEdicao(protocolo);

    // UX: rolar até o formulário
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function cancelarEdicao() {
    setProtocoloEmEdicao(null);
  }

  async function salvarEdicao(form) {
    await atualizarProtocolo(protocoloEmEdicao.id, form);
    setProtocoloEmEdicao(null);
    carregar();
  }

  return (
    <>
      <div ref={formRef}>
        <ProtocoloForm
          protocoloEmEdicao={protocoloEmEdicao}
          onSalvarCadastro={carregar}
          onSalvarEdicao={salvarEdicao}
          onCancelarEdicao={cancelarEdicao}
        />
      </div>

      <TabelaProtocolos
        protocolos={protocolos}
        onExcluir={excluirProtocolo}
        onEditar={editar}
      />
    </>
  );
}

export default ProtocolosPage;