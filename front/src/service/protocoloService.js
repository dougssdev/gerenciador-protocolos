import api from "./api";

export function toApiPayload(form) {
  return {
    nomePaciente: form.nomePaciente,
    unidade: form.unidade,
    fonte: form.fonte,
    status: form.status,
    reclamacao: form.reclamacao,
    resolucaoDetalhada: form.resolucaoDetalhada,
    resolvidoPor: form.resolvidoPor,
    observacao: form.observacao,
    data: form.data
  };
}

export function fromApiResponse(dto) {
  return {
    id: dto.id,
    nome: dto.nomePaciente,
    data: dto.data,
    status: dto.status,
    reclamacao: dto.reclamacao,
    resolucaoDetalhada: dto.resolucaoDetalhada,
    resolvidoPor: dto.resolvidoPor,
    observacao: dto.observacao,
    unidade: dto.unidade,
    fonte: dto.fonte
  };
}

export async function buscarProtocolos() {
  try {
    const response = await api.get("/protocolos/listar");
    return response.data.content.map(fromApiResponse);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao listar protocolos.");
  }
}

export async function criarProtocolo(protocolo) {
  try {
    const response = await api.post("/protocolos/cadastrar", protocolo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao cadastrar protocolo.");
  }
}

export async function excluirProtocolo(id) {
  try {
    await api.delete(`/protocolos/deletar/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar protocolo.");
  }
}