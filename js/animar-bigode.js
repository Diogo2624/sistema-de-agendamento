document.addEventListener("DOMContentLoaded", () => {
    const bigode = document.querySelector('.conteudo-banner .bigode');

    
    bigode.classList.add('animar');
    bigode.addEventListener('animationend', () => {
        bigode.classList.remove('animar');
    });

    
    bigode.addEventListener('mouseenter', () => {
        bigode.classList.remove('animar');

        void bigode.offsetWidth;

        bigode.classList.add('animar');
    });

    bigode.addEventListener('animationend', () => {
        bigode.classList.remove('animar');
    });
});