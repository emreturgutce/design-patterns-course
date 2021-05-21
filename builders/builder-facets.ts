class Person {
  // address
  public streetAddress: string;
  public postcode: string;
  public city: string;

  // employment
  public companyName: string;
  public position: string;
  public annualIncome: number;
}

// builder facade
class PersonBuilder {
  protected person: Person = new Person();

  public works(): PersonJobBuilder {
    return new PersonJobBuilder(this.person);
  }

  public lives(): PersonAddressBuilder {
    return new PersonAddressBuilder(this.person);
  }

  public build(): Person {
    return this.person;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  public constructor(person: Person) {
    super();
    this.person = person;
  }

  public at(streetAddress: string): PersonAddressBuilder {
    this.person.streetAddress = streetAddress;
    return this;
  }

  public withPostcode(postcode: string): PersonAddressBuilder {
    this.person.postcode = postcode;
    return this;
  }

  public in(city: string): PersonAddressBuilder {
    this.person.city = city;
    return this;
  }
}

class PersonJobBuilder extends PersonBuilder {
  public constructor(person: Person) {
    super();
    this.person = person;
  }

  public at(companyName: string): PersonJobBuilder {
    this.person.companyName = companyName;
    return this;
  }

  public asA(position: string): PersonJobBuilder {
    this.person.position = position;
    return this;
  }

  public earning(annualIncome: number): PersonJobBuilder {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

const pb = new PersonBuilder();
const person = pb
  .lives()
  .at('Nilüfer')
  .in('Bursa')
  .withPostcode('16000')
  .works()
  .at('Askipo')
  .asA('SWE')
  .earning(12000)
  .build();
console.log(person);
