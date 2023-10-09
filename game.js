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
    target.health -= damage <= target.defense ? 0 : damage - target.defense
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
    target.health -= damage <= target.defense ? 0 : damage - target.defense
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
let player
let mob
// function sign() {
//   return Math.random() < 0.5 ? -1 : 1
// }

function multiplier() {
  return Math.round(Math.random() * 3)
}

function createCharacter() {
  let name = document.getElementById("hero-name").value
  switch (document.getElementById("hero-class").value) {
    case "warrior":
      player = new Warrior(name)
      break
    case "wizard":
      player = new Wizard(name)
      break
  }
  document.getElementById("player-name").innerHTML = player.name
  document.getElementById("player-health").innerHTML = player.health
  console.log("Character created")
  document.getElementById("battle").attributes.removeNamedItem("disabled")
}

function prepBattle() {
  // prompt to "adventure" which launches into battle with random mob
  mob = new Mob("Field Spider", 1)
  // console.log(`You are approached by a level ${mob.level} ${mob.name}`)
  document.getElementById("mob-name").innerHTML = mob.name
  let mobHealth = document.getElementById("mob-health")
  mobHealth.innerHTML = mob.health
  document.getElementById("attack").attributes.removeNamedItem("disabled")
  document.getElementById("battle").setAttribute("disabled", true)
}

function attack() {
  let mobHealth = document.getElementById("mob-health")
  let playerHealth = document.getElementById("player-health")

  // battle loop
  if (player.health > 0 && mob.health > 0) {
    // player action
    player.meleeAttack(mob)
    mobHealth.innerHTML = mob.health

    mob.meleeAttack(player)
    playerHealth.innerHTML = player.health
  }
  if (player.health <= 0) {
    //you lose
    document.getElementById("attack").setAttribute("disabled", true)
  } else if (mob.health <= 0) {
    document.getElementById("battle").attributes.removeNamedItem("disabled")
    document.getElementById("attack").setAttribute("disabled", true)
    //you win
  }

}
