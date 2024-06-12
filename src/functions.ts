import Rectangle from "./components/car";
import { getRandomInt } from "./utils/utils";
import { GameState, stateVariables } from "./state-variables";
import {
  SPEED,
  DIMENSIONS,
  VEHICLE_HEIGHT,
  VEHICLE_WIDTH,
  LANE_COUNT,
  OFFSET,
  LANE_WIDTH,
  RANDOM_INT,
} from "./constants";
import { draw } from "./main";
import Car from "./components/car";
import Point from "./shapes/point";
import { drawGamePause } from "./canvas";

//function that handles smooth animation of playerCar while changing lanes
export function playerCarTransition(
  playerCar: Rectangle,
  direction: string,
  moveUpto: number
) {
  const targetPosition =
    direction == "right"
      ? playerCar.startPoint.x + moveUpto
      : playerCar.startPoint.x - moveUpto;
  if (!stateVariables.isTransitionActive) {
    stateVariables.isTransitionActive = true;
    const playerCarTransition = setInterval(() => {
      if (direction == "left" && playerCar.startPoint.x > targetPosition) {
        playerCar.startPoint.x -= 2;
      } else if (
        direction == "right" &&
        playerCar.startPoint.x < targetPosition
      ) {
        playerCar.startPoint.x += 2;
      } else {
        stateVariables.isTransitionActive = false;
        clearInterval(playerCarTransition);
      }
    }, 1);
  }
}

/*function that generates random opponent spawn position on Y axis
 that is at least 3x VEHICLE_HEIGHT distance farther away than previously spawned opponent */
export function getValidRandomYPosition(minY: number, maxY: number) {
  let randomInt = getRandomInt(minY, maxY);
  while (
    Math.abs(randomInt - stateVariables.prevValidRandomYposition) <
    VEHICLE_HEIGHT * 3
  ) {
    randomInt = getRandomInt(minY, maxY);
  }
  stateVariables.prevValidRandomYposition = randomInt;
  return randomInt;
}

export function detectAndHandleCollision() {
  for (let i = 0; i < 3; i++) {
    const opponentCarBottomY =
      stateVariables.opponentCarArray[i].startPoint.y +
      stateVariables.opponentCarArray[i].h;
    if (
      opponentCarBottomY >= stateVariables.playerCar.startPoint.y &&
      stateVariables.opponentCarArray[i].startPoint.x ==
        stateVariables.playerCar.startPoint.x
    ) { 
      /*collision detected if playerCar and opponentCar's X coords is same and
       opponentCar's Y coords is greater than playerCar's Y coords */
      stateVariables.collisionOccurred = true;
      break;
    }
  }
}

//spawns the new opponent and updates the score if the playerCar avoids the opponent car successfully
export function spawnOpponentAndUpdateScore() {
  for (let i = 0; i < stateVariables.opponentCarArray.length; i++) {
    stateVariables.opponentCarArray[i].startPoint.y +=
      (SPEED + stateVariables.score / 5); //the game speed increases gradually respective to player's score
    if (
      stateVariables.opponentCarArray[i].startPoint.y > DIMENSIONS.CANVAS_HEIGHT
    ) {
      updateScore();
      stateVariables.opponentCarArray[i].startPoint.y = getValidRandomYPosition(
        RANDOM_INT.MIN,
        RANDOM_INT.MAX
      );
    }
  }
}

function updateScore() {
  stateVariables.score++;
  stateVariables.highScore = stateVariables.score > stateVariables.highScore ? stateVariables.score : stateVariables.highScore;
}

export function restartGame() {
  stateVariables.score = 0;
  stateVariables.gameOver = false;
  stateVariables.collisionOccurred = false;
  stateVariables.opponentCarArray = [];
  stateVariables.gameState = GameState.restart;
  requestAnimationFrame(draw);
}

export function pauseGame() {
  if (stateVariables.gameState == GameState.running) {
    stateVariables.gameState = GameState.paused;
    cancelAnimationFrame(stateVariables.reqAnimFrame);
    drawGamePause();
  }
}
export function resumeGame() {
  if (stateVariables.gameState == GameState.paused) {
    stateVariables.gameState = GameState.running;
    requestAnimationFrame(draw);
  }
}

export function startGame() {
  stateVariables.gameState = GameState.initialisation;
  requestAnimationFrame(draw);
}

//updates the leaderboard(scoreboard) at the gameover
export function updateLeaderboard(
  parentElement: HTMLOListElement,
  element: HTMLLIElement,
  username: string
) {
  element.innerHTML = `${username}  &nbsp; &nbsp;<b>${stateVariables.score}</b>`;
  parentElement.appendChild(element);
}

//initialises the playerCar and opponentCars as game starts or restarts
export function initialisePlayerAndOpponents() {
  stateVariables.playerCar = new Car(
    new Point(OFFSET, DIMENSIONS.CANVAS_HEIGHT - VEHICLE_HEIGHT * 1.1),
    VEHICLE_HEIGHT,
    VEHICLE_WIDTH,
    "./assets/images/car1.png"
  );
  for (let i = 0; i < LANE_COUNT; i++) {
    const opponentCar = new Car(
      new Point(
        OFFSET + LANE_WIDTH * i,
        getRandomInt(RANDOM_INT.MIN, RANDOM_INT.MAX)
      ),
      VEHICLE_HEIGHT,
      VEHICLE_WIDTH,
      `./assets/images/opponent-car${i + 2}.png`
    );
    stateVariables.opponentCarArray.push(opponentCar);
  }
}
