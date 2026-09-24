/* 
=========================================================
RELATÓRIO DE AUDITORIA OOP (Mapeamento e Delegação)
Auditores: Raphael Lombardi

1. Por que um dado JSON (ex: {id: "123"}) que vem da internet não possui os métodos da nossa classe Voo? Como o comando 'new' resolve isso?
R: Um dado JSON é apenas um "Objeto Literal" (dados brutos de texto convertidos para pares de chave/valor), ele não pertence à arquitetura de nenhuma classe. O comando 'new' resolve isso realizando o processo de "Hidratação de Objetos": ele pega esses dados puros, reserva espaço na memória e constrói uma "Instância de Classe" real, vinculando o novo objeto ao molde da classe 'Voo' e liberando acesso a todos os seus métodos.

2. O que aconteceria com a manutenção do sistema se tivéssemos 15 arquivos diferentes avaliando a velocidade do vento manualmente com "IFs", e amanhã a regra mudasse para "ventos > 100"? Por que colocar essa regra dentro do método da Classe Voo salva a nossa vida?
R: Se a regra ficasse espalhada em 15 arquivos e mudasse no futuro, teríamos que procurar e alterar cada um desses "IFs" manualmente, criando um alto risco de esquecer algum e gerar um bug grave (código não manutenível e duplicação). Colocar essa regra encapsulada dentro do método 'avaliarCondicoesClimaticas()' da classe Voo garante a centralização e delegação. Se a regra mudar para "> 100", alteramos apenas em um único lugar (dentro da classe), e todo o sistema adotará a nova regra instantaneamente.
=========================================================
*/

// SISTEMA DE RADAR OOP - REFATORADO COM IAG
class Voo {
    #status;
    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
        this.#status = "Aguardando Leitura do Radar";
    }

    get status() { return this.#status; }

    // MÉTODO OOP: A classe é a única responsável por mudar o próprio status!
    avaliarCondicoesClimaticas(velocidadeDoVento) {
        if (velocidadeDoVento > 80) {
            this.#status = "CANCELADO - Risco de Ciclone";
        } else {
            this.#status = "Liberado para Decolagem";
        }
    }
}

// ---------------------------------------------------------
// SIMULAÇÃO DO SISTEMA PRINCIPAL (Onde o Junior errou feio)
// ---------------------------------------------------------

// Simulação de dados chegando da Internet (JSON)
const dadosDaApi = [
    { id_voo: "G3-111", cidade: "Curitiba", vento_kmh: 90 },
    { id_voo: "LA-222", cidade: "São Paulo", vento_kmh: 40 }
];

console.log("Processando dados do Radar...");

let listaDeVoos = []; 

for (let i = 0; i < dadosDaApi.length; i++) {
    let vooAtual = dadosDaApi[i];
    
    // CORREÇÃO OOP 1: Mapeamento / Hidratação. 
    // Usamos 'new Voo(...)' passando os dados do JSON para criar um "Objeto Rico".
    let meuNovoVoo = new Voo(vooAtual.id_voo, vooAtual.cidade);
    
    // CORREÇÃO OOP 2: Delegação / Encapsulamento.
    // Apagamos o IF manual e chamamos o método da própria classe para tomar a decisão.
    meuNovoVoo.avaliarCondicoesClimaticas(vooAtual.vento_kmh);
    
    // Salvando a verdadeira instância na nossa lista
    listaDeVoos.push(meuNovoVoo);
    
    console.log(`Voo ${meuNovoVoo.codigo} para ${meuNovoVoo.destino} | Status: ${meuNovoVoo.status}`);
}