const board = []

let cards = [
  { value: "a" },
  { value: "a" },
  { value: "b" },
  { value: "b" },
  { value: "c" },
  { value: "c" },
  { value: "d" },
  { value: "d" },
  { value: "e" },
  { value: "e" },
  { value: "f" },
  { value: "f" },
  { value: "g" },
  { value: "g" }
]

let turned = 0

let cardCount = cards.length
let remainingPairs = cardCount / 2
const pairElement = document.getElementById("pairs")
pairElement.innerText = remainingPairs
let firstCard, secondCard


for (let i = 0; i < cardCount; i++) {
  let splicer = Math.floor(Math.random() * (cards.length - 1))
  board.push(cards.splice(splicer, 1)[0])
}

board.forEach((card, i) => {
  document.getElementById("game-board").innerHTML += `<div class="card" id=${i}>0</div>`
})

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    play(card)
  })
})

function play(card) {
  if (remainingPairs === 0) {
    return
  }
  if (turned === 2) {
    document.querySelectorAll(".flipped").forEach((flipped) => {
      flipped.classList.remove("flipped")
      flipped.innerText = "0"
    })
    turned = 0
  }
  if (turned === 0) {
    card.classList.toggle("flipped")
    card.innerText = board[card.getAttribute("id")].value
    turned++
    firstCard = { element: card, value: board[card.getAttribute("id")].value }
  } else if (turned === 1)
    if (card.classList.contains("flipped")) {
      card.classList.remove("flipped")
      card.innerText = "0"
      turned--
      firstCard = null
      secondCard = null
    } else {
      card.classList.toggle("flipped")
      card.innerText = board[card.getAttribute("id")].value
      secondCard = { element: card, value: board[card.getAttribute("id")].value }
      turned++
    }
  checkMatch()
}

function checkMatch() {
  if (firstCard && secondCard) {
    if (firstCard.value === secondCard.value) {
      firstCard.element.classList.remove("flipped")
      firstCard.element.classList.add("matched")
      secondCard.element.classList.remove("flipped")
      secondCard.element.classList.add("matched")
      remainingPairs--
      pairElement.innerText = remainingPairs
    }
    firstCard = null
    secondCard = null
  }
}
