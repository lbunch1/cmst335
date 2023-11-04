# How to create a "Concentration" game

It seems that many of my classmates are struggling with this assignment, so I thought I'd try to throw together a little tutorial on how to build out this game.

## Specifications

The game "Concentration" involves a series of "cards" that are face down on a board. The faces of the "cards" feature images. Within the set, each image is found in duplicate.

### Expected functionality

1. The user must be able to reveal a card by clicking on it.
2. If two cards are revealed, a "check" must take place to determine if they match, then -
    - if the cards match, they will remain face up
    - if they do not match, they will return to their face down position
3. The game must conclude when all matches are found.

### Additional functionality

While the immediate challenge is to find each matching pair, an additional element of difficulty should be added to the game. If the user has infinite opportunity to find the matching pairs, the game will not be very fun.

We can choose to execute the additional challenge in a number of ways:

- A timer (this is the method I chose)
- A limit to the number of incorrect guesses the user has
- A counter for how many incorrect guesses the user has taken (finishing with a lower score is better)

You may be able to come up with additional elements as well

## Execution

So how do we start? The first thing I always do is set up my scaffolding for the site.

### Scaffolding

I make a new directory for my project, then add the following files: index.html, script.js, and style.css.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Concentration</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="style.css" rel="stylesheet">
  <script src="script.js" defer></script>
</head>

<body>

</body>

</html>
```

We can leave the style.css blank for now. Hop into the script.js

```javascript
console.log("Hello, from script.js")
```

Serve the directory to your browser using your preferred method and check the console. You should see the message in the console ensuring that the connection between the files is working.

So let's work on the code for the game now.

### Randomizing Arrays

Lets start with a simple array, just so we can wrap our heads around what we are doing here 

```javascript
let cards = [1,1,2,2,3,3,4,4,5,5,6,6]

console.log(cards)
```

Simple, now we just need to shuffle these numbers. This is really the core of this project. How do we get these numbers in a new array in a completely random order. There is obviously several ways this can be done, but lets work through one way.

We need to remove items from the first array and put them into a new array in a random order.

So we know we will need to incorporate `Math.random()`. We will want our random number to correlate with an index within our first array, so we can use the length of the array as the multiplier for the random number:

```javascript
Math.random() * 12
// or even better
Math.random() * cards.length
// and then eliminate the decimals
Math.floor( Math.random() * cards.length )
```

So we'll just pull from our array using a for-loop 

```javascript
let board = []

for ( let i = 1 ; i < cards.length ; i++ ) {
  board.push( cards[Math.floor( Math.random() * cards )] )
}
```

While this populates our board array, and our board array will indeed be the same length as our initial cards array, there is no guarantee that the board array will contain all the items in the cards array. Or to put it another way, the items of cards array are not depleting, they are being copied at random.

We need to delete the items in the cards array as we pull them out. It seems like there should be a `cards.delete(index)` function. But to my knowledge that doesn't exist. Instead we have a method called `.splice()`. `.splice()` takes two arguments, the first being the index of the first value you want to remove from an array, and the second being the number of consecutive items you would like to remove from the array. Since we only want to remove one at a time, we will use the index and `1` as our arguments. Where the index of course is the random number function we used earlier. Brilliantly, the `.splice()` method returns the value we are removing from our array. So we can wrap the whole thing in a our `board.push()`.

> **EDIT:** It just occurred to me that there is a `delete` operator in JavaScript can can delete individual values in an array, but the `splice()` method is still superior because it returns the removed value, and the `delete` operator will leave an empty value in the array, preserving the length of the initial array.

```javascript
for ( let i = 1 ; i < cards.length ; i++ ) {
  board.push( cards.splice( Math.floor(Math.random() * cards.length )))
}
// PRO TIP: console.table() will show the output of an array in a much prettier format.
console.table(board)
```

Somethings wrong though. Only half of the cards have transferred to the board. We are recalculating the length of the cards array for each iteration, so the loop terminates half way through our intended operation. Easy fix, just throw the length in a variable right before the for-loop

```javascript
let cardsLength = cards.length

for ( let i = 1 ; i < cardsLength ; i++ ) {
  board.push( cards.splice( Math.floor(Math.random() * cards.length )))
}

console.table(board)
```

And there you have it. A shuffled board.

Now we just need to generate some DOM elements based on this array.

### DOM Elements

*Explanation needed*

```javascript
// get gameboard DOM element
const gameBoard = document.getElementById("game-board")

// add a blank card for each array element in "board"
board.forEach((card,i)=>{
  let newCard = document.createElement("div")
  newCard.classList.add("card")
  newCard.setAttribute("id", i)
  newCard.innerText = "0"
  newCard.addEventListener("click", play) // we will create the play function below
  gameBoard.appendChild(newCard)
}
```

You'll need to add a `game-board` div in the body of your index.html

```html
<body>

  <div id="game-board"></div>

</body>
```

And then some basic styling in the style.css

```css
#game-board {
  display: flex;
  flex-wrap: wrap;
  max-width: 70vw;
  margin: auto;
  gap: 2rem;
}

.card {
  border: 2px solid black;
  border-radius: 12px;
  padding: 4rem;
}

.flipped {
  background-color: darkgray;
  color: white;
}
```

### Game Loop

Now we have our cards, and each card has an event listener that calls a `play` function that we've yet to write.

#### Flipping Cards

To flip the card, we just need to add to the class list to give the user a visual queue, and then swap out the inner text with the hidden value. Let's start with the class

```javascript
function play() {
  this.classList.add("flipped")
}
```

But now we need to make sure the card isn't already flipped

```javascript
function play() {
  if (this.classList.contains("flipped")) {
    this.classList.remove("flipped")
  } else {
    this.classList.add("flipped")
  }
}
```

Then for the inner text we can just add a line to each segment. To find the value of the card, we can use the id attribute of the DOM element to reference the index of the `board` array.

```javascript
function play() {
  if (this.classList.contains("flipped")) {
    this.classList.remove("flipped")
    this.innerText = "0"
  } else {
    this.classList.add("flipped")
    this.innerText = board[this.getAttribute("id")]
  }
}
```

You should now be able to flip all the cards.

From here you need to figure out how to check that only 2 cards are flipped at a time, then further, you need to figure out how to check if the 2 flipped cards match or not.
