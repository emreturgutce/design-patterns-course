module acyclic_visitor {
  interface Visitor {}

  interface ExpressionVisitor extends Visitor {
    visit(exp: Expression): string | void;
  }

  interface DoubleExpressionVisitor extends Visitor {
    visit(exp: DoubleExpression): string | void;
  }

  interface AdditionExpressionVisitor extends Visitor {
    visit(exp: AdditionExpression): string | void;
  }

  abstract class Expression {
    public accept(visitor: Visitor): string | void {
      if (instanceOfT<ExpressionVisitor>(visitor)) {
        return (visitor as ExpressionVisitor).visit(this);
      }
    }
  }

  function instanceOfT<T>(object: any): object is T {
    return 'visit' in object;
  }

  class DoubleExpression extends Expression {
    constructor(public val: number) {
      super();
    }

    public override accept(visitor: ExpressionVisitor): string | void {
      if (instanceOfT<ExpressionVisitor>(visitor)) {
        return (visitor as ExpressionVisitor).visit(this);
      }
    }
  }

  class AdditionExpression extends Expression {
    constructor(public left: Expression, public right: Expression) {
      super();
    }

    public override accept(visitor: ExpressionVisitor): string | void {
      if (instanceOfT<AdditionExpressionVisitor>(visitor)) {
        return (visitor as AdditionExpressionVisitor).visit(this);
      }
    }
  }

  class ExpressionPrinter implements DoubleExpressionVisitor, AdditionExpressionVisitor {
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
