/* 
=========================================================
RELATÓRIO DE AUDITORIA (SERIALIZAÇÃO E RE-HIDRATAÇÃO)
Auditores: [Nome do Aluno A] e [Nome do Aluno B]

1. Por que o formato JSON (JSON.stringify) não consegue salvar "métodos" (funções) de uma classe, salvando apenas os "atributos" (dados textuais)?
R: O formato JSON (JavaScript Object Notation) foi projetado estritamente como um padrão de troca de dados textuais e agnóstico de linguagem. Funções e métodos representam lógica e código executável em memória, e não dados brutos. Por motivos de segurança e especificação do formato, o método JSON.stringify() descarta intencionalmente qualquer função durante a serialização, preservando apenas atributos e propriedades que contêm dados simples (strings, números, booleanos, arrays, etc.).

2. O que o JavaScript perde na memória quando converte um Objeto para JSON? (Explique o que é o Prototype).
R: O JavaScript perde a ligação com a cadeia de protótipos (Prototype Chain). No JS, os métodos de uma classe ficam armazenados no protótipo da classe (ex: Voo.prototype) para otimização de memória. Ao serializar para JSON e depois reconstruir com JSON.parse(), o JS cria um Objeto Literal genérico (POJO), cujo protótipo aponta apenas para Object.prototype. Com isso, o objeto perde o acesso aos métodos originais da classe Voo, ocasionando o erro "is not a function" ao tentar executá-los.

3. Defina o que é "Re-hidratar um Objeto". Como nós consertamos o código do Júnior aplicando essa técnica?
R: "Re-hidratar um objeto" é a técnica de pegar dados crus e estáticos recuperados de uma serialização e usá-los para reinstanciar a classe original, reativando seus métodos e comportamentos. Consertamos o código do Júnior criando uma nova instância com `new Voo(vooRecuperado.codigo, vooRecuperado.origem)` a partir dos dados do JSON, e reatribuindo os estados salvos (ex: `vooHidratado.status = vooRecuperado.status`). Isso reconectou o objeto ao Voo.prototype e permitiu executar o método `decolar()` com sucesso.
=========================================================
*/

// SISTEMA DE LOGBOOK (PERSISTÊNCIA) - REFATORADO COM RE-HIDRATAÇÃO DE OBJETOS
class Voo {
    constructor(codigo, origem) {
        this.codigo = codigo;
        this.origem = origem;
        this.status = "No Solo";
    }

    decolar() {
        this.status = "Em Voo";
        console.log(`🛫 O voo ${this.codigo} acabou de decolar de ${this.origem}!`);
    }
}

console.log("=== SALVANDO O VOO NO DISCO ===");
// 1. O Júnior criou um Voo Rico (com métodos) e salvou no disco (Stringify)
let vooOriginal = new Voo("G3-777", "Curitiba");
console.log("Teste antes de salvar:");
vooOriginal.decolar(); // Aqui funciona perfeitamente!

// Salvando no LocalStorage...
localStorage.setItem("meuLogbook", JSON.stringify(vooOriginal));
console.log("Voo salvo com sucesso no LocalStorage!");

console.log("\n=== LENDO E RE-HIDRATANDO O VOO NO DIA SEGUINTE ===");
// 2. No dia seguinte, ele leu do disco (Parse)
let dadosDoDisco = localStorage.getItem("meuLogbook");
let vooRecuperado = JSON.parse(dadosDoDisco);
console.log("Dados crus recuperados do disco:", vooRecuperado);
console.log("Código recuperado:", vooRecuperado.codigo); // Os atributos estão aí!

// 3. RE-HIDRATAÇÃO DO OBJETO (CONSERTO DA PANE)
// Criamos uma nova instância usando a planta original da classe Voo
let vooHidratado = new Voo(vooRecuperado.codigo, vooRecuperado.origem);

// Restauramos o status mantido no JSON recuperado do disco
vooHidratado.status = vooRecuperado.status;

// 4. MUDANDO O STATUS E DECOLANDO COM SUCESSO!
console.log("Tentando decolar o voo re-hidratado...");
vooHidratado.decolar(); // Funciona perfeitamente e exibe a mensagem de decolagem! 🛫