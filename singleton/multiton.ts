enum Subsystem {
  PRIMARY = 'PRIMARY',
  AUXILIARY = 'AUXILIARY',
  FALLBACK = 'FALLBACK',
}

class Printer {
  private static instanceCount = 0;
  private static instances = new Map<Subsystem, Printer>();

  private constructor() {
    Printer.instanceCount++;
    console.log(Printer.instanceCount);
  }

  public static get(subsystem: Subsystem): Printer {
    if (this.instances.has(subsystem)) {
      return this.instances.get(subsystem)!;
    }

    const instance = new Printer();
    this.instances.set(subsystem, instance);
    return instance;
  }
}

const main = Printer.get(Subsystem.PRIMARY);
const aux = Printer.get(Subsystem.AUXILIARY);
const aux2 = Printer.get(Subsystem.AUXILIARY);
