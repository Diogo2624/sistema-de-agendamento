document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-agendar");
    const fechar = modal.querySelector(".fechar");
    const escolher = document.getElementById("btn-escolher-profissional");
    const profissionais = document.getElementById("profissionais");
    const form = document.getElementById("form-agendar");
    const inputProfissional = document.getElementById("profissional");
    const popupServico = document.getElementById("popup-servico");

    function fecharModal() {
        modal.classList.remove("ativo");
        modal.classList.add("invisivel");
        document.body.style.overflow = "auto";
    }

    fechar.addEventListener("click", fecharModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) fecharModal();
    });

    escolher.addEventListener("click", (e) => {
        e.preventDefault();
        fecharModal();

        setTimeout(() => {
            profissionais.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 250);
    });

    document.querySelectorAll(".btn-agendar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); 

            const selecionados = document.querySelectorAll(".servico-checkbox:checked");
            if (selecionados.length === 0) {
                popupServico.classList.add("mostrar");
                return;
            }

            const prof = btn.getAttribute("data-profissional");
            inputProfissional.value = prof;

            modal.classList.add("invisivel");
            modal.classList.remove("ativo");

            form.submit();
        });
    });

});
