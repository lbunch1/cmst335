const http = require('http')
const readline = require('readline')

const PORT = 3000

const rl = readline.createInterface(
  process.stdin,
  process.stdout
)

let myName
let myDesc

function askName() {
  rl.question("What is your name? ", (name) => {
    myName = name
    askDesc()
  })
}
function askDesc() {
  rl.question("Please describe yourself here: ", (desc) => {
    myDesc = desc
    rl.close()
    createWebsite()
  })
}

function genWebsite() {
  let website = `
<head>
<title>${myName}</title>
<style>
body {
background-color: black;
color: white;
display: flex;
flex-direction: column;
height: 95vh;
justify-content: center;
align-items: center;
font-family: Sans-Serif;
gap: 2em;
}
</style>
</head>
<body>
<h1>${myName}</h1>
<h3>${myDesc}</h3>
</body>
`
  return website
}

function createWebsite() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" })
    res.end(genWebsite())
  })

  server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
  })
}

askName()
