import Phaser from "phaser";
import AnimationKeys from "~/const/AnimationKeys";
import TextureKeys from "~/const/TextureKeys";
export default class Bird extends Phaser.GameObjects.Container {
  private bird!: Phaser.GameObjects.Sprite;
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Create Cursor keys
    this.cursor = scene.input.keyboard.createCursorKeys();

    //Add bird
    this.bird = scene.add
      .sprite(0, 0, TextureKeys.BlueBird)
      .setOrigin(0, 0)
      .play(AnimationKeys.BlueBirdAnims);

    this.add(this.bird);
    scene.physics.add.existing(this);

    //Config body of Container
    const bird_body = this.body as Phaser.Physics.Arcade.Body;
    bird_body.setSize(this.bird.width, this.bird.height);
  }
  preUpdate(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (this.cursor.space?.isDown || this.cursor.up?.isDown) {
      body.setAccelerationY(-700);
    } else {
      body.setAccelerationY(0);
    }
  }
}
