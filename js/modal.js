document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-agendar");
    const fechar = modal.querySelector(".fechar");
    const escolher = document.getElementById("btn-escolher-profissional");
    const profissionais = document.getElementById("profissionais");
    const form = document.getElementById("form-agendar");
    const inputProfissional = document.getElementById("profissional");
    const popupServico = document.getElementById("popup-servico");

    const popupStatus = document.getElementById("popup-status");
    const popupMensagem = document.getElementById("popup-mensagem");
    const popupOk = document.getElementById("popup-ok");

    window.formEnviado = false;

    popupOk.addEventListener("click", () => {
        popupStatus.style.display = "none";
    });

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

        
        document.querySelectorAll(".btn-agendar").forEach(btn => {
            btn.classList.add("ativo");
            btn.style.cursor = "pointer";
        });

        setTimeout(() => {
            profissionais.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 250);
    });

    document.querySelectorAll(".btn-agendar").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();

            if (!btn.classList.contains("ativo")) return; 

            if (window.formEnviado) return;

            const selecionados = document.querySelectorAll(".servico-checkbox:checked");
            if (selecionados.length === 0) {
                popupServico.classList.add("mostrar");
                return;
            }

            const prof = btn.getAttribute("data-profissional");
            inputProfissional.value = prof;

            const formData = new FormData(form);

            try {
                const resposta = await fetch("../php/salvar_agendamento.php", {
                    method: "POST",
                    body: formData
                });

                const texto = await resposta.text();
                console.log("RETORNO DO PHP:", texto);

                let dados;
                try {
                    dados = JSON.parse(texto);
                } catch (e) {
                    console.log("ERRO NO JSON:", e);
                    popupMensagem.textContent = "Retorno inválido do servidor.";
                    popupStatus.style.display = "flex";
                    fecharModal();
                    return;
                }

                popupMensagem.textContent = dados.mensagem;
                popupStatus.style.display = "flex";

                fecharModal();
                form.reset();
                window.formEnviado = true;

            } catch (erro) {

                popupMensagem.textContent = "Erro ao conectar com o servidor.";
                popupStatus.style.display = "flex";

                fecharModal();
                window.formEnviado = true;
            }

        });
    });

});
