import Phaser from "phaser";
import AnimationKeys from "~/const/AnimationKeys";
import TextureKeys from "~/const/TextureKeys";
export default class Bird extends Phaser.GameObjects.Container {
  private bird!: Phaser.GameObjects.Sprite;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Add bird
    this.bird = scene.add
      .sprite(0, 0, TextureKeys.BlueBird)
      .setOrigin(0, 0)
      .play(AnimationKeys.BlueBirdAnims);

    this.add(this.bird);
    scene.physics.add.existing(this);

    //Config body of bird
    const bird_body = this.body as Phaser.Physics.Arcade.Body;
    bird_body.setSize(this.bird.width, this.bird.height);
  }
}
