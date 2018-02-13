/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';
import Config from './config';

class SimpleGame {
  game: Phaser.Game;
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

  constructor() {
    this.game = new Phaser.Game(800 , 600, Phaser.AUTO, "content", {preload:this.preload, create:this.create, update:this.update});
  }



  preload() {
    this.game.load.image("logo", "./assets/images/mushroom2.png");
    this.game.load.image("floor", "./assets/images/FloorSprite.png");
    this.game.load.image("door", "./assets/images/DoorSprite.png");
    this.game.load.image("bookcase", './assets/images/BookCaseSprite.png');
    this.game.load.image('bed', './assets/images/BedSprite.png');
    this.game.load.image('background', './assets/images/BackgroundSprite.png');
    this.game.load.image('books', './assets/images/BooksSprite.png');
    this.game.load.spritesheet('fan', './assets/images/FanSprite.png', 266, 100);
  }


  create() {
    //load in sprites
    this.background = this.game.add.sprite(0, 0, "background");
    this.fan = this.game.add.sprite(this.game.world.centerX, 0, "fan");
    this.door = this.game.add.sprite(0,0, "door");
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

    this.fan.animations.add("spin");
    this.fan.animations.play("spin", 10, true, false);
    



  }

  update() {
    this.game.physics.arcade.collide(this.floor, this.logo);
    
  }
}

window.onload = () => {
  const game = new SimpleGame();
};