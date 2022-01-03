var bgSprite , bgImg , bgImg2 , bgImg3;
var girl , childStandingAnimation, childRunningAnimation , adultRunningAnimation ,adultStandingAnimation, teenageRunningAnimation,teenageStandingAnimation;
var brickWall, brickWallGrp,brickImg;
var ground;
var music , trophySound , transitionSound;
var obstacle , obstaclesGrp;
var spikeImg , virusImg , cactusImg;
var lightBulb , lightBulbImg ,trophy, trophyImg , trophyGrp;
var score=0;
var progressBarWidth = 0 ;
var gameState = "start";
var introBg;
var teenageStageFlag = false;
var adultStageFlag = false ;
var b1 , b2 , b3 , b4 ; 

//load images
function preload(){
bgImg1 = loadImage("IMAGES/bg1.png");
bgImg2 = loadImage ("IMAGES/bg2.png");
bgImg3 = loadImage ("IMAGES/bg3.png");
childRunningAnimation = loadAnimation("IMAGES/Child 1.png " , "IMAGES/Child 2.png ","IMAGES/Child 3.png ","IMAGES/Child 4.png ");
childStandingAnimation = loadAnimation("IMAGES/child 1.png");
brickImg = loadImage("IMAGES/brickWall.png");
teenageRunningAnimation = loadAnimation("IMAGES/T1.png" ,"IMAGES/T2.png","IMAGES/T3.png","IMAGES/T4.png");
teenageStandingAnimation = loadAnimation ("IMAGES/T3.png");
adultRunningAnimation = loadAnimation("IMAGES/A1.png" ,"IMAGES/A2.png","IMAGES/A3.png","IMAGES/A4.png","IMAGES/A5.png" );
adultStandingAnimation = loadAnimation ("IMAGES/A5.png");
music = loadSound("music.mp3");
transitionSound = loadSound ("transition Sound.wav");
trophySound = loadSound ("trophy sound.wav");
spikeImg = loadImage("IMAGES/spikes.png");
virusImg = loadImage("IMAGES/virus.png");
cactusImg = loadImage("IMAGES/cactus.png");
trophyImg=loadImage("IMAGES/trophy.png");
lightBulbImg= loadImage("IMAGES/lightBulb.png");
introBg = loadImage("IMAGES/game page.png");
}





function setup() {
  createCanvas(windowWidth,windowHeight);

  //create background
  bgSprite = createSprite(width/2 , height/2);
  bgSprite.addImage(bgImg1);
  bgSprite.scale = 2.2;
  bgSprite.velocityX = -5;


  //create girl
  girl =createSprite(width/2 - 500 ,height/2 + 120);
  girl.addAnimation("childRunning" , childRunningAnimation);
  girl.addAnimation("childStanding" , childStandingAnimation);
  girl.addAnimation("teenageRunning" , teenageRunningAnimation);
  girl.addAnimation("adultRunning" , adultRunningAnimation);
  girl.addAnimation("teenageStanding" , teenageStandingAnimation);
  girl.addAnimation("adultStanding" , adultStandingAnimation);
 // girl.scale = 1.2;
  
//create invisible ground
  ground = createSprite(width/2-100, height/2+190 , 1500,30);
  
  // b1 = createSprite(20 , 70 , 20,20);
    //b1.addImage(lightBulbImg);
   //b1.scale=0.1;

   //b2 = createSprite(50 , 70 , 20,20);
   //b2.addImage(lightBulbImg);
   //b2.scale=0.1;

   //b3 = createSprite(80 , 70 , 20,20);
   //b3.addImage(lightBulbImg);
   //b3.scale=0.1;

   //b4 = createSprite(110 , 70 , 20,20);
   //b4.addImage(lightBulbImg);
   //b4.scale=0.1;
  //music.loop();  

  //groups
  brickWallGrp = new Group ();
  obstaclesGrp = new Group();
  trophyGrp = new Group();
}


