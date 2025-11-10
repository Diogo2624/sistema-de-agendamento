document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.btn-confirmar');
  const modal = document.getElementById('modal-agendar');
  const fechar = modal.querySelector('.fechar');
  const escolher = document.getElementById('btn-escolher-profissional');
  const profissionais = document.getElementById('profissionais');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      modal.classList.add('ativo');
      document.body.style.overflow = 'hidden';
    });
  });

  fechar.addEventListener('click', fecharModal);
  window.addEventListener('click', e => {
    if (e.target === modal) fecharModal();
  });

  function fecharModal() {
    modal.classList.remove('ativo');
    document.body.style.overflow = 'auto';
  }

  escolher.addEventListener('click', () => {
    fecharModal();
    setTimeout(() => {
      profissionais.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  });
});
