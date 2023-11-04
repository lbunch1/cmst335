/*
 _______  _______  ______   _______  _______         
|   _   ||   _   ||   _  \ |   _   ||   _   | ______ 
|.  1___||.  |   ||.  |   ||.  1___||.  1___||______|
|.  |___ |.  |   ||.  |   ||.  |___ |.  __)_         
|:  1   ||:  1   ||:  |   ||:  1   ||:  1   |        
|::.. . ||::.. . ||::.|   ||::.. . ||::.. . |        
`-------'`-------'`--- ---'`-------'`-------'        
                                                     
 _______  _______  _______  _______  ___  _______  ______  
|       ||   _   \|   _   ||       ||   ||   _   ||   _  \ 
|.|   | ||.  l   /|.  1   ||.|   | ||.  ||.  |   ||.  |   |
`-|.  |-'|.  _   1|.  _   |`-|.  |-'|.  ||.  |   ||.  |   |
  |:  |  |:  |   ||:  |   |  |:  |  |:  ||:  1   ||:  |   |
  |::.|  |::.|:. ||::.|:. |  |::.|  |::.||::.. . ||::.|   |
  `---'  `--- ---'`--- ---'  `---'  `---'`-------'`--- ---'

A rendition of the classic game of "Concentration"

Author: Logan Bunch

github.com/lbunch1
logno.dev

*/

// GLOBAL VARIABLES
const board = []
const FLIPDELAY = 300
const CHECKDELAY = 800
let firstCard, secondCard, cardCount, remainingPairs
let turned = 0
let time = 60

// GLOBALLY ACCESSIBLE DOM ELEMENTS
const clickBlock = document.getElementById("blocker")
const timer = document.getElementById("timer")
const pairElement = document.getElementById("pairs")

// PRIMARY GAME FUNCTION
function createBoard(num) {

  // This portion wipes the game-board DOM element,
  // reveals elements needed for gameplay,
  // then hides the title element
  document.getElementById("game-board").innerHTML = ""
  timer.style.display = "block"
  timer.innerText = time
  document.getElementById("remaining").style.display = "block"
  document.getElementById("title").style.display = "none"


  // Establishes an array of "cards" of a length that is dictated 
  // by the num parameter of the createBoard function call. This 
  // loop ensures that there is a duplicate card for each card 
  // that populates the array
  let cards = []
  for (let i = 1; i <= num; i++) {
    cards.push({ value: i })
    cards.push({ value: i })
  }

  // Here we set the clock interval after a delay that aligns
  // with the initial reveal and subsequent flip of the cards.
  // The timer is cleared when the value of time reaches 0
  setTimeout(() => {
    let timeClock = setInterval(() => {
      if (remainingPairs === 0) {
        clearInterval(timeClock)
      }
      if (time > 0) {
        time--
        if (time < 11) {
          timer.innerHTML = `<div class="timeout">${time}</div>`
        } else {
          timer.innerText = time
        }
      }
      if (time === 0 && remainingPairs !== 0) {
        clearInterval(timeClock)
        loseGame()
      }
    }, 1000)
  }, 3000)

  // Ensures that cardCount matches the length of the array generated
  // previously. The initial remainingPairs value is set based on
  // the cardCount value. Finally, set the pairelemnt innertext 
  // initial value to the value of remainingPairs
  cardCount = cards.length
  remainingPairs = cardCount / 2
  pairElement.innerText = remainingPairs



  // A for loop that randomizes the placement of the cards on the board array
  for (let i = 0; i < cardCount; i++) {
    let splicer = Math.floor(Math.random() * (cards.length))
    board.push(cards.splice(splicer, 1)[0])
  }


  // Generates the needed html for each element within the board array
  // NOTE - the id attribute is assigned the array position. This is 
  // used later to determine the comparable value of each card. This 
  // ensures that the value of each card cannot be easily pulled from 
  // the HTML source code, the values and images are only presented to 
  // the DOM when the card is in its flipped state.
  board.forEach((card, i) => {
    document.getElementById("game-board").innerHTML += `<div class="card-wrap"><div class="card" id=${i}>&nbsp;</div></div>`
  })

  // Upon the creation of the gameboard, all cards are revealed to the player
  document.querySelectorAll(".card").forEach((card) => {
    flipCard(card)
  })

  // After a set amount of time, the cards are then hidden and the timer begins
  setTimeout(() => {
    document.querySelectorAll(".flipped").forEach((card) => {
      unflipCard(card)
    })
  }, 3000)

  // After the cards have all flipped and the timer begins an 
  // event listener is generated for each card with an associated play()
  // function
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        play(card)
      })
    })
  }, 3000)
}

