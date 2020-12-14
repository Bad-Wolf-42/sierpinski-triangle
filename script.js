const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const iterations = 5;
let trianglesArray = [];

class Triangle {
  constructor(length, x, y) {
    this.length = length;
    this.height = Math.sin(Math.PI / 3) * this.length;
    this.seed = [x, y];
    this.pointA = [x, y - this.height];
    this.pointB = [x + (this.length / 2), y];
    this.pointC = [x - (this.length / 2), y];
    this.color = 'white';
  }
  divide() {
    trianglesArray.push(new Triangle(this.length / 2, this.seed[0], this.seed[1] - this.height / 2));
    trianglesArray.push(new Triangle(this.length / 2, this.seed[0] - this.length / 4, this.seed[1]));
    trianglesArray.push(new Triangle(this.length / 2, this.seed[0] + this.length / 4, this.seed[1]));
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(...this.pointA);
    ctx.lineTo(...this.pointB);
    ctx.lineTo(...this.pointC);
    ctx.fill();
  }
}

function drawTriangles() {
  for (i = 0; i < trianglesArray.length; i++) {
    trianglesArray[i].draw();
  }
}

function splitTriangles() {
  for (i = 0; i < iterations; i++) {
    let currentLength = trianglesArray.length;
    for (j = 0; j < currentLength; j++) {
      trianglesArray[0].divide();
      trianglesArray.shift();
    }
  }
}

function init() {
  trianglesArray.push(new Triangle(400, canvas.width / 2, 423));
  splitTriangles();
  drawTriangles();
}

init();
