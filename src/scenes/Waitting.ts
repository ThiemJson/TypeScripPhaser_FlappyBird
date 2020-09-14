import Phaser from "phaser";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";

export default class Waiting extends Phaser.Scene {
  private width!: number;
  private height!: number;
  constructor() {
    super(SceneKeys.Waiting);
  }
  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    // const bg = this.add
    //   .tileSprite(0, 0, this.width, this.height, TextureKeys.BackgroundDay)
    //   .setOrigin(0);
    //bg.setScale(this.scale.width / bg.width);
    this.startScene();
  }
  startScene(): void {
    this.scene.start(SceneKeys.GameBackground);
    this.scene.start(SceneKeys.GameStart);
  }
}
