// constant game variables
const GAME_CANVAS = document.getElementById("game_canvas");
const CONTEXT = GAME_CANVAS.getContext("2d");
const CANVAS_BACKGROUND_COLOR = 'black';
const CANVAS_BORDER_COLOR = 'white';
const FOOD_COLOR = 'red';
const SNAKE_COLOR = 'green';
const SNAKE_BORDER_COLOR = 'black'; 
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40; 

// dynamic game variables
let framesPerSecond;
let score;
let changing_direction;
let food_x, food_y;
let snake_dx;
let snake_dy;
let snake;

// initialize the game when window has loaded
window.onload = initialize; 

// sets up the game before calling main loop
function initialize() {
    // beginning game values 
    framesPerSecond = 10;
    score = 0;
    changing_direction = false;
    food_x, food_y;
    snake_dx = 0;
    snake_dy = -20;
    // array used to represent snake position 
    snake = [
        {x:300, y:200},
        {x:300, y:220},
        {x:300, y:240},
        {x:300, y:260},
        {x:300, y:180}
    ]
    // generates first set of food coordinates
    makeFoodCoordinates();
    // create event listener to check for key presses
    document.addEventListener("keydown", changeDirection);
    // begins main game loop 
    window.requestAnimationFrame(gameLoop);
}

// main game loop 
function gameLoop(timeStamp) {
    // time out function used to control speed of loop 
    setTimeout(function(){
        if (playerLost()){
            endGame();
            return;
        } 
        drawCanvas();
        drawFood();
        makeSnake();
        advanceSnake();
        
        // recursive call to continue game loop
        window.requestAnimationFrame(gameLoop);
    // dictates speed of game in fps
    }, 1000 / framesPerSecond);
}

// draw canvas where game takes place
function drawCanvas() {
    CONTEXT.fillStyle = CANVAS_BACKGROUND_COLOR;
    CONTEXT.strokeStyle = CANVAS_BORDER_COLOR;
    CONTEXT.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
    CONTEXT.strokeRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
}

// call drawSnake function on each element in snake array
function makeSnake() {
    snake.forEach(drawSnake);
}

// draw the snake element passed from array 
function drawSnake(part) { 
    CONTEXT.fillStyle = SNAKE_COLOR;
    CONTEXT.strokeStyle = SNAKE_BORDER_COLOR;
    CONTEXT.fillRect(part.x, part.y, 20, 20);
    CONTEXT.strokeRect(part.x, part.y, 20, 20);
}

// returns x and y coordinates for food
function makeFoodCoordinates() {
    // random integers within canvas boundaries
    food_x = Math.floor(Math.random()*29) * 20;
    food_y = Math.floor(Math.random()*19) * 20;
    
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
    CONTEXT.fillStyle = FOOD_COLOR;
    CONTEXT.fillRect(food_x, food_y, 20, 20);
}

// moves snake forward
function advanceSnake() {
    const new_snake_head = makeNewSnakeHead();
    snake.unshift(new_snake_head);
    if (snakeAte()){
        score += 1;
        framesPerSecond += 1;
        document.getElementById('score').innerHTML = score;
        makeFoodCoordinates();
    }
    else {
        snake.pop();
    } 
    makeSnake();
}

// check if snake advanced over food 
function snakeAte() {
    const snake_head = getSnakeHead();
    if (snake_head.x === food_x && snake_head.y === food_y) return true;
    
}

// returns first snake element according to its direction 
function makeNewSnakeHead() {
    return ({x: snake[0].x + snake_dx, 
            y: snake[0].y + snake_dy});
}

// return first element of snake 
function getSnakeHead() {
    return ({x: snake[0].x, 
        y: snake[0].y});
}

// check if player has lost the game 
function playerLost() {
    const snake_head = getSnakeHead();

    if(snakeHitSelf()) return true; 
    else if (snake_head.x < 0 || snake_head.x >= GAME_CANVAS.width) return true;
    else if (snake_head.y < 0 || snake_head.y >= GAME_CANVAS.height) return true;
}

// check if snake has collided into self
function snakeHitSelf() {
    const snake_head = getSnakeHead();
    for(i = 1; i < snake.length; i++)
    {
        if (snake_head.x === snake[i].x && snake_head.y === snake[i].y) return true;
    }
}

// control the direction of snake 
function changeDirection(event) {
    const GOING_LEFT = (snake_dx === -20);
    const GOING_UP = (snake_dy === -20);
    const GOING_RIGHT = (snake_dx === 20);
    const GOING_DOWN = (snake_dy === 20);

    if(changing_direction) return;
    changing_direction = true;
    const key_code = event.keyCode;

    if (key_code === LEFT_KEY && !GOING_RIGHT) {
        snake_dx = -20;
        snake_dy = 0;
    }
    if (key_code === UP_KEY && !GOING_DOWN) {
        snake_dx = 0;
        snake_dy = -20;
    }
    if (key_code === RIGHT_KEY && !GOING_LEFT) {
        snake_dx = 20;
        snake_dy = 0;
    }
    if (key_code === DOWN_KEY && !GOING_UP) {
        snake_dx = 0;
        snake_dy = 20;
    }

    changing_direction = false;
}

// game ending procedure
function endGame() {
    document.getElementById("game").innerHTML = "<h1> GAME OVER\n </h1>" + 
        "<h5 id='finalScore'> Final Score:" + " " + score + "</h5>" +
        "<div><button onclick='window.location.reload();'" + 
        "type='button'>Play Again</button></div>";
}


