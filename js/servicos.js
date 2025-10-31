document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmar = document.getElementById("btn-confirmar-servicos");
    const modal = document.getElementById("modal-agendar");
    if (!modal) {
        console.error("Erro: Elemento modal-agendar não encontrado no HTML.");
        return; 
    }
    
    
    const fechar = modal.querySelector(".fechar"); 

    btnConfirmar.addEventListener("click", () => {
        const selecionados = document.querySelectorAll(".servico-checkbox:checked");

        if (selecionados.length === 0) {
            alert("Por favor, selecione pelo menos um serviço.");
            return; 
        }

        let total = 0;
        const listaServicos = document.getElementById("lista-servicos");
        const totalServicos = document.getElementById("total-servicos");

        listaServicos.innerHTML = ""; 

        selecionados.forEach(chk => {
            
            const label = chk.previousElementSibling; 
            const nome = label.querySelector("h3").textContent;
            
            const preco = parseFloat(chk.value);

            const li = document.createElement("li");
            li.textContent = `• ${nome} (R$ ${preco.toFixed(2).replace('.', ',')})`; 
            listaServicos.appendChild(li);

            total += preco;
        }); 

        totalServicos.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2).replace('.', ',')}`;

        
        modal.classList.add("ativo");
        document.body.style.overflow = "hidden"; 
    });

    
    if (fechar) {
        fechar.addEventListener("click", () => {
            modal.classList.remove("ativo");
            document.body.style.overflow = "auto";
        });
    }

    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("ativo");
            document.body.style.overflow = "auto";
        }
    });
});