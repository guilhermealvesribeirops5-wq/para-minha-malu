document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("btnEntrar");
  const btnSurpresa = document.getElementById("btnSurpresa");
  const surpresa = document.getElementById("surpresa");

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  const inicioRelacionamento = new Date("2026-03-28T00:00:00");

  if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
      const primeiraSecao = document.querySelector(".story-section");

      if (primeiraSecao) {
        primeiraSecao.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  function atualizarContador() {
    const agora = new Date();
    let diferenca = agora - inicioRelacionamento;

    if (diferenca < 0) {
      diferenca = 0;
    }

    const segundosTotais = Math.floor(diferenca / 1000);

    const dias = Math.floor(segundosTotais / 86400);
    const horas = Math.floor((segundosTotais % 86400) / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    if (diasEl) diasEl.textContent = dias;
    if (horasEl) horasEl.textContent = String(horas).padStart(2, "0");
    if (minutosEl) minutosEl.textContent = String(minutos).padStart(2, "0");
    if (segundosEl) segundosEl.textContent = String(segundos).padStart(2, "0");
  }

  atualizarContador();
  setInterval(atualizarContador, 1000);

  if (btnSurpresa && surpresa) {
    btnSurpresa.addEventListener("click", () => {
      surpresa.classList.toggle("ativa");

      if (surpresa.classList.contains("ativa")) {
        btnSurpresa.textContent = "Eu te amo, Malu ❤️";
        criarCoracoes();
      } else {
        btnSurpresa.textContent = "Toca aqui, meu amor ❤️";
      }
    });
  }

  function criarCoracoes() {
    for (let i = 0; i < 25; i++) {
      setTimeout(criarCoracao, i * 90);
    }
  }

  function criarCoracao() {
    const coracao = document.createElement("div");

    coracao.textContent = "❤️";
    coracao.style.position = "fixed";
    coracao.style.left = Math.random() * 100 + "vw";
    coracao.style.bottom = "-40px";
    coracao.style.fontSize = 16 + Math.random() * 24 + "px";
    coracao.style.zIndex = "9999";
    coracao.style.pointerEvents = "none";
    coracao.style.opacity = "1";
    coracao.style.transition =
      "transform 3.5s linear, opacity 3.5s ease";

    document.body.appendChild(coracao);

    requestAnimationFrame(() => {
      coracao.style.transform =
        `translateY(-${110 + Math.random() * 40}vh) rotate(${Math.random() * 360}deg)`;

      coracao.style.opacity = "0";
    });

    setTimeout(() => {
      coracao.remove();
    }, 3600);
  }
});
