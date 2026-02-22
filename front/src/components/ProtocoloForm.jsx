import { useState } from "react";
import { criarProtocolo } from "../service/protocoloService";

const initialForm = {
  nomePaciente: "",
  unidade: "",
  fonte: "",
  status: "",
  reclamacao: "",
  resolucaoDetalhada: "",
  resolvidoPor: "",
  observacao: "",
  data: ""
};

function ProtocoloForm({ onSalvar }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: value
  }));
};

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }
  

  function validarFormulario() {
    const obrigatorios = [
      "nomePaciente",
      "unidade",
      "fonte",
      "status",
      "reclamacao",
      "data"
    ];

    const faltando = obrigatorios.some(campo => !form[campo]?.trim?.() && !form[campo]);

    if (faltando) {
      return "Preencha todos os campos obrigatórios.";
    }

    if (form.status === "RESOLVIDO") {
      if (!form.resolucaoDetalhada.trim()) {
        return "A resolução detalhada é obrigatória para protocolos resolvidos.";
      }

      if (!form.resolvidoPor.trim()) {
        return "Informe quem resolveu o protocolo quando o status for resolvido.";
      }
    }

    return null;
  }

  
  async function submit(e) {
    e.preventDefault();

    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      alert(erroValidacao);
      return;
    }

    await criarProtocolo(form);
    setForm(initialForm);
    onSalvar();
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Nome do paciente"
        value={form.nomePaciente}
        onChange={e => atualizarCampo("nomePaciente", e.target.value)}
        required
      />

      <select
        value={form.unidade}
        onChange={e => atualizarCampo("unidade", e.target.value)}
        required
      >
        <option value="">Unidade</option>
        <option value="CREB_BOTAFOGO">CREB Botafogo</option>
        <option value="CREB_BARRA">CREB Barra</option>
        <option value="CREB_COPACABANA">CREB Copacabana</option>
        <option value="CORTREL">CORTREL</option>
        <option value="COT">COT</option>
        <option value="CREB_INTERLAGOS">CREB Interlagos</option>
        <option value="CREB_SANTO_AMARO">CREB Santo Amaro</option>
      </select>

      <input
        placeholder="Fonte"
        value={form.fonte}
        onChange={e => atualizarCampo("fonte", e.target.value)}
        required
      />

      <select
        value={form.status}
        onChange={e => atualizarCampo("status", e.target.value)}
        required
      >
        <option value="">Status</option>
        <option value="PENDENTE">Pendente</option>
        <option value="EM_ANDAMENTO">Em andamento</option>
        <option value="RESOLVIDO">Resolvido</option>
        <option value="SUSPENSO">Suspenso</option>
      </select>

      <input
        placeholder="Reclamação"
        value={form.reclamacao}
        onChange={e => atualizarCampo("reclamacao", e.target.value)}
        required
      />

      <textarea
        placeholder="Resolução detalhada"
        value={form.resolucaoDetalhada}
        onChange={e => atualizarCampo("resolucaoDetalhada", e.target.value)}
        required={form.status === "RESOLVIDO"}
      />

      <input
        placeholder="Resolvido por"
        value={form.resolvidoPor}
        onChange={e => atualizarCampo("resolvidoPor", e.target.value)}
        required={form.status === "RESOLVIDO"}
      />

      <input
        placeholder="Observação"
        value={form.observacao}
        onChange={e => atualizarCampo("observacao", e.target.value)}
      />

      <input
        type="date"
        value={form.data}
        onChange={e => atualizarCampo("data", e.target.value)}
        required
      />

      <button>Salvar</button>
    </form>
  );
}

export default ProtocoloForm;