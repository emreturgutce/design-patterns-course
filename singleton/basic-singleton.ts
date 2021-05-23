class BasicSingleton {
  private static readonly instance = new BasicSingleton();
  private value = 0;

  // cannot new this class, however
  // * instance can be created deliberately (reflection)
  // * instance can be created accidentally (serialization)
  private constructor() {}

  public static get getInstance(): BasicSingleton {
    return this.instance;
  }

  public set setValue(value: number) {
    this.value = value;
  }

  public get getValue(): number {
    return this.value;
  }
}

const singleton = BasicSingleton.getInstance;

singleton.setValue = 10;

console.log(singleton.getValue);
