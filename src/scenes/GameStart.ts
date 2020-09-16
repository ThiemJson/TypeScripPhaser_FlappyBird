import Phaser from "phaser";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";
import Bird from "~/game/Bird";
import Numbers from "~/game/Number";
import PipeTop from "~/game/PipeTop";

export default class GameStart extends Phaser.Scene {
  private Bird!: Bird;
  private list_of_pipe!: PipeTop[];
  private score: number = 0;
  private FirstPipe = 552;
  // private scoreImage1!: Numbers;
  // private scoreImage2!: Numbers;
  // private scoreImage3!: Numbers;
  private scoreImage1!: Phaser.GameObjects.Image;
  private scoreImage2!: Phaser.GameObjects.Image;
  private scoreImage3!: Phaser.GameObjects.Image;
  private defaultRange = 552;
  constructor() {
    super(SceneKeys.GameStart);
    console.log("constructor GameStart !");
    this.score = 0;
  }
  create() {
    //Reset score and range:
    this.score = 0;
    this.defaultRange = 552;

    
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
    BirdBody.setVelocityX(100);

    //Config camera
    this.cameras.main.startFollow(this.Bird, true, undefined, undefined, 0);
    this.cameras.main.setBounds(
      0,
      0,
      Phaser.Math.MAX_SAFE_INTEGER,
      this.scale.height
    );
    //SpawnPipe
    this.spawnPipe();
    //Overlab
    this.physics.add.overlap(
      this.list_of_pipe,
      this.Bird,
      this.overlap_pipe_bird,
      undefined,
      this
    );

    //Add score image:
    this.spawnScore();
  }

  //Overlap between Bird and Pipe
  overlap_pipe_bird(): void {
    const bird = this.Bird;
    this.Bird.dead();
  }
  update() {
    if (this.Bird.x > this.defaultRange) {
      this.score++;
      this.defaultRange += 150;
    }
    this.showScore();
    this.respawnPipe();
  }

  /**
   * show score
   */
  spawnScore():void{
    this.scoreImage1 = this.add
      .image(this.scale.width * 0.1, this.scale.height * 0.2, "0")
      .setOrigin(0)
      .setScrollFactor(0);
    this.scoreImage2 = this.add
      .image(this.scale.width * 0.1 + 10, this.scale.height * 0.2, "1")
      .setOrigin(0)
      .setScrollFactor(0);
    this.scoreImage3 = this.add
      .image(this.scale.width * 0.1 + 10, this.scale.height * 0.5, "2")
      .setOrigin(0)
      .setScrollFactor(0);
    this.scoreImage2.setVisible(false);
    this.scoreImage3.setVisible(false);
  }
  /**
   * Spawn Pipe
   */
  spawnPipe(): void {
    this.list_of_pipe = [];
    let scrollX = 500;
    for (let i = 0; i < 5; i++) {
      let height = Phaser.Math.Between(100, this.scale.height - 150 - 100);
      const item1 = new PipeTop(this, scrollX, 0, true, height);
      const item2 = new PipeTop(
        this,
        scrollX,
        height + 150,
        false,
        this.scale.height - height - 150
      );
      this.add.existing(item1);
      this.add.existing(item2);
      this.list_of_pipe.push(item1);
      this.list_of_pipe.push(item2);
      scrollX += 150;
    }
  }

  /**
   * Update score and respawn pipe
   */
  respawnPipe(): void {
    // Change score
    const scrollX = this.cameras.main.scrollX;
    this.list_of_pipe.forEach((pipe, index) => {
      if (pipe.x + pipe.width + 50 < scrollX) {
        const body = pipe.body as Phaser.Physics.Arcade.Body;
        pipe.x += 150 * 5 + 4 * pipe.width + 50;
        body.x = pipe.x - body.width * 0.5;
      }
    });
  }

  /**
   * Show Score
   */
  showScore() {
    const scoreString = this.score.toString().split("");
    if (scoreString.length == 1) {
      this.scoreImage1
        .setTexture(scoreString[0])
        .setX(this.scale.width * 0.1)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
    } else if (scoreString.length == 2) {
      if (this.score == 10) {
        this.scoreImage2.setVisible(true);
      }
      this.scoreImage1
        .setTexture(scoreString[0])
        .setX(this.scale.width * 0.1)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
      this.scoreImage2
        .setTexture(scoreString[1])
        .setX(this.scale.width * 0.1 + 20)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
    } else if (scoreString.length == 3) {
      if (this.score == 100) {
        this.scoreImage3.setVisible(true);
      }
      this.scoreImage1
        .setTexture(scoreString[0])
        .setX(this.scale.width * 0.1)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
      this.scoreImage2
        .setTexture(scoreString[1])
        .setX(this.scale.width * 0.1 + 20)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
      this.scoreImage2
        .setTexture(scoreString[2])
        .setX(this.scale.width * 0.1 + 40)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
    }
  }
}
