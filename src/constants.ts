//constants that can be changed to configure the game
export const DIMENSIONS = {
  CANVAS_HEIGHT: 600,
  CANVAS_WIDTH: 600,
};
export const RANDOM_INT = {
  MIN: -200,
  MAX: -2000,
}; //random int range for spawning the opponent in Y axis.

export const LANE_COUNT: number = 3;
export const LANE_WIDTH: number = Math.floor(DIMENSIONS.CANVAS_WIDTH / LANE_COUNT);
export const VEHICLE_WIDTH: number = 80;
export const VEHICLE_HEIGHT: number = 160;
export const OFFSET: number = Math.floor((LANE_WIDTH - VEHICLE_WIDTH) / 2);
export const SPEED: number = 4;

