interface Shape {
  info(): string;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  public resize(factor: number): void {
    this.radius *= factor;
  }

  public info(): string {
    return `A circle of radius ${this.radius}`;
  }
}

class Squaree implements Shape {
  constructor(private side: number) {}

  info(): string {
    return `A square with side ${this.side}`;
  }
}

class ColoredShape implements Shape {
  constructor(private shape: Shape, private color: string) {}

  public info(): string {
    return `${this.shape.info()} has the color ${this.color}`;
  }
}

class TransparentShape implements Shape {
  constructor(private shape: Shape, private transparency: number) {}

  public info(): string {
    return `${this.shape.info()} has ${this.transparency}% transparency`;
  }
}

const circle = new Circle(10);
console.log(circle.info());

const blueSquare = new ColoredShape(new Squaree(20), 'blue');
console.log(circle.info());

const myCircle = new TransparentShape(
  new ColoredShape(new Circle(5), 'green'),
  50,
);
console.log(circle.info());
