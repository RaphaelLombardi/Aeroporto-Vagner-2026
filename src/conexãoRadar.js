/* =========================================================
RELATÓRIO DE CONECTIVIDADE (Async/Await & UX)
Auditores: Raphael Lombardi

1. Por que é impossível conectar um sistema na internet sem lidar com o "Assincronismo" (espera)? O que o "await" faz literalmente com a execução do código?
R: Porque a comunicação via internet envolve latência de rede, processamento no servidor e busca em banco de dados, coisas que não acontecem instantaneamente. Se rodássemos isso de forma síncrona, a aplicação inteira iria travar (congelar o ecrã) esperando a resposta. O "await" pausa temporariamente a execução daquela linha específica do código, liberando a CPU para outras tarefas da interface até que a resposta da Promise chegue.

2. O que acontece com a Experiência do Usuário (UX) se não colocarmos uma mensagem de "Loading..." antes do fetch? 
R: O utilizador fica sem feedback visual. Para ele, um ecrã sem alteração ou congelado significa que o sistema quebrou ou travou. Isso gera frustração, cliques repetidos desnecessários no mesmo botão e o abandono da aplicação.

3. Para que serve o bloco 'finally' em uma requisição de internet? Por que ele é o lugar perfeito para esconder a animação/texto de "Loading"?
R: O 'finally' garante a execução de um bloco de código independentemente do resultado da requisição (seja ela um sucesso no 'try' ou uma falha no 'catch'). Ele é perfeito para ocultar o 'Loading' porque evita a duplicação de código: você só precisa desligar o indicador de carregamento num único lugar, garantindo que o ecrã nunca fique "eternamente a carregar" se ocorrer um erro de rede.
=========================================================
*/

class Voo {
    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
    }
}

class RadarService {
    // CORREÇÃO 1: try/catch inserido DENTRO do método para encapsular a lógica da requisição
    async buscarVoosGlobais() {
        console.log("Iniciando busca no satélite...");
        
        try {
            // CORREÇÃO 3: Demonstração do Teste de Erro
            // Para testar o Erro e ver a mensagem vermelha no ecrã, descomente a linha abaixo 
            // e comente a linha com o fetch da URL correta:
            // let resposta = await fetch("https://api-invalida-para-forcar-o-erro.com/voos");
            
            // Usando uma API pública real para simular nossos voos (URL Correta)
            let resposta = await fetch("https://jsonplaceholder.typicode.com/todos");
            
            if (!resposta.ok) {
                throw new Error("Erro ao conectar com o servidor da Aviation API");
            }

            let dadosJson = await resposta.json();
            
            // Limitando a 5 resultados para o nosso painel e hidratando os objetos
            let voosRicos = dadosJson.slice(0, 5).map(dado => new Voo(`AERO-${dado.id}`, dado.title.toUpperCase()));
            
            return voosRicos;

        } catch (erro) {
            // Intercepta a falha de rede aqui dentro e repassa para quem chamou o serviço
            console.error("Falha no RadarService:", erro.message);
            throw erro; 
        }
    }
}

// === SIMULAÇÃO DA INTERFACE (DOM) ===
let painelDOM = document.getElementById("telaPainel") || { innerHTML: "" }; 
let radar = new RadarService();

async function inicializarPainel() {
    // Estrutura o HTML para separar o aviso de Loading do conteúdo final
    painelDOM.innerHTML = `
        <div id="avisoLoading">Buscando dados no satélite... 📡</div>
        <div id="resultadoVoos"></div>
    `;
    
    let avisoLoading = document.getElementById("avisoLoading");
    let resultadoVoos = document.getElementById("resultadoVoos");

    try {
        console.log("Painel: Buscando...");

        // Aguarda a resposta real do satélite (Radar)
        let listaPronta = await radar.buscarVoosGlobais();

        // ESTADO DE SUCESSO
        resultadoVoos.innerHTML = `<h3>Sucesso! Temos ${listaPronta.length} voos no radar:</h3>`;
        listaPronta.forEach(voo => {
            resultadoVoos.innerHTML += `<p>✈️ <strong>Voo:</strong> ${voo.codigo} | <strong>Destino:</strong> ${voo.destino}</p>`;
        });

    } catch (erro) {
        // ESTADO DE ERRO
        resultadoVoos.innerHTML = "<h3 style='color: red;'>Falha de Conexão com o Satélite! ❌</h3> <small>Verifique a sua internet ou tente novamente mais tarde.</small>";
        
    } finally {
        // CORREÇÃO 2: O finally agora realiza uma alteração na Experiência do Utilizador (UX)
        // Ele remove ativamente o texto/animação de "Loading" do ecrã!
        if (avisoLoading) {
            avisoLoading.remove();
        }
        console.log("Processo de requisição finalizado (Limpeza visual do Loading executada).");
    }
}

inicializarPainel();