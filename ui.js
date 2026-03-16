// ui.js — manipulação do DOM (Passos 17, 18, 20)

export function renderizarDepoimentos(dados) {
  const container = document.getElementById('lista-depoimentos');
  if (!container) return;
  container.innerHTML = dados.map(item => `
    <div class="col-md-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
          <p class="card-text">${item.body}</p>
        </div>
      </div>
    </div>
  `).join('');
}

export function exibirAlertaForm(sucesso, container) {
  if (!container) return;
  container.innerHTML = sucesso
    ? `<div class="alert alert-success">Mensagem enviada com sucesso!</div>`
    : `<div class="alert alert-danger">Erro ao enviar. Tente novamente.</div>`;
}
