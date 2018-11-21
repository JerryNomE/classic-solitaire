import {ENEMY_SPEED} from '../paraments';
import global from '../variate.js'

var Enemy = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Enemy (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.hp = 0;
        },

        startOnPath: function ()
        {
            this.path = global.path;
            let path = this.path;
            this.len = this.path.getLength();

            // set the t parameter at the start of the path
            this.follower.t = 0;
            this.hp = 100;

            // get x and y of the given t point
            path.getPoint(this.follower.t, this.follower.vec);

            // set the x and y of our enemy to the received from the previous step
            this.setPosition(this.follower.vec.x, this.follower.vec.y);
        },
        receiveDamage: function(damage) {
            this.hp -= damage;

            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
                this.setActive(false);
                this.setVisible(false);
            }
        },
        update: function (time, delta)
        {
            let path = this.path;

            // move the t point along the path, 0 is the start and 1 is the end
            this.follower.t += ENEMY_SPEED * delta / this.len;

            // get the new x and y coordinates in vec
            path.getPoint(this.follower.t, this.follower.vec);

            // update enemy x and y to the newly obtained x and y
            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            // if we have reached the end of the path, remove the enemy
            if (this.follower.t >= 1)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

});

export default Enemy;