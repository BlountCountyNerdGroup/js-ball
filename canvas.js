let canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// Event Listeners
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('keypress', (event) => {
    if ( event.keyCode == 32 ) {
        xDirection = mouse.x / window.innerHeight;
        yDirection =  mouse.y / window.innerHeight;

        init();
    }
})

// Circle Object
function Circle (x, y, dx, dy, radius, fill) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.fillColor = fill;
    
    this.draw = () => {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.fillColor;
        c.fill();
    }

    this.update = () => {

        let topEdge = this.y - this.radius;
        let rightEdge = this.x + this.radius;
        let bottomEdge = this.y + this.radius;
        let leftEdge = this.x - this.radius;

        if ( rightEdge > innerWidth || leftEdge < 0) {
            this.dx = -this.dx;
        } else if ( topEdge < 0 || bottomEdge > innerHeight ) {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        this.draw();

    }
}

let circleArray = [];

function init () {

    // Circle Instance
    let iRadius = 10;
    let iFill = 'white';

    let iX = iRadius;
    let iXSpeed = 18;
    let iXVelocity = xDirection * iXSpeed;

    let iY = iRadius;
    let iYSpeed = 18;
    let iYVelocity = yDirection * iYSpeed;

    circleArray.push(new Circle(iX, iY, iXVelocity, iYVelocity, iRadius, iFill));
}

function animate () {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i <  circleArray.length; i++) {
        circleArray[i].update();
    }

};

init();
animate();