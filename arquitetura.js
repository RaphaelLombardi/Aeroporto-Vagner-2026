/* 
=========================================================
RELATÓRIO DE CONSULTORIA ARQUITETURAL
Consultores: Raphael Lombardi [fiz sozinho]

1. O que é uma Classe Abstrata e por que a classe genérica 'Voo' não deve ser instanciada no nosso sistema do aeroporto?
R: Uma classe abstrata atua como um molde estrutural (classe mãe) para outras classes, mas não pode ser instanciada diretamente para virar um objeto. No nosso aeroporto, não faz sentido existir um "Voo genérico"; fisicamente, todo voo tem uma especialização clara (Comercial ou de Carga).

2. Como o JavaScript usa a propriedade 'new.target' para simular a proteção de uma classe abstrata?
R: O 'new.target' é uma metapropriedade que detecta qual construtor foi chamado diretamente pelo operador 'new'. Se verificarmos se 'new.target === Voo' dentro da classe mãe, podemos lançar um erro intencional caso alguém tente criar o objeto genérico, permitindo a instanciação apenas quando o 'new' vier das classes filhas.

3. Defina Polimorfismo com suas palavras e explique como ele resolveu o problema das taxas do Cargueiro e do Voo Comercial.
R: Polimorfismo é a capacidade de um mesmo método se comportar de maneiras diferentes dependendo de qual classe o está invocando. Ele resolveu o problema ao permitir que mantivéssemos o mesmo nome de método ('calcularTaxaEmbarque') na interface, mas sobrescrevendo a matemática interna para multiplicar passageiros (Comercial) ou multiplicar toneladas (Carga).
=========================================================
*/

// SISTEMA DE TAXAS DO AEROPORTO - REFATORADO COM IAG
// Contém soluções de Arquitetura: Abstração via new.target e Polimorfismo

class Voo {
    constructor(codigo) {
        // Bloqueio do Voo Fantasma (Simulação de Classe Abstrata)
        if (new.target === Voo) {
            throw new Error("A classe genérica 'Voo' é abstrata e não pode ser instanciada diretamente.");
        }
        this.codigo = codigo;
    }

    calcularTaxaEmbarque() {
        return 50.00; // Taxa padrão base (será sobrescrita)
    }
}

class VooComercial extends Voo {
    constructor(codigo, qtdPassageiros) {
        super(codigo);
        this.qtdPassageiros = qtdPassageiros;
    }
    
    // Polimorfismo: Sobrescrita de Método (Method Overriding)
    calcularTaxaEmbarque() {
        return this.qtdPassageiros * 50.00;
    }
}

class VooCarga extends Voo {
    constructor(codigo, toneladas) {
        super(codigo);
        this.toneladas = toneladas;
    }
    
    // Polimorfismo: Sobrescrita de Método (Method Overriding)
    calcularTaxaEmbarque() {
        return this.toneladas * 120.00;
    }
}

try {
    // TESTE 1: A Caça ao Voo Fantasma (Deve disparar o catch)
    let vooFantasma = new Voo("GEN-000"); 
    console.log(`Taxa Voo Fantasma: R$ ${vooFantasma.calcularTaxaEmbarque()}`);

} catch (erro) {
    console.error("Erro de Segurança Interceptado:", erro.message);
}

try {
    // TESTE 2: Cobrando a Taxa Certa via Polimorfismo
    let vooLatam = new VooComercial("LAT-123", 100);
    console.log(`Taxa Voo Comercial (100 pax): R$ ${vooLatam.calcularTaxaEmbarque().toFixed(2)}`);

    let cargueiroPesado = new VooCarga("CARGO-99", 500);
    console.log(`Taxa Cargueiro (500 ton): R$ ${cargueiroPesado.calcularTaxaEmbarque().toFixed(2)}`);

} catch (erro) {
    console.error("Erro no sistema:", erro.message);
}