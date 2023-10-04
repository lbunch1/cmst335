class Character {
  constructor(name, attack, int, defense, health) {
    this.name = name
    this.attack = attack
    this.int = int
    this.defense = defense
    this.health = health
    this.bag = []
    this.weapon
    this.armor
  }
}

class Player extends Character {
  constructor(name, attack, int, defense, health) {
    super(name, attack, int, defense, health)
    this.exp = 0
    this.level = 1
    this.skills = []
  }

  meleeAttack(target) {
    let damage = this.weapon ? (this.attack * multiplier() + this.weapon.atk) : this.attack * multiplier()
    target.health -= damage - target.defense
    console.log(`${this.name} attacks the ${target.name} and hits it for ${damage} hit points`)
  }
}

class Warrior extends Player {
  constructor(name) {
    super(name, 13, 8, 12, 100)
    this.weapon = new Item("Rusty Sword", true, false, 2, 0, 0)
    this.armor = new Item("Leather Armor", false, true, 0, 2, 0)
  }
}

class Wizard extends Player {
  constructor(name) {
    super(name, 8, 13, 8, 100)
    this.weapon = new Item("Crude Staff", true, false, 1, 0, 2)
    this.armor = new Item("Tattered Robe", false, true, 0, 1, 3)
  }
}

class Mob extends Character {
  constructor(name, level) {
    super(name, level + 10, 10, level + 10, level * 10 + 100)
    this.level = level
  }
  meleeAttack(target) {
    let damage = this.attack * multiplier()
    target.health -= damage - target.defense
    console.log(`${this.name} attacks the ${target.name} and hits it for ${damage} hit points`)
  }
}

class Item {
  constructor(name, weapon, armor, atk, def, int) {
    this.name = name
    this.weapon = weapon
    this.armor = armor
    this.atk = atk
    this.def = def
    this.int = int
  }
}

// prompt character creation, choose class and name
let player = new Warrior("Logno")
console.log("You have chosen to be a Warrior named " + player.name)

// prompt to "adventure" which launches into battle with random mob
let mob = new Mob("Field Spider", 1)
console.log(`You are approached by a level ${mob.level} ${mob.name}`)

// battle loop
while (player.health > 0 && mob.health > 0) {
  // player action
  player.meleeAttack(mob)
  console.log(mob.health)

  mob.meleeAttack(player)
  console.log(player.health)
}
player.health <= 0 ? console.log("You Lose") : console.log("You Win")

// function sign() {
//   return Math.random() < 0.5 ? -1 : 1
// }

function multiplier() {
  return Math.round(Math.random() * 3)
}
