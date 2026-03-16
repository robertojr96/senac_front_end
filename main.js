// main.js — arquivo principal: importa módulos e registra Event Listeners (Passo 21)

import { carregarDepoimentos, enviarFormulario } from './api.js';
import { renderizarDepoimentos, exibirAlertaForm } from './ui.js';

// Passo 18: carregar depoimentos na home
const listaDepoimentos = document.getElementById('lista-depoimentos');
if (listaDepoimentos) {
  carregarDepoimentos()
    .then(dados => renderizarDepoimentos(dados))
    .catch(() => { listaDepoimentos.innerHTML = '<p>Não foi possível carregar os depoimentos.</p>'; });
}

// Passo 20: envio do formulário de contato via POST
const btnEnviar = document.getElementById('btn-enviar');
if (btnEnviar) {
  btnEnviar.addEventListener('click', async () => {
    const nome = document.getElementById('campo-nome').value;
    const email = document.getElementById('campo-email').value;
    const mensagem = document.getElementById('campo-mensagem').value;
    const feedbackContainer = document.getElementById('feedback-form');

    try {
      const resposta = await enviarFormulario(nome, email, mensagem);
      exibirAlertaForm(resposta.status === 201, feedbackContainer);
    } catch {
      exibirAlertaForm(false, feedbackContainer);
    }
  });
}
