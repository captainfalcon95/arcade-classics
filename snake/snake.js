
const game_canvas = document.getElementById("game_canvas");
const ctx = game_canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "white";
ctx.strokeRect(0, 0, game_canvas.width, game_canvas.height);

function gameLoop() {
    makeFood();
}

function makeFood() {
    x_coordinate = Math.floor(Math.random()*58) *10;
    y_coordinate = Math.floor(Math.random()*38) * 10;

    console.log(x_coordinate, y_coordinate);

    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.strokeRect(x_coordinate, y_coordinate, 20, 20);
    ctx.fillRect(x_coordinate, y_coordinate, 20, 20);
}

