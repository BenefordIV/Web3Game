/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';
import Config from './config';

//create a module for all classes to sit in


//the idea of using states came from the typescript tutorials from 
//http://www.gamefromscratch.com/post/2014/05/29/Adventures-in-Phaser-with-TypeScript-Where-did-my-game-loop-go.aspx


  //create a game state that will load first
  export class TitleScreenState extends Phaser.State{
    game: Phaser.Game;
    //user the constructor
    constructor() {
      super();
    }

    //import the sprite sheet of the title screen
    TitleScreen: Phaser.Sprite;

    //preload method to load the image of the sprite
    preload(){
      //load the spritesheet with the dimensions of the game screen
      this.load.spritesheet('title', './assets/images/MainMenuSpriteSheet.png', 1024, 576);
    }

    //create method that will generate the sprite sheet along with run the sprites
    create(){
      //generate sprite with x, y, and key
      this.TitleScreen = this.add.sprite(0,0,'title', [0]);

      //generate the animation for 
      this.TitleScreen.animations.add('blink', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
      this.TitleScreen.animations.play('blink', 10, true, false);

      //create the click that will point to another state
      this.input.onTap.addOnce(this.titleClicked, this);
    }

    //title clicked method that will point to the other game state
    titleClicked(){
      this.game.state.start("BedroomRunningState");
    }
  }

  export class BedroomRunningState extends Phaser.State{
    //load variables
    logo: Phaser.Sprite;
    cursors: Phaser.CursorKeys;
    floor: Phaser.Sprite;
    door:Phaser.Sprite;
    bookcase:Phaser.Sprite;
    bed:Phaser.Sprite;
    background:Phaser.Sprite;
    books:Phaser.Sprite;
    fan:Phaser.Sprite;
    logo2:Phaser.Sprite;
    spaceKey:any;
  
    //constructor method
    constructor() {
     super();
    }
  
  
    //preload all sprites and files
    preload() {
      this.game.load.image("logo", "./assets/images/mushroom2.png");
      this.game.load.image("floor", "./assets/images/FloorSprite.png");
      this.game.load.image("door", "./assets/images/DoorSprite.png");
      this.game.load.image("bookcase", './assets/images/BookCaseSprite.png');
      this.game.load.image('bed', './assets/images/BedSprite.png');
      this.game.load.image('background', './assets/images/BackgroundSprite.png');
      this.game.load.image('books', './assets/images/BooksSprite.png');
      this.game.load.spritesheet('fan', './assets/images/FanSprite.png', 267, 100);
    }
  
    //create method that will generate all sprites and animatins for this gamestate
    create() {
      //load in sprites
      this.background = this.game.add.sprite(0, 0, "background");
      this.fan = this.game.add.sprite(this.game.world.centerX, 0, "fan");
      this.door = this.game.add.sprite(750, 165, "door");
      this.bookcase = this.game.add.sprite(0,0, "bookcase");
      this.books = this.game.add.sprite(0,0,"books");
      this.bed = this.game.add.sprite(0,0,"bed");
      this.floor = this.game.add.sprite(0, 765, "floor");
      this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
      
      this.fan.scale.setTo(1, 1);
      
  
  
      //apply physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
  
      this.game.physics.arcade.enable([this.floor, this.logo]);
      this.floor.body.collideWorldBounds = true;
      this.logo.body.collideWorldBounds = true;
  
      //make thef floor immovable
      this.floor.body.immovable = true;  
      
  
      this.logo.body.gravity.y = 300;
  
      this.fan.animations.add("spin", [0,1]);
      this.fan.animations.play("spin", 10, true, false);
      
      
      this.cursors = this.game.input.keyboard.createCursorKeys();
  
  
    }
  //just to chceck and upadate the placeholder sprite to collide with the floor
    update() {
      this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.game.physics.arcade.collide(this.floor, this.logo);

      //stop the player when not moving
      this.logo.body.velocity.x = 0;

      //left and right 
      if(this.cursors.left.isDown){
        this.logo.body.velocity.x = -150;
      }
      else if(this.cursors.right.isDown){
        this.logo.body.velocity.x = 150;
      }
      
      //jumping witht he spacekey
      if(this.spaceKey.isDown && this.logo.body.touching.down){
        this.logo.body.velocity.y = -350;
      }

      if(this.cursors.up.isDown){
        if(this.checkOverlap(this.logo, this.door)){
          this.game.state.start("FirstLevelState");
        }
      
    }
  }
  //the check overlap method comes from https://phaser.io/examples/v2/sprites/overlap-tween-without-physics
  //I know Phaser has an overlap method to check the bounds of two objects but that requires me to add in a bunch of extra 
  //physics based coding.
    checkOverlap(spriteA, spriteB){
      let centerX = spriteA.getBounds();
      let boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(centerX, boundsB);
    }
  }



  //create a gamestate for the first level of the game
  export class FirstLevelState extends Phaser.State{
    //load in sprites
    logo:Phaser.Sprite;
    background:Phaser.Sprite;
    ground:Phaser.TileSprite;
    game:Phaser.Game;
    cloud:Phaser.Sprite;
    spaceCraft:Phaser.Sprite;
    timer:number;
    total:number;
    cursor:any;
    spaceKey:any;

    constructor(){
      super();
    }
    //preload method that adds all of the sprites
    preload(){
      this.game.load.image("logo", "./assets/images/mushroom2.png");
      this.game.load.image("background", "./assets/images/SkySprite.png");
      this.game.load.image("ground", './assets/images/GroundSprite.png');
      this.game.load.image("cloud", './assets/images/CloudSprite.png');
      this.game.load.image("spaceCraft", './assets/images/PersonalSpaceCraft.png');
    }

    create(){
      //load in the sprites
      this.background = this.game.add.sprite(0, 0, "background");
      //call function to add clouds to the game
      this.AddClouds();
      this.game.world.setBounds(0,0,2048,576);
      this.ground = this.game.add.tileSprite(0 ,488, 2048, 576, "ground");
      this.spaceCraft = this.game.add.sprite(1700, 400, "spaceCraft");
      this.logo = this.game.add.sprite(0, 400, "logo");
      

      //add phsyics to the floor and logo sprite
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable([this.logo, this.ground]);
      //bound character to the world
      this.logo.body.collideWorldBounds = true;
      //set ground to be immovable
      this.ground.body.immovable = true;

      //set gravity of logo
      this.logo.body.gravity.y = 300;
      

      this.cursor = this.game.input.keyboard.createCursorKeys();

      //have the camera follow the player
      
      this.game.camera.follow(this.logo);

      
      
      
      
    }

    //function to add clouds to the game
    AddClouds(){
      this.total = 0;
      //call the cloud image
      this.cloud = this.game.add.sprite(-(Math.random() * 1024), this.game.world.randomY - 350, "cloud");
      
      this.cloud.scale.setTo(2,2);

      //this came from the Phaser.IO community tutorial https://phaser.io/examples/v2/sprites/add-several-sprites
      //written by ProtonStorm
      this.game.add.tween(this.cloud).to({ x: this.game.width + (2500 + this.cloud.x) }, 30000, Phaser.Easing.Linear.None, true);

      this.total++;
      this.timer = this.game.time.now + 2500;

      
    }
    //update with all of the key moves
    update() {

      this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.game.physics.arcade.collide(this.ground, this.logo);

      //stop the player when not moving
      this.logo.body.velocity.x = 0;

      //left and right 
      if(this.cursor.left.isDown){
        this.logo.body.velocity.x = -150;
       
      }
      else if(this.cursor.right.isDown){
        this.logo.body.velocity.x = 150;
        
      }
      else {
        
      }
      
      //jumping witht he spacekey
      if(this.spaceKey.isDown && this.logo.body.touching.down){
        this.logo.body.velocity.y = -350;
      }

      //update teh clouds
      if (this.total < 2 && this.game.time.now > this.timer)
      {
        this.AddClouds();
      }

      //check

      if(this.cursor.up.isDown){
        if(this.checkOverlap(this.logo, this.spaceCraft)){
          this.game.state.start("SecondLevelState");
        }

      }
    }

    checkOverlap(spriteA, spriteB){
      let centerX = spriteA.getBounds();
      let boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(centerX, boundsB);
    }


  }

  //This is where the bulk of the game is going to be played. I decided to add in this level as opposed to deleting the previous levels
  //So that I can go back and reference them on how I added the sprites and actions into the game.
  export class SecondLevelState extends Phaser.State{
    //variables for second level
      enemy:Phaser.Sprite;
      background:Phaser.TileSprite;
      spaceCraft:Phaser.Sprite;
      laser:Phaser.Sprite;
      bullet:Phaser.Sprite;
      spawn:number;
      randomNumber:number;
      cursor:any;
      spaceKey:any;
      boostKey:any;
      laserKey:any;
      timer:any;

      //anything that has to deal with the bullets and the laser comes from the tutorial of phaser.io/examples/v2/input/keyboard-justpressed
      bulletTime:number;
      laserTime:number;
      laserEnergy:number;
      bullets:any;
      lasers:any;
      

      constructor(){
        super();
      }

      //preload the images
      preload(){
        this.game.load.spritesheet('enemy', './assets/images/enemy1-sheet.png', 64, 64);
        this.game.load.image('spaceCraft', './assets/images/PersonalSpaceCraft2.png');
        this.game.load.image('background', './assets/images/SpaceBackground.png');
        this.game.load.image('bullet', './assets/images/BulletSprite.png');
        this.game.load.image('laser', './assets/images/laserSprite.png');
      }

      //create method to add in the stuff
      create(){
        //add background
        this.addEnemies();
        this.background = this.game.add.tileSprite(0, 0, 2048, 576, 'background');
        this.spaceCraft = this.game.add.sprite(70, 0, 'spaceCraft');
        this.game.world.setBounds(0,0,1029,576);

        //adding a group for the bullets and lasers
        this.bullets = this.game.add.group();
        this.lasers = this.game.add.group();

        //create the physics for the groups
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets.createMultiple(10, 'bullet');
        
        this.bullets.setAll('checkWorldBounds', true);

        this.lasers.enableBody = true;
        this.lasers.physicsBodyType = Phaser.Physics.ARCADE;

        this.lasers.createMultiple(10, 'laser');
        

        //apply physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable([this.spaceCraft, this.enemy, this.bullets]);

      this.spaceCraft.body.collideWorldBounds = true;

        

        this.cursor = this.game.input.keyboard.createCursorKeys();

      
      }

      //add enemies method that will copy the clouds method from above
     

      //update method that runs nearly all of the game's functionality
      update() {
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.boostKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.laserKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);

        this.background.tilePosition.x -= .7;

        this.blowUpShip();

        //key bindings
        //firing the bullets/laser
        if(this.spaceKey.isDown){
          this.fireBullets();
        }

        if(this.laserKey.isDown){
          this.laserEnergy -=10;

          if(this.laserEnergy > 0){
            this.fireLasers();
          }
        }


//go up
        if(this.cursor.up.isDown){
          this.spaceCraft.body.velocity.y = -100;
          if(this.boostKey.isDown){
            this.spaceCraft.body.velocity.y = -150;
          }
          //this.spaceCraft.angle = 345;
        }
        else if (this.cursor.down.isDown){
          this.spaceCraft.body.velocity.y = 100;
          if(this.boostKey.isDown){
            this.spaceCraft.body.velocity.y = 150;
          }
          //this.spaceCraft.angle = 15;
        }
      
        else{
          this.spaceCraft.body.velocity.y = 0;
          this.spaceCraft.angle = 0;
        }

        if(this.cursor.left.isDown){
          this.spaceCraft.body.velocity.x = -100;
          if(this.boostKey.isDown){
            this.spaceCraft.body.velocity.x = -150;
          }
        }
        else if(this.cursor.right.isDown){
          this.spaceCraft.body.velocity.x = 100;
          if(this.boostKey.isDown){
            this.spaceCraft.body.velocity.x = 150;
          }
        }
        else{
          this.spaceCraft.body.velocity.x = 0;
        }
        

        //add enemies
        if (this.spawn < 2 && this.game.time.now > this.timer)
        {
          this.addEnemies();
        }

        //add blowup method
        


      }

      addEnemies(){
        
          this.spawn = 0;
          //call the cloud image
          this.enemy = this.game.add.sprite(1024, this.game.world.randomY + 10, "enemy");
          
         
          //this came from the Phaser.IO community tutorial https://phaser.io/examples/v2/sprites/add-several-sprites
          //written by ProtonStorm
          this.game.add.tween(this.enemy).to({ x: this.game.width + (-2500 + this.enemy.x) }, 30000, Phaser.Easing.Linear.None, true);

          //add in the animation
          this.enemy.animations.add("spin", [0,1]);
          this.enemy.animations.play("spin", 10, true, false);
    
          this.spawn++;
          this.timer = this.game.time.now + 5000;
    
          
      }

      //kill and fire bullets
      fireBullets(){
        this.bulletTime = 0;
        if(this.game.time.now > this.bulletTime){
          this.bullet = this.game.add.sprite(this.spaceCraft.x + 106, this.spaceCraft.y + 28.5, 'bullet');
          this.bullet = this.bullets.getFirstExists(false);

          if(this.bullet){
            this.bullet.reset(this.spaceCraft.x + 106, this.spaceCraft.y + 28.5);
            this.bullet.body.velocity.x = 300;
            this.bulletTime = this.game.time.now + 250;
          }
        }
      }

      fireLasers(){
        this.laserEnergy = 100;
        this.laserTime = 0;

        if(this.game.time.now > this.laserTime){
          this.laser = this.lasers.getFirstExists(false);
          
          if(this.laser){
            this.laserEnergy -= 10
            this.laser.reset(this.spaceCraft.x + 106, this.spaceCraft.y - 28.5);
            this.laser.body.velocity.x = 300;
            this.laserTime = this.game.time.now + 250;
          }
          else {
            this.laserEnergy += 10;
          }        
        }

      }

      //blow up ship function
      blowUpShip(){
        if(this.checkOverlap(this.enemy, this.spaceCraft)){
          this.spaceCraft.kill();
         this.game.state.start("GameOverState");
        }
      }

      blowUpEnemyAndBullet(){
        this.bullet.kill();
        this.enemy.kill();
      }

  
      checkOverlap(spriteA, spriteB){
        let centerX = spriteA.getBounds();
        let boundsB = spriteB.getBounds();
  
        return Phaser.Rectangle.intersects(centerX, boundsB);
      }
  }

  export class GameOverState extends Phaser.State{
    gameOverScreen:Phaser.Sprite;
    rectangle:Phaser.Sprite;
    continueText:Phaser.Sprite;
    quitText:Phaser.Sprite;
    cursor:any;
    enterKey:any;

    preload(){
      this.game.load.image('GameOverScreen', './assets/images/gameover.png');
      this.game.load.image('rectangle', './assets/images/highlighter.png');
      this.game.load.image('Continue', './assets/images/continue.png');
      this.game.load.image('quit', './assets/images/quit.png');
    }

    create(){
      this.gameOverScreen = this.game.add.sprite(0, 0,'GameOverScreen');
      this.continueText = this.game.add.sprite(0, 0, 'Continue');
      this.quitText = this.game.add.sprite(0, 0, 'quit');
      
      this.rectangle = this.game.add.sprite(0, 0, 'rectangle');

      this.rectangle.centerX = 459;
      this.rectangle.centerY = 410;

      this.cursor = this.game.input.keyboard.createCursorKeys();

    }

    update(){
      this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.continueText.centerX = 750;
      this.continueText.centerY = 410;

      this.quitText.centerX = 459;
      this.quitText.centerY = 410;

      this.enterKey.onDown.add(this.startMenuState, this);
      this.enterKey.onDown.add(this.startSecondLevel, this);

      if(this.cursor.left.isDown){
        this.rectangle.centerX = 459;
      }
      else if(this.cursor.right.isDown){
        this.rectangle.centerX = 750;
        
                
      }
    }
    
    startSecondLevel(){
      if(this.checkOverlap(this.rectangle, this.continueText)){
        this.game.state.start("SecondLevelState");
      }
    }

    startMenuState(){
      if(this.checkOverlap(this.rectangle, this.quitText)){
          this.game.state.start("TitleScreenState");
      }
    }

    checkOverlap(spriteA, spriteB){
        let centerX = spriteA.getBounds();
        let boundsB = spriteB.getBounds();
  
        return Phaser.Rectangle.intersects(centerX, boundsB);
    }
  }

  //the simple game lass that will run as the window loads and points to all of the gamestates.
  export class SimpleGame {
    game:Phaser.Game
    constructor(){
      //generate a new game
      this.game = new Phaser.Game(1024 , 576, Phaser.AUTO, "content");

      //add the gamestates that were first made
      this.game.state.add("FirstLevelState", FirstLevelState, false);
      this.game.state.add("BedroomRunningState", BedroomRunningState, false);
      this.game.state.add("TitleScreenState", TitleScreenState, false);
      this.game.state.add("SecondLevelState", SecondLevelState, false);
      this.game.state.add("GameOverState", GameOverState, false);
      this.game.state.start("TitleScreenState", true, true);
    }
   
}



window.onload = () => {
  let game = new SimpleGame();
};