import Voo from './Voo.js';

export default class VooCarga extends Voo {
    constructor(codigo, origem, destino, capacidadeMaxima) {
        super(codigo, origem, destino);
        this.capacidadeMaxima = capacidadeMaxima;
        this.cargaAtual = 0;
    }

    embarcarCarga(peso) {
        if (this.cargaAtual + peso > this.capacidadeMaxima) {
            console.log("Erro de Segurança: Limite de carga excedido!");
        } else {
            this.cargaAtual += peso;
            console.log(`Embarcados ${peso}kg. Carga total: ${this.cargaAtual}kg.`);
        }
    }
}