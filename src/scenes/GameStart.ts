import SceneKeys from "~/const/SceneKeys";
import Bird from "~/game/Bird";
import Pipe from "~/game/Pipe";

export default class GameStart extends Phaser.Scene {
  /**Bird sprite ( see more in game folder) */
  private Bird!: Bird;

  /**Array of Pipe ( has 10 pipe) */
  private ListOfPipe!: Pipe[];

  /**Range of pipe.x ( next range to get point ) */
  private defaultRange = 552;
  /**Default score */
  private score = 0;

  /**Score image display */
  private scoreImage1!: Phaser.GameObjects.Image;
  private scoreImage2!: Phaser.GameObjects.Image;
  private scoreImage3!: Phaser.GameObjects.Image;

  constructor() {
    super(SceneKeys.GameStart);

    //Set default score value
    this.score = 0;
  }

  create() {
    //Reset score and range:
    this.score = 0;
    this.defaultRange = 552;

    //Add bird
    this.Bird = new Bird(this, 100, 100);
    this.add.existing(this.Bird);

    //Set bounds of word;
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

    /**Overlap between Bird and Pipe */
    this.physics.add.overlap(
      this.ListOfPipe,
      this.Bird,
      this.overlapPipeBird,
      undefined,
      this
    );

    //Add score image:
    this.spawnScore();
  }

  /**Overlap between Bird and Pipe */
  overlapPipeBird(): void {
    this.Bird.dead();
  }

  /**update function of this Scene */
  update() {
    if (this.Bird.x > this.defaultRange) {
      this.score++;
      this.defaultRange += 150;
    }
    this.showScore();
    this.respawnPipe();
  }

  /**This function help to show score image in first time (when the Scence start), add image to screen */
  spawnScore(): void {
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

    //The score begin at 0 point, unvisiable unused score image
    this.scoreImage2.setVisible(false);
    this.scoreImage3.setVisible(false);
  }

  /**this function help to spawn Pipe in First time ( when the Scene start ) */
  spawnPipe(): void {
    //Set default list of pipe
    this.ListOfPipe = [];

    //Set first possiton for first Pipe
    let scrollX = 500;

    for (let i = 0; i < 5; i++) {
      //Get random height of Top Pipe
      const height = Phaser.Math.Between(100, this.scale.height - 150 - 100);

      //Define Pipe on Top ( get height )
      const PipeTop = new Pipe(this, scrollX, 0, true, height);

      //Define Pipe on Bottm ( height = height of sceen - height of PipeTop - spacebetween )
      const PipeBottom = new Pipe(
        this,
        scrollX,
        height + 150,
        false,
        this.scale.height - height - 150
      );

      this.add.existing(PipeTop);
      this.add.existing(PipeBottom);
      this.ListOfPipe.push(PipeTop);
      this.ListOfPipe.push(PipeBottom);

      //Icredien next possion for orther Pipe
      scrollX += 150;
    }
  }

  /**Update score and respawn pipe */
  respawnPipe(): void {
    // get possion of main camera , the possion is coner of Top Left
    const scrollX = this.cameras.main.scrollX;

    // replace possion of Pipe when it has dissappear of Screen
    this.ListOfPipe.forEach((pipe) => {
      // Nevermind for 50 (its ok :))) )
      if (pipe.x + pipe.width + 50 < scrollX) {
        const body = pipe.body as Phaser.Physics.Arcade.Body;

        // replace possion Body of pipe ( maybe reference Physic body)
        pipe.x += 150 * 5 + 4 * pipe.width;
        body.x = pipe.x - body.width * 0.5;
      }
    });
  }

  /** Respawn the score when Bird pass a Pipe*/
  showScore() {
    //Convert score (number) to array of number ( string) and split it
    const scoreString = this.score.toString().split("");

    //When score lowerThan 10
    if (scoreString.length == 1) {
      this.scoreImage1
        .setTexture(scoreString[0])
        .setX(this.scale.width * 0.1)
        .setY(this.scale.height * 0.1)
        .setScrollFactor(0);
    }
    //When score lowerThan 100
    else if (scoreString.length == 2) {
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
    }
    //When score lowerThan 1000
    else if (scoreString.length == 3) {
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
