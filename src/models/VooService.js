export class VooService {
    static salvarVoo(voo) {
        let frota = this.obterFrota();
        frota.push(voo);
        localStorage.setItem("frota", JSON.stringify(frota));
        console.log("Voo salvo no banco de dados local.");
    }

    static obterFrota() {
        return JSON.parse(localStorage.getItem("frota")) || [];
    }
}