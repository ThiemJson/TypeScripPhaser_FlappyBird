import Phaser from "phaser";
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
    },
  },
//   scale: {
// 	  zoom: 1 / window.devicePixelRatio
//   },

  scene: [Preloader,Waiting, GameStart],
};

export default new Phaser.Game(config);
