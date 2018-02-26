/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';
import Config from './config';

//create a module for all classes to sit in


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
    timer:number;
    total:number;
    cursor:any;
    spaceKey:any;
    speed:number;

    constructor(){
      super();
    }
    //preload method that adds all of the sprites
    preload(){
      this.game.load.image("logo", "./assets/images/mushroom2.png");
      this.game.load.image("background", "./assets/images/SkySprite.png");
      this.game.load.image("ground", './assets/images/GroundSprite.png');
      this.game.load.image("cloud", './assets/images/CloudSprite.png');
    }

    create(){
      //load in the sprites
      this.background = this.game.add.sprite(0, 0, "background");
      //call function to add clouds to the game
      this.AddClouds();
      this.game.world.setBounds(0,0,2048,576);
      this.ground = this.game.add.tileSprite(0 ,488, 2048, 576, "ground");
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
        this.speed += 1;
      }
      else {
        this.speed = 0;
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
      this.game.state.start("TitleScreenState", true, true);
    }
   
}



window.onload = () => {
  let game = new SimpleGame();
};