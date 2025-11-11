document.addEventListener("DOMContentLoaded", () => {
    const bigode = document.querySelector('.conteudo-banner .bigode');
    let animando = false;

    function iniciarAnimacao() {
        if (animando) return 
        animand = true;
        bigode.classList.add('animar');
    }
    
    bigode.addEventListener('animationend', () => {
        bigode.classList.remove('animar');
        animando = false;
    });

    iniciarAnimacao();

    bigode.addEventListener('mouseenter', iniciarAnimacao);
});

    
    