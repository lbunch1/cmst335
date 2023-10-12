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
  meleeAttack(target) {
    let damagePotenial = this.weapon ? (this.attack * multiplier() + this.weapon.atk) : this.attack * multiplier()
    let damage = damagePotenial <= target.defense ? 0 : damagePotenial - target.defense

    target.health -= damage
    let timestamp = (new Date).getUTCHours() + ":" + (new Date).getUTCMinutes().toString().padStart(2, "0") + ":" + (new Date).getUTCSeconds().toString().padStart(2, "0")

    if (damage === 0) {
      activity.innerHTML = `<p>${timestamp}: ${this.name} missed.` + activity.innerHTML
    } else {
      activity.innerHTML = `<p>${timestamp}: ${this.name} hits ${target.name} for ${damage} points.` + activity.innerHTML
    }
  }
}

class Player extends Character {
  constructor(name, attack, int, defense, health) {
    super(name, attack, int, defense, health)
    this.exp = 0
    this.level = 1
    this.skills = []
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
let activity = document.getElementById("activity")
let mobList = [
  "Field Spider",
  "Green Snake",
  "Zombie",
  "Warewolf",
  "Slime",
  "Rabid Dog"
]
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
  document.getElementById("battle").disabled = false
}

function prepBattle() {
  // prompt to "adventure" which launches into battle with random mob
  let mobName = mobList[Math.floor(Math.random() * mobList.length)]
  mob = new Mob(mobName, 1)
  // console.log(`You are approached by a level ${mob.level} ${mob.name}`)
  document.getElementById("mob-name").innerHTML = mob.name
  let mobHealth = document.getElementById("mob-health")
  mobHealth.innerHTML = mob.health
  document.getElementById("attack").disabled = false
  document.getElementById("game-stat").innerText = ""
  document.getElementById("battle").disabled = true
}

function attack() {
  let mobHealth = document.getElementById("mob-health")
  let playerHealth = document.getElementById("player-health")
  checkStatus()

  // battle loop
  if (player.health > 0 && mob.health > 0) {
    // player action
    player.meleeAttack(mob)
    mobHealth.innerHTML = mob.health
    document.getElementById("attack").disabled = true
    document.getElementById("attack").innerText = "Opponent is attacking..."
    //you win
    checkStatus() ? null : (
      setTimeout(() => {
        mob.meleeAttack(player)
        playerHealth.innerHTML = player.health
        document.getElementById("attack").disabled = false
        document.getElementById("attack").innerText = "ATTACK!!"
        checkStatus()
      }, 1000))
  }
}
function checkStatus() {
  if (player.health <= 0) {
    activity.innerHTML = `<p>You have been defeated by ${mob.name}.</p>` + activity.innerHTML
    document.getElementById("attack").disabled = true
    return 0
  } else if (mob.health <= 0) {
    document.getElementById("battle").disabled = false
    document.getElementById("attack").disabled = true
    activity.innerHTML = `<p>You have defeated ${mob.name}!!</p>` + activity.innerHTML
    return 1
  }
}
