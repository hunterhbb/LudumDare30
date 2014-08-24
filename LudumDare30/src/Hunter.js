/**
 * Created by chenryoutou on 14-8-24.
 */


var HUNTER_VELOCI = 40;

var Hunter = cc.Sprite.extend({

    isStart : false,


    dir : cc.p(0 , -1),

    start : function () {

        this.isStart = true;

        cc.director.getScheduler().scheduleUpdateForTarget(this);

    },


    update : function(dt) {

        var h_x = Math.floor( this.x / 16 );
        var h_y = Math.floor( this.y / 16 );

        this.x += this.dir.x * HUNTER_VELOCI * dt;
        this.y += this.dir.y * HUNTER_VELOCI * dt;

        var next_x = Math.floor( this.x / 16);
        var next_y = Math.floor( this.y / 16);



//        if(h_x !== next_x || h_y !== next_y){

            var wall_objs = MoveController.wall_objs;

            var x = this.x + 8 * this.dir.x;
            var y = this.y + 8 * this.dir.y;

            for (var i = 0; i < wall_objs.length; i++) {
                var wall_o = wall_objs[i];

                if (cc.rectContainsPoint(wall_o, cc.p(x, y))){
                    this.changeDir();
                }

            }

//        }

    },

    changeDir : function () {

        for (var i = 0; i < 4; i ++ ) {

            var temp_dir = cc.p(0,0);

            var is_x = Math.random() <= 0.5;
            if(is_x){
                var isLeft = Math.random() <= 0.5;
                if (isLeft){
                    temp_dir.x = -1;
                }
                else{
                    temp_dir.x = 1;
                }
            }
            else{
                var isUp = Math.random() <= 0.5;
                if (isUp){
                    temp_dir.y = 1;
                }
                else{
                    temp_dir.y = -1;
                }
            }

            var x = this.x + 16 * temp_dir.x;
            var y = this.y + 16 * temp_dir.y;
            var flag = true;

            var wall_objs = MoveController.wall_objs;

            for (var i = 0; i < wall_objs.length; i++) {
                var wall_o = wall_objs[i];

                if (cc.rectContainsPoint(wall_o, cc.p(x, y))){
                    flag = false;
                    break;
                }

            }

            if(flag) {
                this.dir = temp_dir;

//                if (temp_dir.x = -1){
//                    this.texture = cc.textureCache.textureForKey(res.Hunter_Left_png);
//                }
//                else if (temp_dir.x = 1){
//                    this.texture = cc.textureCache.textureForKey(res.Hunter_Right_png);
//                }
//                else if (temp_dir.y = -1){
//                    this.texture = cc.textureCache.textureForKey(res.Hunter_Down_png);
//                }
//                else if (temp_dir.y = 1){
//                    this.texture = cc.textureCache.textureForKey(res.Hunter_Up_png);
//                }

                return;
            }

        }

    }


});

Hunter.create = function () {

    var hunter = new Hunter(res.Hunter_Down_png);

    return hunter;
};