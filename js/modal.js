document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById('modal-agendar');
  const fechar = modal.querySelector('.fechar');
  const escolher = document.getElementById('btn-escolher-profissional');
  const profissionais = document.getElementById('profissionais');

  
  function fecharModal() {
    modal.classList.remove('ativo');
    document.body.style.overflow = 'auto';
  }

  fechar.addEventListener('click', fecharModal);

  window.addEventListener('click', e => {
    if (e.target === modal) fecharModal();
  });

  
  escolher.addEventListener('click', () => {
    fecharModal();
    setTimeout(() => {
      profissionais.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  });

  
  const botoesAgendar = document.querySelectorAll(".btn-agendar");

  botoesAgendar.forEach(botao => {
    botao.addEventListener("click", () => {
      const profissional = botao.dataset.profissional;
      document.getElementById("profissional").value = profissional;

      document.getElementById("form-agendar").submit();
    });
  });

});
