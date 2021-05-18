/**
 * Single-responsibility principle
 * Every module, class or function should have only one responsibility.
 */

class Journal {
  private readonly entries: string[] = [];
  private count = 0;

  public addEntry(text: string): void {
    this.entries.push(`${++this.count}: ${text}`);
  }

  public removeEntry(index: number): void {
    this.entries.splice(index, 1);
  }

  // Violates the single-responsibility principle
  public save(filename: string): void {
    console.log(`Saved to file ${filename}`);
  }

  // Violates the single-responsibility principle
  public load(filename: string): void {
    console.log(`Loaded from file ${filename}`);
  }
}

class Persistence {
  public save(filename: string): void {
    console.log(`Saved to file ${filename}`);
  }

  public load(filename: string): void {
    console.log(`Loaded from file ${filename}`);
  }
}