document.addEventListener("DOMContentLoaded", function () {

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  const btnSurpresa = document.getElementById("btnSurpresa");
  const surpresa = document.getElementById("surpresa");

  const botaoComecar = document.querySelector(".hero-button");
  const secaoHistoria = document.getElementById("historia");

  const inicioRelacionamento = new Date("2026-03-28T00:00:00");


  // =========================
  // MÚSICA
  // =========================

  const musica = new Audio("musicas/die-with-a-smile.mp3");

  musica.loop = true;
  musica.volume = 0.7;


  const player = document.createElement("div");

  player.className = "player-musica";

  player.innerHTML = `
    <div class="player-info">
      <span class="player-icon">♫</span>

      <div>
        <strong>Die With A Smile</strong>
        <small>Lady Gaga & Bruno Mars</small>
      </div>
    </div>

    <button
      id="btnMusica"
      class="btn-musica"
      aria-label="Pausar música"
    >
      ❚❚
    </button>
  `;

  document.body.appendChild(player);


  const btnMusica =
    document.getElementById("btnMusica");


  function mostrarPlayer() {
    player.classList.add("ativo");
  }


  function iniciarMusica() {

    musica.play()
      .then(function () {

        mostrarPlayer();

        btnMusica.textContent = "❚❚";

      })
      .catch(function () {

        btnMusica.textContent = "▶";

      });

  }


  if (
    botaoComecar &&
    secaoHistoria
  ) {

    botaoComecar.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        iniciarMusica();

        setTimeout(
          function () {

            secaoHistoria.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          },
          250
        );

      }
    );

  }


  if (btnMusica) {

    btnMusica.addEventListener(
      "click",
      function () {

        if (musica.paused) {

          musica.play();

          btnMusica.textContent = "❚❚";

        } else {

          musica.pause();

          btnMusica.textContent = "▶";

        }

      }
    );

  }


  // =========================
  // CONTADOR
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
      Math.floor(
        diferenca / 1000
      );


    const dias =
      Math.floor(
        segundosTotais / 86400
      );


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


    diasEl.textContent =
      dias;


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

        surpresa.classList.toggle("ativa");


        if (
          surpresa.classList.contains("ativa")
        ) {

          btnSurpresa.textContent =
            "Eu te amo, Malu ❤️";

          criarChuvaDeCoracoes();

        } else {

          btnSurpresa.textContent =
            "Toca aqui, meu amor ♥";

        }

      }
    );

  }


  // =========================
  // CORAÇÕES
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

        coracao.style.transform =
          "translateY(-130vh) rotate(" +
          Math.random() * 500 +
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
