import { useState } from "react";
import { criarProtocolo, toApiPayload } from "../service/protocoloService";

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

function ProtocoloForm({ onSalvarCadastro }) {
  const [form, setForm] = useState(initialForm);

  function atualizarCampo(campo, valor) {
    setForm(prev => ({ ...prev, [campo]: valor }));
  }

  function validarFormulario() {
    const obrigatorios = ["nomePaciente", "unidade", "fonte", "status", "reclamacao", "data"];
    const faltando = obrigatorios.some(campo => !form[campo]);

    if (faltando) return "Preencha todos os campos obrigatórios.";

    if (form.status === "RESOLVIDO") {
      if (!form.resolucaoDetalhada) return "Informe a resolução detalhada.";
      if (!form.resolvidoPor) return "Informe quem resolveu.";
    }

    return null;
  }

  async function submit(e) {
    e.preventDefault();

    const erro = validarFormulario();
    if (erro) {
      alert(erro);
      return;
    }

    await criarProtocolo(toApiPayload(form));
    
    localStorage.setItem("protocolosAtualizados", Date.now().toString());
    
    onSalvarCadastro();
    setForm(initialForm);
  }

  return (
    <div className="form-card">
      <h2>Registrar Protocolo</h2>

      <form className="form-grid" onSubmit={submit}>
        <input type="date" value={form.data} onChange={e => atualizarCampo("data", e.target.value)} required />
        <input type="text" placeholder="Nome do paciente" value={form.nomePaciente} onChange={e => atualizarCampo("nomePaciente", e.target.value)} required />

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
          <option value="CREB_MEIER">CREB Méier</option>
          <option value="CREB_SANTO_AMARO">CREB Santo Amaro</option>
        </select>

        <select
          value={form.fonte}
          onChange={e => atualizarCampo("fonte", e.target.value)}
          required
        >
          <option value="">Fonte</option>
          <option value="Caixa de Sugestão">Caixa de Sugestão</option>
          <option value="Doctoralia">Doctoralia</option>
          <option value="E-mail">E-mail</option>
          <option value="Google">Google</option>
          <option value="NPS-TuoTEmpo">NPS-TuoTEmpo</option>
          <option value="Reclame Aqui">Reclame Aqui</option>
          <option value="Telefonia">Telefonia</option>
          <option value="Whatsapp">Whatsapp</option>

          </select>  
      
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

        <textarea
          placeholder="Reclamação/Assunto"
          value={form.reclamacao}
          onChange={e => atualizarCampo("reclamacao", e.target.value)}
          required
          className="full-width"
        />

        <textarea
          placeholder="Resolução detalhada"
          value={form.resolucaoDetalhada}
          onChange={e => atualizarCampo("resolucaoDetalhada", e.target.value)}
          required={form.status === "RESOLVIDO"}
          className="full-width"
        />

        <input
          type="text"
          placeholder="Resolvido por"
          value={form.resolvidoPor}
          onChange={e => atualizarCampo("resolvidoPor", e.target.value)}
          required={form.status === "RESOLVIDO"}
          className="full-width"
        />

        <textarea
          placeholder="Observação"
          value={form.observacao}
          onChange={e => atualizarCampo("observacao", e.target.value)}
          className="full-width"
        />

        <button className="btn-primary">Registrar Protocolo</button>
      </form>
    </div>
  );
}

export default ProtocoloForm;