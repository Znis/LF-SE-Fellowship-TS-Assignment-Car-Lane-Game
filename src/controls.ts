import { GameState, stateVariables } from "./state-variables";
import { playerCarTransition, restartGame, resumeGame } from "./functions";
import { DIMENSIONS, LANE_WIDTH } from "./constants";
import { pauseGame } from "./functions";

export default window.addEventListener("keypress", (event) => {
  switch (event.key) {
    //change lane to left
    case "a": {
      if (stateVariables.playerCar.startPoint.x - LANE_WIDTH >= 0)
        playerCarTransition(stateVariables.playerCar, "left", LANE_WIDTH);
      break;
    }
    //change lane to right
    case "d": {
      if (
        stateVariables.playerCar.startPoint.x + LANE_WIDTH <=
        DIMENSIONS.CANVAS_WIDTH
      )
        playerCarTransition(stateVariables.playerCar, "right", LANE_WIDTH);
      break;
    }
    //pause and resume the running game
    case "q": {
      if (stateVariables.gameState == GameState.running) {
        pauseGame();
      } else if (stateVariables.gameState == GameState.paused) {
        resumeGame();
      }
      break;
    }
    //restart the game upon gameover
    case "e": {
      if (stateVariables.gameState == GameState.gameOver) {
        restartGame();
      }
      break;
    }
  }
});
