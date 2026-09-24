/* =========================================================
RELATÓRIO DE CONECTIVIDADE (Async/Await & UX)
Auditores: [Seu Nome] e [Nome do Copiloto IA]

1. Por que é impossível conectar um sistema na internet sem lidar com o "Assincronismo" (espera)? O que o "await" faz literalmente com a execução do código?
R: Porque a comunicação via internet envolve latência de rede, processamento no servidor e busca em banco de dados, coisas que não acontecem instantaneamente. Se rodássemos isso de forma síncrona, a aplicação inteira iria travar (congelar a tela) esperando a resposta. O "await" pausa temporariamente a execução daquela linha específica do código, liberando a CPU para outras tarefas da interface até que a resposta da Promise chegue.

2. O que acontece com a Experiência do Usuário (UX) se não colocarmos uma mensagem de "Loading..." antes do fetch? 
R: O usuário fica sem feedback visual. Para ele, uma tela sem alteração ou congelada significa que o sistema quebrou ou travou. Isso gera frustração, cliques repetidos desnecessários no mesmo botão e o abandono da aplicação.

3. Para que serve o bloco 'finally' em uma requisição de internet? Por que ele é o lugar perfeito para esconder a animação/texto de "Loading"?
R: O 'finally' garante a execução de um bloco de código independentemente do resultado da requisição (seja ela um sucesso no 'try' ou uma falha no 'catch'). Ele é perfeito para ocultar o 'Loading' porque evita a duplicação de código: você só precisa desligar o indicador de carregamento em um único lugar, garantindo que a tela nunca fique "eternamente carregando" se ocorrer um erro de rede.
=========================================================
*/

class Voo {
    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
    }
}

class RadarService {
    async buscarVoosGlobais() {
        console.log("Iniciando busca no satélite...");
        
        // Usando uma API pública real para simular nossos voos (JSONPlaceholder)
        // Se quiser testar o erro (Catch), basta alterar a URL abaixo para algo inválido
        let resposta = await fetch("https://jsonplaceholder.typicode.com/todos");
        
        if (!resposta.ok) {
            throw new Error("Erro ao conectar com o servidor da Aviation API");
        }

        let dadosJson = await resposta.json();
        
        // Limitando a 5 resultados para o nosso painel e hidratando os objetos
        // Mapeando 'id' como código e 'title' como destino para fins didáticos
        let voosRicos = dadosJson.slice(0, 5).map(dado => new Voo(`AERO-${dado.id}`, dado.title.toUpperCase()));
        
        return voosRicos;
    }
}

// === SIMULAÇÃO DA INTERFACE (DOM) ===
// Nota: Certifique-se de ter um <div id="telaPainel"></div> no seu HTML para rodar no navegador
let painelDOM = document.getElementById("telaPainel") || { innerHTML: "" }; 
let radar = new RadarService();

// Nova função principal para gerenciar o fluxo de UX e inicializar o painel
async function inicializarPainel() {
    try {
        // ESTADO 1: Antes da busca -> Ativa o Loading
        painelDOM.innerHTML = "Buscando dados no satélite... 📡";
        console.log("Painel: Buscando...");

        // Aguarda a resposta real do satélite (Radar)
        let listaPronta = await radar.buscarVoosGlobais();

        // ESTADO 2: Sucesso -> Renderiza os dados na tela
        painelDOM.innerHTML = `<h3>Sucesso! Temos ${listaPronta.length} voos no radar:</h3>`;
        listaPronta.forEach(voo => {
            painelDOM.innerHTML += `<p>✈️ <strong>Voo:</strong> ${voo.codigo} | <strong>Destino:</strong> ${voo.destino}</p>`;
        });

    } catch (erro) {
        // ESTADO 3: Erro -> Trata a falha sem quebrar a aplicação
        console.error("Erro capturado:", erro.message);
        painelDOM.innerHTML = "Falha de Conexão com o Satélite! ❌ <br><small>Verifique sua internet ou tente novamente mais tarde.</small>";
        
    } finally {
        // ESTADO 4: Finalização -> Aqui você esconderia spinners ou loaders gráficos
        console.log("Processo de requisição finalizado (Limpeza de estados).");
    }
}

// Executa a inicialização do painel de forma segura e assíncrona
inicializarPainel();