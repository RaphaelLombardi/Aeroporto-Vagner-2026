/* 
=========================================================
RELATÓRIO DE AUDITORIA (DESIGN PATTERN - SINGLETON)
Auditores: Raphael Lombardi
1. O que é um "Design Pattern" (Padrão de Projeto) e, especificamente, o que o padrão Singleton garante para a nossa aplicação?
R: Um Design Pattern é uma solução genérica e reutilizável para um problema frequente no desenvolvimento de software. O padrão Singleton garante que uma classe possua uma ÚNICA instância em toda a memória da aplicação durante a execução, fornecendo um ponto de acesso centralizado. No nosso sistema, ele garante que todos os setores usem a mesma Torre de Controle, evitando autorizações duplicadas na mesma pista.

2. O que a palavra-chave 'static' (estático) faz em uma classe JavaScript? Qual a diferença de uma variável estática para uma variável comum (this)?
R: A palavra-chave 'static' define propriedades ou métodos que pertencem à classe em si (a "planta") e não às suas instâncias. Uma variável comum (`this.pistaOcupada`) é duplicada a cada novo objeto criado com `new`. Já a variável estática (`TorreDeControle.instancia`) existe em um único local da memória associada à classe, permitindo guardar e compartilhar a instância única do Singleton.

3. Como você comprova no código que 'torreSetorNorte' e 'torreSetorSul' são exatamente o mesmo objeto na memória após a correção? (Dica: tente fazer console.log(torreSetorNorte === torreSetorSul)).
R: Comprovamos utilizando o operador de igualdade estrita (`===`). Ao executar `console.log(torreSetorNorte === torreSetorSul)`, o resultado no console é `true`, provando que ambas as variáveis apontam exatamente para o mesmo endereço de memória.
=========================================================
*/

// SISTEMA DE COMUNICAÇÃO - REFATORADO COM PADRÃO SINGLETON
class TorreDeControle {
    // 1. Atributo estático que guardará a instância única na memória
    static instancia;

    constructor() {
        // 2. Regra de verificação: se a instância já existe, retorna ela mesma!
        if (TorreDeControle.instancia) {
            return TorreDeControle.instancia;
        }

        // Se for a PRIMEIRA vez, inicializa os atributos normalmente:
        this.pistaOcupada = false;
        this.nomeDaTorre = "Torre Central " + Math.floor(Math.random() * 1000); 

        // Salva a referência desta primeira instância no atributo estático
        TorreDeControle.instancia = this;
    }

    autorizarPouso(codigoVoo) {
        if (this.pistaOcupada) {
            console.log(`❌ [RECUSADO] Pista ocupada! Voo ${codigoVoo} aguarde.`);
        } else {
            this.pistaOcupada = true;
            console.log(`✅ [AUTORIZADO] Voo ${codigoVoo} pousando via ${this.nomeDaTorre}.`);
        }
    }
}

// ========================================================
// TESTE DE EXECUÇÃO:

// O sistema da Zona Norte pede uma torre (Cria a instância única)
let torreSetorNorte = new TorreDeControle();

// O sistema da Zona Sul pede uma torre (Recebe A MESMA instância!)
let torreSetorSul = new TorreDeControle();

console.log("--- TESTE DE IDENTIDADE DE INSTÂNCIA ---");
console.log("As duas torres são idênticas na memória?", torreSetorNorte === torreSetorSul); // Retorna: true

console.log("\n--- INICIANDO APROXIMAÇÃO ---");
// O Latam pede pouso para a Torre Norte
torreSetorNorte.autorizarPouso("LATAM-100"); 

// O Gol pede pouso para a Torre Sul (que agora SABE que a pista está ocupada!)
torreSetorSul.autorizarPouso("GOL-200");