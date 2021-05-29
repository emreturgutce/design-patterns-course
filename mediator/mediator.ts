module Mediator {
  class Person {
    public room: ChatRoom | undefined;
    private chatLog: string[] = [];

    constructor(public name: string) {}

    public receive(sender: string, message: string): void {
      const s = `${sender}: '${message}'`;
      console.log(`[${this.name}'s chat session] ${s}`);
      this.chatLog.push(s);
    }

    public say(message: string): void {
      this.room?.broadcast(this.name, message);
    }

    public privateMessage(who: string, message: string): void {
      this.room?.message(this.name, who, message);
    }
  }

  class ChatRoom {
    private people: Person[] = [];

    public broadcast(source: string, message: string): void {
      for (const person of this.people) {
        if (person.name !== source) {
          person.receive(source, message);
        }
      }
    }

    public join(p: Person) {
      const joinMsg = p.name + ' joins the chat';
      this.broadcast('room', joinMsg);

      p.room = this;
      this.people.push(p);
    }

    public message(source: string, destination: string, message: string): void {
      this.people.find((p) => p.name === destination)?.receive(source, message);
    }
  }

  const room = new ChatRoom();

  const john = new Person('John');
  const jane = new Person('Jane');

  room.join(john); // no message here
  room.join(jane);

  john.say('hi room');
  jane.say('oh, hey john');

  const simon = new Person('Simon');
  room.join(simon);
  simon.say('hi everyone!');

  jane.privateMessage('Simon', 'glad you could join us!');
}
