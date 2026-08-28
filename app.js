document.addEventListener("DOMContentLoaded", function () {

  // ==================================================
  // ELEMENTOS PRINCIPAIS
  // ==================================================

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  const btnSurpresa = document.getElementById("btnSurpresa");
  const surpresa = document.getElementById("surpresa");

  const botaoComecar = document.querySelector(
    ".history-hero .hero-button"
  );

  const secaoHistoria = document.getElementById("historia");

  const inicioRelacionamento =
    new Date("2026-03-28T00:00:00");


  // ==================================================
  // MÚSICA
  // ==================================================

  const musica =
    new Audio("musicas/die-with-a-smile.mp3");

  musica.loop = true;
  musica.volume = 0.7;
  musica.preload = "auto";


  const player =
    document.createElement("div");

  player.className = "player-musica";

  player.innerHTML = `
    <div class="player-info">

      <span class="player-icon">
        ♫
      </span>

      <div>
        <strong>
          Die With A Smile
        </strong>

        <small>
          Lady Gaga & Bruno Mars
        </small>
      </div>

    </div>

    <button
      id="btnMusica"
      class="btn-musica"
      type="button"
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


  function atualizarBotaoMusica() {

    if (!btnMusica) return;

    if (musica.paused) {

      btnMusica.textContent = "▶";
      btnMusica.setAttribute(
        "aria-label",
        "Tocar música"
      );

    } else {

      btnMusica.textContent = "❚❚";
      btnMusica.setAttribute(
        "aria-label",
        "Pausar música"
      );

    }

  }


  function iniciarMusica() {

    mostrarPlayer();

    musica
      .play()
      .then(function () {
        atualizarBotaoMusica();
      })
      .catch(function () {
        atualizarBotaoMusica();
      });

  }


  if (botaoComecar) {

    botaoComecar.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        iniciarMusica();

        if (secaoHistoria) {

          setTimeout(function () {

            secaoHistoria.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }, 200);

        }

      }
    );

  }


  if (btnMusica) {

    btnMusica.addEventListener(
      "click",
      function () {

        if (musica.paused) {

          musica
            .play()
            .then(atualizarBotaoMusica)
            .catch(function () {});

        } else {

          musica.pause();
          atualizarBotaoMusica();

        }

      }
    );

  }


  musica.addEventListener(
    "play",
    atualizarBotaoMusica
  );

  musica.addEventListener(
    "pause",
    atualizarBotaoMusica
  );


  // ==================================================
  // CONTADOR DO RELACIONAMENTO
  // ==================================================

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


  // ==================================================
  // GALERIA EM TELA CHEIA
  // ==================================================

  const modalFoto =
    document.createElement("div");

  modalFoto.className = "modal-foto";

  modalFoto.innerHTML = `
    <button
      class="modal-foto-fechar"
      type="button"
      aria-label="Fechar foto"
    >
      ×
    </button>

    <img
      class="modal-foto-imagem"
      src=""
      alt="Nossa memória"
    >

    <div class="modal-foto-coracao">
      ♥
    </div>
  `;

  document.body.appendChild(modalFoto);


  const imagemModal =
    modalFoto.querySelector(
      ".modal-foto-imagem"
    );

  const fecharModal =
    modalFoto.querySelector(
      ".modal-foto-fechar"
    );


  const fotosGaleria =
    document.querySelectorAll(
      "#fotos img, .gallery img, .galeria img"
    );


  fotosGaleria.forEach(function (foto) {

    foto.classList.add(
      "foto-clicavel"
    );

    foto.addEventListener(
      "click",
      function () {

        imagemModal.src =
          foto.src;

        imagemModal.alt =
          foto.alt || "Nossa memória";

        modalFoto.classList.add(
          "ativo"
        );

        document.body.classList.add(
          "modal-aberto"
        );

      }
    );

  });


  function fecharFoto() {

    modalFoto.classList.remove(
      "ativo"
    );

    document.body.classList.remove(
      "modal-aberto"
    );

  }


  fecharModal.addEventListener(
    "click",
    fecharFoto
  );


  modalFoto.addEventListener(
    "click",
    function (event) {

      if (event.target === modalFoto) {
        fecharFoto();
      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        fecharFoto();
      }

    }
  );


  // ==================================================
  // SURPRESA 1
  // CORAÇÃO ESCONDIDO
  // ==================================================

  const areaSegredo =
    document.getElementById("memorias") ||
    document.getElementById("historia");


  if (areaSegredo) {

    const coracaoSecreto =
      document.createElement("button");

    coracaoSecreto.type =
      "button";

    coracaoSecreto.className =
      "coracao-secreto";

    coracaoSecreto.innerHTML =
      "♥";

    coracaoSecreto.setAttribute(
      "aria-label",
      "Segredo"
    );

    areaSegredo.appendChild(
      coracaoSecreto
    );


    coracaoSecreto.addEventListener(
      "click",
      function () {

        abrirMensagemSecreta(
          "Você encontrou um pedacinho secreto do meu coração.",
          "E adivinha? Ele já era seu. ❤️"
        );

        criarChuvaDeCoracoes();

      }
    );

  }


  // ==================================================
  // SURPRESA 2
  // MENSAGEM QUE APARECE NA CARTA
  // ==================================================

  const secaoCarta =
    document.getElementById("carta");


  if (secaoCarta) {

    const mensagemCarta =
      document.createElement("div");

    mensagemCarta.className =
      "mensagem-carta-secreta";

    mensagemCarta.innerHTML = `
      <span>ps...</span>

      <p>
        Se você chegou até aqui,
        eu só quero que saiba mais uma coisa:
      </p>

      <strong>
        mesmo nos dias em que você duvidar,
        eu vou continuar escolhendo você.
        ❤️
      </strong>
    `;

    secaoCarta.appendChild(
      mensagemCarta
    );


    let cartaJaAtivada = false;


    const observarCarta =
      new IntersectionObserver(
        function (entradas) {

          entradas.forEach(
            function (entrada) {

              if (
                entrada.isIntersecting &&
                !cartaJaAtivada
              ) {

                cartaJaAtivada = true;


                setTimeout(
                  function () {

                    mensagemCarta.classList.add(
                      "ativa"
                    );

                  },
                  4000
                );


                observarCarta.disconnect();

              }

            }
          );

        },
        {
          threshold: 0.35
        }
      );


    observarCarta.observe(
      secaoCarta
    );

  }


  // ==================================================
  // SURPRESA 3
  // 5 TOQUES NO CORAÇÃO DO TOPO
  // ==================================================

  const topbar =
    document.querySelector(".topbar");


  if (topbar) {

    const segredoTopo =
      document.createElement("button");

    segredoTopo.type =
      "button";

    segredoTopo.className =
      "segredo-topo";

    segredoTopo.innerHTML =
      "♥";

    segredoTopo.setAttribute(
      "aria-label",
      "Coração"
    );

    topbar.appendChild(
      segredoTopo
    );


    let quantidadeToques = 0;

    let tempoReset = null;


    segredoTopo.addEventListener(
      "click",
      function () {

        quantidadeToques++;


        segredoTopo.classList.add(
          "tocando"
        );


        setTimeout(
          function () {

            segredoTopo.classList.remove(
              "tocando"
            );

          },
          180
        );


        clearTimeout(
          tempoReset
        );


        tempoReset =
          setTimeout(
            function () {
              quantidadeToques = 0;
            },
            4000
          );


        if (quantidadeToques >= 5) {

          quantidadeToques = 0;

          abrirMensagemSecreta(
            "Você descobriu meu segredo. 👀❤️",
            "Entre todas as pessoas que poderiam ter aparecido na minha vida, eu agradeço todos os dias por ter sido você, minha timelo."
          );

          criarChuvaDeCoracoes();

        }

      }
    );

  }


  // ==================================================
  // JANELA DAS MENSAGENS SECRETAS
  // ==================================================

  const modalSegredo =
    document.createElement("div");

  modalSegredo.className =
    "modal-segredo";

  modalSegredo.innerHTML = `
    <div class="modal-segredo-card">

      <button
        type="button"
        class="modal-segredo-fechar"
        aria-label="Fechar"
      >
        ×
      </button>

      <div class="modal-segredo-coracao">
        ♥
      </div>

      <h2
        class="modal-segredo-titulo"
      ></h2>

      <p
        class="modal-segredo-texto"
      ></p>

      <span
        class="modal-segredo-assinatura"
      >
        Para minha Malu ❤️
      </span>

    </div>
  `;

  document.body.appendChild(
    modalSegredo
  );


  const tituloSegredo =
    modalSegredo.querySelector(
      ".modal-segredo-titulo"
    );

  const textoSegredo =
    modalSegredo.querySelector(
      ".modal-segredo-texto"
    );

  const fecharSegredo =
    modalSegredo.querySelector(
      ".modal-segredo-fechar"
    );


  function abrirMensagemSecreta(
    titulo,
    texto
  ) {

    tituloSegredo.textContent =
      titulo;

    textoSegredo.textContent =
      texto;

    modalSegredo.classList.add(
      "ativo"
    );

  }


  function fecharMensagemSecreta() {

    modalSegredo.classList.remove(
      "ativo"
    );

  }


  fecharSegredo.addEventListener(
    "click",
    fecharMensagemSecreta
  );


  modalSegredo.addEventListener(
    "click",
    function (event) {

      if (
        event.target === modalSegredo
      ) {

        fecharMensagemSecreta();

      }

    }
  );


  // ==================================================
  // SURPRESA FINAL
  // ==================================================

  if (
    btnSurpresa &&
    surpresa
  ) {

    btnSurpresa.addEventListener(
      "click",
      function () {

        const aberta =
          surpresa.classList.contains(
            "ativa"
          );


        if (aberta) {

          surpresa.classList.remove(
            "ativa"
          );

          btnSurpresa.innerHTML =
            "Toca aqui, meu amor <span>♥</span>";


        } else {

          surpresa.classList.add(
            "ativa"
          );

          btnSurpresa.innerHTML =
            "Eu te amo, Malu <span>♥</span>";

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


  // ==================================================
  // CHUVA DE CORAÇÕES
  // ==================================================

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
