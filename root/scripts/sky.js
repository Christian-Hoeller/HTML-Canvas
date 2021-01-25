const canvas = document.getElementById('sky');
const context = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

window.addEventListener('click', () => {
    rocket = new Rocket(canvas.width / 2, canvas.height);
});

// window.addEventListener('mousemove', (event) => {
//     mouse.x = event.x;
//     mouse.y = event.y;

//     rocket = new Rocket(mouse.x, mouse.y);
// })

// let mouse = {
//     x: undefined,
//     y: undefined
// }

let sizingFactor = 0.01;

function Star(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 2;
    this.sizingFactor = 0.01;

    this.draw = () => {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = 'white'
        context.fill();
        context.closePath();
    }

    this.update = () => {

        if (this.radius > this.maxRadius || this.radius < this.minRadius) {
            this.sizingFactor = -this.sizingFactor;
        }

        this.radius += this.sizingFactor;

        this.draw();
    }
}

function Rocket(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 70;

    this.draw = () => {
        // left rocket wing
        context.beginPath();
        context.moveTo(this.x, this.y + 175);
        context.quadraticCurveTo(this.x - 70, this.y + 175, this.x - 50, this.y + 240);
        context.quadraticCurveTo(this.x - 50, this.y + 180, this.x, this.y + 200)
        context.strokeStyle = "black"
        context.fillStyle = 'darkred';
        context.lineWidth = 2;
        context.stroke();
        context.fill();
        context.closePath();

        // right rocket wing
        context.beginPath();
        context.moveTo(this.x, this.y + 175);
        context.quadraticCurveTo(this.x + 70, this.y + 175, this.x + 50, this.y + 240);
        context.quadraticCurveTo(this.x + 50, this.y + 180, this.x, this.y + 200)
        context.strokeStyle = "black"
        context.fillStyle = 'darkred';
        context.lineWidth = 2;
        context.stroke();
        context.fill();
        context.closePath();


        // rocket body
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.bezierCurveTo(this.x - 50, this.y + 50, this.x - 50, this.y + 120, this.x - 20, this.y + 200);
        context.lineTo(this.x + 20, this.y + 200);
        context.bezierCurveTo(this.x + 50, this.y + 120, this.x + 50, this.y + 50, this.x, this.y);
        context.strokeStyle = "black"
        context.fillStyle = 'white';
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        // rocket bottom
        context.beginPath();
        context.moveTo(this.x - 19, this.y + 201);
        context.lineTo(this.x - 15, this.y + 215)
        context.lineTo(this.x + 15, this.y + 215)
        context.lineTo(this.x + 19, this.y + 201)
        context.strokeStyle = "black"
        context.fillStyle = 'gray';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.closePath();

        // middle wing
        context.beginPath();
        context.moveTo(this.x - 3, this.y + 175);
        context.lineTo(this.x - 3, this.y + 240);
        context.lineTo(this.x + 3, this.y + 240);
        context.lineTo(this.x + 3, this.y + 175);
        context.lineTo(this.x - 4, this.y + 175);
        context.strokeStyle = "black"
        context.fillStyle = 'red';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.closePath();

        // rocket window
        context.beginPath();
        context.arc(this.x, this.y + 80, 20, 0, Math.PI * 2, false);
        context.strokeStyle = "black"
        context.fillStyle = 'lightgray';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.closePath();

        // rocket inner-window
        context.beginPath();
        context.arc(this.x, this.y + 80, 12, 0, Math.PI * 2, false);
        context.strokeStyle = "black"
        context.fillStyle = 'lightblue';
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.closePath();

        let fuelColors = [
            'red',
            'orange',
            'yellow',
            'gold',
            'darkred',
            'darkorange',

       ]
    
        for (let i = 0; i < 18; i++) {

            let x = (Math.random() - 0.5) * 50;
            let y = (Math.random() - 0.5) * 100;
            let color = fuelColors[Math.floor(Math.random() * fuelColors.length)];

            context.beginPath();
            context.arc(this.x - x, this.y + 340 + y, 25, 0, Math.PI * 2, false);
            context.fillStyle = color;
            context.lineWidth = 2;
            context.fill();
            context.closePath();
        }
    }

    this.update = () => {

        this.y -= 3;
        if (this.y < -500) this.y = canvas.height;
        this.draw();
    }
}

let stars = [];
let rocket = new Rocket(canvas.width / 2, canvas.height / 2);

const init = () => {
    stars = [];

    for (let i = 0; i < 1000; i++) {
        const radius = Math.random() * 1;
        const x = Math.random() * (canvas.width - radius);
        const y = Math.random() * (canvas.height - radius);
        const star = new Star(x, y, radius);
        stars.push(star);
    }

    context.fillStyle = '#000612';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
}


const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#000612';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
    }

    rocket.update();
}

init();
animate();



