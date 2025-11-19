document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup-status");
    const mensagem = document.getElementById("popup-mensagem");
    const ok = document.getElementById("popup-ok");

    ok.addEventListener("click", () => {
        popup.style.display = "none";
    });

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("status")) {
        popup.style.display = "flex";

        if (urlParams.get("status") === "sucesso") {
            mensagem.textContent = "Agendamento realizado com sucesso!";
        } else if (urlParams.get("status") === "erro") {
            mensagem.textContent = "O horário escolhido já está reservado!";
        } else {
            mensagem.textContent = "Ocorreu um erro inesperado.";
        }   
    }
});
