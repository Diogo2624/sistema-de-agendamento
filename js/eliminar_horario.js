document.addEventListener("DOMContentLoaded", () => {
    const selectHora = document.getElementById("hora");
    const inputData = document.getElementById("data");
    const inputProf = document.getElementById("profissional");

    function gerarHorarios(dataSelecionada, ocupados = []) {
        selectHora.innerHTML = "<option value=''>Selecione um horário</option>";

        const abertura = 7;
        const fechamento = 20;
        const intervalo = 20;

        let dataHoje = new Date();
        let hojeStr = dataHoje.toISOString().split("T")[0];

        for (let hora = abertura; hora < fechamento; hora++) {
            for (let min = 0; min < 60; min += intervalo) {

                let h = hora.toString().padStart(2, '0');
                let m = min.toString().padStart(2, '0');
                let horarioStr = `${h}:${m}`;

                if (dataSelecionada === hojeStr) {
                    let agoraH = dataHoje.getHours();
                    let agoraM = dataHoje.getMinutes();
                    let agora = agoraH * 60 + agoraM;
                    let horarioMin = hora * 60 + min;

                    if (horarioMin <= agora) continue;
                }

                
                if (ocupados.includes(horarioStr)) continue;

                
                let op = document.createElement("option");
                op.value = horario;
                op.textContent = horario;
                selectHora.appendChild(op);
            }
        }
    }

    
    inputData.addEventListener("change", () => {
        let data = inputData.value;
        let profissional = inputProf.value;

        if (data && profissional) {

            fetch(`../php/get_horarios_ocupados.php?data=${data}&profissional=${profissional}`)
            .then(res => res.json())
            .then(ocupados => gerarHorarios(data, ocupados));
        }
    });

});
