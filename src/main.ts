import Phaser from "phaser";
import GameBackground from './scenes/GameBackground';
import GameOver from './scenes/GameOver';
import GameStart from './scenes/GameStart';
import Preloader from './scenes/Preloader';
import Waiting from "./scenes/Waitting";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 288 * 2,
  height: 512,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      //debug: true 
    },
  },

  scene: [Preloader, Waiting, GameBackground, GameStart, GameOver],
};

export default new Phaser.Game(config);
