enum Relationship {
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  SIBLING = 'SIBLING',
}

class Person {
  constructor(public name: string) {}
}

interface RelationshipBrowser {
  findAllChildrenOf(name: string): Person[];
}

class Relationships implements RelationshipBrowser {
  private readonly relations: [Person, Relationship, Person][] = [];

  public findAllChildrenOf(name: string): Person[] {
    return this.relations
      .filter(
        (relation) =>
          relation[0].name === name && relation[1] === Relationship.PARENT,
      )
      .map((value) => value[2]);
  }

  public getRelations(): [Person, Relationship, Person][] {
    return this.relations;
  }

  public addParentAndChild(parent: Person, child: Person): void {
    this.relations.push([parent, Relationship.PARENT, child]);
    this.relations.push([child, Relationship.CHILD, parent]);
  }
}

class Research {
  constructor(relationships: Relationships) {
    const relations = relationships.getRelations();

    relations
      .filter(
        (relation) =>
          relation[0].name === 'John' && relation[1] === Relationship.PARENT,
      )
      .forEach((relation) =>
        console.log(`John has a child called ${relation[2].name}`),
      );
  }
}

const prnt = new Person('John');
const child1 = new Person('Chris');
const child2 = new Person('Matt');

const relationships = new Relationships();
relationships.addParentAndChild(prnt, child1);
relationships.addParentAndChild(prnt, child2);

new Research(relationships);
