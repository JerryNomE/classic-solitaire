import {map, GRID} from '../paraments.js'
import global from '../variate.js'

function getEnemy(x, y, distance) {
    var enemyUnits = global.enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
}

function addBullet(x, y, angle) {
    var bullet = global.bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

var Turret = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Turret (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
            this.nextTic = 0;
            this.cd = 100;
            this.price = 0;
            this.bullet = 'bullet';
        },
        place: function(i, j) {
            this.y = i * GRID.H + GRID.H/2;
            this.x = j * GRID.W + GRID.W/2;
            map[i][j] = 1;
        },
        fire: function() {
            var enemy = getEnemy(this.x, this.y, 200);
            if(enemy) {
                var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                addBullet(this.x, this.y, angle);
                this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            }
        },
        update: function (time, delta)
        {
            if(time > this.nextTic) {
                this.fire();
                this.nextTic = time + this.cd;
            }
        }
});

export default Turret