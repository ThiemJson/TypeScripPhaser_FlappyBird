import Phaser from "phaser";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";
export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  /**
   * Load assets
   */
  preload() {
    //Load background
    this.load.image(TextureKeys.BackgroundDay, "background/background-day.png");
    this.load.image(TextureKeys.BackgroundNight,"background/background-night.png");
    this.load.image(TextureKeys.Base, "background/base.png");
    this.load.image(TextureKeys.PipeGreen, "background/pipe-green.png");
    this.load.image(TextureKeys.PipeRed, "background/pipe-red.png");

    //Load Bird
    this.load.atlas(TextureKeys.BlueBird,"character/bluebird.png","character/bluebird.json"),
    this.load.atlas(TextureKeys.RedBird,"character/redbird.png","character/redbird.json"),
    this.load.atlas(TextureKeys.YellowBird,"character/yellowbird.png","character/yellowbird.json");

    //Load game message
    this.load.image(TextureKeys.GameStart, "game/message.png");
    this.load.image(TextureKeys.GameOver, "game/gameover.png");

    // Load number score
    this.load.image(TextureKeys.NumberOne,"numbers/1.png"),
    this.load.image(TextureKeys.NumberZero,"numbers/0.png"),
    this.load.image(TextureKeys.NumberTwo,"numbers/2.png"),
    this.load.image(TextureKeys.NumberThree,"numbers/3.png"),
    this.load.image(TextureKeys.NumberFour,"numbers/4.png"),
    this.load.image(TextureKeys.NumberFive,"numbers/5.png"),
    this.load.image(TextureKeys.NumberSix,"numbers/6.png"),
    this.load.image(TextureKeys.NumberSeven,"numbers/7.png"),
    this.load.image(TextureKeys.NumberEight,"numbers/8.png"),
    this.load.image(TextureKeys.NumberNine,"numbers/9.png")
  }

  /**
   * Create Animation
   */
  create() {
      this.scene.start(SceneKeys.Waiting);
  }
}
