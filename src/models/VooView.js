export class VooView {
    static renderizarTela(frota) {
        let tela = document.getElementById("telaPainel");
        tela.innerHTML = "";
        
        frota.forEach(voo => {
            tela.innerHTML += `<div class="card">✈️ ${voo.codigo} - ${voo.destino}</div>`;
        });
    }
}