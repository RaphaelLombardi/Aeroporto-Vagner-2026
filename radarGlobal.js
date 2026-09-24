/* 
=========================================================
DOCUMENTAÇÃO DE DEPLOY E ARQUITETURA - AV1
Auditores: Raphael Lombardi

1. Como você usou o Polimorfismo na função iniciarRadar() para exibir informações diferentes sem precisar usar um monte de IFs na hora de escrever no HTML?
R: Utilizamos o Polimorfismo através do método 'gerarRelatorio()'. Após instanciarmos dinamicamente as classes filhas adequadas ('VooComercial' ou 'VooCarga') baseadas no tipo de dado, o laço de repetição (forEach) apenas chama 'voo.gerarRelatorio()'. O JavaScript entende sozinho qual versão do método executar dependendo da instância, eliminando a necessidade de usar IFs na hora de construir o HTML.

2. O que a IA explicou sobre o perigo de expor API Keys no código Front-end? O que são Variáveis de Ambiente?
R: Expor API Keys no JavaScript permite que pessoas mal-intencionadas acessem as chaves inspecionando o código no navegador, abrindo brechas para ataques ao sistema e roubo de cotas de acesso da API. Para resolver isso, usamos Variáveis de Ambiente (.env), que são chaves configuradas de forma segura e oculta no servidor (como na Vercel ou Netlify), protegendo os dados sensíveis e não os enviando para o código público no GitHub.

Links de Entrega:
🔗 Link do GitHub: [COLE O SEU LINK AQUI]
🌐 Link da Hospedagem (Vercel/Netlify): [COLE O SEU LINK AQUI]
=========================================================
*/

// SISTEMA RADAR GLOBAL (AV1) - REVISADO E SEGURO

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

// A FALHA DE SEGURANÇA FOI REMOVIDA DAQUI (Não expor chaves no código!)

// 3. A SIMULAÇÃO DE DADOS DA INTERNET
const dadosDaAPI = [
    { id: "G3-100", tipo: "comercial", qtd: 150 },
    { id: "AZ-999", tipo: "carga", qtd: 80 },
    { id: "LA-200", tipo: "comercial", qtd: 200 }
];

// 4. CORREÇÃO ARQUITETURAL: USO DE FACTORY DINÂMICA
async function iniciarRadar() {
    // Conexão segura sem expor API Key
    console.log("Conectando ao satélite global de forma segura..."); 
    
    let painel = document.getElementById("telaPainel");
    if (painel) {
        painel.innerHTML = "";
    }

    // Instanciação dinâmica com base no tipo do voo (Polimorfismo garantido)
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
        if (painel) {
            painel.appendChild(div);
        }
    });
}

iniciarRadar();