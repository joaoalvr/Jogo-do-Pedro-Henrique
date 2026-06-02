const casas = document.querySelectorAll(".casa");
const statusTexto = document.getElementById("status");

let jogadorAtual = "virus";
let jogoAtivo = true;

let estado = ["","","","","","","","",""];

const combinacoesVitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

casas.forEach(casa => {
    casa.addEventListener("click", jogar);
});

function jogar() {

    const indice = this.dataset.index;

    if(estado[indice] !== "" || !jogoAtivo){
        return;
    }

    estado[indice] = jogadorAtual;

    const img = document.createElement("img");

    if(jogadorAtual === "virus"){
        img.src = "covid.png";
    }else{
        img.src = "vacina.png";
    }

    this.appendChild(img);

    verificarVencedor();

    jogadorAtual = jogadorAtual === "virus" ? "vacina" : "virus";

    if(jogoAtivo){
        statusTexto.textContent =
            jogadorAtual === "virus"
            ? "Vez do Vírus"
            : "Vez da Vacina";
    }
}

function verificarVencedor(){

    for(let combinacao of combinacoesVitoria){

        const [a,b,c] = combinacao;

        if(
            estado[a] &&
            estado[a] === estado[b] &&
            estado[a] === estado[c]
        ){

            statusTexto.textContent =
                estado[a] === "virus"
                ? "Vírus venceu!"
                : "Vacina venceu!";

            jogoAtivo = false;
            return;
        }
    }

    if(!estado.includes("")){
        statusTexto.textContent = "Empate!";
        jogoAtivo = false;
    }
}

function reiniciar(){

    estado = ["","","","","","","","",""];

    jogadorAtual = "virus";
    jogoAtivo = true;

    statusTexto.textContent = "Vez do Vírus";

    casas.forEach(casa => {
        casa.innerHTML = "";
    });
}