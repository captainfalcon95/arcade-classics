
const game_canvas = document.getElementById("game_canvas");
const ctx = game_canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "white";
ctx.strokeRect(0, 0, game_canvas.clientWidth, game_canvas.height);

function gameLoop() {
    console.log('Test Function: Working!');
}