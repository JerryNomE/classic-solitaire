import {map, GRID} from '../paraments';
import global from '../variate.js';

var TurretListSence = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function TurretListSence ()
    {
        Phaser.Scene.call(this, { key: "TurretListSence" });
    },

    create: function ()
    {
    	let self = this
        this.graphics = this.add.graphics();
        // this.graphics.lineStyle(1, 0xffffff);
        // this.graphics.fillStyle(0x031f4c, 1);

        this.menus = this.add.container(0,GRID.H*map.length);

	    // var bg = this.add.sprite(32,32,'turretButton').setScale(0.32).play('over');

        for (var i = 0; i < 10; i++) {
        	let j = i;
        	let container = this.add.container(GRID.W * j, 0);
        	let bg = this.add.sprite(GRID.W/2, GRID.H/2, 'turretButton').setScale(0.32).play('out');
        	container.add(bg)

        	let img = global.turretList[j];
        	if (img!==undefined) {
        		let icon = this.add.image(GRID.W/2, GRID.H / 2, (img.sheet?img.sheet:img.img), (img.sheet?img.img:undefined))
        		icon.setScale(40/icon.width)
        		container.add(icon)
        	}
        	this.menus.add(container)

        	// 设置交互
        	container.setInteractive(new Phaser.Geom.Rectangle(0, 0, GRID.W, GRID.H), Phaser.Geom.Rectangle.Contains)

		    container.on('pointerover', () => {
		    	if (global.turretSelected !== j) bg.play('over');
		    	else if (global.pointerDown) bg.play('down');
		    },container);

		    container.on('pointerout', () => {
		    	if (global.turretSelected === j) bg.play('outA');
		        else bg.play('out');
		    },container);

		    container.on('pointerdown', () => {
		    	// global.pointerDown = true
		    	if (global.turretSelected !== j && global.turretList[j] !== undefined) bg.play('down');
		    },container);

		    container.on('pointerup', () => {
		    	if (global.turretSelected !== j && global.turretList[j] !== undefined){
		    		global.turretSelected = j
		    		self.menus.emit('turretSelectionChange')
		    	}
		    },container);

		    self.menus.on('turretSelectionChange', () => {
		    	if (global.turretSelected === j) bg.play('outA');
		    	else bg.play('out');
		    },container);
        }
    },
})

export default TurretListSence