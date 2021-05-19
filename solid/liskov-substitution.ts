class Rectangle {
  protected width: number;
  protected height: number;

  constructor(width?: number, height?: number) {
    this.width = width;
    this.height = height;
  }

  public getWidth() {
    return this.width;
  }

  public setWidth(width: number) {
    this.width = width;
  }

  public getHeight() {
    return this.height;
  }

  public setHeight(height: number) {
    this.height = height;
  }

  public getArea() {
    return this.width * this.height;
  }

  public isSquare() {
    return this.width === this.height;
  }
}

class Square extends Rectangle {
  constructor(size: number) {
    super();
    this.width = this.height = size;
  }

  public override setWidth(width: number) {
    super.setWidth(width);
    super.setHeight(width);
  }

  public override setHeight(height: number) {
    super.setHeight(height);
    super.setWidth(height);
  }
}

class RectangleFactory {
  public static newSquare(side: number): Rectangle {
    return new Rectangle(side, side);
  }

  public static newRectangle(width: number, height: number): Rectangle {
    return new Rectangle(width, height);
  }
}