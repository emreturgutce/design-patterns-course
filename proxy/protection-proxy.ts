interface Drivable {
  drive(): void;
}

class Car implements Drivable {
  constructor(protected driver: Driver) {}

  public drive(): void {
    console.log('Driving car');
  }
}

class CarProxy extends Car {
  constructor(driver: Driver) {
    super(driver);
  }

  public drive(): void {
    if (this.driver.age >= 18) {
      super.drive();
    } else {
      console.log('Too young to drive');
    }
  }
}

class Driver {
  constructor(public age: number) {}
}

const car = new CarProxy(new Driver(12));

car.drive();
