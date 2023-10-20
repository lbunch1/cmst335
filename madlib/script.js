
function makeStory() {

  // Create arrays containing the input values
  let noun = [...document.querySelectorAll(".noun")].map(e => e.value)
  let adjective = [...document.querySelectorAll(".adjective")].map(e => e.value)
  let verb = [...document.querySelectorAll(".verb")].map(e => e.value)

  // validate that all fields have been filled out, stop the function if fields are left blank. Alert the user with a snarky message.
  if (
    noun.includes('') ||
    adjective.includes('') ||
    verb.includes('')
  ) {
    window.alert("Excuse me, you know how Mad Libs works. Fill out all the fields. And if you are under 10, try not use 'underwear' for every noun")
    return
  }

  // Add the <strong> tag to each word in the array
  noun = noun.map(e => addBold(e))
  adjective = adjective.map(e => addBold(e))
  verb = verb.map(e => addBold(e))

  // Compose the story with all the markup and stuff
  const storyContent = `<p>Dorothy lived in the midst of the great Kansas ${noun[0]}, with Uncle Henry, who was a ${noun[1]}, and Aunt Em, who was the ${noun[1]}’s wife. Their house was ${adjective[0]}, for the lumber to build it had to be ${verb[0]} by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a ${adjective[1]} looking cookstove, a cupboard for the ${noun[2]}s, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big ${noun[3]} in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar—except a small hole ${verb[1]} in the ground, called a cyclone ${noun[3]}, where the family could go in case one of those great ${noun[4]}s arose, mighty enough to ${verb[2]} any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the ${adjective[2]}, ${adjective[3]} ${noun[5]}.</p><button type="button" onclick="refresh()">Play Again</button>`

  // Insert the story block into the "mad" element replacing the form
  document.getElementById("mad").innerHTML = storyContent
}

// simple function to add the bold text to the user input words
function addBold(word) {
  return `<strong>${word}</strong>`
}

// function fed to the button created in the makestory function that reloads the page to start over
function refresh() {
  location.reload()
}
