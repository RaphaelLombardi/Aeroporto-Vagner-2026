class Voo {
    #status;

    constructor(codigo, destino) {
        this.codigo = codigo;
        this.destino = destino;
        this.#status = "Aguardando Leitura do Radar";
    }

    get status() { return this.#status; }

    // O objeto agora é o único guardião do seu próprio estado
    avaliarCondicoesClimaticas(velocidadeDoVento) {
        if (velocidadeDoVento > 80) {
            this.#status = "CANCELADO - Risco de Ciclone";
        } else {
            this.#status = "Liberado para Decolagem";
        }
    }
}

// ---------------------------------------------------------
// SOLUÇÃO: Transformando dados em objetos
// ---------------------------------------------------------

const dadosDaApi = [
    { id_voo: "G3-111", cidade: "Curitiba", vento_kmh: 90 },
    { id_voo: "LA-222", cidade: "São Paulo", vento_kmh: 40 }
];

console.log("Processando dados do Radar...");

// Pattern: Mapeamento para Instâncias (Hydration)
// Transformamos dados crus em objetos inteligentes usando .map
const listaDeVoos = dadosDaApi.map(dado => {
    const voo = new Voo(dado.id_voo, dado.cidade);
    // Agora o objeto sabe avaliar suas próprias condições!
    voo.avaliarCondicoesClimaticas(dado.vento_kmh);
    return voo;
});

// Agora temos uma lista de INSTÂNCIAS com comportamento
listaDeVoos.forEach(voo => {
    console.log(`Voo ${voo.codigo} para ${voo.destino} | Status: ${voo.status}`);
});