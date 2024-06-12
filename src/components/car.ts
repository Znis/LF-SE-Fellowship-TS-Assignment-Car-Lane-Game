import Point from "../shapes/point";

export interface ICar {
  startPoint: Point; //it represents the top-left point of the rectangualar container of the car
  h: number;
  w: number;
  imagePath: string;
  image: HTMLImageElement;
}
export default class Car implements ICar {
  startPoint: Point;
  h: number;
  w: number;
  imagePath: string;
  image: HTMLImageElement;
  constructor(startPoint: Point, h: number, w: number, imagePath: string) {
    this.startPoint = startPoint;
    this.h = h;
    this.w = w;
    this.imagePath = imagePath;
    this.image = new Image();
    this.image.src = this.imagePath;
  }
}
