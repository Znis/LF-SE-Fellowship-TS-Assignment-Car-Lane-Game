import { DIMENSIONS, LANE_COUNT, LANE_WIDTH, SPEED } from "./constants";
import Line from "./shapes/line";
import Point from "./shapes/point";
import { GameState, stateVariables } from "./state-variables";
import { restartGame, resumeGame } from "./functions";

const canvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

//create the lane lines
const lineArray: Line[] = [];
for (let i = 0; i < LANE_COUNT - 1; i++) {
  const line = new Line(
    new Point(LANE_WIDTH * (i + 1), 0),
    new Point(LANE_WIDTH * (i + 1), DIMENSIONS.CANVAS_HEIGHT)
  );
  lineArray.push(line);
}

export default function drawCanvas(): void {
  //the canvas's display was set to none while the user was on WelcomeScreen so, now set it to block
  canvas.style.display = "block"; 

  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#464646";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  drawScore();
  for (let i = 0; i < lineArray.length; i++) {
    ctx.setLineDash([50, 20]);

    //creates an effect where the lane line seems to move and moves faster as game speed increases gradually
    ctx.lineDashOffset -= (SPEED + stateVariables.score / 5); 
    
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(lineArray[i].startPoint.x, lineArray[i].startPoint.y);
    ctx.lineTo(lineArray[i].endPoint.x, lineArray[i].endPoint.y);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.drawImage(
    stateVariables.playerCar.image,
    stateVariables.playerCar.startPoint.x,
    stateVariables.playerCar.startPoint.y,
    stateVariables.playerCar.w,
    stateVariables.playerCar.h
  );
  for (let i = 0; i < stateVariables.opponentCarArray.length; i++) {
    ctx.beginPath();
    ctx.drawImage(
      stateVariables.opponentCarArray[i].image,
      stateVariables.opponentCarArray[i].startPoint.x,
      stateVariables.opponentCarArray[i].startPoint.y,
      stateVariables.opponentCarArray[i].w,
      stateVariables.opponentCarArray[i].h
    );
    [i];
  }
}

canvas.addEventListener("click", () => {
  if (stateVariables.gameOver) {
    restartGame();
  }
  if (stateVariables.gameState == GameState.paused) {
    resumeGame();
  }
});

function drawScore(): void {
  ctx.font = "24px Outfit";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + stateVariables.score, 10, 30);
}

export function drawGameOver(): void {
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px Outfit";
  ctx.fillStyle = "#ff0000";
  ctx.fillText("Game Over", canvas.width / 2 - 130, canvas.height / 2 - 50);
  ctx.font = "32px Outfit";
  ctx.fillText(
    `Score: ${stateVariables.score}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 10
  );
  ctx.font = "26px Outfit";
  ctx.fillText(
    `High Score: ${stateVariables.highScore}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 70
  );
  ctx.font = "24px Outfit";
  ctx.fillText(
    "Click to Restart",
    canvas.width / 2 - 100,
    canvas.height / 2 + 140
  );
}
export function drawGamePause(): void {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px Outfit";
  ctx.fillStyle = "orange";
  ctx.fillText("Game Paused", canvas.width / 2 - 130, canvas.height / 2 - 50);
  ctx.font = "32px Outfit";
  ctx.fillText(
    `Score: ${stateVariables.score}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 10
  );
  ctx.font = "26px Outfit";
  ctx.fillText(
    `High Score: ${stateVariables.highScore}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 70
  );
  ctx.font = "24px Outfit";
  ctx.fillText(
    "Click to Resume",
    canvas.width / 2 - 100,
    canvas.height / 2 + 140
  );
}
