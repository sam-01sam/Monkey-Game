// creating global variables 
var backgroundimage, junglebackground;
var bananaimage, BananaGroup;
var playerrunning, player;
var ObstaclesGroup, obstacleimage;
var ground;
var gameState = "PLAY";
var score;
var istouched = false;

// setting the image for the background, banana and stone and setting the animation for the monkey  
function preload() {
  backgroundimage = loadImage("jungle.jpg");
  bananaimage = loadImage("banana.png")
  playerrunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  obstacleimage = loadImage("stone.png");
  score = 0;
}


function setup() {
  createCanvas(400, 400);
  // creating a moving background 
  junglebackground = createSprite(200, 180, 20, 50);
  junglebackground.addImage("Background", backgroundimage);
  junglebackground.velocityX = -2

  // creating the monkey (player)
  player = createSprite(60, 350, 20, 20);
  player.addAnimation("playerrunning", playerrunning);
  player.scale = 0.1;

  // creating a group for banana and obstacle (stone)
  ObstaclesGroup = new Group();
  BananaGroup = new Group();

  // creating an invisible ground 
  ground = createSprite(350, 390, 700, 20)
  ground.visible = false;
}

function draw() {
  background(205, 153, 0);
  
  if(gameState === "PLAY"){
  
      // reseting the background 
      if (junglebackground.x < 0) {
        junglebackground.x = junglebackground.width / 2;
      }

      // coliding the monkey to the ground 
      player.collide(ground);
      // giving the monkey gravity when it jumps 
      player.velocityY = player.velocityY + 0.8;

      Obstaclespawn();
    
      // ending the game 
      if (ObstaclesGroup.isTouching(player)) {
        if (istouched == false){
            player.scale = 0.1;
            istouched=true;
        }
        else if(istouched == true){
          gameState = "END";
        }
      }
  
      Bananaspawn();
    
      // increasing the score when monkey touches banana  
      if (BananaGroup.isTouching(player)) {
        score = score + 2;
        BananaGroup.destroyEach();
      }
      // increasing the monkey's size 
      switch (score) {
        case 10:
          player.scale = 0.2;
          break;
        case 20:
          player.scale = 0.3;
          break;
        case 30:
          player.scale = 0.4;
          break;
        case 40:
          player.scale = 0.5;
          break;
        default:
          break;
      }
  }
  
// destroying obstacles and banana, and stop the  moving background when the monkey   touches the obstacles 
  else if(gameState === "END"){
      ObstaclesGroup.destroyEach();
      BananaGroup.destroyEach();
      player.destroy();
      junglebackground.velocityX=0;
  }
  
  drawSprites();
  //displaying score
  stroke("white");
  //textsize(20);
  fill("white");
  text("Score: " + score, 300, 20);
}

// when space key is pressed the monkey will jump
function keyPressed() {
  if (keyCode === 32 && player.y >= 320) {
    player.velocityY = -12;
  }
}

//displaying the obstacle 
function Obstaclespawn() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(400, 375, 10, 40);
    obstacle.addImage(obstacleimage);
    switch (player.scale) {
      case 0.1:
        obstacle.y=375;
        obstacle.scale = 0.05;
        break;
      case 0.2:
        obstacle.y=365;
        obstacle.scale = 0.1;
        break;
      case 0.3:
        obstacle.y=350;
        obstacle.scale = 0.2;
        break;
      default:
        obstacle.scale = 0.3;
        break;
    }

    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    ObstaclesGroup.add(obstacle);
  }
}

// creating a function for banana 
function Bananaspawn() {
  if (frameCount % 150 === 0) {
    var banana = createSprite(400, 250, 50, 50)
    banana.addImage("Banana", bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -2;
    banana.lifettime = 300;
    BananaGroup.add(banana);
  }
}