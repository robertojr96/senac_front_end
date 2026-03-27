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
// Busca de endereço pelo CEP
const campoCep = document.getElementById('campo-cep');
if (campoCep) {
  campoCep.addEventListener('input ', async () => {
    const cep = campoCep.value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (!dados.erro) {
      document.getElementById('campo-rua').value    = dados.logradouro;
      document.getElementById('campo-bairro').value = dados.bairro;
      document.getElementById('campo-cidade').value = dados.localidade;
      document.getElementById('campo-estado').value = dados.uf;
    }
  });
}
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
