/* ==========================================================================
   RELATÓRIO DE AUDITORIA VIP
   Auditores: [Nome do Aluno A] e [Nome do Aluno B]

   1. Por que o código quebrou na linha do constructor do PassageiroVIP? O que faltava e para que serve?
   R: O código quebrou porque, ao utilizar Herança (extends), o construtor da classe filha é obrigado 
      a chamar o método super() antes de tentar aceder ou modificar qualquer propriedade com o "this". 
      Faltava invocar super(nome, cpfPassado), que serve para chamar o construtor da classe mãe (Passageiro) 
      e inicializar corretamente as propriedades herdadas.

   2. Por que o método exibirCredencial() deu erro de privacidade? Como resolvemos isso usando o conceito de Getter?
   R: Deu erro de privacidade porque a propriedade #cpf possui o símbolo "#", tornando-a estritamente privada 
      da classe Passageiro. O JavaScript impede que qualquer subclasse aceda a este dado diretamente. Resolvemos 
      isso substituindo o "this.#cpf" pelo Getter público "this.lerCpf", que funciona como uma janela segura 
      para ler o valor sem expor a variável interna.

   3. Por que a linha cliente1.#cpf = "000..." é considerada uma falha de segurança (Encapsulamento)?
   R: É uma falha de segurança porque o pilar do Encapsulamento visa proteger os dados internos e sensíveis de um 
      objeto contra alterações externas maliciosas ou acidentais. Permitir que um script mude o CPF diretamente de 
      fora da classe quebraria esta proteção. Como o atributo é privado, esta linha foi removida da execução.
   ========================================================================== */

// CLASSE MÃE - PARAMETRIZADA CORRETAMENTE
class Passageiro {
    #cpf; // Dado sensível, protegido por lei! 

    constructor(nome, cpfPassado) {
        this.nome = nome;
        this.#cpf = cpfPassado;
    }

    // Getter público para leitura segura do CPF [cite: 19]
    get lerCpf() {
        return this.#cpf;
    }
}

// SUBCLASSE - CORRIGIDA COM SUPER E GETTER
class PassageiroVIP extends Passageiro {
    constructor(nome, cpfPassado, categoriaLounge) {
        // CORREÇÃO 1: Adicionado super() para inicializar a classe mãe antes de usar o 'this'
        super(nome, cpfPassado); 
        this.categoriaLounge = categoriaLounge;
    }

    exibirCredencial() {
        // CORREÇÃO 2: Alterado de 'this.#cpf' para 'this.lerCpf' (Uso do Getter herdado)
        console.log(`Passageiro VIP: ${this.nome} | CPF: ${this.lerCpf} | Lounge: ${this.categoriaLounge}`);
    }
}

// FLUXO DE EXECUÇÃO DO SISTEMA
try {
    console.log("Iniciando sistema de embarque VIP...");

    let cliente1 = new PassageiroVIP("Ana Souza", "111.222.333-44", "Diamante");

    // CORREÇÃO 3: A linha 'cliente1.#cpf = "000..."' foi removida.
    // Atributos privados não podem ser alterados diretamente de fora da classe.
    
    // Agora o método roda perfeitamente sem disparar exceções de privacidade
    cliente1.exibirCredencial();

} catch (erro) {
    console.error("ALERTA CRÍTICO NO PORTÃO DE EMBARQUE:", erro.message);
}