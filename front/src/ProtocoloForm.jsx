import { useState } from "react";
import { criarProtocolo } from "./protocoloService";

const initialForm = {
  data: "",
  nome: "",
  status: "",
  reclamacao: "",
  resolucao: ""
};

function ProtocoloForm({ onSalvar }) {
  const [form, setForm] = useState(initialForm);

  async function submit(e) {
    e.preventDefault();
    await criarProtocolo(form);
    setForm(initialForm);
    onSalvar();
  }

  return (
    <form onSubmit={submit}>
      <input
        type="date"
        value={form.data}
        onChange={e => setForm({ ...form, data: e.target.value })}
        required
      />

      <input
        placeholder="Nome"
        value={form.nome}
        onChange={e => setForm({ ...form, nome: e.target.value })}
        required
      />

      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
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
        onChange={e => setForm({ ...form, reclamacao: e.target.value })}
      />

      <input
        placeholder="Resolução"
        value={form.resolucao}
        onChange={e => setForm({ ...form, resolucao: e.target.value })}
      />

      <button>Salvar</button>
    </form>
  );
}

export default ProtocoloForm;
