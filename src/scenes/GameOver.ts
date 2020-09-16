import SceneKeys from '~/const/SceneKeys';

export default class GameOver extends Phaser.Scene {
    constructor() {
      super(SceneKeys.GameOver);
    }
    create() {
      //Get height and widht of screen
      const { width, height } = this.scale;
      const x = width * 0.5;
      const y = height * 0.5;

      //Add text
      this.add
        .text(x, y, "Press SPACE to Play Again", {
          fontSize: "20px",
          color: "#FFFFFF",
          backgroundColor: "#000000",
          shadow: { fill: true, blur: 0, offsetY: 0 },
          padding: { left: 15, right: 15, top: 10, bottom: 10 },
        })
        .setOrigin(0.5);

      //Space onlick
      this.input.keyboard.once("keydown-SPACE", () => {
        this.scene.stop(SceneKeys.Waiting);
        this.scene.stop(SceneKeys.GameBackground);
        this.scene.stop(SceneKeys.Waiting);
        this.scene.start(SceneKeys.GameOver);
        this.scene.start(SceneKeys.Waiting);
      });
    }
  }