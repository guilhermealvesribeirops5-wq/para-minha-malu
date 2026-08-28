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
  // CARTINHAS COLECIONÁVEIS — 0/3
  // ==================================================

  const cartinhasEncontradas = new Set();

  const painelCartinhas = document.createElement("section");
  painelCartinhas.className = "painel-cartinhas";
  painelCartinhas.innerHTML = `
    <div class="painel-cartinhas-topo">
      <div>
        <small>💌 MISSÃO ESPECIAL</small>
        <strong>Encontre as 3 cartinhas da nossa história</strong>
      </div>
      <span class="contador-cartinhas">0/3</span>
    </div>

    <div class="progresso-cartinhas">
      <span class="cartinha-status" data-cartinha="1">1</span>
      <i></i>
      <span class="cartinha-status" data-cartinha="2">2</span>
      <i></i>
      <span class="cartinha-status" data-cartinha="3">3</span>
    </div>

    <p class="painel-cartinhas-dica">
      Não precisa procurar no escuro: as dicas abaixo mostram exatamente onde estão. ❤️
    </p>

    <div class="atalhos-cartinhas">
      <a href="#memorias">💌 1 — Memórias</a>
      <a href="#carta">💌 2 — Carta</a>
      <button type="button" class="atalho-coracao-topo">💗 3 — Coração do topo</button>
    </div>
  `;

  const menuParaCartinhas = document.querySelector(".menu-historia");
  if (menuParaCartinhas) {
    menuParaCartinhas.insertAdjacentElement("afterend", painelCartinhas);
  }

  const contadorCartinhas = painelCartinhas.querySelector(".contador-cartinhas");

  function atualizarProgressoCartinhas() {
    contadorCartinhas.textContent = cartinhasEncontradas.size + "/3";

    painelCartinhas.querySelectorAll(".cartinha-status").forEach(function (item) {
      const numero = Number(item.dataset.cartinha);
      item.classList.toggle("encontrada", cartinhasEncontradas.has(numero));
      item.textContent = cartinhasEncontradas.has(numero) ? "✓" : numero;
    });

    if (cartinhasEncontradas.size === 3) {
      painelCartinhas.classList.add("completo");
      painelCartinhas.querySelector(".painel-cartinhas-dica").innerHTML =
        "✨ Você encontrou todas! A surpresa secreta final foi desbloqueada lá no fim da página. ❤️";

      const surpresaColecao = document.getElementById("surpresaColecao");
      if (surpresaColecao) {
        surpresaColecao.classList.add("desbloqueada");
        surpresaColecao.querySelector(".surpresa-colecao-status").textContent =
          "🔓 DESBLOQUEADA";
        surpresaColecao.querySelector(".surpresa-colecao-botao").disabled = false;
      }
    }
  }

  function registrarCartinha(numero, titulo, mensagem) {
    const nova = !cartinhasEncontradas.has(numero);
    cartinhasEncontradas.add(numero);
    atualizarProgressoCartinhas();

    if (nova) {
      abrirMensagemSecreta(
        "💌 Cartinha " + numero + " de 3 encontrada!",
        mensagem
      );
      criarChuvaDeCoracoes();
    } else {
      abrirMensagemSecreta(titulo, mensagem);
    }
  }

  const atalhoTopo = painelCartinhas.querySelector(".atalho-coracao-topo");
  if (atalhoTopo) {
    atalhoTopo.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(function () {
        const coracao = document.querySelector(".topbar-logo span");
        if (coracao) {
          coracao.classList.add("coracao-topo-destaque");
          setTimeout(function () {
            coracao.classList.remove("coracao-topo-destaque");
          }, 2800);
        }
      }, 450);
    });
  }



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

          setTimeout(
            function () {

              secaoHistoria.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            },
            200
          );

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
  // CONTADOR
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
  // MODAL DAS MENSAGENS SECRETAS
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

  document.body.appendChild(
    modalFoto
  );


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
      "#fotos img"
    );


  fotosGaleria.forEach(
    function (foto) {

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

    }
  );


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

      if (
        event.target === modalFoto
      ) {

        fecharFoto();

      }

    }
  );


  // ==================================================
  // CORAÇÃO ESCONDIDO EM MEMÓRIAS + DICA
  // ==================================================

  const areaSegredo =
    document.getElementById("memorias");


  if (areaSegredo) {

    const dicaMemorias =
      document.createElement("div");

    dicaMemorias.className =
      "dica-segredo dica-memorias";

    dicaMemorias.innerHTML = `
      <span>👀</span>
      <strong>CARTINHA ESCONDIDA AQUI ❤️</strong>
      <small>É fácil: toque no coração escrito “TOCA AQUI”.</small>
    `;

    areaSegredo.appendChild(
      dicaMemorias
    );


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

        registrarCartinha(
          1,
          "Cartinha das Memórias ❤️",
          "Tem lembranças que parecem pequenas para o mundo, mas que eu guardaria para sempre. E adivinha? Esse pedacinho do meu coração já era seu. ❤️"
        );

      }
    );

  }


  // ==================================================
  // SURPRESA DA CARTA + DICA VISÍVEL
  // ==================================================

  const secaoCarta =
    document.getElementById("carta");

  const cartaPrincipal =
    document.querySelector(".letter-card");


  if (
    secaoCarta &&
    cartaPrincipal
  ) {

    const dicaCarta =
      document.createElement("div");

    dicaCarta.className =
      "dica-segredo dica-carta";

    dicaCarta.innerHTML = `
      <span>💌</span>
      <strong>CARTINHA 2: FICA AQUI 3 SEGUNDOS 💌</strong>
      <small>A próxima mensagem vai aparecer sozinha logo abaixo.</small>
    `;

    cartaPrincipal.insertAdjacentElement(
      "afterend",
      dicaCarta
    );


    const mensagemCarta =
      document.createElement("div");

    mensagemCarta.className =
      "mensagem-carta-secreta";

    mensagemCarta.innerHTML = `
      <span>ps...</span>

      <p>
        Se você chegou até aqui,
        eu só quero que saiba
        mais uma coisa:
      </p>

      <strong>
        mesmo nos dias em que
        você duvidar,
        eu vou continuar
        escolhendo você. ❤️
      </strong>
    `;

    dicaCarta.insertAdjacentElement(
      "afterend",
      mensagemCarta
    );


    let cartaAtivada =
      false;


    function ativarCarta() {

      if (cartaAtivada) return;

      cartaAtivada =
        true;

      dicaCarta.classList.add(
        "esperando"
      );

      setTimeout(
        function () {

          mensagemCarta.classList.add(
            "ativa"
          );

          registrarCartinha(
            2,
            "Cartinha para quando você tiver dúvidas 💌",
            "Mesmo nos dias em que você duvidar, eu vou continuar escolhendo você. ❤️"
          );

          dicaCarta.classList.remove(
            "esperando"
          );

          dicaCarta.classList.add(
            "descoberta"
          );

          dicaCarta.querySelector("strong").textContent =
            "Você esperou... então merece ver isso. ❤️";

          dicaCarta.querySelector("small").textContent =
            "Olha logo abaixo.";

        },
        3000
      );

    }


    if (
      "IntersectionObserver"
      in window
    ) {

      const observarCarta =
        new IntersectionObserver(
          function (entradas) {

            entradas.forEach(
              function (entrada) {

                if (
                  entrada.isIntersecting
                ) {

                  ativarCarta();

                  observarCarta.disconnect();

                }

              }
            );

          },
          {
            threshold: 0.05
          }
        );


      observarCarta.observe(
        cartaPrincipal
      );

    } else {

      ativarCarta();

    }

  }


  // ==================================================
  // SEGREDO DOS 5 TOQUES — DICA SEM COBRIR O MENU
  // ==================================================

  const coracaoTopo =
    document.querySelector(
      ".topbar-logo span"
    );

  const topbar =
    document.querySelector(".topbar");


  if (
    coracaoTopo &&
    topbar
  ) {

    const dicaTopo =
      document.createElement("div");

    dicaTopo.className =
      "dica-topo-coracao";

    dicaTopo.innerHTML = `
      <span>💗</span>
      <strong>SEGREDO:</strong>
      toque 5x no coração rosa
    `;

    topbar.insertAdjacentElement(
      "afterend",
      dicaTopo
    );


    coracaoTopo.style.cursor =
      "pointer";

    coracaoTopo.style.userSelect =
      "none";

    let quantidadeToques =
      0;

    let tempoReset =
      null;


    coracaoTopo.addEventListener(
      "click",
      function () {

        quantidadeToques++;

        coracaoTopo.style.transform =
          "scale(1.35)";

        coracaoTopo.style.display =
          "inline-block";

        if (quantidadeToques === 1) {
          dicaTopo.innerHTML =
            "<span>💗</span><strong>1/5</strong> continua...";
        }

        if (quantidadeToques === 2) {
          dicaTopo.innerHTML =
            "<span>💗</span><strong>2/5</strong> mais 3...";
        }

        if (quantidadeToques === 3) {
          dicaTopo.innerHTML =
            "<span>💗</span><strong>3/5</strong> quase lá...";
        }

        if (quantidadeToques === 4) {
          dicaTopo.innerHTML =
            "<span>💗</span><strong>4/5</strong> só mais uma!";
        }

        setTimeout(
          function () {
            coracaoTopo.style.transform =
              "scale(1)";
          },
          170
        );

        clearTimeout(
          tempoReset
        );

        tempoReset =
          setTimeout(
            function () {
              quantidadeToques =
                0;

              dicaTopo.innerHTML =
                "<span>💗</span><strong>SEGREDO:</strong> toque 5x no coração rosa";
            },
            6500
          );

        if (
          quantidadeToques >= 5
        ) {

          quantidadeToques =
            0;

          clearTimeout(
            tempoReset
          );

          dicaTopo.innerHTML =
            "<span>❤️</span><strong>DESCOBRIU!</strong>";

          registrarCartinha(
            3,
            "Segredo do coração do topo 👀❤️",
            "Entre todas as pessoas que poderiam ter aparecido na minha vida, eu agradeço todos os dias por ter sido você, minha timelo."
          );

          setTimeout(
            function () {
              dicaTopo.innerHTML =
                "<span>💗</span><strong>SEGREDO:</strong> toque 5x no coração rosa";
            },
            3500
          );

        }

      }
    );

  }



  // ==================================================
  // QUARTA SURPRESA — TELA CHEIA APÓS 3/3
  // ==================================================

  const surpresaColecao = document.getElementById("surpresaColecao");

  const finalTela = document.createElement("div");
  finalTela.className = "final-tela";
  finalTela.setAttribute("aria-hidden", "true");

  finalTela.innerHTML = `
    <button type="button" class="final-tela-fechar" aria-label="Fechar">×</button>

    <div class="final-tela-foto">
      <img src="imagens/foto-10.jpg" alt="Nós dois">
      <div class="final-tela-overlay"></div>
    </div>

    <div class="final-tela-conteudo">
      <p class="final-tela-mini">VOCÊ ENCONTROU TODAS AS CARTINHAS 💌</p>

      <h2>
        Você chegou até o final...
        <em>mas a nossa história não.</em>
      </h2>

      <p class="final-tela-texto final-frase ativa">
        Se você chegou até aqui, encontrou três pedacinhos do que eu sinto por você.
      </p>

      <p class="final-tela-texto final-frase">
        Mas nenhuma cartinha, nenhuma foto e nenhuma música conseguiria guardar tudo.
      </p>

      <p class="final-tela-texto final-frase">
        Porque o que eu mais quero não é terminar esse site.
        É continuar vivendo coisas com você para ter cada vez mais histórias para colocar aqui.
      </p>

      <div class="final-tela-declaracao">
        Malu, eu escolheria você de novo. ❤️
      </div>

      <button type="button" class="hero-button final-proxima-frase">
        Tenho mais uma coisa para te dizer... ❤️
      </button>

      <p class="final-tela-assinatura">
        Com amor,<br>
        <strong>seu amor, para minha timelo ♥</strong>
      </p>
    </div>
  `;

  document.body.appendChild(finalTela);

  const fecharFinal = finalTela.querySelector(".final-tela-fechar");
  const proximaFrase = finalTela.querySelector(".final-proxima-frase");
  const frasesFinais = Array.from(finalTela.querySelectorAll(".final-frase"));
  const declaracaoFinal = finalTela.querySelector(".final-tela-declaracao");
  const assinaturaFinal = finalTela.querySelector(".final-tela-assinatura");
  let indiceFraseFinal = 0;

  function abrirFinalTela() {
    if (cartinhasEncontradas.size < 3) return;

    indiceFraseFinal = 0;

    frasesFinais.forEach(function (frase, index) {
      frase.classList.toggle("ativa", index === 0);
    });

    declaracaoFinal.classList.remove("ativa");
    assinaturaFinal.classList.remove("ativa");

    proximaFrase.style.display = "";
    proximaFrase.textContent = "Tenho mais uma coisa para te dizer... ❤️";

    finalTela.classList.add("ativa");
    finalTela.setAttribute("aria-hidden", "false");
    document.body.classList.add("final-aberto");

    criarChuvaDeCoracoes();
  }

  function fecharFinalTela() {
    finalTela.classList.remove("ativa");
    finalTela.setAttribute("aria-hidden", "true");
    document.body.classList.remove("final-aberto");
  }

  if (surpresaColecao) {
    const botaoColecao = surpresaColecao.querySelector(".surpresa-colecao-botao");

    if (botaoColecao) {
      botaoColecao.addEventListener("click", abrirFinalTela);
    }
  }

  fecharFinal.addEventListener("click", fecharFinalTela);

  finalTela.addEventListener("click", function (event) {
    if (event.target === finalTela) {
      fecharFinalTela();
    }
  });

  proximaFrase.addEventListener("click", function () {
    indiceFraseFinal += 1;

    if (indiceFraseFinal < frasesFinais.length) {
      frasesFinais[indiceFraseFinal].classList.add("ativa");

      if (indiceFraseFinal === frasesFinais.length - 1) {
        proximaFrase.textContent = "Agora toca aqui, meu amor ❤️";
      }

      return;
    }

    declaracaoFinal.classList.add("ativa");
    assinaturaFinal.classList.add("ativa");
    proximaFrase.style.display = "none";
    criarChuvaDeCoracoes();
  });


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
  // ABRA QUANDO...
  // ==================================================

  const abraCartas = document.querySelectorAll(".abra-carta");
  const abraModal = document.getElementById("abraModal");
  const abraModalTitulo = document.getElementById("abraModalTitulo");
  const abraModalMensagem = document.getElementById("abraModalMensagem");

  if (abraModal && abraCartas.length) {
    const fecharAbraModal = abraModal.querySelector(".abra-modal-fechar");
    const fundoAbraModal = abraModal.querySelector(".abra-modal-fundo");

    function fecharCartinhaAbraQuando() {
      abraModal.classList.remove("ativa");
      abraModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("abra-modal-aberto");
    }

    abraCartas.forEach(function (carta) {
      carta.addEventListener("click", function () {
        abraModalTitulo.textContent = carta.dataset.titulo || "Para você ❤️";
        abraModalMensagem.textContent = carta.dataset.mensagem || "";

        abraModal.classList.add("ativa");
        abraModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("abra-modal-aberto");

        carta.classList.add("ja-aberta");
        criarChuvaDeCoracoes();
      });
    });

    fecharAbraModal.addEventListener("click", fecharCartinhaAbraQuando);
    fundoAbraModal.addEventListener("click", fecharCartinhaAbraQuando);
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
