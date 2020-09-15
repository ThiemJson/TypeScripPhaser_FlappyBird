import Phaser from "phaser";
import TextureKeys from "~/const/TextureKeys";
export default class Pipe extends Phaser.GameObjects.Container {
  private pipeTop!: Phaser.GameObjects.Sprite;
  private pipeBottom!: Phaser.GameObjects.Sprite;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.pipeTop = scene.add
      .sprite(0, 0, TextureKeys.PipeGreen)
      .setOrigin(0.5, 0)
      .setFlipY(true);
    this.pipeTop.setDisplaySize(
      this.pipeTop.width,
      Phaser.Math.Between(100, scene.scale.height - 150 - 100)
    );
    this.pipeBottom = scene.add
      .sprite(0, this.pipeTop.displayHeight + 150, TextureKeys.PipeGreen)
      .setOrigin(0.5, 0);

    this.pipeBottom.setDisplaySize(
      this.pipeBottom.width,
      scene.scale.height - 150 - this.pipeTop.displayHeight
    );
    this.add(this.pipeTop);
    this.add(this.pipeBottom);
    scene.physics.add.existing(this, true);

    //Config body of container
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.pipeTop.width, this.pipeTop.displayHeight + 150 + this.pipeBottom.displayHeight);
    console.log(this.pipeTop.width, this.pipeTop.displayHeight + 150 + this.pipeBottom.displayHeight)
    
    body.setOffset(-this.pipeTop.width * 0.5,0)
    body.position.x = this.x + body.offset.x;
    body.position.y = this.y;
  }
}
