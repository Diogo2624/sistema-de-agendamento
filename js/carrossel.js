let slideAtual= 0;
const slides = document.querySelectorAll(".slide");
const pontos = document.querySelectorAll(".ponto");

function mostrarSlide(n) {
    if (n >= slides.length) slideAtual = 0;
    if (n < 0) slideAtual = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.classList.toggle("ativo", i === slideAtual);
    });
    pontos.forEach((ponto, i) => {
        ponto.classList.toggle("ativo", i === slideAtual);
    });
}

function mudarSlide(direcao) {
    slideAtual += direcao;
    mostrarSlide(slideAtual);
}

function mudarParaSlide(n) {
    slideAtual = n;
    mostrarSlide(slideAtual);
}