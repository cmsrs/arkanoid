const canvas = document.createElement("canvas");
canvas.style.border = "2px solid black";
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

// Paddle properties
const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    speed: 5,
    dx: 0
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speed: 4,
    dx: 4,
    dy: -4
};

// Bricks
const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let row = 0; row < brickRowCount; row++) {
    bricks[row] = [];
    for (let col = 0; col < brickColumnCount; col++) {
        bricks[row][col] = { x: 0, y: 0, status: 1 };
    }
}

// Draw paddle
function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Draw bricks
function drawBricks() {
    bricks.forEach((row, r) => {
        row.forEach((brick, c) => {
            if (brick.status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                brick.x = brickX;
                brick.y = brickY;
                ctx.fillStyle = "green";
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            }
        });
    });
}

// Move paddle
function movePaddle() {
    paddle.x += paddle.dx;
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (left/right)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
    }

    // Wall collision (top)
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y) {
        ball.dy *= -1;
    }

    // Brick collision
    bricks.forEach(row => {
        row.forEach(brick => {
            if (brick.status === 1) {
                if (ball.x > brick.x && ball.x < brick.x + brickWidth &&
                    ball.y > brick.y && ball.y < brick.y + brickHeight) {
                    ball.dy *= -1;
                    brick.status = 0;
                }
            }
        });
    });

    // Game over (bottom collision)
    if (ball.y + ball.radius > canvas.height) {
        document.location.reload();
    }
}

// Update game frame
function update() {
    movePaddle();
    moveBall();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    
    requestAnimationFrame(update);
}


// Keyboard events
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") paddle.dx = paddle.speed;
    if (e.key === "ArrowLeft") paddle.dx = -paddle.speed;
});

document.addEventListener("keyup", () => {
    paddle.dx = 0;
});

// Start game
update();

