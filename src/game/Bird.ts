import Phaser from "phaser";
import AnimationKeys from "~/const/AnimationKeys";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";
enum BirdState {
  Live = "live",
  Dead = "dead",
  Deadddd = "deaddd",
}
export default class Bird extends Phaser.GameObjects.Container {
  /**Reference game object : Bird */
  private bird!: Phaser.GameObjects.Sprite;

  /**Get cursor key on the keyboard */
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  /**Get state of Bird: Live, Dead, Deadddd */
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
    const birdBody = this.body as Phaser.Physics.Arcade.Body;
    birdBody.setSize(this.bird.width, this.bird.height);
  }

  preUpdate(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (this.birdstate == BirdState.Live) {
      //Key trigger
      if (this.cursor.space?.isDown || this.cursor.up?.isDown) {
        //The bird has been up
        body.setAccelerationY(-50);
        body.setVelocityY(-500);
      } else {
        //The bird has been down
        body.setAccelerationY(0);
        body.setVelocityY(100);
      }
    }
    //State of Bird is Dead
    else if (this.birdstate == BirdState.Dead) {
      body.velocity.x *= 0.95;
      if (body.velocity.x >= -5) {
        this.birdstate = BirdState.Deadddd;
      }
    } else if (this.birdstate == BirdState.Deadddd) {
      body.setVelocity(0, 0);
      this.scene.scene.start(SceneKeys.GameOver);
    }
  }

  /**Bird state is Dead */
  dead(): void {
    this.birdstate = BirdState.Dead;
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(2000);
    body.setVelocityX(-800);
    body.setAccelerationY(2000);
  }
}
