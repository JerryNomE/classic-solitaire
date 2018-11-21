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
        this.graphics = this.add.graphics();
        // this.graphics.lineStyle(1, 0xffffff);
        // this.graphics.fillStyle(0x031f4c, 1);

        this.menus = this.add.container(0,GRID.H*map.length);

	    // var bg = this.add.sprite(32,32,'turretButton').setScale(0.32).play('over');

        for (var i = 0; i < 10; i++) {
        	let container = this.add.container(GRID.W * i, 0);
        	let bg = this.add.sprite(GRID.W/2, GRID.H/2, 'turretButton').setScale(0.32).play('out');
        	container.add(bg)

        	if (global.turretList[i]!==undefined) {
        		let icon = this.add.image(GRID.W/2, GRID.H / 2, global.turretList[i])
        		container.add(icon)
        	}
        	this.menus.add(container)
        }
    },
})

export default TurretListSence