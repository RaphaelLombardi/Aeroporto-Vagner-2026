export default class PortaoEmbarque {
    constructor(numeroIdentificador) {
        this.numero = numeroIdentificador;
        this.aberto = false;
    }
    abrirPortao() { this.aberto = true; }
}