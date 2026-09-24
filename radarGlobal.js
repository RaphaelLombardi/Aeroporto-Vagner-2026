// SISTEMA RADAR GLOBAL (AV1) - CÓDIGO DO DEV JÚNIOR

// 1. AS CLASSES (Mãe e Filhas)
class Voo {
    constructor(codigo) { this.codigo = codigo; }
    gerarRelatorio() { return `Voo genérico ${this.codigo}`; }
}

class VooComercial extends Voo {
    constructor(codigo, passageiros) {
        super(codigo);
        this.passageiros = passageiros;
    }
    gerarRelatorio() { return `✈️ Comercial [${this.codigo}] - ${this.passageiros} vidas a bordo.`; }
}

class VooCarga extends Voo {
    constructor(codigo, cargaToneladas) {
        super(codigo);
        this.cargaToneladas = cargaToneladas;
    }
    gerarRelatorio() { return `📦 Cargueiro [${this.codigo}] - ${this.cargaToneladas}T de carga.`; }
}

// 2. A FALHA DE SEGURANÇA (Chave Exposta!)
const API_KEY = "12345-chave-super-secreta-do-radar";

// 3. A SIMULAÇÃO DE DADOS DA INTERNET
   
const dadosDaAPI = [
    { id: "G3-100", tipo: "comercial", qtd: 150 },
    { id: "AZ-999", tipo: "carga", qtd: 80 },
    { id: "LA-200", tipo: "comercial", qtd: 200 }
];

// 4. O ERRO ARQUITETURAL DO JÚNIOR
async function iniciarRadar() {
    console.log("Conectando ao satélite global de forma segura..."); 
    let painel = document.getElementById("telaPainel");
    painel.innerHTML = "";

    // Instanciação dinâmica com base no tipo do voo (Polimorfismo)
    let voosProcessados = dadosDaAPI.map(dado => {
        if (dado.tipo === "comercial") {
            return new VooComercial(dado.id, dado.qtd);
        } 
        if (dado.tipo === "carga") {
            return new VooCarga(dado.id, dado.qtd);
        }
        return new Voo(dado.id); // Fallback caso apareça um tipo desconhecido
    });

    voosProcessados.forEach(voo => {
        let div = document.createElement("div");
        div.innerHTML = `<h3>${voo.gerarRelatorio()}</h3>`;
        painel.appendChild(div);
    });
}

iniciarRadar();
