let inputDir = {x:0, y:0};
let snk = [{x:13, y:15}];
let food = {x:6, y:8};
let lastPaintTime = 0;
let speed = 9;
let score = 0;


function main(ctime){
  window.requestAnimationFrame(main);

  if((ctime-lastPaintTime)/1000 < 1/speed){
    return;
  }
  console.log(ctime);
  lastPaintTime = ctime;

  gameEngine();
}

function isCollide(snk){
  for(let i=1; i<snk.length; i++){
    if(snk[0].x === snk[i].x && snk[0].y === snk[i].y){
      return true;
    }
  }
  if(snk[0].x >= 18 || snk[0].x <=0 || snk[0].y >= 18 || snk[0].y <=0){
    return true;
  }
  return false;
}

function gameEngine(){
  //chk collision
  if(isCollide(snk)){
    alert('Game Over!');
    inputDir = {x:0, y:0};
    snk=[{x:13, y:15}];
    score = 0; 
    scoreBox.innerHTML = "Score: " + score;
  }
  
  //eating food
  if(snk[0].x === food.x && snk[0].y === food.y){
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snk.unshift({x: snk[0].x + inputDir.x, y: snk[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
  }

  for(let i=snk.length-2; i>=0; i--){
    snk[i+1] = {...snk[i]};
  }

  //head movement
  snk[0].x += inputDir.x;
  snk[0].y += inputDir.y;

  //display snk & food
  board.innerHTML = "";
  snk.forEach((e, i) => {
    let snkElem = document.createElement('div');
    snkElem.style.gridRowStart = e.y;
    snkElem.style.gridColumnStart = e.x;
    if(i === 0)
      snkElem.classList.add('head');
    else
      snkElem.classList.add('snake');
    board.appendChild(snkElem);
  })
  let foodElem = document.createElement('div');
  foodElem.style.gridRowStart = food.y;
  foodElem.style.gridColumnStart = food.x;
  foodElem.classList.add('food');
  board.appendChild(foodElem);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
  //inputDir = {x:0, y:1};
  switch(e.key){
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;  
  }
})