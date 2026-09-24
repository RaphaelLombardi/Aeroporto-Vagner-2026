import Aeroporto from './models/Aeroporto.js';
import Voo from './models/Voo.js';
import JatoExecutivo from './models/JatoExecutivo.js';

// Inicializando o Aeroporto Principal
const aeroportoCWB = new Aeroporto("Afonso Pena");

// Manipulação do DOM: Cadastro de Voo com TRY / CATCH (T1.P2.A8)
document.getElementById("btnRegistrar").addEventListener("click", () => {
    let codigo = document.getElementById("codigo").value;
    let origem = document.getElementById("origem").value;
    let destino = document.getElementById("destino").value;
    let mensagemTela = document.getElementById("mensagemTela");

    try {
        // Tenta criar o voo (pode dar erro se origem == destino)
        let novoVoo = new Voo(codigo, origem, destino);
        
        // Se a linha acima não der erro, salva no Radar usando a Composição
        aeroportoCWB.adicionarVooNoRadar(novoVoo);
        
        mensagemTela.innerText = "Voo cadastrado com sucesso e adicionado ao Radar!";
        mensagemTela.style.color = "green";
    } catch (erro) {
        // Cai aqui caso a regra de negócio da Classe Voo seja violada
        mensagemTela.innerText = erro.message;
        mensagemTela.style.color = "red";
    }
});

// Manipulação do DOM: Jato e Encapsulamento (T1.P2.A7)
let meuJato = new JatoExecutivo("VIP-001", "São Paulo", "Nova York");
const painelCombustivel = document.getElementById("painelCombustivel");
const statusJato = document.getElementById("statusJato");

document.getElementById("btnDecolar").addEventListener("click", () => {
    meuJato.decolar();
    statusJato.innerText = `Status: ${meuJato.status} (Altitude: ${meuJato.altitude}m)`;
});

document.getElementById("btnSupersonico").addEventListener("click", () => {
    meuJato.ativarSupersonico();
    statusJato.innerText = `Status: ${meuJato.status} - SUPERSÔNICO (Altitude: ${meuJato.altitude}m)`;
});

document.getElementById("btnGastar").addEventListener("click", () => {
    meuJato.gastarCombustivel(20);
    // Lendo do Getter de forma segura
    painelCombustivel.innerText = `Combustível: ${meuJato.lerCombustivel}%`; 
});

document.getElementById("btnAbastecerSeguro").addEventListener("click", () => {
    // Escrevendo usando o Setter de forma segura (Encapsulamento)
    meuJato.abastecer = 10; 
    painelCombustivel.innerText = `Combustível: ${meuJato.lerCombustivel}%`;
});

document.getElementById("btnPousar").addEventListener("click", () => {
    // Escrevendo usando o Setter de forma segura (Encapsulamento)
    meuJato.pousar(); 
    statusJato.innerText = `Status: ${meuJato.status} - (Altitude: ${meuJato.altitude}m)`
});