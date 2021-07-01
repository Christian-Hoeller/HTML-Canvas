const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let player;
let obstacles = [];
let score = 0;

//gameState
let gameOver = false;

function Player(x, y, radius){

    const defaultVelocity = 1;
    const gravity = 0.1;

    let color = "red";

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = defaultVelocity;
    this.moveUpSpeed = 50;
    this.moveDownSpeed = 0.7;

    this.checkCollision = () => {

        //upper / lower screen collisions
        let lowerCollision = this.y + this.radius >= height;
        let upperCollision = this.y - this.radius <= 0;

        //obstacle collisions

        for(let i = 0; i < obstacles.length; i++){
            
            let temp = this.x + this.radius;
            if(temp > obstacles[i].x && temp < obstacles[i].x + obstacles[i].width){
                console.log("between");
                let upperEdge = obstacles[i].obstacleInfo.upperEdge;
                let lowerEdge = obstacles[i].obstacleInfo.lowerEdge;

                let upperEdgeCollision = this.y - this.radius < upperEdge;
                let lowerEdgeCollision = this.y + this.radius > lowerEdge;


                if(upperEdgeCollision || lowerEdgeCollision){
                    console.log("collision")
                    gameOver = true;
                }
            }
        }



        if(lowerCollision || upperCollision){
            let collisionPosition = lowerCollision ? "bottom" : "top";
            console.log(collisionPosition);
            console.log(obstacles[0].obstacleInfo.upperEdge)
            gameOver = true;
        }
    }

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = color;
        context.stroke();
        context.closePath();
    }

    this.moveUp = () => {
        this.velocity = defaultVelocity;
        this.y -= this.moveUpSpeed;
    }

    this.moveDown = () => {

        this.checkCollision();

        this.velocity += gravity;
        this.y += this.moveDownSpeed + this.velocity;
    }
}

function Obstacle(x, obstacleWidth){
    this.moveSpeed = 2;

    this.x = x;
    this.width = obstacleWidth;

    this.countedAsScore = false;

    this.getRandomHeight = () => {
        return Math.random() * (height - this.gap - 2 * this.maxHeight) +  this.maxHeight;
    }

    this.maxHeight = height / 5;
    this.gap = height / 5;
    this.height = this.getRandomHeight();

    this.obstacleInfo = {
        upperEdge: this.height,
        lowerEdge: this.height + this.gap
    }

    this.updateScore = () => {
        if(this.x + this.width < player.x && !this.countedAsScore){
            score++;
            document.getElementById("score").innerHTML = `score: ${score}`;
            this.countedAsScore = true;
        }
    }

    this.draw = () => {
        //upper rect
        context.beginPath();
        context.rect(this.x, 0, this.width, this.height);
        context.stroke();

        //lower rect
        context.beginPath();
        context.rect(this.x, this.height + this.gap, this.width, height - this.height - this.gap - 1);
        context.stroke();
    }

    this.update = () => {
        if(this.x + this.width < 0){
            this.x = width;
            this.countedAsScore = false;

            //get random value
            this.height = this.getRandomHeight();
        }

        this.x -= this.moveSpeed;
    }
}


//#region event listeners

document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp"){
        player.moveUp();
    }
});

//#endregion

const animate = () => {

    requestAnimationFrame(animate);
    if(!gameOver){
        context.clearRect(0, 0, width, height);
        
        //draw player
        player.draw();
        player.moveDown();
        
        //draw obstacles
        for(let i = 0; i < obstacles.length; i++){
            obstacles[i].draw();
            obstacles[i].update();
            obstacles[i].updateScore();
        }
    }
    else{
        if(confirm("play again ?")){
            gameOver = false;
            init();
        }
    }
}

const init = () => {
    context.clearRect(0, 0, width, height);

    //player
    const playerWidth = 20;
    player = new Player(width / 5, height / 2, playerWidth);
    player.draw();

    //obstacles
    obstacles = [];
    const x = width / 3;
    const obstacleWidth = 50;
    const firstObstacle = new Obstacle(x - obstacleWidth / 2, obstacleWidth);
    const secondObstacle = new Obstacle(firstObstacle.x + obstacleWidth / 2 + x, obstacleWidth);
    const thirdObstacle = new Obstacle(secondObstacle.x + obstacleWidth / 2 + x, obstacleWidth);
    
    obstacles.push(firstObstacle);
    obstacles.push(secondObstacle);
    obstacles.push(thirdObstacle);
}

init();
animate();