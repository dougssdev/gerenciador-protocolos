const API_URL = "http://localhost:3000/protocolos";

export async function buscarProtocolos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function criarProtocolo(dados) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
}

export async function excluirProtocolo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
