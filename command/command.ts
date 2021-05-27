interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  constructor(private readonly payload: string) {}

  public execute(): void {
    console.log(`SimpleCommand: ${this.payload}`);
  }
}

class ComplexCommand implements Command {
  constructor(
    private readonly receiver: Receiver,
    private readonly a: string,
    private readonly b: string,
  ) {}

  public execute(): void {
    console.log('ComplexCommand');
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a})`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b})`);
  }
}

class Invoker {
  private onStart: Command | undefined;
  private onFinish: Command | undefined;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object: Command | undefined): object is Command {
    return object?.execute !== undefined;
  }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

invoker.doSomethingImportant();
