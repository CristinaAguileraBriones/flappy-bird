class Pollito {

    constructor(){
        // todos los pollitos se crearán con estos valores
        this.x = 50
        this.y = 50
        this.h = 35
        this.w = 40
        this.gravitySpeed = 2
        this.jumpSpeed = 35

        // 1. añadir el pollito al DOM
        this.node = document.createElement("img")
        this.node.src = "./images/flappy.png"
        gameBoxNode.append(this.node)
        // 2. ajustar dimensiones y posiciones
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`
        this.node.style.position = "absolute" //ajusta top y tal posicionado en la caja de juego que tiene relative
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
    }

    gravityEffect(){
        this.y+= this.gravitySpeed
        //! Siempre que modificamos posicion o dimensión, ajustamos el nodo
        this.node.style.top = `${this.y}px`
        //estrellarse en el suelo
        if((this.y + this.h)>= gameBoxNode.offsetHeight)
            gameOver()

    }

    jump()
{
    this.y -= this.jumpSpeed
    this.node.style.top = `${this.y}px`
}



}