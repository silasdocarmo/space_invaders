class Shoot {
    //DEFINE OS PARÂMETROS DO TIRO
    constructor(position, velocity){
        this.position = position;
        this.width = 2;
        this.height = 20;
        this.velocity = velocity;
    }
    
    //DESENHA O TIRO
    draw(ctx){
        ctx.fillStyle = "white";
        ctx.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height);
    }

    //ATUALIZA A POSIÇÃO DO TIRO NA TELA
    update(){
        this.position.y += this.velocity;
    }
}

//EXPORTA PARA SER USADA NO ARQUIVO PRINCIPAL.
export default Shoot;