export default class Voo {
    // T1.P2.A7: Encapsulamento (Símbolo # torna o atributo privado)
    #combustivel;

    constructor(codigo, origem, destino) {
        // T1.P2.A8: Disparando um erro se houver falha de regra de negócios
        if (origem.toLowerCase() === destino.toLowerCase()) {
            throw new Error("Erro Crítico: A Origem não pode ser igual ao Destino!");
        }

        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.status = "No Solo";
        this.altitude = 0;
        this.#combustivel = 100; // Inicia com tanque cheio
    }

    decolar() {
        this.status = "Em Voo";
        this.altitude = 10000;
        console.log(`Voo ${this.codigo} decolou.`);
    }

    pousar() {
        this.status = "No Solo";
        this.altitude = 0;
        console.log(`Voo ${this.codigo} pousou.`);
    }

    // T1.P2.A7: GETTER para ler a variável privada
    get lerCombustivel() {
        return this.#combustivel;
    }

    // T1.P2.A7: SETTER para modificar com segurança (Guarda-costas)
    set abastecer(valor) {
        if (valor < 0) {
            console.log("Alerta: Não é possível abastecer com valor negativo!");
            return;
        }
        this.#combustivel += valor;
        if (this.#combustivel > 100) this.#combustivel = 100; // Limite de 100%
    }

    gastarCombustivel(valor) {
        if (this.#combustivel - valor < 10) {
            alert("Alerta: Combustível insuficiente para esta manobra!");
        } else {
            this.#combustivel -= valor;
        }
    }
}