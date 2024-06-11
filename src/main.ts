import './style.css'
import {DIMENSIONS, SPEED } from './constants.ts';
import Line from './shapes/line.ts';
import Point from './shapes/point.ts';
import { getRandomInt } from './utils/utils.ts';
import { getValidRandomYPosition, playerCarTransition } from './functions.ts';
import Car from './shapes/car.ts';
const canvas = document.querySelector('#gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const line1 = new Line(new Point(200,0), new Point(200,600));
const line2 = new Line(new Point(400,0), new Point(400,600));
const playerCar = new Car(new Point(50,380), 200, 100,'/assets/images/car-image.png');

const opponentCar1 = new Car(new Point(50, getRandomInt(-200, -2000)), 200, 100,'/assets/images/car-image.png');
const opponentCar2 = new Car(new Point(250, getRandomInt(-200, -2000)), 200, 100,'/assets/images/car-image.png');
const opponentCar3 = new Car(new Point(450, getRandomInt(-200, -2000)), 200, 100,'/assets/images/car-image.png');
const opponentCarArray = [opponentCar1, opponentCar2, opponentCar3];
let randomY = 0;
function draw(){
  ctx.clearRect(0,0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0,0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.moveTo(line1.startPoint.x, line1.startPoint.y);
  ctx.lineTo(line1.endPoint.x, line1.endPoint.y);
  ctx.strokeStyle= ("#FFF");
  ctx.stroke();
  ctx.moveTo(line2.startPoint.x, line2.startPoint.y);
  ctx.lineTo(line2.endPoint.x, line2.endPoint.y);
  ctx.strokeStyle= ("#FFF");
  ctx.stroke();
  ctx.beginPath();
  ctx.drawImage(playerCar.image,playerCar.startPoint.x, playerCar.startPoint.y, playerCar.w, playerCar.h);
  ctx.beginPath();
  ctx.drawImage(opponentCar1.image,opponentCar2.startPoint.x, opponentCar1.startPoint.y, opponentCar1.w, opponentCar1.h);
  ctx.beginPath();
  ctx.drawImage(opponentCar2.image,opponentCar2.startPoint.x, opponentCar2.startPoint.y, opponentCar2.w, opponentCar2.h);
  ctx.beginPath();
  ctx.drawImage(opponentCar3.image, opponentCar3.startPoint.x,opponentCar3.startPoint.y,opponentCar3.w,opponentCar3.h);

  for(let i=0; i <opponentCarArray.length; i++) {
    opponentCarArray[i].startPoint.y += SPEED;
    if(opponentCarArray[i].startPoint.y > DIMENSIONS.CANVAS_HEIGHT){
      opponentCarArray[i].startPoint.y = getValidRandomYPosition(0,-2000);
    }
  }





  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

window.addEventListener('keypress', (event) =>{
  switch (event.key) {
    case 'a': {
      if((playerCar.startPoint.x - 200) >= 0) playerCarTransition(playerCar,'left',200);
      break;
    }
    

    case 'd': {
      if((playerCar.startPoint.x + 200) <= DIMENSIONS.CANVAS_WIDTH) playerCarTransition(playerCar,'right',200);
      break;
    }
}
});