export default class TorreControle {
    constructor(frequenciaRadio) {
        this.frequenciaRadio = frequenciaRadio;
    }
    autorizarPouso(voo) { console.log(`Pouso autorizado para ${voo.codigo}`); }
}