import Phaser from "phaser";
import TextureKeys from "~/const/TextureKeys";
export default class PipeTop extends Phaser.GameObjects.Container {
  private flip!: boolean;
  private heightOfPipe!: number;
  private pipe!: Phaser.GameObjects.Sprite;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    flip: boolean,
    heightOfPipe: number
  ) {
    super(scene, x, y);
    this.flip = flip;
    this.heightOfPipe = heightOfPipe;

    this.pipe = scene.physics.add
      .sprite(0, 0, TextureKeys.PipeGreen)
      .setOrigin(0.5, 0)
      .setFlipY(this.flip);
    this.pipe.setDisplaySize(this.pipe.width, this.heightOfPipe)
    this.add(this.pipe);
    
    //Body container config
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.pipe.width, this.heightOfPipe);
    body.setOffset(-this.pipe.width * 0.5, 0);
    scene.physics.add.existing(this, true);
  }
  create(): void {}
}
