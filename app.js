document.addEventListener("DOMContentLoaded", function () {

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  const btnSurpresa = document.getElementById("btnSurpresa");
  const surpresa = document.getElementById("surpresa");

  const inicioRelacionamento = new Date("2026-03-28T00:00:00");


  // =========================
  // CONTADOR DO RELACIONAMENTO
  // =========================

  function atualizarContador() {
    if (
      !diasEl ||
      !horasEl ||
      !minutosEl ||
      !segundosEl
    ) {
      return;
    }

    const agora = new Date();

    let diferenca =
      agora.getTime() -
      inicioRelacionamento.getTime();

    if (diferenca < 0) {
      diferenca = 0;
    }

    const segundosTotais =
      Math.floor(diferenca / 1000);

    const dias =
      Math.floor(segundosTotais / 86400);

    const horas =
      Math.floor(
        (segundosTotais % 86400) / 3600
      );

    const minutos =
      Math.floor(
        (segundosTotais % 3600) / 60
      );

    const segundos =
      segundosTotais % 60;

    diasEl.textContent = dias;

    horasEl.textContent =
      String(horas).padStart(2, "0");

    minutosEl.textContent =
      String(minutos).padStart(2, "0");

    segundosEl.textContent =
      String(segundos).padStart(2, "0");
  }

  atualizarContador();

  setInterval(
    atualizarContador,
    1000
  );


  // =========================
  // SURPRESA FINAL
  // =========================

  if (
    btnSurpresa &&
    surpresa
  ) {

    btnSurpresa.addEventListener(
      "click",
      function () {

        const estaAberta =
          surpresa.classList.contains("ativa");

        if (estaAberta) {

          surpresa.classList.remove("ativa");

          btnSurpresa.textContent =
            "Toca aqui, meu amor ❤️";

        } else {

          surpresa.classList.add("ativa");

          btnSurpresa.textContent =
            "Eu te amo, Malu ❤️";

          criarChuvaDeCoracoes();

          setTimeout(
            function () {
              surpresa.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            },
            250
          );

        }

      }
    );

  }


  // =========================
  // CHUVA DE CORAÇÕES
  // =========================

  function criarChuvaDeCoracoes() {

    for (
      let i = 0;
      i < 35;
      i++
    ) {

      setTimeout(
        function () {
          criarCoracao();
        },
        i * 90
      );

    }

  }


  function criarCoracao() {

    const coracao =
      document.createElement("div");

    const simbolos = [
      "❤️",
      "💕",
      "💗",
      "💖"
    ];

    coracao.textContent =
      simbolos[
        Math.floor(
          Math.random() *
          simbolos.length
        )
      ];


    coracao.style.position =
      "fixed";

    coracao.style.left =
      Math.random() * 100 + "vw";

    coracao.style.bottom =
      "-60px";

    coracao.style.zIndex =
      "9999";

    coracao.style.pointerEvents =
      "none";

    coracao.style.userSelect =
      "none";

    coracao.style.fontSize =
      (
        16 +
        Math.random() * 26
      ) +
      "px";

    coracao.style.opacity =
      "1";

    coracao.style.transition =
      "transform 4s linear, opacity 4s ease";


    document.body.appendChild(
      coracao
    );


    requestAnimationFrame(
      function () {

        const deslocamento =
          115 +
          Math.random() * 35;

        const rotacao =
          Math.random() * 500;

        coracao.style.transform =
          "translateY(-" +
          deslocamento +
          "vh) rotate(" +
          rotacao +
          "deg)";

        coracao.style.opacity =
          "0";

      }
    );


    setTimeout(
      function () {
        coracao.remove();
      },
      4100
    );

  }

});
