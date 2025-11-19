document.addEventListener("DOMContentLoaded", () => {

    const btnConfirmar = document.getElementById("btn-confirmar-servicos");
    const modal = document.getElementById("modal-agendar");
    const btnEntendi = document.getElementById("btn-entendi");
    const popup = document.getElementById("popup-servico");

    btnConfirmar.addEventListener("click", () => {
        const selecionados = document.querySelectorAll(".servico-checkbox:checked");

        if (selecionados.length === 0) {
            popup.classList.add("mostrar");
            return;
        }

        let total = 0;
        let servicosArray = [];
        const listaServicos = document.getElementById("lista-servicos");
        const totalServicos = document.getElementById("total-servicos");

        listaServicos.innerHTML = "";

        selecionados.forEach(chk => {
            const nome = chk.previousElementSibling.querySelector("h3").textContent;
            const preco = parseFloat(chk.value);

            const li = document.createElement("li");
            li.textContent = `• ${nome} (R$ ${preco.toFixed(2).replace('.', ',')})`;
            listaServicos.appendChild(li);

            servicosArray.push(nome);
            total += preco;
        });

        totalServicos.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2).replace('.', ',')}`;
        document.getElementById("servicos").value = servicosArray.join(", ");

        modal.classList.add("ativo");
        modal.classList.remove("invisivel");
        document.body.style.overflow = "hidden";
    });

    if (btnEntendi) {
        btnEntendi.addEventListener("click", () => {
            popup.classList.remove("mostrar");
        });
    }
});
