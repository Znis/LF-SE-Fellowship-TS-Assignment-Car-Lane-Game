import Point from './point';
export interface ILine{
    startPoint: Point,
    endPoint: Point,
    length: () => number
}

export default class Line implements ILine{
    startPoint: Point;
    endPoint: Point;
constructor(startPoint: Point, endPoint: Point){
    this.startPoint = startPoint;
    this.endPoint = endPoint;
}
length = () => Math.sqrt((this.endPoint.x - this.startPoint.x)**2 + (this.endPoint.y - this.startPoint.y)**2 );
}