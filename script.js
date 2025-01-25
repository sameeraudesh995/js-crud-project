function Animal(name){

    this.name=name;

}

Animal.prototype.walk = function(){

    console.log(`${this.name} is walking!..`);

}

console.log(Animal);

console.log(Animal.prototype);

//=================

function Dog(name, breed){

    Animal.call(this,name);

    this.breed=breed;

}

// inherits functions from prototype

Dog.prototype=Object.create(Animal.prototype);

console.log(Dog);

const d= new Dog('Togo','husky');

console.log(d);

const animal = new Animal('Animal');

d.walk();

animal.walk();




