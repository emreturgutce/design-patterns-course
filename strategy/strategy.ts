interface ListStrategy {
  start?(str: string): string;
  addListItem(str: string, item: string): string;
  end?(str: string): string;
}

class MarkdownListStrategy implements ListStrategy {
  public addListItem(str: string, item: string): string {
    str += ` * ${item}\n`;
    return str;
  }
}

class HtmlListStrategy implements ListStrategy {
  public start(str: string): string {
    str += '<ul>\n';
    return str;
  }

  public addListItem(str: string, item: string): string {
    str += `  <li>${item}</li>\n`;
    return str;
  }

  public end(str: string): string {
    str += '</li>\n';
    return str;
  }
}

class TextProcessor<T extends ListStrategy> {
  private str = '';
  private listStrategy: T;

  constructor(Strategy: new () => T) {
    this.listStrategy = new Strategy();
  }

  public appendList(items: string[]): void {
    if (this.listStrategy.start) {
      this.str += this.listStrategy.start(this.str);
    }

    for (const item of items) {
      this.str += this.listStrategy.addListItem(this.str, item);
    }

    if (this.listStrategy.end) {
      this.str += this.listStrategy.end(this.str);
    }
  }

  public clear(): void {
    this.str = '';
  }

  public toString(): string {
    return this.str;
  }
}

const tp = new TextProcessor(MarkdownListStrategy);
tp.appendList(['liberte', 'egalite', 'fraternite']);
console.log(tp.toString());

const tp2 = new TextProcessor(HtmlListStrategy);
tp2.appendList(['inheritance', 'encapsulation', 'polymorphism']);
console.log(tp2.toString());
