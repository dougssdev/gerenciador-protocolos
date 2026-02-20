import { useState } from "react";
import { criarProtocolo } from "./protocoloService";

function ProtocoloForm({ onSalvar }) {
  const [form, setForm] = useState({
    data: "",
    nome: "",
    status: "",
    reclamacao: "",
    resolucao: ""
  });

  async function submit(e) {
    e.preventDefault();
    await criarProtocolo(form);
    setForm({
      data: "",
      nome: "",
      status: "",
      reclamacao: "",
      resolucao: ""
    });
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
        <option value="pendente">Pendente</option>
        <option value="em_andamento">Em andamento</option>
        <option value="resolvido">Resolvido</option>
        <option value="suspenso">Suspenso</option>
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
