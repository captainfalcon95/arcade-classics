const game_canvas = document.getElementById("game_canvas");
const ctx = game_canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "white";
ctx.strokeRect(0, 0, game_canvas.width, game_canvas.height);

let snake = [
    {x:300, y:200},
    {x:300, y:180},
    {x:300, y:160},
    {x:300, y:140},
    {x:300, y:120}
]

function gameLoop() {
    makeFood();
    makeSnake();
}

function makeFood() {
    x_coordinate = Math.floor(Math.random()*58) *10;
    y_coordinate = Math.floor(Math.random()*38) * 10;

    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.strokeRect(x_coordinate, y_coordinate, 20, 20);
    ctx.fillRect(x_coordinate, y_coordinate, 20, 20);
}

function makeSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(part) {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "green";
    ctx.strokeRect(part.x, part.y, 20, 20);
    ctx.fillRect(part.x, part.y, 20, 20);
}

