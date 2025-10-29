document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.navbar a');
    const paginas = document.querySelectorAll(".pagina");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const sectionId = link.getAttribute("data-section");

            paginas.forEach(pagina => pagina.classList.remove("ativa"));

        
            const secaoAtiva = document.getElementById(sectionId);
            if (secaoAtiva) {
                secaoAtiva.classList.add("ativa");
            }
        });
    });
});