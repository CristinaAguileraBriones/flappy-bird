//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO
let pollitoObj = null

let tuberiasArray = []
let frecuenciaTuberia = 1500
let gameIntervalId = null
let tuberiasIntervalId = null




//* FUNCIONES GLOBALES DEL JUEGO



function startGame () {
console.log("iniciando juego")

// 1. cambiar las pantallas
splashScreenNode.style.display = "none"
gameScreenNode.style.display = "flex"
// 2. añadir todos los elementos iniciales del juego
    pollitoObj = new Pollito()
   


// 3. iniciar el intervalo de juego
gameIntervalId = nullsetInterval(()=>{
    //console.log("Intervalo andando")
    gameLoop()
}, Math.round(1000/60)) // 60fps
tuberiasIntervalId = setInterval(()=>{

        addTuberia()
    }, frecuenciaTuberia)
    detectarSiTuberiaSalio()
    // 4. (opcional) iniciaremos otros intervalos que requiera el juego
}

function gameLoop(){
   
    pollitoObj.gravityEffect() 
    tuberiasArray.forEach((eachTuberia) => {
        eachTuberia.automaticMovement()

    })
    detectarSiTuberiaSalio()
    detectarColisionPollitoTuberias()
    //se ejecuta 60 veces por segundo en el intervalo principal
}

function addTuberia (){

    let randomPositionY = Math.floor(Math.random() * (-150))
    let newTuberia = new Tuberia(randomPositionY, "arriba")
    tuberiasArray.push(newTuberia)
    console.log(tuberiasArray)

    let newTuberiaAbajo = new Tuberia(randomPositionY + 330, "abajo")
    tuberiasArray.push(newTuberiaAbajo)

    console.log(tuberiasArray)
}

function detectarSiTuberiaSalio (){

    if(tuberiasArray.length === 0){
        return //no ejecutar la funcion si el array está vacío
    }

    if((tuberiasArray[0].x + tuberiasArray[0].w) <=0){
        
        tuberiasArray[0].node.remove() 
        tuberiasArray.shift() //sacarlo de javascript
        //sacar del DOM
    }
}

function gameOver (){

    //1. limpiaar los intervalos
    clearInterval(gameIntervalId)
    clearInterval(tuberiasIntervalId)
    //2. limpiar la caja de juego
    gameBoxNode.innerHTML = ""
    // 3. reiniciar todos los elementos del juego
    pollitoObj = null
    tuberiasArray = []
    //3. cambiar de pantallas
    gameScreenNode.style.display = "none"
    gameOverScreenNode.style.display = "flex"
}

function detectarColisionPollitoTuberias(){
    //necesitamos pollito pollitoObj
    //necesitamos cada una de las tuberias ruberiasArray y a través d eun forEach tendremos cada tuberia

    tuberiasArray.forEach((eachTuberia)=>{
        
        if (
            pollitoObj.x < eachTuberia.x + eachTuberia.w &&
            pollitoObj.x + pollitoObj.w > eachTuberia.x &&
            pollitoObj.y < eachTuberia.y + eachTuberia.h &&
            pollitoObj.y + pollitoObj.h > eachTuberia.y
          ) {
            // Collision detected!
            console.log("se ha estampado");
            gameOver()
          } 
    })
}



//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame)
gameBoxNode.addEventListener("click", () => {
    pollitoObj.jump()
})





