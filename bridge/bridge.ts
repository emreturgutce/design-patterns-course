/**
 * Bridge Pattern:
 * A mechanism that decouples an interface from an implementation.
 */

interface Device {
  isEnabled(): void;

  enable(): void;

  disable(): void;

  getVolume(): number;

  setVolume(percent: number): void;

  getChannel(): number;

  setChannel(channel: number): void;

  printStatus(): void;
}

class Radio implements Device {
  private on = false;
  private volume = 30;
  private channel = 1;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
  }

  public disable(): void {
    this.on = false;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    if (volume > 100) {
      this.volume = 100;
    } else if (volume < 0) {
      this.volume = 0;
    } else {
      this.volume = volume;
    }
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
  }

  public printStatus(): void {
    console.log('------------------------------------');
    console.log("| I'm radio.");
    console.log("| I'm " + (this.on ? 'enabled' : 'disabled'));
    console.log('| Current volume is ' + this.volume + '%');
    console.log('| Current channel is ' + this.channel);
    console.log('------------------------------------\n');
  }
}

class TV implements Device {
  private on = false;
  private volume = 30;
  private channel = 1;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
  }

  public disable(): void {
    this.on = false;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(volume: number): void {
    if (volume > 100) {
      this.volume = 100;
    } else if (volume < 0) {
      this.volume = 0;
    } else {
      this.volume = volume;
    }
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
  }

  public printStatus(): void {
    console.log('------------------------------------');
    console.log("| I'm TV.");
    console.log("| I'm " + (this.on ? 'enabled' : 'disabled'));
    console.log('| Current volume is ' + this.volume + '%');
    console.log('| Current channel is ' + this.channel);
    console.log('------------------------------------\n');
  }
}

interface Remote {
  power(): void;

  volumeDown(): void;

  volumeUp(): void;

  channelDown(): void;

  channelUp(): void;
}

class BasicRemote implements Remote {
  constructor(protected device?: Device) {}

  public power(): void {
    console.log('Remote: power toggle');
    if (this.device?.isEnabled()) {
      this.device.disable();
    } else {
      this.device?.enable();
    }
  }

  public volumeDown(): void {
    console.log('Remote: volume down');
    this.device?.setVolume(this.device.getVolume() - 10);
  }

  public volumeUp(): void {
    console.log('Remote: volume up');
    this.device?.setVolume(this.device.getVolume() + 10);
  }

  public channelDown(): void {
    console.log('Remote: channel down');
    this.device?.setChannel(this.device.getChannel() - 1);
  }

  public channelUp(): void {
    console.log('Remote: channel up');
    this.device?.setChannel(this.device.getChannel() + 1);
  }
}

class AdvancedRemote extends BasicRemote {
  constructor(device: Device) {
    super(device);
  }

  public mute(): void {
    console.log('Remote: mute');
    this.device?.setVolume(0);
  }
}

function testDevice(device: Device) {
  console.log('Tests with basic remote.');
  const basicRemote = new BasicRemote(device);
  basicRemote.power();
  device.printStatus();

  console.log('Tests with advanced remote.');
  const advancedRemote = new AdvancedRemote(device);
  advancedRemote.power();
  advancedRemote.mute();
  device.printStatus();
}

testDevice(new TV());
testDevice(new Radio());
