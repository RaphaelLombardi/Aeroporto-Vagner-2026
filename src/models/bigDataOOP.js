/* 
=========================================================
RELATÓRIO DE AUDITORIA DE BIG DATA (Paradigma Funcional)
Auditores: Raphael Lombardi

1. Defina com suas palavras a diferença entre '.filter()' e '.map()'. O que o Array de saída tem de diferente do Array de entrada em cada caso?
R: O '.filter()' testa cada item do array original e retorna um novo array contendo apenas os itens que passaram no teste (portanto, o array de saída geralmente tem um tamanho menor). Já o '.map()' transforma os dados; ele percorre todos os itens e devolve um novo array exatamente do mesmo tamanho, mas com o conteúdo modificado ou extraído de cada elemento.

2. O que o método '.reduce()' faz? Por que ele precisa de um parâmetro extra (o "acumulador") que o map e filter não precisam?
R: O '.reduce()' pega um array cheio de itens e os "reduz" a um único valor final (como a soma total de passageiros). Ele precisa do "acumulador" porque essa variável atua como uma memória temporária que guarda o resultado contínuo de cada repetição, somando o item atual ao que já foi acumulado nas voltas anteriores.

3. Por que o código usando "filter/map/reduce" (Declarativo) é considerado melhor no mercado de trabalho do que um monte de laços "for" (Imperativo)?
R: O código declarativo é mais elegante porque foca "no que" queremos fazer, não em "como" a máquina deve fazer. Com ele, não precisamos gerenciar variáveis soltas ou índices (i++), resultando em um código mais legível, direto, com menos linhas e menor probabilidade de introduzir bugs ocultos.
=========================================================
*/

// SISTEMA DE RELATÓRIOS DO AEROPORTO - REFATORADO COM IAG
class Voo {
    constructor(codigo, companhia, status, passageiros) {
        this.codigo = codigo;
        this.companhia = companhia;
        this.status = status;
        this.passageiros = passageiros;
    }
}

// Array de Objetos já "Hidratados" (Instâncias reais)
const frotaAtiva = [
    new Voo("G3-111", "Gol", "Confirmado", 150),
    new Voo("LA-222", "Latam", "Atrasado", 200),
    new Voo("AD-333", "Azul", "Atrasado", 120),
    new Voo("AF-444", "AirFrance", "No Solo", 300)
];

console.log("=== RELATÓRIO PROFISSIONAL (IAG) ===");

// 1. CÓDIGOS DOS VOOS ATRASADOS
// Uso de Method Chaining (Encadeamento): Filtra quem está atrasado e mapeia para pegar só o código.
const codigosAtrasados = frotaAtiva
    .filter(voo => voo.status === "Atrasado")
    .map(voo => voo.codigo);

console.log("Voos Atrasados:", codigosAtrasados);

// 2. SOMA DE TODOS OS PASSAGEIROS
// Uso do Reduce para varrer o array e somar a propriedade 'passageiros' no 'acumulador' (que inicia em 0).
const totalPassageiros = frotaAtiva.reduce((acumulador, voo) => acumulador + voo.passageiros, 0);

console.log("Total de Passageiros voando:", totalPassageiros);