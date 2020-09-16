import Phaser from "phaser";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";

export default class Waiting extends Phaser.Scene {
  private width!: number;
  private height!: number;
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor() {
    console.log("constructor Waitting !");
    super(SceneKeys.Waiting);
    
  }
  create() {
    this.addimage();
  }
  update() {
    this.input.keyboard.once("keydown-SPACE", () => {
      // this.scene?.stop(SceneKeys.GameStart());
      // this.scene?.stop(SceneKeys.GameBackground);
      this.startScene();
    });
  }
  addimage(){
    this.width = this.scale.width;
    this.height = this.scale.height;
    this.add
      .tileSprite(
        0,
        0,
        this.scale.width,
        this.scale.height,
        TextureKeys.BackgroundDay
      )
      .setOrigin(0);
    this.add.image(this.width * 0.5, this.height * 0.5, TextureKeys.GameStart);
  }
  startScene(): void {
    this.scene.start(SceneKeys.GameBackground);
    this.scene.start(SceneKeys.GameStart);
  }
}
