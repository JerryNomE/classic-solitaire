import {ENEMY_SPEED, BULLET_DAMAGE, map, GRID} from '../paraments';
import global from '../variate.js';
import TurretListSence from '../Sence/TurretList.js'
import Enemy from '../Unit/Enemy';
import Turret from '../Unit/Turret';
import Bullet from '../Unit/Bullet';

var MainSence = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainSence ()
    {
        Phaser.Scene.call(this, { key: "MainSence" });
    },

	create() {
	    // this graphics element is only for visualization,
	    // its not related to our path
	    var graphics = this.add.graphics();
	    drawLinesOn(graphics);

	    //////////////////////////////////////////////
	    // the path for our enemies
	    // parameters are the start x and y of our path
	    global.path = this.add.path(96, -32);

	    global.path.lineTo(96, 164);
	    global.path.lineTo(480, 164);
	    // global.path.circleTo(64);
	    global.path.lineTo(224, 288);
	    global.path.lineTo(224, 544);

	    graphics.lineStyle(2, 0xffffff, 1);
	    global.path.draw(graphics);
	    //////////////////////////////////////////////

	    global.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });

	    global.turrets = this.add.group({ classType: Turret, runChildUpdate: true });

	    global.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

	    this.nextEnemy = 0;

	    this.physics.add.overlap(global.enemies, global.bullets, damageEnemy);

	    this.input.on('pointerdown', placeTurret);

	    this.scene.launch("TurretListSence");
	},

	update(time, delta) {

	    // if its time for the next enemy
	    if (time > this.nextEnemy)
	    {
	        var enemy = global.enemies.get();
	        if (enemy)
	        {
	            enemy.setActive(true);
	            enemy.setVisible(true);

	            // place the enemy at the start of the path
	            enemy.startOnPath();

	            this.nextEnemy = time + 2000;
	        }
	    }
	}
})

function damageEnemy(enemy, bullet) {
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);

        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}

function drawLinesOn(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    let h = map.length;
    let w = map[0].length;
    for(var i = 0; i < h; i++) {
        graphics.moveTo(0, i * GRID.H);
        graphics.lineTo(w * GRID.W, i * GRID.H);
    }
    for(var i = 0; i < w; i++) {
        graphics.moveTo(i * GRID.W, 0);
        graphics.lineTo(i * GRID.W, h * GRID.H);
    }
    graphics.strokePath();
}

function canPlaceTurret(i, j) {
    return i < map.length && j < map[0].length && map[i][j] === 0;
}

function placeTurret(pointer) {
    var i = Math.floor(pointer.y/GRID.H);
    var j = Math.floor(pointer.x/GRID.W);

    if(canPlaceTurret(i, j)) {
        var turret = global.turrets.get();
        if (turret)
        {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }
    }
}

export default MainSence