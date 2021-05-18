enum Color {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
}

enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

class Product {
  constructor(
    public readonly name: string,
    public readonly color: Color,
    public readonly size: Size,
  ) {}
}

class ProductFilter {
  public filterByColor(products: Product[], color: Color): Product[] {
    return products.filter((product) => product.color === color);
  }

  public filterBySize(products: Product[], size: Size): Product[] {
    return products.filter((product) => product.size === size);
  }

  public filterByColorAndSize(
    products: Product[],
    color: Color,
    size: Size,
  ): Product[] {
    return products.filter(
      (product) => product.color === color && product.size === size,
    );
  }
}

interface Specification<T> {
  isSatisfied(item: T): boolean;
}

interface Filter<T> {
  filter(items: T[], spec: Specification<T>): T[];
}

class ColorSpecification implements Specification<Product> {
  constructor(private readonly color: Color) {}

  isSatisfied(item: Product): boolean {
    return item.color === this.color;
  }
}

class SizeSpecification implements Specification<Product> {
  constructor(private readonly size: Size) {}

  isSatisfied(item: Product): boolean {
    return item.size === this.size;
  }
}

class AndSpecification<T> implements Specification<T> {
  constructor(
    private readonly first: Specification<T>,
    private readonly second: Specification<T>,
  ) {}

  isSatisfied(item: T): boolean {
    return this.first.isSatisfied(item) && this.second.isSatisfied(item);
  }
}

class BetterFilter implements Filter<Product> {
  filter(items: Product[], spec: Specification<Product>): Product[] {
    return items.filter((product) => spec.isSatisfied(product));
  }
}

const apple = new Product('Apple', Color.GREEN, Size.SMALL);
const tree = new Product('Tree', Color.GREEN, Size.LARGE);
const house = new Product('House', Color.BLUE, Size.LARGE);

const products: Product[] = [apple, tree, house];

const bf = new BetterFilter();

bf.filter(products, new SizeSpecification(Size.LARGE)).map(console.log);
