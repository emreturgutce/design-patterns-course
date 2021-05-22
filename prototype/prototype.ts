class Prototype {
  constructor(
    public primitive: any,
    public component: object,
    public circularReference: ComponentWithBackReference,
  ) {}

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  constructor(public prototype?: Prototype) {}
}

const p1 = new Prototype(
  1,
  { message: 'hello' },
  new ComponentWithBackReference(),
);

const p2 = p1.clone();
