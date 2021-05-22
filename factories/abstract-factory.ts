interface HotDrink {
  consume(): void;
}

class Tea implements HotDrink {
  consume(): void {
    console.log("This tea is nice but I'd prefer it with milk.");
  }
}

class Coffee implements HotDrink {
  public consume(): void {
    console.log('This coffee is delicious');
  }
}

interface HotDrinkFactory {
  prepare(amount: number): HotDrink;
}

class TeaFactory implements HotDrinkFactory {
  public prepare(amount: number): HotDrink {
    console.log(
      'Put in tea bag, boil water, pour ' + amount + 'ml, add lemon, enjoy!',
    );
    return new Tea();
  }
}

class CoffeeFactory implements HotDrinkFactory {
  public prepare(amount: number): HotDrink {
    console.log(
      'Grind some beans, boil water, pour ' +
        amount +
        ' ml, add cream and sugar, enjoy!',
    );
    return new Coffee();
  }
}

enum AvailableDrink {
  COFFEE = 'COFFEE',
  TEA = 'TEA',
}

class HotDrinkMachine {
  private readonly factories = new Map<AvailableDrink, HotDrinkFactory>();

  constructor() {
    this.factories.set(AvailableDrink.COFFEE, new CoffeeFactory());
    this.factories.set(AvailableDrink.TEA, new TeaFactory());
  }

  makeDrink(drinkType: AvailableDrink, amount: number): HotDrink {
    return this.factories.get(drinkType)!.prepare(amount);
  }
}

const hotDrinkMachine = new HotDrinkMachine();

hotDrinkMachine.makeDrink(AvailableDrink.COFFEE, 100).consume();
