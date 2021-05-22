class Point {
  protected constructor(private x: number, private y: number) {}

  public static newCartesianPoint(x: number, y: number): Point {
    return new Point(x, y);
  }

  public static newPolarPoint(rho: number, theta: number): Point {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }

  static Factory = class {
    public static newCartesianPoint(x: number, y: number): Point {
      return new Point(x, y);
    }
  };
}

const point = Point.Factory.newCartesianPoint(1, 2);
