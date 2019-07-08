const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");
const box=32;

const ground=new Image();
ground.src="img/ground.png";

const foodImg=new Image();
foodImg.src="img/pika.png";


//load the audio files
const dead=new Audio();
const eat=new Audio();
const up=new Audio();
const left=new Audio();
const right=new Audio();
const down=new Audio();

dead.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
up.src="audio/up.mp3";
right.src="audio/right.mp3";
left.src="audio/left.mp3";
down.src="audio/down.mp3";

//create snake
let snake=[];
snake[0]={
    x:9*box,
    y:10*box
}

//create food

let food={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box,
}

let score=0;
let d;

//control the snake
document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode==37 && d!="RIGHT"){
        left.play();
        d="LEFT";
    }
    else if(event.keyCode==38 && d!="DOWN"){
        up.play();
        d="UP";
        
    }
    else if(event.keyCode==39 && d!="LEFT"){
        right.play();
         d="RIGHT";
       
    }
    else if(event.keyCode==40 && d!="UP"){
        down.play();
        d="DOWN";
        
    }
    
}


function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x==array[i].x && head.y==array[i].y){
            return true;
        }
    }
    return false;
    
}



function draw(){
    ctx.drawImage(ground,0,0);
    //drawing the snake array
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle=(i==0)?"#9D00FF":"black";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle="#9D00FF";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    //draw the food
   let snakeX=snake[0].x;
   let snakeY=snake[0].y;
    
    //remove the tail for movement
//    snake.pop();
    
    if(d=="LEFT" ){
        snakeX-=box;
    }
    if(d=="UP" ){
        snakeY-=box;
    }
    if(d=="RIGHT" ){
        snakeX+=box;
    }
    if(d=="DOWN"){
        snakeY+=box;
    }
    
    //if the snake eats the food
    if(snakeX==food.x && snakeY==food.y){
        score++;
        eat.play();
        food={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box,
}
    }
    //we dont remove the tail if no food
    else{
       //remove the tail
        snake.pop();
    }
    
    let newHead={
        x:snakeX,
        y:snakeY
    }
    
    //game over rules
    
    if(snakeX<box || snakeX>17*box ||snakeY<3*box || snakeY>17*box ||collision(newHead,snake)){
        dead.play();
        clearInterval(game);
    }
    
    
    
    
    
    //add new head for movement

    snake.unshift(newHead);
   ctx.drawImage(foodImg,food.x,food.y);
    
    //old head position
    
    
    ctx.fillStyle="white";
    ctx.font="45px Arial one";
    ctx.fillText(score,2*box,1.6*box);
    
}

//every 100 ms
let game=setInterval(draw,100);



















