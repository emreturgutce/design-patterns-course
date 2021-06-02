module intrusive_visitor {
  abstract class Expression {
    public abstract print(): string;
  }

  class DoubleExpression extends Expression {
    constructor(private val: number) {
      super();
    }

    public print(): string {
      return String(this.val);
    }
  }

  class AdditionExpression extends Expression {
    constructor(private left: Expression, private right: Expression) {
      super();
    }

    public print(): string {
      return `(${this.left.print()}+${this.right.print()})`;
    }
  }

  // 1+(2+)
  const exp = new AdditionExpression(
    new DoubleExpression(1),
    new AdditionExpression(new DoubleExpression(2), new DoubleExpression(3)),
  );

  console.log(exp.print());
}