// REUSABLE FUNCTIONS

// Function called on each click of each card. 
function play(card) {
  // First check - is the game already over, is the card already matched?
  // if so do nothing
  if (
    remainingPairs === 0 ||
    card.classList.contains("matched")
  ) {
    return
  }
  // Second check - are 2 cards already revealed? If so, flip all cards
  // face down again. A blocking element should prevent this, but this
  // is a safeguard in case that fails.
  if (turned === 2) {
    document.querySelectorAll(".flipped").forEach((flipped) => {
      unflipCard(flipped)
    })
    turned = 0
  }
  // Third check - determine if this is the first or second card to be revealed
  if (turned === 0) { // first card - flip the card, increment turned and store flipped cards value
    flipCard(card)
    turned++
    firstCard = { element: card, value: board[card.getAttribute("id")].value }
  } else if (turned === 1) { // second card
    if (card.classList.contains("flipped")) { // if so, flip it back over and revers the above actions
      unflipCard(card)
      turned--
      firstCard = null
      secondCard = null
    } else { // otherwise, flip the card store its value and check if it is a match
      flipCard(card)
      secondCard = { element: card, value: board[card.getAttribute("id")].value }
      turned++
      // clickBlock is an invisible element that covers the entire screen, that
      // ensures that no other clicks interfere with the checkMatch function 
      // while the animations are executing
      clickBlock.style.visibility = "visible"
      // setTimeout(checkMatch, CHECKDELAY)
      checkMatch()
    }
  }
}

// checkMatch is executed each time 2 cards are revealed. If there is a 
// match, the cards or moved to matched state and the remaining pairs 
// is reduced by one. If there is no match, the cards are flipped back over.
// If the remaining pairs is 0 after the check, the game is concluded.
function checkMatch() {
  if (firstCard && secondCard) {
    if (firstCard.value === secondCard.value) {
      remainingPairs--
      setTimeout(() => {
        firstCard.element.classList.remove("flipped")
        firstCard.element.classList.add("matched")
        secondCard.element.classList.remove("flipped")
        secondCard.element.classList.add("matched")
        if (remainingPairs === 0) {
          pairElement.innerText = remainingPairs
          clickBlock.style.visibility = "hidden"
          document.querySelector("body").innerHTML += '<button type="button" onclick="location.reload()">Play Again!</button>'
        }
        pairElement.innerText = remainingPairs
      }, CHECKDELAY)
    }
    setTimeout(() => {
      firstCard = null
      secondCard = null
      setTimeout(() => {
        document.querySelectorAll(".flipped").forEach((flipped) => {
          unflipCard(flipped)
        })
        clickBlock.style.visibility = "hidden"
      }, FLIPDELAY)
    }, CHECKDELAY)
  }
}

// Flips the card exposing the image
function flipCard(card) {
  card.classList.add("flipped")
  setTimeout(() => {
    card.innerHTML = `<img src="./img/${board[card.getAttribute("id")].value}.png" width="80" />`
  }, FLIPDELAY)
  card.classList.remove("unflip")
}

// Unflips a card returning it to its anonymous state 
function unflipCard(card) {
  card.classList.remove("flipped")
  setTimeout(() => {
    card.innerHTML = "&nbsp;"
  }, FLIPDELAY)
  card.classList.add("unflip")
}

// Ends the game when the timer reaches 0
function loseGame() {
  clickBlock.style.display = "block"
  document.getElementById("time-up").style.display = "flex"
}
