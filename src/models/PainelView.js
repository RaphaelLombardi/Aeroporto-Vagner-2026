// RESPONSABILIDADE DE VIEW (Interface e DOM)
export function renderizarTela() {
    let tela = document.getElementById("telaPainel");
    let frota = JSON.parse(localStorage.getItem("frota")) || [];
    
    tela.innerHTML = "";
    frota.forEach(voo => {
        tela.innerHTML += `<div class="card">✈️ ${voo.codigo} - ${voo.destino}</div>`;
    });
}