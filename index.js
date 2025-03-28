let snake = []
let lastDirection = 'r'
let direction = 'r'


// generate game field 
const container = document.getElementById('container')
const buildField = () => {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            const div = document.createElement('div')
            div.setAttribute('i', i)
            div.setAttribute('j', j)
            div.classList.add('box')
            container.appendChild(div)
        }
    }
}

const snakeBody = (head=[]) => {
    snake.forEach(cell => {
        const [i, j, isHead] = cell
        const body = document.querySelector(`[i="${i}"][j="${j}"]`)
        body.classList.add("body")
        if (isHead || (head[0] === cell[0] && head[1] === cell[1])) {
            body.classList.remove('body')
            body.classList.add('head')
        } else {
            body.classList.add('body')
            body.classList.remove('head')
        }
    })
}

// let isFruit = false
// const fruit = (snake) => {
//     let i;
//     let j;
//     i = Math.round(Math.random() * 19)
//     j = Math.round(Math.random() * 19)
//     let fruit = [i,j]
//     snake.forEach(array => {
//         if (array.toString() == fruit.toString()) {

//         }
//     })
// }


// remove class  for tail 
const removeClass = (cell) => {
    const [i, j, isHead] = cell
    const body = document.querySelector(`[i="${i}"][j="${j}"]`)
    body.classList.remove("body")
    body.classList.remove("head")
}

// handle direction onClick

const setDirection = (d) => {
    direction = d
}

let isStop = false
const gameOver = () => {
    gameOverContainer.classList.remove('hidden')
    isStop = true
}


const gameOverContainer = document.getElementById('game-over')
const startGame = (direction) => {
    removeClass(snake.pop())
    snake[0].pop()

    // choose direction 
    if (direction === 'l' && lastDirection === 'r') direction = 'r'
    if (direction === 'r' && lastDirection === 'l') direction = 'l'
    if (direction === 'u' && lastDirection === 'd') direction = 'd'
    if (direction === 'd' && lastDirection === 'u') direction = 'u'

    // create head and control movement 
    let head = Array.from(snake[0])
    if (direction === 'r') {
        head[1]++
    }
    else if (direction === 'l') {
        head[1]--
    }
    else if (direction === 'u') {
        head[0]--
    }
    else if (direction === 'd') {
        head[0]++
    }
    lastDirection = direction


    snake.forEach(array => {
        if (array.toString() == head.toString()) {
            gameOver()
            return
        }
    })


    if (head[0] < 0 || head[0] > 19 || head[1] < 0 || head[1] > 19) {
        gameOver()
        return
    }

    head.push(true)
    snake.unshift(head)
    snakeBody(head)
}

// updateBody(direction)

let speed = 500
let startID;
const start = () => {
    startID = setInterval(() => {
        startGame(direction)
    }, speed);
}

setInterval(() => {
    if (isStop) {
        clearInterval(startID)
    }
}, 0);

const restart = () => {
    container.innerHTML = ``
    buildField()
    isStop = false
    gameOverContainer.classList.add('hidden')
    direction = 'r'
    lastDirection= ''
    snake = [[0, 6, true], [0, 5], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4]]
    snakeBody()
    start()
}
restart()

// buildField()
// const handleSpeed =(value)=>{
//     speed+=value
// }