import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  buscarProtocoloPorId,
  atualizarProtocolo,
  toApiPayload
} from "../service/protocoloService";
import "./EditarProtocolo.css";

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

function EditarProtocolo() {
  const { id } = useParams();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const protocolo = await buscarProtocoloPorId(id);

      setForm({
        nomePaciente: protocolo.nome,
        unidade: protocolo.unidade,
        fonte: protocolo.fonte,
        status: protocolo.status,
        reclamacao: protocolo.reclamacao,
        resolucaoDetalhada: protocolo.resolucaoDetalhada ?? "",
        resolvidoPor: protocolo.resolvidoPor ?? "",
        observacao: protocolo.observacao ?? "",
        data: protocolo.data
      });

      setLoading(false);
    }

    carregar();
  }, [id]);

  function atualizarCampo(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  async function submit(e) {
    e.preventDefault();
    
    await atualizarProtocolo(id, toApiPayload(form));    
    
    localStorage.setItem("protocolosAtualizados", Date.now().toString());

    alert("Protocolo atualizado com sucesso!");
    window.close(); 
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="editar-protocolo-page">
        <div className="editar-protocolo-card">
      <h1>Editar Protocolo #{id}</h1>

      <span className="titulo">Data:</span>
      <form onSubmit={submit}>
        <input
          type="date"
          value={form.data}
          onChange={e => atualizarCampo("data", e.target.value)}
        />
      <span className="titulo">Nome:</span>  
        <input
          type="text"
          value={form.nomePaciente}
          onChange={e => atualizarCampo("nomePaciente", e.target.value)}
        />
      <span className="titulo">Unidade:</span>
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
      <span className="titulo">Fonte:</span>
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
      <span className="titulo">Status:</span>
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
      <span className="titulo">Reclamção:</span>
        <textarea
          placeholder="Reclamação/Assunto"
          value={form.reclamacao}
          onChange={e => atualizarCampo("reclamacao", e.target.value)}
          required
          className="full-width"
        />
      <span className="titulo">Resolução:</span>
        <textarea
          placeholder="Resolução detalhada"
          value={form.resolucaoDetalhada}
          onChange={e => atualizarCampo("resolucaoDetalhada", e.target.value)}
          required={form.status === "RESOLVIDO"}
          className="full-width"
        />
      <span className="titulo">Resolvido por:</span>
        <input
          type="text"
          placeholder="Resolvido por"
          value={form.resolvidoPor}
          onChange={e => atualizarCampo("resolvidoPor", e.target.value)}
          required={form.status === "RESOLVIDO"}
          className="full-width"
        />
      <span className="titulo">Observação:</span>
        <textarea
          placeholder="Observação"
          value={form.observacao}
          onChange={e => atualizarCampo("observacao", e.target.value)}
          className="full-width"
        />

        <button className="btn-primary">
          Salvar alterações
        </button>
      </form>
    </div>
    </div>
  );
}

export default EditarProtocolo;