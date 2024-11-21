//IMPORTANDO A NAVE DO JOGADOR
import Player from "./classes/Player.js";
import Shoot from "./classes/shoot.js";

//INVOCANDO A TAG CANVAS(CÉU)
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//DEFININDO O TAMANHO DO CÉU
canvas.width = innerWidth;
canvas.height = innerHeight;

//REMOVENDO A SUAVIZAÇÃO DE IMAGEM
ctx.imageSmoothingEnabled = false;

const player = new Player(canvas.width, canvas.height);
const tiro = new Shoot({ x:195, y:700}, -5);

//VALOR DAS TECLAS EM REPOUSO, SÃO ALTERADAS QUANDO PRESSIONADA
const keys = {
    left: false,
    right: false,
};

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //SALVA A POSIÇÃO ATUAL DOS EIXOS X,Y
    ctx.save();
    //DESENHA O TIRO E ATUALIZA
    tiro.draw(ctx);
    tiro.update();

    //DEFINE O EIXO X,Y PARA O CENTRO DA NAVE
    ctx.translate(
        player.position.x + player.width / 2,
        player.position.y + player.height / 2
    );

    //MOVIMENTO E ROTAÇÃO DA NAVE PARA ESQUERDA
    if (keys.left && player.position.x >= 0) {
        player.moveLeft();
        ctx.rotate(-.15);
    }
    
    //MOVIMENTO E ROTAÇÃO DA NAVE PARA DIREITA
    if (keys.right && player.position.x <= canvas.width - player.width) {
        player.moveRight();
        ctx.rotate(.15);
    }

    //REMOVE O EIXO X,Y DO CENTRO DA NAVE
    ctx.translate(
        - player.position.x - player.width / 2,
        - player.position.y - player.height / 2
    )

    //DESENHA A NAVE
    player.draw(ctx);
    //RESTAURA A ROTAÇÃO DA NAVE
    ctx.restore();

    requestAnimationFrame(gameLoop);
};

//FUNÇÃO DE MOVIMENTAR A NAVE QUANDO A TECLA É PRESSIONADA
window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "a") keys.left = true;
    if (key === "d") keys.right = true;
});

//FUNÇÃO DE FREAR A NAVE QUANDO A TECLA É LIBERADA
window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    if (key === "a") keys.left = false;
    if (key === "d") keys.right = false;
});

gameLoop();
