function* makeRangeIterator(start: number, end: number, step = 1) {
  let iterationCount = 0;

  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }

  return iterationCount;
}

class MyIterator {
  constructor(private readonly name: string) {}

  *[Symbol.iterator]() {
    for (let i = 0; i < 5; i++) {
      yield this.name;
    }
  }
}

// const it = makeRangeIterator(1, 10, 2);
const it = new MyIterator('Emre');

for (const item of it) {
  console.log(item);
}
