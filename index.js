const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width=innerWidth
canvas.height=innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30
    }

    draw(){
        c.fillStyle='green'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.position.y+=this.velocity.y
        this.position.x+=this.velocity.x
        this.draw()
        
        if((this.position.y + this.height + this.velocity.y)<=canvas.height){
            this.velocity.y += gravity
        }
        else{
            this.velocity.y=0
        } 
    }

}

class Platform{
    constructor(){
        this.position = {
            x:200,
            y:100
        }
        
        this.width=200
        this.height=20
    }
    draw(){
        c.fillStyle='blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

const player = new Player()
const platforms = [new Platform()]

const keys={
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    //camera
    if (keys.right.pressed && player.position.x <400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x>100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        }
        else if (keys.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }
    
    
    //platfrom collision detection
    platforms.forEach((platform )=> {
        if ((player.position.y + player.height <= platform.position.y) &&
            (player.position.y + player.height + player.velocity.y >= platform.position.y) &&
            (player.position.x + player.width >= platform.position.x) &&
            (player.position.x <= platform.position.x + platform.width)) {
            player.velocity.y = 0
        }
    })
}

animate()

addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowRight":
            console.log('Right')
            keys.right.pressed=true
            break
        case "ArrowLeft":
            console.log('Left')
            keys.left.pressed=true
            break
        case "ArrowDown":
            console.log('Down')
            break
        case "ArrowUp":
            console.log('Up')
            player.velocity.y-=10
            break
    }
})
addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowRight":
            console.log('Right')
            keys.right.pressed=false
            break
        case "ArrowLeft":
            console.log('Left')
            keys.left.pressed=false
            break
        case "ArrowDown":
            console.log('Down')
            break
        case "ArrowUp":
            console.log('Up')
            player.velocity.y-=10
            break
    }
})

