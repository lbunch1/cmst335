

class Monster {
  constructor(name, color, weight, height, sound) {
    this.name = name;
    this.color = color;
    this.weight = weight;
    this.height = height;
    this.sound = sound;
    this.health = 100;
    this.level = 1;
  }
  getSound() {
    return this.sound;
  }
}
let blob = new Monster('The Blob', "red", undefined, undefined, "BLobooeirjgjbbblbleebrbee");
console.log("This monster is called " + blob.name);
console.log(blob.name + " says " + blob.getSound());

