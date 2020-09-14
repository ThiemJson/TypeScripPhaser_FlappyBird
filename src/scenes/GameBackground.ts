import Phaser from "phaser";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";
export default class GameBackground extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameBackground);
  }
  create(): void {
    this.add
      .tileSprite(
        0,
        0,
        this.scale.width,
        this.scale.height,
        TextureKeys.BackgroundDay
      )
      .setOrigin(0);
  }
}
