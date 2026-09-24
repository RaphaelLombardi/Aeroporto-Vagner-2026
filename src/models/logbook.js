/* 
=========================================================
RELATÓRIO DE AUDITORIA (SERIALIZAÇÃO E RE-HIDRATAÇÃO)
Auditores: Raphael Lombardi

1. Por que o formato JSON (JSON.stringify) não consegue salvar "métodos" (funções) de uma classe, salvando apenas os "atributos" (dados textuais)?
R: O formato JSON foi criado exclusivamente para o transporte e armazenamento de dados de forma estática e universal entre diferentes sistemas. Ele não suporta lógicas de execução. Por isso, ao transformar um objeto para JSON, ele extrai apenas os dados textuais (pares chave-valor) e descarta as funções/métodos automaticamente.

2. O que o JavaScript perde na memória quando converte um Objeto para JSON? (Explique o que é o Prototype).
R: O JavaScript perde a referência do objeto ao seu "Prototype" (Protótipo). O Prototype é um mecanismo interno de memória onde a linguagem armazena o molde da classe (os métodos), para que todas as instâncias compartilhem o mesmo código. Ao voltar do JSON, o dado se torna um Objeto Literal (POJO) comum e "esquece" que um dia pertenceu à classe Voo, perdendo acesso aos métodos.

3. Defina o que é "Re-hidratar um Objeto". Como nós consertamos o código do Júnior aplicando essa técnica?
R: Re-hidratar um objeto significa pegar os dados puros (crus) extraídos de um formato como o JSON e usá-los para instanciar a classe novamente, "ressuscitando" o objeto. Nós consertamos o código criando a variável 'vooHidratado' utilizando o comando 'new Voo(...)', injetando os atributos que vieram do disco (código e origem) para a classe original, e depois restaurando manualmente a propriedade status. Assim, o objeto voltou a ter o método decolar().
=========================================================
*/

// SISTEMA DE LOGBOOK (PERSISTÊNCIA) - REFATORADO COM IAG
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

// Salvando...
localStorage.setItem("meuLogbook", JSON.stringify(vooOriginal));
console.log("Voo salvo com sucesso no LocalStorage!");

console.log("\n=== LENDO O VOO NO DIA SEGUINTE ===");
// 2. No dia seguinte, ele leu do disco (Parse)
let dadosDoDisco = localStorage.getItem("meuLogbook");
let vooRecuperado = JSON.parse(dadosDoDisco);

console.log("Dados recuperados do disco:", vooRecuperado);
console.log("Código recuperado:", vooRecuperado.codigo); 

// 3. O CONSERTO: Re-hidratação de Objetos!
console.log("Re-hidratando o objeto cru recuperado do disco...");

// Criamos uma nova instância usando a planta original da classe:
let vooHidratado = new Voo(vooRecuperado.codigo, vooRecuperado.origem);

// Restauramos o status original (caso ele estivesse atrasado, cancelado ou em voo):
vooHidratado.status = vooRecuperado.status;

// Agora sim, mandamos o vooHidratado decolar!
console.log("Tentando decolar o voo re-hidratado...");
vooHidratado.decolar(); 