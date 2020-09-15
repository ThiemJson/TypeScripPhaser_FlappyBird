import Phaser from "phaser";
import AnimationKeys from "~/const/AnimationKeys";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";
import Bird from "~/game/Bird";

export default class GameStart extends Phaser.Scene {
  private Bird!: Bird;
  constructor() {
    super(SceneKeys.GameStart);
  }
  create() {
    //Add bird
    this.Bird = new Bird(this, 100, 100);
    this.add.existing(this.Bird);

    //Set bound of word;
    this.physics.world.setBounds(
      0,
      0,
      Phaser.Math.MAX_SAFE_INTEGER,
      this.scale.height
    );

    //collision between bird and world
    const BirdBody = this.Bird.body as Phaser.Physics.Arcade.Body;
    BirdBody.setCollideWorldBounds(true);
    BirdBody.setVelocityX(200);

    //Config camera
    this.cameras.main.startFollow(this.Bird,true,undefined,undefined,200);
    this.cameras.main.setBounds(
      0,
      0,
      Phaser.Math.MAX_SAFE_INTEGER,
      this.scale.height
    );

    //Add pipe
    // this.add.image(0, 0, TextureKeys.PipeGreen).setOrigin(0, 0);
    // this.add
    //   .image(this.scale.width * 0.5, 0, TextureKeys.PipeGreen)
    //   .setOrigin(0, 0).setFlipX;
  }
  update() {
    console.log(this.Bird.x);
  }
}
