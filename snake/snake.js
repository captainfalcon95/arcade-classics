
// constant variables used in game
const game_canvas = document.getElementById("game_canvas");
const ctx = game_canvas.getContext("2d");
const canvas_background_color = 'black';
const canvas_border_color = 'white';
const food_color = 'red';
const snake_color = 'green';
const snake_border_color = 'black'; 

// array used to hold snake position
let snake = [
    {x:300, y:200},
    {x:300, y:180},
    {x:300, y:160},
    {x:300, y:140},
    {x:300, y:120}
]

// draw the canvas where game takes place
ctx.fillStyle = canvas_background_color;
ctx.strokeStyle = canvas_border_color;
ctx.fillRect(0, 0, game_canvas.width, game_canvas.height);
ctx.strokeRect(0, 0, game_canvas.width, game_canvas.height);

// main game loop 
function gameLoop() {
    makeFood();
    makeSnake();
}


// draw food in random location on canvas
function makeFood() {
    x_coordinate = Math.floor(Math.random()*58) *10;
    y_coordinate = Math.floor(Math.random()*38) * 10;
    ctx.fillStyle = food_color;
    ctx.fillRect(x_coordinate, y_coordinate, 20, 20);
}

// call drawSnake function on each element in snake array
function makeSnake() {
    snake.forEach(drawSnake);
}


// draw the snake element passed from array 
function drawSnake(part) {
    ctx.fillStyle = snake_color;
    ctx.strokeStyle = snake_border_color;
    ctx.fillRect(part.x, part.y, 20, 20);
    ctx.strokeRect(part.x, part.y, 20, 20);
}

