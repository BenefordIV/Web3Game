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
      this.TitleScreen = this.add.sprite(0,0,'title');

      //generate the animation for 
      this.TitleScreen.animations.add('blink', [0,1,2,3,4,5]);
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
      
  
  
  
    }
  //just to chceck and upadate the placeholder sprite to collide with the floor
    update() {
      this.game.physics.arcade.collide(this.floor, this.logo);
      
    }
  }

  //the simple game lass that will run as the window loads and points to all of the gamestates.
  export class SimpleGame {
    game:Phaser.Game
    constructor(){
      //generate a new game
      this.game = new Phaser.Game(1024 , 576, Phaser.AUTO, "content");

      //add the gamestates that were first made
      this.game.state.add("BedroomRunningState", BedroomRunningState, false);
      this.game.state.add("TitleScreenState", TitleScreenState, false);
      this.game.state.start("TitleScreenState", true, true);
    }
   
}



window.onload = () => {
  let game = new SimpleGame();
};