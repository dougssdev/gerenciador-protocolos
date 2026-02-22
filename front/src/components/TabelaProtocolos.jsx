import React, { useState } from "react";
import logo from "../assets/logocreb.png";

function formatarStatus(status) {
  const labels = {
    PENDENTE: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    RESOLVIDO: "Resolvido",
    SUSPENSO: "Suspenso"
  };

  return labels[status] ?? status;
}

function formatarData(valor) {
  if (!valor) return "";

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
    return valor;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return valor;
}

function TabelaProtocolos({ protocolos, pesquisa, onExcluir, onEditar }) {
  
  const [protocoloSelecionado, setProtocoloSelecionado] = useState(null);
 
  const formatarProtocolo = (id) => {
  return `PRT-${String(id).padStart(3, "0")}`;
};
  
  function editarProtocolo(protocolo) {
    if (!onEditar) return;
    onEditar(protocolo);
  }

  function gerarFichaImpressao(protocolo) {
  const novaJanela = window.open("", "_blank");

  novaJanela.document.write(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
          }

          h1 {
            text-align: center;
            margin-bottom: 30px;
          }

          .print-logo{
            
          }

          .linha {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .bloco {
            width: 48%;
          }

          .label {
            font-weight: bold;
            font-size: 12px;
            color: #555;
          }

          .valor {
            margin-top: 4px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 4px;
          }

          .area {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 5px;
            min-height: 60px;
          }

          .print-btn {
            margin-top: 30px;
            padding: 8px 16px;
            cursor: pointer;
          }

          @media print {
            .print-btn {
              display: none;
            }
          }
          .print-header {
              display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
          }

          .print-logo {
            width: 120px;
            height: auto;
          }

          .print-title {
            text-align: right;
          }

          .print-title h1 {
            margin: 0;
            font-size: 28px;
          }

          .print-title h2 {
            margin: 0;
            font-size: 22px;
            font-weight: normal;
          }

          .print-container {
            position: relative;
          }

          @media print{
            .print-container::before {
              content: "";
              position: fixed;
              top: 50%;
              left: 50%;
              width: 400px; /* tamanho da marca */
              height: 400px;
              background-image: url(${logo});
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              opacity: 0.06; /* intensidade da marca */
              transform: translate(-50%, -50%);
              z-index: 0;
            }
          }
          
          .print-container > * {
            position: relative;
            z-index: 1;
          }

        </style>
      </head>

      <body>

      <div class="print-container">

      <h1>Ficha de Protocolo - ${formatarProtocolo(protocolo.id)}</h1>

        <div class="linha">
          <div class="bloco">
            <div class="label">DATA:</div>
            <div class="valor">${protocolo.data}</div>
          </div>

          <div class="bloco">
            <div class="label">UNIDADE:</div>
            <div class="valor">${protocolo.unidade}</div>
          </div>
        </div>

        <div class="linha">
          <div class="bloco">
            <div class="label">FONTE:</div>
            <div class="valor">${protocolo.fonte}</div>
          </div>

          <div class="bloco">
            <div class="label">STATUS:</div>
            <div class="valor">${protocolo.status}</div>
          </div>
        </div>

        <div style="margin-bottom:20px;">
          <div class="label">NOME DO PACIENTE:</div>
          <div class="valor">${protocolo.nome}</div>
        </div>

        <div style="margin-bottom:20px;">
          <div class="label">RECLAMAÇÃO / ASSUNTO:</div>
          <div class="area">${protocolo.reclamacao || "-"}</div>
        </div>

        <div style="margin-bottom:20px;">
          <div class="label">RESOLUÇÃO DETALHADA:</div>
          <div class="area">${protocolo.resolucao || "-"}</div>
        </div>

        <div class="linha">
          <div class="bloco">
            <div class="label">RESOLVIDO POR:</div>
            <div class="valor">${protocolo.resolvidoPor || "-"}</div>
          </div>

          <div class="bloco">
            <div class="label">OBSERVAÇÕES:</div>
            <div class="valor">${protocolo.observacao || "-"}</div>
          </div>
        </div>

        <button class="print-btn" onclick="window.print()">🖨️ Imprimir</button>

      </div>
      </body>
    </html>
  `);

  novaJanela.document.close();
}

  const filtrados = protocolos.filter(p =>
    Object.values(p)
      .join(" ")
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <>
    <table className="tabela">
      <thead>
        <tr>
          <th>ID</th>
          <th>Data</th>
          <th>Nome</th>
          <th>Unidade</th>
          <th>Fonte</th>
          <th>Status</th>
          <th>Reclamação</th>
          <th>Resolvido por</th>
          <th>Observação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  {filtrados.map(p => (
    <tr key={p.id}>
      <td>{p.id}</td>
      <td>{formatarData(p.data)}</td>
      <td>{p.nome}</td>
      <td>{p.unidade}</td>
      <td>{p.fonte}</td>
      <td>
        <span className={`status ${p.status}`}>
          {formatarStatus(p.status)}
        </span>
      </td>
      <td>{p.reclamacao}</td>
      <td>{p.resolvidoPor}</td>
      <td>{p.observacao}</td>
      <td>
        <button onClick={() => onExcluir(p.id)}>🗑️</button>
        <button onClick={() => setProtocoloSelecionado(p)}>✏️</button>
        <button onClick={() => gerarFichaImpressao(p)}>🖨️</button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
     {protocoloSelecionado && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Editar Protocolo</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEditar(protocoloSelecionado);
              setProtocoloSelecionado(null);
            }}
          >
            <input
              type="text"
              value={protocoloSelecionado.nome}
              onChange={(e) =>
                setProtocoloSelecionado({
                  ...protocoloSelecionado,
                  nome: e.target.value
                })
              }
              placeholder="Nome"
            />

            <select
              value={protocoloSelecionado.status}
              onChange={(e) =>
                setProtocoloSelecionado({
                  ...protocoloSelecionado,
                  status: e.target.value
                })
              }
            >
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
              <option value="SUSPENSO">Suspenso</option>
            </select>

            <div className="modal-botoes">
              <button type="submit" className="btn-salvar">
                Atualizar
              </button>

              <button
                type="button"
                className="btn-cancelar"
                onClick={() => setProtocoloSelecionado(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
 
      
}

export default TabelaProtocolos;