class HtmlElement {
  public readonly elements: HtmlElement[] = [];
  private readonly indentSize = 2;
  private readonly newLine = '\n';

  public constructor(public name?: string, public text?: string) {}

  public toString(indent: number) {
    let str = '';
    const i = this.getBlankSpace(indent);
    str += `${i}<${this.name}>${this.newLine}`;
    if (this.text?.length > 0) {
      str += this.getBlankSpace(indent + 1) + this.text + this.newLine;
    }
    for (const el of this.elements) {
      str += el.toString(indent + 1);
    }
    str += `${i}</${this.name}>${this.newLine}`;
    return str;
  }

  private getBlankSpace(indent: number) {
    let i = '';
    for (let j = 0; j < indent * this.indentSize; j++) {
      i += ' ';
    }
    return i;
  }
}

class HtmlBuilder {
  private root = new HtmlElement();

  public constructor(public rootName: string) {
    this.root.name = this.rootName;
  }

  // not fluent
  public addChild(childName: string, childText: string): void {
    const el = new HtmlElement(childName, childText);
    this.root.elements.push(el);
  }

  public addChildFluent(childName: string, childText: string) {
    const el = new HtmlElement(childName, childText);
    this.root.elements.push(el);
    return this;
  }

  public clear() {
    this.root = new HtmlElement();
    this.root.name = this.rootName;
  }

  public toString() {
    return this.root.toString(0);
  }
}

const builder = new HtmlBuilder('ul');
builder
  .addChildFluent('li', 'Hello')
  .addChildFluent('li', 'world');

console.log(builder.toString());
