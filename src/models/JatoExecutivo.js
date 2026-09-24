import Voo from './Voo.js';

export default class JatoExecutivo extends Voo {
    constructor(codigo, origem, destino) {
        super(codigo, origem, destino); // Repassa pro Voo (classe mãe)
        this.modoSupersonico = false;
    }

    ativarSupersonico() {
        this.modoSupersonico = true;
        this.altitude = 15000; // Aumenta altitude drasticamente
        console.log(`Jato ${this.codigo} quebrou a barreira do som!`);
    }

    desativarSupersonico() {
        this.modoSupersonico = false;
        this.altitude = 10000;
        console.log(`Jato ${this.codigo} voltou à velocidade de cruzeiro.`);
    }
}