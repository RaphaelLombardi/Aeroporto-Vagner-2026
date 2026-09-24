/* 
=========================================================
RELATÓRIO DE AUDITORIA DE CLEAN CODE E SOLID
Auditores: Raphael Lombardi

1. O que significa a sigla SRP (Single Responsibility Principle) e por que aplicamos ela hoje?
R: SRP significa Princípio da Responsabilidade Única, que determina que uma classe ou arquivo deve ter apenas um motivo para mudar. Aplicamos ela hoje para eliminar a "God Class" (código espaguete), separando os dados, a interface e o acesso ao banco em arquivos diferentes, o que facilita a leitura e evita que a manutenção em uma área quebre outra.

2. Se amanhã o Diretor do Aeroporto pedir para trocar a interface de "Cards" por uma "Tabela de Excel" no HTML, qual NOME DE ARQUIVO exato precisaremos alterar? Por que essa separação evita que a gente estrague o Banco de Dados sem querer?
R: Precisaremos alterar exclusivamente o PainelView.js. Essa separação em camadas evita danos ao banco de dados porque as lógicas estão isoladas; mexer na forma como o dado é desenhado na tela (View) não tem mais contato direto com o motor que salva o dado (Service).

3. Para o código funcionar separado em 4 arquivos, tivemos que usar 'export' e 'import'. O que isso tem a ver com a "Modularização (ES6 Modules)"?
R: A modularização (ES6 Modules) é o recurso que permite dividir um sistema gigante em pequenas peças (módulos). O 'export' expõe funções ou classes para o mundo externo, e o 'import' permite que um arquivo central (main.js) colete essas ferramentas e as conecte em um fluxo único e organizado.
=========================================================
*/

// Importações dos módulos ES6
import Voo from './models/Voo2.js';
// Definido como Voo2.js pois já há um arquivo Voo.js essencial para o código
import { salvarVooNoDisco } from './models/StorageService.js';
import { renderizarTela } from './models/PainelView.js';

// O FLUXO PRINCIPAL (Orquestração)
document.getElementById("btnCadastrar").addEventListener("click", () => {
    let codigo = document.getElementById("inputCod").value;
    let destino = document.getElementById("inputDest").value;
    
    let novoVoo = new Voo(codigo, destino);
    salvarVooNoDisco(novoVoo);
    renderizarTela();
});