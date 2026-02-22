const API_URL = "http://localhost:3000/protocolos";

export async function buscarProtocolos() {
  const res = await fetch(`${API_URL}/listar`);

  if (!res.ok) {
    throw new Error("Erro ao listar protocolos.");
  }

  const data = await res.json();
  return data.content;
}

export async function criarProtocolo(dados) {
  const res = await fetch(`${API_URL}/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  if (!res.ok) {
    throw new Error("Erro ao cadastrar protocolo.");
  }
}

export async function excluirProtocolo(id) {
  const res = await fetch(`${API_URL}/deletar/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar protocolo.");
  }
}
