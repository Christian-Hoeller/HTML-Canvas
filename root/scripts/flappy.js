const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let player = new Player(width / 4, height / 2, 20);

function Player(x, y, radius){

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = 1;
    this.moveUpSpeed = 100;
    this.moveDownSpeed = 1;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = "red"
        context.stroke();
        context.closePath();
    }

    this.moveUp = () => {
        this.velocity = 1;
        this.y -= this.moveUpSpeed;
    }

    this.moveDown = () => {
        this.velocity += 0.1;
        this.y += this.moveDownSpeed + this.velocity;
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
    context.clearRect(0, 0, width, height);

    player.draw();
    player.moveDown();
}

animate();