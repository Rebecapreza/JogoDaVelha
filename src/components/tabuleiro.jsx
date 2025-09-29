import Quadrado from "./quadrado";
import { useState } from "react";

export default function Tabuleiro (){

    const [quadrados, setQuadrados] = useState(Array(9).fill(null));
    const [xProximo, setxProximo] = useState(true);

    function handleCLick (i){

        if(quadrados[i]){
            return;
        }

        const nextQuadrado = quadrados.slice();

        if (xProximo){
            nextQuadrado [i] = "X"; 
        } else{
            nextQuadrado [i] = "O"; 
        }

       
        setQuadrados(nextQuadrado); //Atualiza a lista com uma nova lista
        setxProximo(!xProximo); //Troca pra outro jogador


    }

    function reiniciarJogo() {
        setQuadrados(Array(9).fill(null));
        setxProximo(true);
    }

    const venceu = vencedor (quadrados);
    let status;

    if (venceu) {
    status = "🏆 Vencedor é: " + venceu;
    } else if (!quadrados.includes(null)) {
        status = "Deu velha! Empate! 🤝";
    } else {
        status = "🎮 O próximo jogador é: " + (xProximo ? "X" : "O");
    }


    return(
        <>
            <div id="container">
                <h1> Jogo da velha - Rebs</h1>
                <h2>{status}</h2>
                <div id="linha">
                    <Quadrado value = {quadrados[0]} onQuadrado = {() => !venceu && handleCLick(0)}/> 
                    <Quadrado value = {quadrados[1]} onQuadrado = {() => !venceu && handleCLick(1)}/>
                    <Quadrado value = {quadrados[2]} onQuadrado = {() => !venceu && handleCLick(2)}/>
                </div>
                <div id="linha">
                    <Quadrado value = {quadrados[3]} onQuadrado = {() => !venceu && handleCLick(3)}/>
                    <Quadrado value = {quadrados[4]} onQuadrado = {() => !venceu && handleCLick(4)}/>
                    <Quadrado value = {quadrados[5]} onQuadrado = {() => !venceu && handleCLick(5)}/>
                </div>
                <div id="linha">
                    <Quadrado value = {quadrados[6]} onQuadrado = {() => !venceu && handleCLick(6)}/>
                    <Quadrado value = {quadrados[7]} onQuadrado = {() => !venceu && handleCLick(7)}/>
                    <Quadrado value = {quadrados[8]} onQuadrado = {() => !venceu && handleCLick(8)}/>
                </div>
                <button onClick={reiniciarJogo} className="reiniciar-jogo"> Reiniciar Jogo </button>
            </div>
        </>
    )
}

function vencedor(quadrados){
    const linhas = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i< linhas.length; i++){
        const [a,b,c] = linhas[i];

        if (quadrados [a] && quadrados [a] === quadrados [b] && quadrados [a] === quadrados[c])
            return quadrados[a];
    }

    return null;
}