let frotaAtiva = [
    { codigo: "G3-100", destino: "São Paulo", status: "Embarque", tempoParaDecolagem: 5 },
    { codigo: "LA-222", destino: "Rio de Janeiro", status: "Embarque", tempoParaDecolagem: 10 },
    { codigo: "AZ-999", destino: "Campinas", status: "Aguardando", tempoParaDecolagem: 15 }
];

function renderizarPainel() {
    let tela = document.getElementById("painel");
    tela.innerHTML = "<h2>Painel de Partidas Automático 🛫</h2>";
    
    frotaAtiva.forEach(voo => {
        let cor = voo.status === "Decolado" ? "green" : (voo.tempoParaDecolagem <= 5 ? "red" : "white");
        tela.innerHTML += `
            <div style="color: ${cor}; border: 1px solid gray; margin: 5px; padding: 10px;">
                <strong>${voo.codigo}</strong> para ${voo.destino} <br>
                Status: ${voo.status} | Decola em: ${voo.tempoParaDecolagem}s
            </div>
        `;
    });
}

function varreduraDeRotina() {
    
    frotaAtiva.forEach(voo => {
        if (voo.status === "Decolado") return;
        
        if (voo.tempoParaDecolagem > 0) {
            voo.tempoParaDecolagem -= 1;
        }
        
        if (voo.tempoParaDecolagem === 0) {
            voo.status = "Decolado";
            console.log(`🚨 ATENÇÃO: O voo ${voo.codigo} acaba de decolar!`);
        }
    });
    
    renderizarPainel();
}

console.log("Iniciando Agente IoT da Torre de Controle...");

setInterval(varreduraDeRotina, 1000);

renderizarPainel();