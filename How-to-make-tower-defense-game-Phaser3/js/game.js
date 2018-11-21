import Phaser from './phaser.min.js'
import MainSence from './Sence/MainSence.js'
import TurretListSence from './Sence/TurretList.js'

var BootScene = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function BootScene ()
	{
		Phaser.Scene.call(this, { key: "BootScene" });
	},

	preload: function ()
	{
		// load resources
		this.load.image('bullet', './How-to-make-tower-defense-game-Phaser3/assets/bullet.png');
		this.load.image('turret2', './How-to-make-tower-defense-game-Phaser3/assets/turreta.png');
		this.load.image('turret2bullet', './How-to-make-tower-defense-game-Phaser3/assets/turretaBullet.png');
		this.load.atlas('sprites', './How-to-make-tower-defense-game-Phaser3/assets/spritesheet.png', './How-to-make-tower-defense-game-Phaser3/assets/spritesheet.json');
		this.load.spritesheet('turretButton','./How-to-make-tower-defense-game-Phaser3/assets/turretButton.png',{ frameWidth: 200, frameHeight: 200})
	},

	create: function ()
	{
		this.anims.create({
			key: 'out',
			frames: [ { key: 'turretButton', frame: 0 } ],
			frameRate: 10
		});
		this.anims.create({
			key: 'over',
			frames: [ { key: 'turretButton', frame: 1 } ],
			frameRate: 10
		});
		this.anims.create({
			key: 'active',
			frames: [ { key: 'turretButton', frame: 2 } ],
			frameRate: 10
		});
		this.scene.start("MainSence");
	}
});

var config = {
	type: Phaser.AUTO,
	parent: 'content',
	width: 640,
	height: 576,
	physics: {
		default: 'arcade'
	},
	scene: [BootScene, MainSence, TurretListSence]
};

var game = new Phaser.Game(config);