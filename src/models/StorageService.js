// RESPONSABILIDADE DE SERVIÇO / BANCO DE DADOS
export function salvarVooNoDisco(voo) {
    let frota = JSON.parse(localStorage.getItem("frota")) || [];
    frota.push(voo);
    localStorage.setItem("frota", JSON.stringify(frota));
    console.log("Voo salvo no banco de dados local.");
}