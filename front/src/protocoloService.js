const API_URL = "http://localhost:3000/protocolos";

export function toApiPayload(form) {
  return {
    nomePaciente: form.nome,
    unidade: form.unidade || "HSC",
    fonte: form.fonte || "APP",
    status: form.status,
    reclamacao: form.reclamacao,
    resolucao: form.resolucao,
    data: form.data
  };
}

export function fromApiResponse(dto) {
  return {
    id: dto.id ?? dto.protocolo,
    nome: dto.nomePaciente ?? dto.nome,
    data: dto.data,
    status: dto.status,
    reclamacao: dto.reclamacao,
    resolucao: dto.resolucao,
    unidade: dto.unidade,
    fonte: dto.fonte
  };
}

export async function buscarProtocolos() {
  const res = await fetch(`${API_URL}/listar`);

  if (!res.ok) {
    throw new Error("Erro ao listar protocolos.");
  }

  const data = await res.json();
  return data.content.map(fromApiResponse);
}

export async function criarProtocolo(dados) {
  const res = await fetch(`${API_URL}/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toApiPayload(dados))
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
