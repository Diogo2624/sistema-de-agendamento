document.addEventListener("DOMContentLoaded", () => {
  const botoesAgendar = document.querySelectorAll(".btn-agendar");
  const popup = document.getElementById("popup-servico");
  const btnEntendi = document.getElementById("btn-entendi");
  const containerServicos = document.querySelector(".container2");

  
  function verificarServicosSelecionados() {
    const checkboxes = document.querySelectorAll(".servico-checkbox");
    return Array.from(checkboxes).some(cb => cb.checked);
  }

  
  function mostrarPopup() {
    const servicosSelecionados = verificarServicosSelecionados();

    if (!servicosSelecionados) {
        if (containerServicos) {
        const offset = containerServicos.offsetTop - window.innerHeight / 4;
        window.scrollTo({ top: offset, behavior: "smooth" });
        }

    
        setTimeout(() => {
        popup.classList.add("mostrar");
        }, 500);

        return true; 
    }

    return false; 
    }


  
  if (btnEntendi) {
    btnEntendi.addEventListener("click", () => {
      popup.classList.remove("mostrar");
    });
  }

  
  botoesAgendar.forEach(botao => {
    botao.addEventListener("click", e => {
      e.preventDefault();

      
      if (mostrarPopup()) return;

      
      const modalAgendar = document.getElementById("modal-agendar");
      if (modalAgendar) {
        modalAgendar.classList.add("ativo");
        document.body.style.overflow = "hidden";
      }
    });
  });
});
