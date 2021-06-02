module classic_visitor {
  interface ExpressionVisitor {
    visit(exp: DoubleExpression): string | void;
    visit(exp: AdditionExpression): string | void;
  }

  abstract class Expression {
    public abstract accept(visitor: ExpressionVisitor): string | void;
  }

  class DoubleExpression extends Expression {
    constructor(public val: number) {
      super();
    }

    public override accept(visitor: ExpressionVisitor): string | void {
      return visitor.visit(this);
    }
  }

  class AdditionExpression extends Expression {
    constructor(public left: Expression, public right: Expression) {
      super();
    }

    public override accept(visitor: ExpressionVisitor): string | void {
      return visitor.visit(this);
    }
  }

  // Seperation of concerns
  class ExpressionPrinter implements ExpressionVisitor {
     visit(exp: DoubleExpression): string | void;
     visit(exp: AdditionExpression): string | void;
     visit(exp: any): string | void {
      if (exp instanceof DoubleExpression) {
        return String(exp.val);
      } else if (exp instanceof AdditionExpression) {
        return `(${exp.left.accept(this)}+${exp.right.accept(this)})`;
      }
     }
  }

  // 1+(2+3)
  const exp = new AdditionExpression(
    new DoubleExpression(1),
    new AdditionExpression(new DoubleExpression(2), new DoubleExpression(3)),
  );

  const ep = new ExpressionPrinter();

  console.log(ep.visit(exp));
}
