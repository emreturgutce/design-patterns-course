class Property<T> {
  constructor(private value: T) {}

  public set setValue(value: T) {
    this.value = value;
  }

  public get getValue(): T {
    return this.value;
  }
}

class Creature {
  private agility = new Property(10);

  public set setAgility(value: number) {
    this.agility.setValue = value;
  }

  public get getAgility(): number {
    return this.agility.getValue;
  }
}

const c = new Creature();
c.setAgility = 12;
