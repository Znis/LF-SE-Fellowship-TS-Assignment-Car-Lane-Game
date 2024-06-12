import Car from "./components/car";

export enum GameState {
    welcomeScreen = "welcomeScreen",
    initialisation = "initialisation",
    running = "running",
    paused = "paused",
    resume = "resume",
    gameOver = "gameOver",
    restart = "restart",
}

type stateVariables = {
    prevValidRandomYposition: number,
    collisionOccurred: boolean,
    reqAnimFrame: number;
    opponentCarArray: Car[];
    playerCar: Car;
    score: number;
    gameOver: boolean,
    gameState: GameState,
    highScore: number,
    isTransitionActive: boolean,

}
export const stateVariables ={
    prevValidRandomYposition: 0,
    collisionOccurred: false,
    reqAnimFrame: 0,
    opponentCarArray: [] as Car[],
    playerCar: {} as Car,
    score: 0,
    highScore: 0,
    gameOver: false,
    gameState: GameState.welcomeScreen,
    isTransitionActive: false,

} 