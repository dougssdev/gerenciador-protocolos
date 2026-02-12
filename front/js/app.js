/* =====================
   UTILIDADES
===================== */
const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};



const API_URL = 'http://localhost:3000/protocolos';

/* =====================
   ESTADO
===================== */
let protocolos = [];

/* =====================
   DOM
===================== */
const DOM = {
    form: document.getElementById('form'),
    tbody: document.getElementById('tbody'),
    pesquisa: document.getElementById('pesquisa'),
    cancelar: document.getElementById('cancelar'),

    idEdicao: document.getElementById('idEdicao'),
    data: document.getElementById('data'),
    nome: document.getElementById('nome'),
    status: document.getElementById('status'),
    reclamacao: document.getElementById('reclamacao'),
    resolucao: document.getElementById('resolucao'),
};

/* =====================
   MODELO
===================== */


function criarProtocolo(dados) {
    return {
        protocolo: dados.protocolo || null,
        data: dados.data,
        nome: dados.nome,
        status: dados.status,
        reclamacao: dados.reclamacao ?? '',
        resolucao: dados.resolucao ?? '',
    };
}

/* =====================
   API
===================== */
async function carregarProtocolos() {
     try {
        const res = await fetch('http://localhost:3000/protocolos');
        const dados = await res.json();
        renderizar(dados);
    } catch (err) {
        alert('Erro ao carregar protocolos');
        console.error(err);
    }
}

async function criarProtocoloAPI(dados) {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });
}

async function atualizarProtocoloAPI(dados) {
    await fetch(`${API_URL}/${dados.protocolo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });
}

async function excluirProtocoloAPI(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
}


/* =====================
   RENDER
===================== */
function limparTabela() {
    DOM.tbody.innerHTML = '';
}

function criarTd(texto) {
    const td = document.createElement('td');
    td.textContent = texto;
    return td;
}

function renderizar(lista) {
    limparTabela();

    lista.forEach(p => {
        const tr = document.createElement('tr');

        tr.appendChild(criarTd(p.protocolo));
        tr.appendChild(criarTd(new Date(p.data).toLocaleDateString('pt-BR')));
        tr.appendChild(criarTd(p.nome));

        const tdStatus = document.createElement('td');
        const span = document.createElement('span');
        span.className = `status ${p.status}`;
        span.textContent = p.status.replace('_', ' ');
        tdStatus.appendChild(span);
        tr.appendChild(tdStatus);

        const tdAcoes = document.createElement('td');
        tdAcoes.className = 'acoes';

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.dataset.id = p.protocolo;
        btnEditar.dataset.acao = 'editar';

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.dataset.id = p.protocolo;
        btnExcluir.dataset.acao = 'excluir';

        tdAcoes.append(btnEditar, btnExcluir);
        tr.appendChild(tdAcoes);

        DOM.tbody.appendChild(tr);
    });
}

/* =====================
   EVENTOS
===================== */

DOM.form.addEventListener('submit', async e => {
    e.preventDefault();

    const payload = {
        data: DOM.data.value,
        nome: DOM.nome.value,
        status: DOM.status.value,
        reclamacao: DOM.reclamacao.value,
        resolucao: DOM.resolucao.value,
    };

    await fetch('http://localhost:3000/protocolos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    DOM.form.reset();
    carregarProtocolos();
});

DOM.cancelar.addEventListener('click', () => {
    DOM.form.reset();
    DOM.idEdicao.value = '';
    DOM.cancelar.hidden = true;
});

DOM.tbody.addEventListener('click', async e => {
    const btn = e.target;
    const id = btn.dataset.id;

    if (btn.dataset.acao === 'editar') {
        const p = protocolos.find(x => x.protocolo === id);
        DOM.idEdicao.value = p.protocolo;
        DOM.data.value = p.data;
        DOM.nome.value = p.nome;
        DOM.status.value = p.status;
        DOM.reclamacao.value = p.reclamacao;
        DOM.resolucao.value = p.resolucao;
        DOM.cancelar.hidden = false;
    }

    if (btn.dataset.acao === 'excluir') {
        if (confirm(`Excluir ${id}?`)) {
            await excluirProtocoloAPI(id);
            await carregarProtocolos();
        }
    }
});

DOM.pesquisa.addEventListener(
    'keyup',
    debounce(() => {
        const termo = DOM.pesquisa.value.toLowerCase();
        const filtrados = protocolos.filter(p =>
            Object.values(p).some(v =>
                String(v).toLowerCase().includes(termo)
            )
        );
        renderizar(filtrados);
    })
);

/* =====================
   INIT
===================== */
carregarProtocolos();
