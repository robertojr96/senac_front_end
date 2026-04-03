var e = (e, t) => () => (e && (t = e((e = 0))), t),
  t = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
async function n() {
  return await (
    await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=3`)
  ).json();
}
async function r(e, t, n) {
  let r = JSON.stringify({ title: e, body: n, email: t, userId: 1 });
  return await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: `POST`,
    headers: { "Content-type": `application/json` },
    body: r,
  });
}
var i = e(() => {});
function a(e) {
  let t = document.getElementById(`lista-depoimentos`);
  t &&
    (t.innerHTML = e
      .map(
        (e) => `
    <div class="col-md-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${e.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${e.email}</h6>
          <p class="card-text">${e.body}</p>
        </div>
      </div>
    </div>
  `,
      )
      .join(``));
}
function o(e, t) {
  t &&
    (t.innerHTML = e
      ? `<div class="alert alert-success">Mensagem enviada com sucesso!</div>`
      : `<div class="alert alert-danger">Erro ao enviar. Tente novamente.</div>`);
}
var s = e(() => {});
t(() => {
  (i(), s());
  var e = document.getElementById(`lista-depoimentos`);
  e &&
    n()
      .then((e) => a(e))
      .catch(() => {
        e.innerHTML = `<p>Não foi possível carregar os depoimentos.</p>`;
      });
  var t = document.getElementById(`btn-enviar`),
    c = document.getElementById(`campo-cep`);
  (c &&
    c.addEventListener(`input `, async () => {
      let e = c.value.replace(/\D/g, ``);
      if (e.length !== 8) return;
      let t = await (await fetch(`https://viacep.com.br/ws/${e}/json/`)).json();
      t.erro ||
        ((document.getElementById(`campo-rua`).value = t.logradouro),
        (document.getElementById(`campo-bairro`).value = t.bairro),
        (document.getElementById(`campo-cidade`).value = t.localidade),
        (document.getElementById(`campo-estado`).value = t.uf));
    }),
    t &&
      t.addEventListener(`click`, async () => {
        let e = document.getElementById(`campo-nome`).value,
          t = document.getElementById(`campo-email`).value,
          n = document.getElementById(`campo-mensagem`).value,
          i = document.getElementById(`feedback-form`);
        try {
          o((await r(e, t, n)).status === 201, i);
        } catch {
          o(!1, feedbackContainerr);
        }
      }));
})();
