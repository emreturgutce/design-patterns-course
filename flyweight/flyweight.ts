class User {
  constructor(private readonly fullName: string) {}
}

class User2 {
  private static readonly strings: string[] = [];
  private names: number[];

  constructor(fullName: string) {
    this.names = fullName.split(' ').map(User2.getOrAdd);
  }

  private static getOrAdd(s: string): number {
    const idx = User2.strings.indexOf(s);
    if (idx !== -1) {
      return idx;
    } else {
      User2.strings.push(s);
      return User2.strings.length - 1;
    }
  }
}

const user = new User('John Smith');
const user1 = new User('Jane Smith');
