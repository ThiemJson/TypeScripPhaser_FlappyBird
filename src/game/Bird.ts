import Phaser from "phaser";
import AnimationKeys from "~/const/AnimationKeys";
import SceneKeys from '~/const/SceneKeys';
import TextureKeys from "~/const/TextureKeys";
enum BirdState {
  Live = "live",
  Dead = "dead",
  Deadddd= 'deaddd'
}
export default class Bird extends Phaser.GameObjects.Container {
  private bird!: Phaser.GameObjects.Sprite;
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  private birdstate = BirdState.Live;
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
    if (this.birdstate == BirdState.Live) {
      if (this.cursor.space?.isDown || this.cursor.up?.isDown) {
        body.setAccelerationY(-50);
        body.setVelocityY(-500);
      } else {
        body.setAccelerationY(0);
        body.setVelocityY(100);
      }
    }
    else if(this.birdstate == BirdState.Dead){
      body.velocity.x *= 0.95;
      if (body.velocity.x >= -5) {
        this.birdstate = BirdState.Deadddd;
      }
    }
    else if(this.birdstate == BirdState.Deadddd){
      body.setVelocity(0, 0);
      this.scene.scene.start(SceneKeys.GameOver);
    }
  }
  dead(): void {
    this.birdstate = BirdState.Dead;
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(2000);
    body.setVelocityX(-800);
    body.setAccelerationY(2000);
  }
}
