// SISTEMA DE TAXAS DO AEROPORTO - ESCRITO PELO DEV JÚNIOR
// Contém problemas de Arquitetura: Falta de Abstração e Polimorfismo

class Voo {
    constructor(codigo) {
        this.codigo = codigo;
    }

    // O Junior colocou uma taxa fixa para qualquer coisa que voe!
    calcularTaxaEmbarque() {
        return 50.00; // 50 reais de taxa padrão
    }
}

class VooComercial extends Voo {
    constructor(codigo, qtdPassageiros) {
        super(codigo);
        this.qtdPassageiros = qtdPassageiros;
    }
    calcularTaxaEmbarque() {
        return 50.00 + (0.50 * this.qtdPassageiros);
    }
}

class VooCarga extends Voo {
    constructor(codigo, toneladas) {
        super(codigo);
        this.toneladas = toneladas;
    }
    calcularTaxaEmbarque() {
        return 50.00 + (1.50 * this.toneladas);
    }
}

try {
    // ERRO DE ARQUITETURA 1: Instanciar uma classe mãe genérica. 
    // Na vida real, não existe um "Voo" genérico pousando. Ou é Comercial, ou é de Carga!
    let vooFantasma = new VooComercial("COM-000");
    console.log(`Taxa Voo Fantasma: R$ ${vooFantasma.calcularTaxaEmbarque()}`);

    // ERRO DE ARQUITETURA 2: Falta de Polimorfismo.
    // O Cargueiro está pagando 50 reais de taxa ao invés de pagar por tonelada!
    let cargueiroPesado = new VooCarga("CARGO-99", 500);
    console.log(`Taxa Cargueiro: R$ ${cargueiroPesado.calcularTaxaEmbarque()}`);

} catch (erro) {
    console.error("Erro no sistema:", erro.message);
}