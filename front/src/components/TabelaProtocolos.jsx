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
  if (!valor) {
    return "";
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
    return valor;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return valor;
}

function TabelaProtocolos({ protocolos, pesquisa, onExcluir }) {
  const filtrados = protocolos.filter(p =>
    Object.values(p)
      .join(" ")
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Nome</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {filtrados.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{formatarData(p.data)}</td>
            <td>{p.nome}</td>
            <td>
              <span className={`status ${p.status}`}>
                {formatarStatus(p.status)}
              </span>
            </td>
            <td>
              <button onClick={() => onExcluir(p.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaProtocolos;