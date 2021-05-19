class WordDocument {}

interface Machine {
  print(doc: WordDocument): void;
  fax(doc: WordDocument): void;
  scan(doc: WordDocument): void;
}

class MultiFunctionPrinter implements Machine {
  print(doc: WordDocument): void {
    //
  }
  fax(doc: WordDocument): void {
    //
  }
  scan(doc: WordDocument): void {
    //
  }
}

class OldFashionedPrinter implements Machine {
  print(doc: WordDocument): void {
    //
  }
  fax(doc: WordDocument): void {
    //
  }
  scan(doc: WordDocument): void {
    //
  }
}

interface Printer {
  print(d: WordDocument): void;
}

interface Scanner {
  scan(d: WordDocument): void;
}

class JustAPrinter implements Printer {
  print(d: WordDocument): void {
    //
  }
}

class Photocopier implements Printer, Scanner {
  print(d: WordDocument): void {
    //
  }
  scan(d: WordDocument): void {
    //
  }
}
