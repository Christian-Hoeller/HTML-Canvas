const canvas = document.getElementById('reactive');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: undefined,
    y: undefined
}

let colors = [
    '#6b5b95',
    '#878f99',
    '#b2ad7f',
    '#a2b9bc'
];

window.addEventListener('touchmove', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});


window.addEventListener('resize', () => {
    canvas.width = width;
    canvas.height = height;

    init();
})

let maxRadius = 40;

function Circle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.closePath();
        context.fill();
    }

    this.update = () => {

        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
         if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
              if (this.radius < maxRadius)
                 this.radius += 5;
        }
        else {
            if (this.radius > this.minRadius)
                this.radius--;
        }

        this.draw();
    }
}


let circleArray = [];

const init = () => {
    circleArray = [];
    for (let i = 0; i < 2000; i++) {
        let radius = (Math.random() * 3) + 1;
        let x = Math.random() * (width - radius * 2) + radius;
        let y = Math.random() * (height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        let circle = new Circle(x, y, radius, dx, dy, color);
        circleArray.push(circle);
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}

init();
animate();



