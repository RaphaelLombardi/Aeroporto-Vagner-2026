/* 
=========================================================
RELATÓRIO DE AUDITORIA DE TEMPO REAL (EVENT LOOP E IOT)
Auditores: Raphael Lombardi

1. Por que um laço infinito comum (while true) congela a aba do navegador, impedindo o usuário de clicar em qualquer botão?
R: O motor padrão do JavaScript é "Single Thread", o que significa que ele possui apenas uma "mão" para executar tarefas e só faz uma coisa de cada vez[cite: 15]. Ao usar um "while (true)", essa única linha de execução fica presa para sempre no laço, bloqueando a "Call Stack" e impedindo o navegador de processar qualquer outra interação do usuário (como cliques ou rolagens), resultando no congelamento da aba[cite: 15].

2. Como o 'Event Loop' e o 'setInterval' trabalham juntos para executar a nossa varredura de voos a cada 5 segundos sem travar a tela principal?
R: Quando usamos o 'setInterval', o JavaScript entrega a tarefa de contar o tempo para o navegador através das Web APIs, deixando a sua "mão" livre[cite: 15]. Ao fim de 5 segundos, o navegador coloca a função na Fila de Tarefas (Task Queue)[cite: 15]. O 'Event Loop' (um vigia constante) verifica se a "Call Stack" está vazia e, estando livre, puxa a função da fila para ser executada rapidamente pelo JavaScript, atualizando a tela de forma assíncrona[cite: 15].

3. Pensando em um sistema do mundo real (IoT), qual o perigo de deixar um setInterval rodando para sempre se fecharmos o painel do aeroporto? (Dica: pesquise sobre clearInterval e Memory Leak).
R: Deixar um robô (setInterval) rodando infinitamente "escondido" gera um "Memory Leak" (vazamento de memória). O sistema continuará consumindo processamento e memória do dispositivo tentando atualizar uma interface que não existe mais, o que pode causar lentidão e travamentos globais. Em cenários reais, devemos sempre guardar a referência do timer e usar a função 'clearInterval()' no momento em que a tela for fechada ou destruída.
=========================================================
*/

// ARQUIVO: AgenteIoTService.js
export default class AgenteIoTService {
    constructor(frota, funcaoRenderizar) {
        this.frota = frota;
        this.renderizar = funcaoRenderizar; // A função que desenha a tela (View)
    }

    iniciarMonitoramentoIncorreto() {
        console.log("Iniciando monitoramento travado...");
        console.log("O código com 'while(true)' trava a 'Call Stack' (Pilha de Chamadas).");
    }

    // O JEITO CERTO (Assincronismo Temporal com Web APIs)
    iniciarMonitoramentoCorreto() {
        console.log("🤖 Agente IoT iniciado. Varredura a cada 5 segundos...");
        
        // Usamos uma Arrow Function () => {} para que o 'this' continue apontando para a classe
        setInterval(() => {
            console.log("Varrendo sensores de frota...");
            
            this.frota.forEach(voo => {
                // Diminui o tempo ou muda o status se o avião já "zerou" o relógio
                if (voo.tempoParaDecolagem > 0) {
                    voo.tempoParaDecolagem -= 1;
                } else if (voo.tempoParaDecolagem === 0 && voo.status !== "Decolado") {
                    voo.status = "Decolado";
                }
            });
            
            // Avisa a View para piscar a tela com os novos dados
            this.renderizar();
            
        }, 5000); // 5000 milissegundos = 5 segundos
    }
}