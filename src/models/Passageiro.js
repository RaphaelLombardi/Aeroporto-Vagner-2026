export default class Passageiro {
    constructor(nome, passaporte) {
        this.nome = nome;
        this.passaporte = passaporte;
        this.estaNoEmbarque = false;
    }
    realizarCheckInSeguranca() {
        this.estaNoEmbarque = true;
    }
}