const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = "lightgreen"
context.fillRect(1000, 10, 50, 50);
context.fillStyle = "lightblue"
context.fillRect(10, 10, 50, 50);

// drawing a line
context.beginPath();
context.moveTo(100, 100);
context.lineTo(200, 200);
context.lineTo(200, 300);
context.lineTo(100, 100);
context.strokeStyle = "red"
context.stroke();
context.closePath();

// draw a circle

for (let i = 0; i < 1000; i++) {

    const radius = 30;

    const x = (canvas.width - 2 * radius) * Math.random();
    const y = (canvas.height - 2 * radius) * Math.random();

    context.beginPath();
    context.arc(radius + x, radius + y, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

}


