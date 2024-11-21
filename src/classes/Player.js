//AQUI ESTÃO TODAS AS CONFIGURAÇÕES RELACIONADAS AO PERSONAGEM PRINCIPAL(NAVE)

//IMPORTANDO AS CONSTANTES PARA DEIXAR O CÓDIGO MAIS LIMPO
import { 
    url_engine_img, 
    url_spaceship_img, 
    url_engine_sprites_img,
    velocidade_fogo
} from "../utils/constants.js";

class Player {
    //DEFINE O TAMANHO DA NAVE
    constructor(canvasWidth, canvasHeight){
        this.width = 48 * 2;
        this.height = 48 * 2;
        this.speed = 3;
        
        //LIMITE DAS BORDAS NA TELA
        this.position = {
            x: canvasWidth / 2 - 50,
            y: canvasHeight - this.height - 30,
        };

        //IMPORTANDO OS SPRITES
        this.spaceship = this.getImage(url_spaceship_img);
        this.engine = this.getImage(url_engine_img);
        this.engine_sprites = this.getImage(url_engine_sprites_img);

        //VARIAVEIS PARA A TROCA DE SPRITES(FOGO)
        this.sx = 0;
        this.framesChanger = velocidade_fogo;
    }

    //METODO PARA COLOCAR OS SPRITES NA TELA
    getImage(path){
        const image = new Image();
        image.src = path;
        return image;
    }

    //MTD DE MOVIMENTAÇÃO A ESQUERDA
    moveLeft(){
        this.position.x -= this.speed;
    }

    //MTD DE MOVIMENTAÇÃO A DIREITA
    moveRight(){
        this.position.x += this.speed;
    }
    
    //METODO PARA DEFINIR A POSIÇÃO DOS SPRITES, A ORDEM ALTERA A EXIBIÇÃO.
    draw(ctx) {
        //NAVE
        ctx.drawImage(
            this.spaceship, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height);

        //MOTOR
        ctx.drawImage(
            this.engine_sprites,
            this.sx, 0, 48, 48,
            this.position.x,
            this.position.y + 10,
            this.width,
            this.height);

        //FOGO
        ctx.drawImage(
            this.engine,
            this.position.x,
            this.position.y + 5,
            this.width,
            this.height);

            //ALTERANDO O SPRITE DE FOGO
            this.update();
    }

    //METODO DE ALTERAÇÃO ENTRE SPRITES DE FOGO
    update(){
        if (this.framesChanger == 0) {
            this.sx = this.sx == 96 ? 0 : this.sx + 48;
            this.framesChanger = velocidade_fogo;
        }
        this.framesChanger --
    }
};

//EXPORTA O PLAYER PARA SER USADO NO ARQUIVO PRINCIPAL
export default Player;