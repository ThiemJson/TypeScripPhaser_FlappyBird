import Phaser from "phaser";
import AnimationKeys from "~/const/AnimationKeys";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";
import Bird from "~/game/Bird";
import Pipe from "~/game/Pipe";

export default class GameStart extends Phaser.Scene {
  private Bird!: Bird;
  private list_of_pipe!: Pipe[];
  private last_pipe_x!:number;
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
    BirdBody.setVelocityX(150);

    //Config camera
    this.cameras.main.startFollow(this.Bird, true, undefined, undefined, -200);
    this.cameras.main.setBounds(
      0,
      0,
      Phaser.Math.MAX_SAFE_INTEGER,
      this.scale.height
    );

    //Add pipe
    this.list_of_pipe = [];
    this.list_of_pipe.push(new Pipe(this, 500, 0));
    this.list_of_pipe.push(new Pipe(this, 650, 0));
    this.list_of_pipe.push(new Pipe(this, 800, 0));
    this.list_of_pipe.push(new Pipe(this, 950, 0));
    this.list_of_pipe.push(new Pipe(this, 1100, 0));
    this.list_of_pipe.forEach((pipe) => {
      this.add.existing(pipe);
    });
    this.last_pipe_x = 1100;
  }
  update() {
    this.respawnPipe();
  }
  respawnPipe(): void {
    const scrollX = this.cameras.main.scrollX;
    this.list_of_pipe.forEach((pipe) => {
      if (pipe.x + pipe.width + 50  < scrollX) {
        this.last_pipe_x += 150;
        pipe.x = this.last_pipe_x;
      }
    });
  }
}
