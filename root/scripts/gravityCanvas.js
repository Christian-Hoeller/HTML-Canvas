const canvas = document.getElementById('gravity');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.fillStyle = "red"
        context.stroke();
        context.closePath();
    }

    let gravity = 1;
    let friction = 0.89;

    this.update = () => {

        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        }
        else {
            this.dy += gravity;
        }

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx * friction;
        }
      
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}




const animate = () => {
    requestAnimationFrame(animate);

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++){
        circles[i].update();
    }
}

let circles = [];

const init = () => {

    circles = [];
    for (let i = 0; i < 1000; i++) {
        let radius = 15;
        let y = Math.random() * (canvas.height - radius);
        let x = Math.random() * (canvas.width - radius);
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 10;
        let circle = new Circle(x, y, radius, dx, dy);
        circles.push(circle);
    }
}

init();
animate();

