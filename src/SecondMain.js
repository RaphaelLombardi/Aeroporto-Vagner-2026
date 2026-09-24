import { Voo } from './models/Voo2.js';
import { VooService } from './models/VooService.js';
import { VooView } from './models/VooView.js';

document.getElementById("btnCadastrar").addEventListener("click", () => {
    // 1. Coleta os dados do input
    let codigo = document.getElementById("inputCod").value;
    let destino = document.getElementById("inputDest").value;
    
    // 2. Cria o objeto usando o Model
    let novoVoo = new Voo(codigo, destino);
    
    // 3. Salva usando o Service
    VooService.salvarVoo(novoVoo);
    
    // 4. Atualiza a tela usando a View
    let frotaAtualizada = VooService.obterFrota();
    VooView.renderizarTela(frotaAtualizada);
});

// Bônus: Renderizar a tela assim que a página carregar
window.onload = () => {
    VooView.renderizarTela(VooService.obterFrota());
};

/*
Relatório de Auditoria Preenchido
1. O que significa a sigla SRP (Single Responsibility Principle) e por que aplicamos ela hoje?
R: SRP significa Princípio da Responsabilidade Única. Ele dita que uma classe, módulo ou arquivo deve ter apenas um motivo para mudar — ou seja, deve fazer apenas uma coisa. Aplicamos isso para tornar o código mais fácil de ler, dar manutenção e testar. Quando cada parte do código faz apenas o seu trabalho, um bug na interface não quebra o banco de dados, e vice-versa.

2. Se amanhã o Diretor do Aeroporto pedir para trocar a interface de "Cards" por uma "Tabela de Excel" no HTML, qual NOME DE ARQUIVO exato precisaremos alterar? Por que essa separação evita que a gente estrague o Banco de Dados sem querer?
R: Precisaremos alterar apenas o arquivo da View (ex: VooView.js). Essa separação nos protege porque a lógica que escreve no HTML fica totalmente isolada da lógica que salva os dados no localStorage. Ao mexer no visual, não há risco de apagar ou corromper a função de salvar, pois ela vive em outro arquivo e é independente.

3. Para o código funcionar separado em 4 arquivos, tivemos que usar 'export' e 'import'. O que isso tem a ver com a "Modularização (ES6 Modules)"?
R: A modularização do ES6 permite dividir um programa grande em pedaços menores (módulos). O export torna uma função ou classe "pública" para que outros arquivos possam usá-la. O import permite trazer essas ferramentas exatas para onde são necessárias. Isso evita poluir o escopo global do JavaScript (evitando conflitos de nomes de variáveis) e deixa as dependências do código muito claras.
*/