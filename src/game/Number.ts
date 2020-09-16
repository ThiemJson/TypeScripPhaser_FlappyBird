export default class Numbers extends Phaser.GameObjects.Container {
  private image!: Phaser.GameObjects.Image;
  constructor(scene: Phaser.Scene, x: number, y: number, num: string) {
    super(scene, x, y);
    this.image = scene.add.image(0, 0, num).setOrigin(0).setScrollFactor(0);
    this.add(this.image);
    scene.add.existing(this);
  }
}
