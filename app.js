document.addEventListener("DOMContentLoaded", () => {

  const btnEntrar =
    document.getElementById("btnEntrar");

  const hero =
    document.getElementById("hero");

  const conteudo =
    document.getElementById("conteudo");

  const btnSurpresa =
    document.getElementById("btnSurpresa");

  const surpresa =
    document.getElementById("surpresa");

  const diasEl =
    document.getElementById("dias");

  const horasEl =
    document.getElementById("horas");

  const minutosEl =
    document.getElementById("minutos");

  const segundosEl =
    document.getElementById("segundos");


  const inicioRelacionamento =
    new Date(
      "2026-03-28T00:00:00"
    );


  // =====================
  // ENTRAR NA HISTÓRIA
  // =====================

  if (
    btnEntrar &&
    hero &&
    conteudo
  ) {

    btnEntrar.addEventListener(
      "click",
      () => {

        hero.classList.add(
          "saindo"
        );

        setTimeout(
          () => {

            hero.style.display =
              "none";

            conteudo.classList.remove(
              "conteudo-escondido"
            );

            conteudo.classList.add(
              "conteudo-visivel"
            );

            window.scrollTo({
              top: 0,
              behavior: "instant"
            });

          },
          650
        );

      }
    );

  }


  // =====================
  // CONTADOR
  // =====================

  function atualizarContador() {

    const agora =
      new Date();

    let diferenca =
      agora -
      inicioRelacionamento;

    if (
      diferenca < 0
    ) {

      diferenca = 0;

    }


    const segundosTotais =
      Math.floor(
        diferenca /
        1000
      );


    const dias =
      Math.floor(
        segundosTotais /
        86400
      );


    const horas =
      Math.floor(
        (
          segundosTotais %
          86400
        ) /
        3600
      );


    const minutos =
      Math.floor(
        (
          segundosTotais %
          3600
        ) /
        60
      );


    const segundos =
      segundosTotais %
      60;


    if (
      diasEl
    ) {
      diasEl.textContent =
        dias;
    }


    if (
      horasEl
    ) {
      horasEl.textContent =
        String(
          horas
        ).padStart(
          2,
          "0"
        );
    }


    if (
      minutosEl
    ) {
      minutosEl.textContent =
        String(
          minutos
        ).padStart(
          2,
          "0"
        );
    }


    if (
      segundosEl
    ) {
      segundosEl.textContent =
        String(
          segundos
        ).padStart(
          2,
          "0"
        );
    }

  }


  atualizarContador();


  setInterval(
    atualizarContador,
    1000
  );


  // =====================
  // SURPRESA FINAL
  // =====================

  if (
    btnSurpresa &&
    surpresa
  ) {

    btnSurpresa.addEventListener(
      "click",
      () => {

        surpresa.classList.toggle(
          "ativa"
        );


        if (
          surpresa.classList.contains(
            "ativa"
          )
        ) {

          btnSurpresa.textContent =
            "Eu te amo, Malu ❤️";

          criarCoracoes();

        } else {

          btnSurpresa.textContent =
            "Toca aqui, meu amor ❤️";

        }

      }
    );

  }


  // =====================
  // CORAÇÕES
  // =====================

  function criarCoracoes() {

    for (
      let i = 0;
      i < 30;
      i++
    ) {

      setTimeout(
        criarCoracao,
        i * 80
      );

    }

  }


  function criarCoracao() {

    const coracao =
      document.createElement(
        "div"
      );


    coracao.textContent =
      Math.random() > 0.25
        ? "❤️"
        : "💕";


    coracao.style.position =
      "fixed";


    coracao.style.left =
      Math.random() *
      100 +
      "vw";


    coracao.style.bottom =
      "-50px";


    coracao.style.fontSize =
      (
        16 +
        Math.random() *
        28
      ) +
      "px";


    coracao.style.zIndex =
      "9999";


    coracao.style.pointerEvents =
      "none";


    coracao.style.opacity =
      "1";


    coracao.style.transition =
      "transform 3.7s linear, opacity 3.7s ease";


    document.body.appendChild(
      coracao
    );


    requestAnimationFrame(
      () => {

        coracao.style.transform =
          `translateY(-${
            110 +
            Math.random() *
            40
          }vh)
          rotate(${
            Math.random() *
            500
          }deg)`;


        coracao.style.opacity =
          "0";

      }
    );


    setTimeout(
      () => {

        coracao.remove();

      },
      3800
    );

  }

});
