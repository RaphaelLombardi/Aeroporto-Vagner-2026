import Voo from './Voo.js';

export default class Aeroporto {
    constructor(nomeDaBase) {
        this.nome = nomeDaBase;
        this.listaDeVoos = []; // Array vazio aguardando composição
    }

    // Composição: Adicionando objetos dentro do Aeroporto
    adicionarVooNoRadar(novoVoo) {
        this.listaDeVoos.push(novoVoo);
        console.log(`Voo ${novoVoo.codigo} detectado no radar do aeroporto ${this.nome}.`);
    }

    // Busca de objetos dentro da lista
    buscarVoo(codigoProcurado) {
        let resultado = this.listaDeVoos.find(v => v.codigo === codigoProcurado);
        if (resultado) {
            return resultado;
        } else {
            return null; // Não encontrou
        }
    }
}