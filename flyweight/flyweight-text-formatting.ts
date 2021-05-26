class FormattedText {
  private capitalizeArr: boolean[];

  constructor(private plainText: string) {
    this.capitalizeArr = new Array(plainText.length).fill(false);
  }

  public capitalize(start: number, end: number): FormattedText {
    for (let i = start; i <= end; i++) {
      this.capitalizeArr[i] = true;
    }

    return this;
  }

  public toString(): string {
    let str = '';

    for (let i = 0; i < this.plainText.length; i++) {
      const char = this.plainText[i];
      str += this.capitalizeArr[i] ? char.toUpperCase() : char;
    }

    return str;
  }
}

class BetterFormattedText {
  private readonly formatting: Array<
    InstanceType<typeof BetterFormattedText.TextRange>
  > = [];

  constructor(private plainText: string) {}

  public getRange(start: number, end: number) {
    const range = new BetterFormattedText.TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  public toString() {
    let str = '';

    for (let i = 0; i < this.plainText.length; i++) {
      let char = this.plainText[i];

      for (const range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          char = char.toUpperCase();
        }
      }
      str += char;
    }

    return str;
  }

  private static TextRange = class {
    public capitalize: boolean | undefined;
    public bold: boolean | undefined;
    public italic: boolean | undefined;

    constructor(public start: number, public end: number) {}

    public covers(position: number): boolean {
      return position >= this.start && position <= this.end;
    }
  };
}

const bft = new BetterFormattedText('This is a brave new world');

bft.getRange(10, 15).capitalize = true;

console.log(bft.toString());
