
// dynamic variables used in game
let framesPerSecond = 10;
let score = 0;
let changing_direction;
let food_x, food_y;
let snake_dx = 0;
let snake_dy = -20;

// const variables used in game
const game_canvas = document.getElementById("game_canvas");
const context = game_canvas.getContext("2d");
const canvas_background_color = 'black';
const canvas_border_color = 'white';
const food_color = 'red';
const snake_color = 'green';
const snake_border_color = 'black'; 
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const goingUp = snake_dy === -20;
const goingDown = snake_dy === 20;
const goingRight = snake_dx === 20;
const goingLeft = snake_dx === -20;

// array used to hold snake position
let snake = [
    {x:300, y:200},
    {x:300, y:180},
    {x:300, y:160},
    {x:300, y:140},
    {x:300, y:120}
]

// initialize the game when window has loaded
window.onload = initialize; 

// set up and begin main game loop
function initialize() {
    // generates first set of food coordinates
    makeFoodCoordinates();
    document.addEventListener("keydown", changeDirection);
    window.requestAnimationFrame(gameLoop);
}

// main game loop 
function gameLoop(timeStamp) {
    setTimeout(function(){
        changing_direction = false;
        drawCanvas();
        makeSnake();
        drawFood();
        advanceSnake();
 
        window.requestAnimationFrame(gameLoop);
    }, 1000 / framesPerSecond);
}

// draw canvas where game takes place
function drawCanvas() {
    context.fillStyle = canvas_background_color;
    context.strokeStyle = canvas_border_color;
    context.fillRect(0, 0, game_canvas.width, game_canvas.height);
    context.strokeRect(0, 0, game_canvas.width, game_canvas.height);
}

// call drawSnake function on each element in snake array
function makeSnake() {
    snake.forEach(drawSnake);
}

// draw the snake element passed from array 
function drawSnake(part) {
    context.fillStyle = snake_color;
    context.strokeStyle = snake_border_color;
    context.fillRect(part.x, part.y, 20, 20);
    context.strokeRect(part.x, part.y, 20, 20);
}

// returns x and y coordinates for food
function makeFoodCoordinates() {
    food_x = Math.floor(Math.random()*58) *10;
    food_y = Math.floor(Math.random()*38) * 10;
    
    // pass each part of snake to isFoodOnSnakeFunction
    snake.forEach(isFoodOnSnake);
}

// check if food coordinates are on any part of the snake
function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == food_x && part.y == food_y;
    if (foodIsOnSnake) makeFoodCoordinates();
}

// draw food in random location on canvas
function drawFood() {
    context.fillStyle = food_color;
    context.fillRect(food_x, food_y, 20, 20);
}

// moves snake forward
function advanceSnake() {
    const snake_head = getSnakeHead();
    snake.unshift(snake_head);
    snake.pop();  
    makeSnake();
}

// returns first snake element according to its direction 
function getSnakeHead() {
    return ({x: snake[0].x + snake_dx, 
            y: snake[0].y + snake_dy});
}

function changeDirection(event) {
    if(changing_direction) return;
    changing_direction = true;
    console.log('event detected');

    const keyPressed = event.keyCode;
    console.log(event.keyCode);
    switch (true) {
        case keyPressed === LEFT_KEY && !goingRight:
            snake_dx = -20;
            snake_dy = 0;
            console.log(!goingRight);
        break;
        case keyPressed === RIGHT_KEY && !goingLeft:
            snake_dx = 20;
            snake_dy = 0;
            console.log('changing direction');
        break;
        case keyPressed === UP_KEY && !goingDown:
            snake_dx = 0;
            snake_dy = -20;
            console.log('changing direction');
        break;
        case keyPressed === DOWN_KEY && !goingUp:
            snake_dx = 0;
            snake_dy = 20;
            console.log('changing direction');
        break;
    }
}


