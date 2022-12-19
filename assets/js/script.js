let level = [
    [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
];
let timer = 60
let grid = document.querySelector('#grid')
let invervalMonster;
let inrvalShoot;

let canShoot = true



function generateGrid(map) {
    grid.innerHTML = ''
    let countEnemy = 0
    let row;
    let cell;
    let draw;
    for (let i = 0; i < map.length; i++) {
        row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < map[i].length; j++) {
            cell = document.createElement('div')
            cell.classList.add('cell')
            if (map[i][j] === 1) {
                draw = document.createElement('img')
                draw.setAttribute('src', './assets/img/player.png')
                cell.appendChild(draw)
            } else if (map[i][j] === 2) {
                countEnemy++
                draw = document.createElement('img')
                draw.setAttribute('src', './assets/img/monster.png')
                cell.appendChild(draw)
            } else if (map[i][j] === 3) {
                draw = document.createElement('img')
                draw.classList.add('laser')
                draw.setAttribute('src', './assets/img/bullet.png')
                cell.appendChild(draw)
            }
            row.appendChild(cell)
        }
        grid.appendChild(row)
    }
    if (countEnemy === 0) {
        gameOver()
    }
}

function movePlayer(map, key) {
    let playerLocation = map.length - 1
    for (let i = 0; i < map[playerLocation].length; i++) {
        if (map[playerLocation][i] === 1) {
            if (key == "ArrowRight" && i != map[playerLocation].length - 1) {
                map[playerLocation][i] = 0
                map[playerLocation][i + 1] = 1
                generateGrid(map)
                break;
            } else if (key == "ArrowLeft" && i != 0) {
                map[playerLocation][i] = 0
                map[playerLocation][i - 1] = 1
                generateGrid(map)
            }
        }

    }
}

function moveMonster(map) {
    for (let i = map.length - 1; i >= 0; i--) {
        for (let j = map[i].length - 1; j >= 0; j--) {
            if (map[i][j] == 2) {
                map[i][j] = 0
                if (j === map[i].length - 1) {
                    if (i === map.length - 2) {
                        //game over
                        window.clearInterval(invervalMonster)
                    }
                    if (map[i + 1][0] === 3) {
                        map[i + 1][0] = 0
                        window.clearInterval(inrvalShoot)
                        canShoot = true
                    } else {
                        map[i + 1][0] = 2
                    }
                } else {
                    if (map[i][j + 1] === 3) {
                        map[i][j + 1] = 0
                        canShoot = true
                        window.clearInterval(inrvalShoot)
                    } else {
                        map[i][j + 1] = 2
                    }
                }
            }
        }
    }
    generateGrid(map)
}

function shoot(map) {
    canShoot = false;
    let positionPlayer = map[map.length - 1].indexOf(1)
    map[map.length - 2][positionPlayer] = 3
    generateGrid(map)
    inrvalShoot = window.setInterval(() => {
        moveShoot(map)
    }, 200)
}

function moveShoot(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 3) {
                if (i != 0) {
                    console.log(i);
                    map[i][j] = 0
                    if (  map[i - 1][j] == 2) {
                        map[i - 1][j] = 0
                        canShoot = true
                        window.clearInterval(inrvalShoot)
                    }else{
                        map[i - 1][j] = 3

                    }
                } else {
                    map[i][j] = 0
                

                    canShoot = true
                    window.clearInterval(inrvalShoot)
                }
            }
        }
    }
    generateGrid(map)
}

function gameOver(map) {
    window.clearInterval(invervalMonster)
    window.clearInterval(inrvalShoot)
    grid.innerHTML = 'Gagné'
}

window.addEventListener('load', function () {
    generateGrid(level)
    invervalMonster = window.setInterval(() => {
        moveMonster(level)
    }, 1000)
})

document.addEventListener('keyup', function (event) {
    console.log(event.key);
    if (event.key == 'ArrowRight' || event.key == "ArrowLeft") {
        movePlayer(level, event.key)
    }
    if (event.key == ' ') {
        if (canShoot) {
            shoot(level)
        }
    }
})



//css




