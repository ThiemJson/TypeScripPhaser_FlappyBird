import Phaser from "phaser";
import TextureKeys from "~/const/TextureKeys";
export default class Pipe extends Phaser.GameObjects.Container {
  /**Check the Pipe of Top or Pipe of Bottom */
  private flip!: boolean;

  /**Check the heigt of Pipe */
  private heightOfPipe!: number;

  /**Sprite */
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
    scene.physics.add.existing(this, true);

    this.pipe = scene.add
      .sprite(0, 0, TextureKeys.PipeGreen)
      .setOrigin(0.5, 0)
      .setFlipY(this.flip);
    this.pipe.setDisplaySize(this.pipe.displayWidth, this.heightOfPipe);
    this.add(this.pipe);

    //Body container config
    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    body.setSize(this.pipe.displayWidth, this.heightOfPipe);
    body.setOffset(-this.pipe.width * 0.5, 0);

    body.position.x = this.x + body.offset.x;
    body.position.y = this.y;
  }
}