function draw(){
  if(gameState === "start"){
    background (introBg);
    if(keyDown(ENTER)){
      gameState = "childStage";
    }
  }
  else{ 

  if(gameState === "childStage"){
    girl.changeAnimation("childRunning");
    girl.scale = 1;
    if(progressBarWidth === 400){
      gameState = "teenageStage"
    }

  }else if (gameState === "teenageStage"){
    girl.changeAnimation("teenageRunning");
    //transitionSound.play();
    bgSprite.addImage(bgImg2);
    bgSprite.scale=1.03;
    girl.scale = 1;
    obstacle.y= height/2+160;
    if(!teenageStageFlag){
      score = 0;
      progressBarWidth = 0;
      teenageStageFlag = true;
    }

    if(progressBarWidth === 400){
      gameState = "adultStage"
    }
    
  }else if (gameState === "adultStage"){
    //transitionSound.play(); 
    girl.changeAnimation("adultRunning");
    girl.scale = 1.3;
    bgSprite.addImage (bgImg3);
    bgSprite.scale = 1.47;
    if(!adultStageFlag){
      score = 0;
      progressBarWidth = 0;
      adultStageFlag = true;
    }
    if(progressBarWidth === 400){
      
     // gameState = "endStage";
    }
  
    
  }
  background(255,255,255); 
  if(bgSprite.x < 0 ){
    bgSprite.x = width/2;
  } 
  
  //make the girl jump
  if(keyDown("SPACE") && girl.y>=300){
    girl.x -= 3;
    girl.velocityY = -8;
    
  }
  
  girl.velocityY = girl.velocityY + 0.5;

  //camera.position.x = girl.position.x;

  //ground's position
  ground.visible = false;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  girl.collide(ground);

  //setting collider radius of girl
  //girl.debug = true;
  girl.setCollider("rectangle" ,0,0, 10,80);


  //condition 1
  if(girl.isTouching(brickWallGrp)){
    girl.velocityY = 0;
    if(gameState === "childStage"){
      girl.changeAnimation("childStanding");
    }else if(gameState === "teenageStage"){
      girl.changeAnimation("teenageStanding");
    }else {
      girl.changeAnimation("adultStanding");
    }
    bgSprite.velocityX=0;
    brickWallGrp.setVelocityXEach(0);
    obstaclesGrp.setVelocityXEach(0);
    trophyGrp.setVelocityXEach(0);

  }else{
    bgSprite.velocityX = -3;
    brickWallGrp.setVelocityXEach(-3);
    obstaclesGrp.setVelocityXEach(-3);
    trophyGrp.setVelocityXEach(-3);
  }

  //girl's movememts
  if(keyDown(RIGHT_ARROW)){
    girl.x += 4;
    if(gameState === "childStage"){
      girl.changeAnimation("childRunning");
    } 
    else if(gameState === "teenageStage"){
      girl.changeAnimation("teenageRunning");
    }
    else {
      girl.changeAnimation("adultRunning");
    }
   
  }
  if(keyDown(LEFT_ARROW)){
    girl.x -= 4;
    if(gameState === "childStage"){
      girl.changeAnimation("childRunning");
    }
    else if(gameState === "teenageStage"){
      girl.changeAnimation("teenageRunning");
    }
    else {
      girl.changeAnimation("adultRunning");
    }
  }

  if(girl.isTouching(trophyGrp)){
    for( var i = 0 ; i<trophyGrp.length; i++){
      if(girl.isTouching(trophyGrp[i])){
        trophyGrp[i].destroy();
      }
    }
    //trophyGrp.destroyEach();
    trophySound.play();
    score = score+10;
    progressBarWidth += 40; 
  }

  for (var i=50;i<200;i=i+40){

  var life=createSprite(i,70);
  life.addImage(lightBulbImg);
  life.scale = 0.1;
  }

  //if(girl.isTouching(obstaclesGrp)){
    //life = life - 1;
  //}
  

  spawnBrickWalls();
  spawnObstacles();
  spawnTrophies();
  drawSprites();

  textSize(20);
  fill("red");
  strokeWeight(2);
  stroke("red");
  text("TROPHY:" + score , 10,30);

  handleProgressBar();
}
};


function spawnBrickWalls(){
  var randomFrameCount = Math.round(random(100,400));
  if(frameCount % randomFrameCount === 0){
    brickWall = createSprite(width + 20 , height/2 + 130);
    brickWall.addImage(brickImg);
    brickWall.velocityX = -4;
    brickWall.scale = 0.5;
    brickWall.lifeTime = width/3;
    brickWallGrp.add(brickWall);


  }
  }

  function spawnObstacles(){
    var randomFrameCount = Math.round(random(100,600));
    if(frameCount % randomFrameCount === 0){
      obstacle = createSprite(width + 20 , height/2);
      var randomObstacle = Math.round(random(1,3));
      console.log(randomObstacle);

      switch(randomObstacle){
        case 1 : obstacle.addImage(cactusImg);
                 obstacle.y = Math.round(random(300,120));
                 //obstacle.x = brickWallGrp.x;
                 obstacle.scale = 0.15;
                  break ;   
        case 2 : obstacle.addImage(spikeImg);
                 obstacle.y = height/2+150;
                 obstacle.scale = 0.25;
                break;
        case 3 : obstacle.addImage(virusImg);
                 obstacle.y=Math.round(random(600,200));
                 obstacle.scale = 0.3;
                 break;
      }
      //obstacle.depth = brickWall.depth;
      //obstacle.depth = obstacle.depth + 1
      obstacle.velocityX = -3;
     
      obstacle.lifeTime = width/3;
      obstaclesGrp.add(obstacle);
  
  
    }
    }

    function spawnTrophies(){
    if(frameCount % 100 === 0){
     trophy = createSprite(width + 20 , height/2- 220);
     trophy.addImage(trophyImg);
     trophy.velocityX = -3;
     trophy.scale = 0.15;
     trophy.y = Math.round(random(350,120));
     trophy.lifeTime = width/3;
     trophyGrp.add(trophy);

    }
  }
  function  handleProgressBar(){
    strokeWeight (5);
    stroke ("yellow");
    fill ("white");
    rect (150,10,400,20);
    fill ("red");
    //stroke ("black");
    var barWidth = 0;
    if(progressBarWidth === 0 ){
      barWidth = 0.1;
    }else{
      barWidth = progressBarWidth;
    }
    console.log(progressBarWidth);
    noStroke();
    rect (150,10, barWidth, 20);
    

  }