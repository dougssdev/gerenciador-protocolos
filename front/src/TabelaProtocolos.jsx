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
            <td>{new Date(p.data).toLocaleDateString("pt-BR")}</td>
            <td>{p.nome}</td>
            <td>
              <span className={`status ${p.status}`}>
                {p.status.replace("_", " ")}
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
