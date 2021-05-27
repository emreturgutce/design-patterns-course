type Consumer<T> = (args: T) => void;

class Eventt<T> {
  private index = 0;
  private handlers = new Map<number, Consumer<T>>();

  public subscribe(handler: Consumer<T>): number {
    const i = this.index;
    this.handlers.set(this.index++, handler);
    return i;
  }

  public unsubscribe(key: number): void {
    this.handlers.delete(key);
  }

  public fire(args: T): void {
    for (const handler of this.handlers.values()) {
      handler(args);
    }
  }
}

enum Argument {
  ATTACK = 'ATTACK',
  DEFENSE = 'DEFENSE',
}

class Query {
  constructor(
    public creatureName: string,
    public argument: Argument,
    public result: number,
  ) {}
}

class Game {
  public queries = new Eventt<Query>();
}

class Creaturee {
  constructor(
    private game: Game,
    public name: string,
    private baseAttack: number,
    private baseDefense: number,
  ) {}

  public getAttack(): number {
    const q = new Query(this.name, Argument.ATTACK, this.baseAttack);
    this.game.queries.fire(q);
    return q.result;
  }

  public getDefense(): number {
    const q = new Query(this.name, Argument.DEFENSE, this.baseDefense);
    this.game.queries.fire(q);
    return q.result;
  }
}

class CreatureModifier {
  constructor(protected game: Game, protected creature: Creaturee) {}
}

class IncreasedDefenseModifier extends CreatureModifier {
  constructor(game: Game, creature: Creaturee) {
    super(game, creature);

    game.queries.subscribe((q) => {
      if (q.creatureName == creature.name && q.argument == Argument.DEFENSE) {
        q.result += 3;
      }
    });
  }
}

class DoubleAttackModifier extends CreatureModifier {
  private token: number;

  constructor(game: Game, creature: Creaturee) {
    super(game, creature);

    this.token = game.queries.subscribe((q) => {
      if (q.creatureName == creature.name && q.argument == Argument.ATTACK) {
        q.result *= 2;
      }
    });
  }

  public close() {
    this.game.queries.unsubscribe(this.token);
  }
}

const game = new Game();
const goblin = new Creaturee(game, 'Strong Goblin', 2, 2);

console.log(goblin);

const icm = new IncreasedDefenseModifier(game, goblin);

const dam = new DoubleAttackModifier(game, goblin);
console.log(goblin);

console.log(goblin);
