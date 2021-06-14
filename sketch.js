  
var bg_Img;

var bird,bird_Img,birdend_Image;
var bird_collided_Img;

var topPipes,topPipe_Img;

var bottomPipes,bottomPipe_Img;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var score=0;

var restart,restart_Img;

var ground,ground_Img;

var wing_Sound;

var hit_Sound;

function preload(){
    bg_Img = loadImage("bg.png");

    bird_Img = loadAnimation("bird1.png","bird2.png","bird3.png");

    bird_collided = loadAnimation("bird_collided.png");

    birdend_Image = loadImage("birdend.png");

    ground_Img = loadImage("ground.png");

    topPipe_Img = loadImage("topPipe.png");
    bottomPipe_Img = loadImage("bottomPipe.png");

    restart_Img = loadImage("restart.png");

    wing_Sound = loadSound("wing.mp3");
    hit_Sound = loadSound("hit.wav"); 
}

function setup(){
    var canvas = createCanvas(550,650);

    ground = createSprite(250,610,550,20);
    ground.addImage("grd_Img",ground_Img);
    ground.scale=0.2;
    ground.velocityX=-8;

    bird=createSprite(200,250);

    bird.addAnimation("brd_Img",bird_Img);
    bird.addAnimation("collided",bird_collided);
    bird.addAnimation("end",birdend_Image);
    
    bird.scale=1.7;

    restart = createSprite(260,330);
    restart.addImage("rstrt_Img",restart_Img);
    restart.scale = 0.8;

    topPipesGroup= new Group();
    bottomPipesGroup= new Group();

    score = 0;
    
}

function draw(){
    background(bg_Img); 

    fill("white");
    stroke("black");
    strokeWeight(5);
    textSize(55);
    text(" "+ score, 220,70);
  
      if(gameState == PLAY){
        restart.visible = false;

        bird.visible = true;
        
        if(frameCount%40 === 0){
            score = score + 2;
        }
    
        if(ground.x<20){
          ground.x=250;
        }

        if(bird.isTouching(ground)){
          gameState = END;
          hit_Sound.play();
          bird.changeAnimation("collided",bird_collided);
        }

        flyBird();

        spawnTopPipes();
        spawnBottomPipes();

      if(topPipesGroup.isTouching(bird) || bottomPipesGroup.isTouching(bird)){
        gameState = END;
        hit_Sound.play();
        
        bird.changeAnimation("end",birdend_Image);
        bird.velocityY = +14;
        bird.collide(ground);
      }
      
      bird.collide(ground);
      
      }
        if(gameState === END){

        restart.visible = true;

        ground.velocityX = 0;
        bird.velocityY = 0;
        
        topPipesGroup.setVelocityXEach(0);
        bottomPipesGroup.setVelocityXEach(0);

        bird.velocityY = +12;
        bird.collide(ground);
        
          if(mousePressedOver(restart)) {
            reset();
          }
      }


      drawSprites();
      
}   

function flyBird(){

  if(keyDown("space")) {
    bird.velocityY = -9;
    wing_Sound.play();
  }

     bird.velocityY = bird.velocityY + 1;
}

function reset(){

    gameState = PLAY;

    restart.visible = false;
  
    topPipesGroup.destroyEach();
    bottomPipesGroup.destroyEach();

    bird.x = 200;
    bird.y = 200;

    score = 0;

    bird.changeAnimation("brd_Img",bird_Img);

    ground.velocityX=-9;
}

function spawnTopPipes() {

    if (frameCount % 45 === 0) {
        var topPipes = createSprite(650,random(20,90))
        topPipes.addImage(topPipe_Img);

        topPipes.scale = 1.8;

        topPipes.velocityX = -9;

        bird.depth = topPipes.depth;
        bird.depth+=1;

        topPipesGroup.add(topPipes);
    }  
}

function spawnBottomPipes() {
  
    if (frameCount % 45 === 0) {
        var bottomPipes = createSprite(650,random(575,635));
        bottomPipes.addImage(bottomPipe_Img);
        bottomPipes.scale = 1.8;
        bottomPipes.velocityX = -9;
      
        ground.depth=bottomPipes.depth;
        ground.depth+=1;
      
        bottomPipesGroup.add(bottomPipes);
    }
 }