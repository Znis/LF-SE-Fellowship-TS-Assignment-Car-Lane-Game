import Rectangle from "./shapes/car";
import { getRandomInt } from "./utils/utils";
import { prevValidRandomYposition } from "./state-variables";

export function playerCarTransition(playerCar: Rectangle, direction: string, moveUpto: number) {
  const targetPosition = direction == 'right' ? playerCar.startPoint.x + moveUpto : playerCar.startPoint.x - moveUpto; 
  const playerCarTransition = setInterval(() => {
    if (direction == "left" && playerCar.startPoint.x >= targetPosition) {
        playerCar.startPoint.x -= 2;
    }else if (direction == "right" && playerCar.startPoint.x <= targetPosition) {
        playerCar.startPoint.x += 2;
    }else{
        clearInterval(playerCarTransition);
    }
  }, 1);
}
export function getValidRandomYPosition(minY: number,maxY: number){
    let randomInt = getRandomInt(minY, maxY);
    while(Math.abs(randomInt - prevValidRandomYposition) < 500){
    randomInt = getRandomInt(minY, maxY);
}
    prevValidRandomYposition = randomInt;
    return randomInt;

}