// api.js — funções de comunicação com a internet (Passos 18 e 20)

export async function carregarDepoimentos() {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
  const dados = await resposta.json();
  return dados;
}

export async function enviarFormulario(nome, email, mensagem) {
  const corpo = JSON.stringify({ title: nome, body: mensagem, email: email, userId: 1 });
  const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: corpo
  });
  return resposta;
}
