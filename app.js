let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let cellsize = 50; //height and width of each cell
let board_height = 600;
let board_width = 1000
let snakecells = [[0,0]] //2d array to store starting points ka rectangle
let direction = 'right'
let gameover = false
let score = 0

let foodcell = generatefood() 

//keydown event is triggered
document.addEventListener('keydown',function(event){
    if(event.key==='ArrowDown'){direction='down'}
    else if(event.key==='ArrowUp'){direction='up'}
    else if(event.key==='ArrowLeft'){direction='left'}
    else{direction='right'}
})

//function to draw snake
function draw(){
    if(gameover==true){
        clearInterval(id)
        ctx.fillStyle = 'orange'
        ctx.font = '100px monospace'
        ctx.fillText('GAME OVER',215,310)
        return
    }

    //draw snake
    ctx.clearRect(0,0,board_width,board_height)
    for(let cell of snakecells){
        ctx.fillStyle = 'white'
        ctx.fillRect(cell[0],cell[1],cellsize,cellsize)
        ctx.strokeStyle = 'gray'
        ctx.strokeRect(cell[0],cell[1],cellsize,cellsize)
    }

    // draw food
    ctx.fillStyle='red'
    ctx.fillRect(foodcell[0],foodcell[1],cellsize,cellsize)

    //draw text
    ctx.font='24px monospace'
    ctx.fillStyle = 'yellow'
    ctx.fillText(`Score: ${score}`,15,30)

}

//function to update snake 
function update(){
    let headX = snakecells[snakecells.length-1][0]
    let headY = snakecells[snakecells.length-1][1]

    // let newheadX = headX+cellsize
    // let newheadY = headY

    let newheadX
    let newheadY

    if(direction==='right'){
        newheadX = headX+cellsize
        newheadY = headY
        if(newheadX === board_width || self_bite(newheadX,newheadY)){
            gameover=true
        }
    }else if(direction==='up'){
        newheadX = headX
        newheadY = headY-cellsize
        if(newheadY < 0 || self_bite(newheadX,newheadY)){
            gameover=true
        }
    }else if(direction==='down'){
        newheadX = headX
        newheadY = headY+cellsize
        if(newheadY=== board_height || self_bite(newheadX,newheadY)){
            gameover=true
        }
    }else{
        newheadX = headX-cellsize
        newheadY = headY
        if(newheadX < 0 || self_bite(newheadX,newheadY)){
            gameover=true
        }
    }
    snakecells.push([newheadX,newheadY])

    if (newheadX===foodcell[0]&&newheadY===foodcell[1]){
        foodcell = generatefood()
        score+=1
    }else{
        snakecells.shift()                     // it removes first element of the array
    }
    
}

//repeat
let id = setInterval(() => {
    update()
    draw()
}, 150);

function generatefood(){
    return[
        Math.round((Math.random()*(board_width-cellsize))/cellsize)*cellsize,
        Math.round((Math.random()*(board_height-cellsize))/cellsize)*cellsize
    ]
}

function self_bite(newheadX,newheadY){
    // loop
    for(let item of snakecells){
        if(item[0] === newheadX && item[1]===newheadY){
            return true
        }
    }
    return false
}