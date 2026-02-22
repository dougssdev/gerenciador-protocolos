import React, { useState } from "react";

function formatarStatus(status) {
  const labels = {
    PENDENTE: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    RESOLVIDO: "Resolvido",
    SUSPENSO: "Suspenso"
  };

  return labels[status] ?? status;
}

function formatarData(valor) {
  if (!valor) return "";

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
    return valor;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return valor;
}

function TabelaProtocolos({ protocolos, pesquisa, onExcluir, onEditar }) {
  
  const [protocoloSelecionado, setProtocoloSelecionado] = useState(null);
 
  function editarProtocolo(protocolo) {
    if (!onEditar) return;
    onEditar(protocolo);
  }

  const filtrados = protocolos.filter(p =>
    Object.values(p)
      .join(" ")
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <>
    <table className="tabela">
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Nome</th>
          <th>Unidade</th>
          <th>Fonte</th>
          <th>Status</th>
          <th>Reclamação</th>
          <th>Resolvido por</th>
          <th>Observação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  {filtrados.map(p => (
    <tr key={p.id}>
      <td>{p.id}</td>
      <td>{formatarData(p.data)}</td>
      <td>{p.nome}</td>
      <td>{p.unidade}</td>
      <td>{p.fonte}</td>
      <td>
        <span className={`status ${p.status}`}>
          {formatarStatus(p.status)}
        </span>
      </td>
      <td>{p.reclamacao}</td>
      <td>{p.resolvidoPor}</td>
      <td>{p.observacao}</td>
      <td>
        <button onClick={() => onExcluir(p.id)}>🗑️</button>
        <button onClick={() => setProtocoloSelecionado(p)}>✏️</button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
     {protocoloSelecionado && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Editar Protocolo</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEditar(protocoloSelecionado);
              setProtocoloSelecionado(null);
            }}
          >
            <input
              type="text"
              value={protocoloSelecionado.nome}
              onChange={(e) =>
                setProtocoloSelecionado({
                  ...protocoloSelecionado,
                  nome: e.target.value
                })
              }
              placeholder="Nome"
            />

            <select
              value={protocoloSelecionado.status}
              onChange={(e) =>
                setProtocoloSelecionado({
                  ...protocoloSelecionado,
                  status: e.target.value
                })
              }
            >
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
              <option value="SUSPENSO">Suspenso</option>
            </select>

            <div className="modal-botoes">
              <button type="submit" className="btn-salvar">
                Atualizar
              </button>

              <button
                type="button"
                className="btn-cancelar"
                onClick={() => setProtocoloSelecionado(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
 
      
}

export default TabelaProtocolos;