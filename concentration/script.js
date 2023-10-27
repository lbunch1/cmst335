const board = []
let firstCard, secondCard, cardCount, remainingPairs, pairElement
let turned = 0
const clickBlock = document.getElementById("blocker")

function createBoard(num) {
  document.getElementById("game-board").innerHTML = ""

  let cards = []
  for (let i = 1; i <= num; i++) {
    cards.push({ value: i })
    cards.push({ value: i })
  }

  cardCount = cards.length
  remainingPairs = cardCount / 2
  pairElement = document.getElementById("pairs")
  pairElement.innerText = remainingPairs



  for (let i = 0; i < cardCount; i++) {
    let splicer = Math.floor(Math.random() * (cards.length - 1))
    board.push(cards.splice(splicer, 1)[0])
  }


  board.forEach((card, i) => {
    document.getElementById("game-board").innerHTML += `<div class="card-wrap"><div class="card" id=${i}>&nbsp;</div></div>`
  })

  document.querySelectorAll(".card").forEach((card) => {
    flipCard(card)
  })

  setTimeout(() => {
    document.querySelectorAll(".flipped").forEach((card) => {
      unflipCard(card)
    })
  }, 3000)

  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        play(card)
      })
    })
  }, 3000)

  return pairElement

}

function play(card) {
  if (
    remainingPairs === 0 ||
    card.classList.contains("matched")
  ) {
    return
  }
  if (turned === 2) {
    document.querySelectorAll(".flipped").forEach((flipped) => {
      unflipCard(flipped)
    })
    turned = 0
  }
  if (turned === 0) {
    flipCard(card)
    turned++
    firstCard = { element: card, value: board[card.getAttribute("id")].value }
  } else if (turned === 1) {
    if (card.classList.contains("flipped")) {
      unflipCard(card)
      turned--
      firstCard = null
      secondCard = null
    } else {
      flipCard(card)
      secondCard = { element: card, value: board[card.getAttribute("id")].value }
      turned++
      clickBlock.style.visibility = "visible"
      setTimeout(checkMatch, 1000)
    }
  }
}

function checkMatch() {
  if (firstCard && secondCard) {
    if (firstCard.value === secondCard.value) {
      firstCard.element.classList.remove("flipped")
      firstCard.element.classList.add("matched")
      secondCard.element.classList.remove("flipped")
      secondCard.element.classList.add("matched")
      remainingPairs--
      if (remainingPairs === 0) {
        clickBlock.style.visibility = "hidden"
        document.querySelector("body").innerHTML += '<button type="button" onclick="location.reload()">Play Again!</button>'
      }
      pairElement.innerText = remainingPairs
    }
    firstCard = null
    secondCard = null
    setTimeout(() => {
      document.querySelectorAll(".flipped").forEach((flipped) => {
        unflipCard(flipped)
      })
      clickBlock.style.visibility = "hidden"
    }, 700)
  }
}

function flipCard(card) {
  card.classList.add("flipped")
  setTimeout(() => {
    card.innerHTML = `<img src="./img/${board[card.getAttribute("id")].value}.png" width="80" />`
  }, 500)
  card.classList.remove("unflip")
}

function unflipCard(card) {
  card.classList.remove("flipped")
  setTimeout(() => {
    card.innerHTML = "&nbsp;"
  }, 500)
  card.classList.add("unflip")
}
