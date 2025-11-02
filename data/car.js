class Car {
  #brand;
  #model;


  constructor(carBrand, carModel) {
    this.#brand = carBrand;
    this.#model = carModel;
    this.speed = 0;
    this.isTrunkOpen = false;
    console.log(this);
 
  };

  get brand() {
    return this.#brand;
  }

  get model() {
    return this.#model;
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    if ( (value) < 0 || (value) > 200) {
      return;
    }
    this._speed = value;
  }

  displayInfo() {
    console.log(`Brand: ${this.#brand} Model: ${this.#model} Speed: ${this.speed} km/h Trunk: ${this.isTrunkOpen}`);
  };
  
  go() {
    if (this.isTrunkOpen) {
      return console.log('Close the trunk in order to speed up!');
    }
    this.speed = this._speed + 5;
    return this.speed;
  };

  brake() {
    this.speed = this._speed - 5;
    return this.speed;
  };

  openTrunk() {
    return this.isTrunkOpen = true;
  }
  
  closeTrunk() {
    return this.isTrunkOpen = false;
  }
}

const [car1, car2] = [new Car('Toyota', 'Corolla'), new Car('Tesla', 'Model 3')];


console.log('Driving:');
car1.go();
car1.displayInfo();
car1.brake();
car1.brake();
car1.displayInfo();

car2.go();
car2.go();
car2.displayInfo();

console.log('Trying to use go() when trunk open');
car2.openTrunk();
car2.go();
car2.displayInfo();
car2.closeTrunk();
car2.go();
car2.brake();
car2.brake();
car2.brake();
car2.displayInfo();

class RaceCar extends Car {


  constructor(acceleration) {
    super('McLaren','F1');
    this.acceleration = acceleration;
  }

  displayInfo() {
    console.log(`Brand: ${this.brand} Model: ${this.model} Speed: ${this._speed} km/h accelaration: ${this.acceleration}`);
  }

  set speed(value) {
    if (value < 0 || value > 300) {
      return;
    }
    this._speed = value;
  }

  go() {
    return this.speed = this._speed + this.acceleration;
  }

  openTrunk() {
    return '';
  }
  closeTrunk() {
    return '';
  }

}

const raceCar1 = new RaceCar(20);
const testRaceCar2 = new RaceCar(301);

raceCar1.openTrunk();
raceCar1.go();
raceCar1.displayInfo();
testRaceCar2.go();
testRaceCar2.displayInfo();
