let noun, adjective, verb

const libOne = {
  nouns: 6,
  adjectives: 4,
  verbs: 3,
  story: function() {
    return `<p>Dorothy lived in the midst of the great Kansas ${noun[0]}, with Uncle Henry, who was a ${noun[1]}, and Aunt Em, who was the ${noun[1]}’s wife. Their house was ${adjective[0]}, for the lumber to build it had to be ${verb[0]} by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a ${adjective[1]} looking cookstove, a cupboard for the ${noun[2]}s, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big ${noun[3]} in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar—except a small hole ${verb[1]} in the ground, called a cyclone ${noun[3]}, where the family could go in case one of those great ${noun[4]}s arose, mighty enough to ${verb[2]} any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the ${adjective[2]}, ${adjective[3]} ${noun[5]}.</p><button type="button" onclick="refresh()">Play Again</button>`
  }

}

function makeForm(story) {
  document.getElementById("mad").innerHTML = ""
  let form = document.createElement("form")

  form.innerHTML += '<h2>Nouns:</h2>'
  for (let i = 1; i <= story.nouns; i++) {
    form.innerHTML += `<label>${i}:<input type="text" id="n${i}" class="noun" /></label>`
  }
  form.innerHTML += '<h2>Adjectives:</h2>'
  for (let i = 1; i <= story.adjectives; i++) {
    form.innerHTML += `<label>${i}:<input type="text" id="a${i}" class="adjective" /></label>`
  }
  form.innerHTML += '<h2>Verbs:</h2>'
  for (let i = 1; i <= story.verbs; i++) {
    form.innerHTML += `<label>${i}:<input type="text" id="v${i}" class="verb" /></label>`
  }
  form.innerHTML += `<button type="button" onclick="makeStory(libOne)">Generate My Story</button>`


  document.getElementById("mad").appendChild(form)
}
function makeStory(story) {

  // Create arrays containing the input values
  noun = [...document.querySelectorAll(".noun")].map(e => e.value)
  adjective = [...document.querySelectorAll(".adjective")].map(e => e.value)
  verb = [...document.querySelectorAll(".verb")].map(e => e.value)

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

  // Insert the story block into the "mad" element replacing the form
  document.getElementById("mad").innerHTML = story.story()
}

// simple function to add the bold text to the user input words
function addBold(word) {
  return `<strong>${word}</strong>`
}

// function fed to the button created in the makestory function that reloads the page to start over
function refresh() {
  location.reload()
}

