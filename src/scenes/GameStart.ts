import Phaser from "phaser";
import SceneKeys from "~/const/SceneKeys";
import TextureKeys from "~/const/TextureKeys";

export default class GameStart extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameStart);
  }
  create() {
    this.add.image(0, 0, TextureKeys.PipeGreen).setOrigin(0, 0);
  }
}
