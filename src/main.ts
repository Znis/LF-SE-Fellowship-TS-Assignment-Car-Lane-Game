import "./style.css";
import "./controls.ts";
import {
  detectAndHandleCollision,
  initialisePlayerAndOpponents,
  spawnOpponentAndUpdateScore,
  startGame,
  updateLeaderboard,
} from "./functions.ts";
import { GameState, stateVariables } from "./state-variables.ts";
import drawCanvas, { drawGameOver } from "./canvas.ts";

const enterBtn = document.querySelector<HTMLButtonElement>("#enter-btn")!;
const sideTitle = document.querySelector<HTMLHRElement>("#side-title")!;
const introDiv = document.querySelector<HTMLDivElement>("#intro-div")!;
const rightContainer =
  document.querySelector<HTMLDivElement>("#right-container")!;
const leaderboardOl =
  document.querySelector<HTMLOListElement>("#leaderboard-ol")!;
const element: HTMLLIElement = document.createElement("li");
const username_input = document.querySelector<HTMLInputElement>("#name")!;
let username = "";

//event handler that handles the click event on Enter button in WelcomeScreen
enterBtn.addEventListener("click", () => {
  username = username_input.value || "";
  introDiv.style.display = "none";
  rightContainer.style.display = "flex";
  sideTitle.style.display = "block";
  startGame();
});

export function draw() {
  stateVariables.reqAnimFrame = requestAnimationFrame(draw);
  if (
    stateVariables.gameState == GameState.initialisation ||
    stateVariables.gameState == GameState.restart
  ) {
    initialisePlayerAndOpponents();
    stateVariables.gameState = GameState.running;
  }
  drawCanvas();
  detectAndHandleCollision();
  spawnOpponentAndUpdateScore();
  if (stateVariables.collisionOccurred) {
    drawGameOver();
    updateLeaderboard(leaderboardOl, element, username);
    stateVariables.highScore =
      stateVariables.score > stateVariables.highScore
        ? stateVariables.score
        : stateVariables.highScore;
    stateVariables.gameOver = true;
    stateVariables.gameState = GameState.gameOver;
    cancelAnimationFrame(stateVariables.reqAnimFrame);
  }
}

//run the gameloop only if the gamestate is not in welcomeScreen
if (stateVariables.gameState != GameState.welcomeScreen) {
  requestAnimationFrame(draw);
}
