module null_object {
  interface Log {
    info(msg: string): void;
    warn(msg: string): void;
  }

  class ConsoleLog implements Log {
    info(msg: string): void {
      console.log(msg);
    }

    warn(msg: string): void {
      console.log(`WARN: ${msg}`);
    }
  }

  class BankAccount {
    private balance: number | undefined;

    constructor(private log: Log) {}

    public deposit(amount: number): void {
      if (!this.balance) return;

      this.balance += amount;

      if (this.log != null) {
        this.log.info(
          'Deposited ' + amount + ', balance is now ' + this.balance,
        );
      }
    }

    public withdraw(amount: number): void {
      if (!this.balance) return;

      if (this.balance >= amount) {
        this.balance -= amount;

        if (this.log != null) {
          console.log(
            'Withdrew ' + amount + ', we have ' + this.balance + ' left',
          );
        }
      } else {
        if (this.log != null) {
          console.log(
            'Could not withdraw ' +
              amount +
              ' because balance is only ' +
              this.balance,
          );
        }
      }
    }
  }

  class NullLog implements Log {
    public info(msg: string): void {}

    public warn(msg: string): void {}
  }

  const log = new NullLog();

  const ba = new BankAccount(log);
  ba.deposit(100);
  ba.withdraw(200);
}
