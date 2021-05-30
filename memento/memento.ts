module memento {
  class Memento {
    constructor(public balance: number) {}
  }

  class BankAccount {
    constructor(private balance: number) {}

    public deposit(amount: number): Memento {
      this.balance += amount;
      return new Memento(this.balance);
    }

    public restore(m: Memento): void {
      this.balance = m.balance;
    }
  }

  const ba = new BankAccount(100);
  const m1 = ba.deposit(50);
  const m2 = ba.deposit(25);
  console.log(ba);

  ba.restore(m1);
  console.log(ba);

  ba.restore(m2);
  console.log(ba);
}
