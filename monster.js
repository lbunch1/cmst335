

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
/*
Monsters we thought of in class...
Nessie, Mothman, Bigfoot, chupacabra
Grim Reaper, Zombie, Dracula, Wolfman,
Frankenstein, Mummy, Gill Man,
Invisible Man, Alien, Godzilla
King Kong, Ghost, Scarecrow, Clown
*/
