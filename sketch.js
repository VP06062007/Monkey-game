// Create Global variables
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var ground, invisiable;
var survivalTime = 0;
var GameState;
var PLAY, END;
var end;

function preload(){
  
  // Load all images and animations
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,500)
  
  // Game state play and end
  PLAY = 1;
  GameState = PLAY;
  END = 0;
  
  // Create Group Objects for Food and Obstacles
  foodGroup = new Group();
  obstacleGroup = new Group();

  // Create Monkey Sprite
  monkey = createSprite(70,370,50,50);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.1
  
  // Create Ground Sprite
  ground = createSprite(250,405,100,10)
  ground.x = ground.width / 2;

  // Create invisible Ground Sprite
  invisible = createSprite(250, 407, 1000, 10);
  invisible.x = ground.width / 2;
  
}


function draw() {
  
  // Background color white
  background("white");
  
  // Game state play
  if(GameState === PLAY) {
    // Reset the ground
    if (ground.x < 0) {
      ground.x =ground.width / 2;
    }
    
    // Reset the invisible ground
    if (invisible.x < 0) {
      invisible.x = invisible.width / 2;
    }
    
    invisible.velocityX = -5;
    
    if(keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -20;
    }
    
    // Score
    score = Math.round(frameCount / 3);
    survivalTime = Math.ceil(frameCount / frameRate());
    ground.velocityX = -7
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
   
    Food();
    Obstacle();
    
    if(monkey.isTouching(obstacleGroup)){
      GameState = END
    }
    
  } else if (GameState === END) {
    ground.velocityX = 0;
    invisible.velocityXEach = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  monkey.velocityY=monkey.velocityY + 0.9
  
  monkey.collide(invisible);
  
  // Score text
  stroke("black");
  textSize(20);
  fill("red");
  text("score:"+ score, 400, 50);
  
  // Survival Time text 
  stroke("black");
  textSize(20);
  fill("black");
  text("survival time;" + survivalTime, 100, 50);
  
  drawSprites();
}

// Food function
function Food() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 +2 * score/100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }

}  

// Obstacle function
function Obstacle() {
    
    if(frameCount % 300 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 +2 * score/100);
    obstacle.addImage("banana", bananaImage);
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle",0,0,200);
  }

}