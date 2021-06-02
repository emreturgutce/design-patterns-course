module reflective_visitor {
  abstract class Expression {}

  class DoubleExpression extends Expression {
    constructor(public val: number) {
      super();
    }
  }

  class AdditionExpression extends Expression {
    constructor(public left: Expression, public right: Expression) {
      super();
    }
  }

  // Seperation of concerns
  class ExpressionPrinter {
    public static print(exp: Expression): string | void {
      if (exp instanceof DoubleExpression) {
        return String(exp.val);
      } else if (exp instanceof AdditionExpression) {
        return `(${this.print(exp.left)}+${this.print(exp.right)})`;
      }
    }
  }

  // 1+(2+3)
  const exp = new AdditionExpression(
    new DoubleExpression(1),
    new AdditionExpression(new DoubleExpression(2), new DoubleExpression(3)),
  );
  console.log(ExpressionPrinter.print(exp));
}
