document.addEventListener("DOMContentLoaded", () => {
    const bigode = document.querySelector('.conteudo-banner .bigode');

    //repetir a animação quando carregar
    bigode.classList.add('animar');
    bigode.addEventListener('animationend', () => {
        bigode.classList.remove('animar');
    });

    //Repetir a animação se passar o mouse por cima
    bigode.addEventListener('mouseenter', () => {
        bigode.classList.remove('animar');

        void bigode.offsetWidth;

        bigode.classList.add('animar');
    });

    bigode.addEventListener('animationend', () => {
        bigode.classList.remove('animar');
    });
});