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

We can choose to excecute the additional challenge in a number of ways:

- A timer (this is the method I chose)
- A limit to the number of incorrect guesses the user has
- A counter for how many incorrect guesses the user has taken (finishing with a lower score is better)

You may be able to come up with additional elements as well

## Excecution

So how do we start? The first thing I always do is set up my scaffolding for the site.

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

```JavaScript
console.log("Hello, from script.js")
```

Serve the directory to your browser using your preffered method and check the console. You should see the message in the console ensuring that the connection between the files is working.

So let's work on the code for the game now.

Lets start with a simple array, just so we can wrap our heads around what we are doing here 

```JavaScript
let cards = [1,1,2,2,3,3,4,4,5,5,6,6]

console.log(cards)
```

Simple, now we just need to shuffle these numbers. This is really the core of this project. How do we get these numbers in a new array in a completely random order. There is obviously several ways this can be done, but lets work through one way.

We need to remove items from the first array and put them into a new array in a random order.

So we know we will need to incorporate `Math.random()`. We will want our random number to correlate with an index within our first array

```JavaScript
let cards = [1,1,2,2,3,3,4,4,5,5,6,6]

```