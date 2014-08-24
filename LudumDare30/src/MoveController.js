/**
 * Created by chenryoutou on 14-8-23.
 */


var MoveController = {

    man : null,
    map : null,

    game_layer : null,

    inited : false,

    man_previous_p : cc.p(0,0),
    man_current_p : cc.p(0,0),

    wall_objs : null,

    rope_num : 0,
    rope_num_max : 200,

    rope_array : [],

    rope_objs : [],

    steps : [],

    last_add : true,
    last_repeat : false,


    crystal_num : 0,

    crystal_num_win : 9,

    crystal_objs : null,

    trap_objs : null,


    init : function ( man, map, game_layer ){
        this.man = man;
        this.map = map;
        this.game_layer = game_layer;

        this.man_current_p = cc.p(0,0);
        this.man_previous_p = cc.p(0,0);

        this.rope_num = 0;
        this.rope_array = [];
        this.rope_objs = [];
        for (var i = 0; i < 36; i++){
            this.rope_objs[i] = [];
        }

        this.steps = [];

        this.last_add = true;
        this.last_repeat = true;


        var wall_group = this.map.getObjectGroup("wall_collide");
        this.wall_objs = wall_group.getObjects();

        var crystal_group = map.getObjectGroup("crystal_collide");
        this.crystal_objs = crystal_group.getObjects();

        var trap_group = map.getObjectGroup("trap_collide");
        this.trap_objs = trap_group.getObjects();

        this.inited = true;
    },




    update : function (dt) {


        if (this.man.isMoving) {

            if (this.man.veloci){

                var man_x = this.man.x + this.man.veloci.x * dt;
                var man_y = this.man.y + this.man.veloci.y * dt;

                var rect = cc.rect(man_x - this.man._contentSize.width/2, man_y - this.man._contentSize.height/2,
                            this.man._contentSize.width, this.man._contentSize.height);

                var flag = true;
                for (var i = 0; i < this.wall_objs.length; i++) {
                    var wall_o = this.wall_objs[i];

                    if ( cc.rectIntersectsRect(rect, wall_o) ){
                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    //move.
                    this.man_previous_p.x = Math.floor(this.man.x / 16);
                    this.man_previous_p.y = Math.floor(this.man.y / 16);

                    this.man.x = man_x;
                    this.man.y = man_y;

                    this.man_current_p.x = Math.floor(this.man.x / 16) ;
                    this.man_current_p.y = Math.floor(this.man.y / 16) ;

                    var diff_x = this.man_current_p.x - this.man_previous_p.x;
                    var diff_y = this.man_current_p.y - this.man_previous_p.y;

                    if (diff_x !== 0 || diff_y !== 0){

                        var rope = cc.p(this.man_previous_p.x, this.man_previous_p.y);
//                        rope.diff_x = diff_x;
//                        rope.diff_y = diff_y;

                        this.steps.push(rope);

                        this.addRope(rope);


                        //judge crystal.
                        this.judgeCrystal();

                        //update cover
                        this.updateCover();

                        //judge trap
                        this.judgeTrap();

                        //judge Energy Rope.
                        this.judgeEnegyRope();

                    }



                }

            }

        }


    },

    judgeEnegyRope : function () {

        if (this.rope_num > this.rope_num_max) {

            var rope = new cc.Sprite(res.rope_no_png);
            rope.setPosition(cc.p( this.man_previous_p.x * 16 + 8, this.man_previous_p.y * 16 + 8 ) );
            this.game_layer.addChild(rope);

            this.game_layer.gameOver();
            return;
        }

    },


    judgeTrap : function () {

        for ( var i =0 ; i < this.trap_objs.length; i++) {

            var trap_o = this.trap_objs[i];

            var t_x = Math.floor( (trap_o.x + 8) / 16 );
            var t_y = Math.floor( (trap_o.y + 8) / 16 );

            if(t_x === this.man_current_p.x && t_y === this.man_current_p.y){
                //hit trap.

                var trap_h = new cc.Sprite(res.Trap_Horizontal_png);
                var trap_v = new cc.Sprite(res.Trap_Vertical_png);

                var man_blood = new cc.Sprite(res.Man_Blood_png);

                var trap_x = this.man_current_p.x * 16 + 8;
                var trap_y = this.man_current_p.y * 16 + 8;

                trap_h.setPosition(cc.p(trap_x , trap_y));
                trap_v.setPosition(cc.p(trap_x, trap_y));

                man_blood.setPosition(cc.p(this.man.x , this.man.y));

                this.game_layer.getParent().getChildByTag(BKG_LAYER_TAG).addChild(trap_h);
                this.game_layer.getParent().getChildByTag(BKG_LAYER_TAG).addChild(trap_v);
                this.game_layer.addChild(man_blood);

                var trap_action = new cc.RepeatForever(new cc.RotateBy(1.0, 360));
                trap_h.runAction(trap_action);
                trap_v.runAction(trap_action.clone());

                this.game_layer.gameOver();
                return;

            }


        }


    },


    updateCover : function (){

        this.game_layer.getParent().getChildByTag(COVER_LAYER_TAG).updateCover();

    },

    judgeCrystal : function (){

        var c_num = 0;


        for (var k = 0; k < this.crystal_objs.length; k++){
            var crystal_o = this.crystal_objs[k];

            var cry_x = Math.floor( (crystal_o.x + crystal_o.width/2) / 16 );
            var cry_y = Math.floor( (crystal_o.y + crystal_o.height/2) / 16 );

            if (this.rope_objs[cry_x][cry_y]){
                c_num ++;
            } else if (this.man_current_p.x === cry_x && this.man_current_p.y === cry_y){
                c_num ++;
            }
        }

        this.crystal_num = c_num;

//        if (this.crystal_num === this.crystal_num_win - 1){
//
//            for (var i = 0; i < crystal_objs.length; i++){
//                var crystal_oo = crystal_objs[i];
//
//                var cry_xx = Math.floor( (crystal_oo.x + crystal_oo.width/2) / 16 );
//                var cry_yy = Math.floor( (crystal_oo.y + crystal_oo.height/2) / 16 );
//
//                if (this.man_current_p.x === cry_xx && this.man_current_p.y === cry_yy){
//                    this.winGame();
//                    return;
//                }
//            }
//
//        }

        if (this.crystal_num === this.crystal_num_win){
            this.winGame();
        }

    },


    addRope : function (rope) {

        var isAdd = true;
        var isRemove = false;

        if (this.rope_array.length !== 0) {
            var last_rope = this.rope_array[this.rope_array.length - 1];

            if (last_rope.x === this.man_current_p.x && last_rope.y === this.man_current_p.y){
                // move back.
                isAdd = false;
                isRemove = true;
            }
            else if (this.rope_objs[this.man_previous_p.x][this.man_previous_p.y] ) {
                isAdd = false;
                this.last_add = false;
                this.last_repeat = true;
            }
            else if ( this.rope_objs[this.man_current_p.x][this.man_current_p.y] &&
                    this.rope_objs[this.man_previous_p.x][this.man_previous_p.y] === undefined &&
                    !this.last_add)
            {

                isAdd = false;
            }

        }


        if (isAdd) {

            var texture_name = res.rope_v_png;

            if (this.rope_array.length !== 0) {
                var last_rope = null;
                if (this.last_add || this.last_repeat) {
                    last_rope = this.steps[this.steps.length - 2];
                }
                else {
                    last_rope = this.rope_array[this.rope_array.length - 1];
                }
//                var last_rope = this.rope_array[this.rope_array.length - 1];
//                var last_rope = this.steps[this.steps.length - 2];

                var diff_x = this.man_current_p.x - this.man_previous_p.x;
                var diff_y = this.man_current_p.y - this.man_previous_p.y;

                var diff_x_last = this.man_previous_p.x - last_rope.x;
                var diff_y_last = this.man_previous_p.y - last_rope.y;

                if (diff_x !== 0 && diff_x_last !== 0){
                    texture_name = res.rope_h_png;
                }
                else if (diff_y !== 0 && diff_y_last !== 0){
                    texture_name = res.rope_v_png;
                }
                else if (diff_x_last > 0){
                    if (diff_y > 0){
                        texture_name = res.rope_r2u_png;
                    }else {
                        texture_name = res.rope_r2d_png;
                    }
                }
                else if (diff_x_last < 0){
                    if (diff_y > 0){
                        texture_name = res.rope_l2u_png;
                    }else {
                        texture_name = res.rope_l2d_png;
                    }
                }
                else if (diff_y_last > 0) {
                    if (diff_x > 0){
                        texture_name = res.rope_l2d_png;
                    }else {
                        texture_name = res.rope_r2d_png;
                    }
                }
                else if (diff_y_last < 0) {
                    if (diff_x > 0) {
                        texture_name = res.rope_l2u_png;
                    }else {
                        texture_name = res.rope_r2u_png;
                    }
                }


            }

            this.rope_array.push(rope);

            var rope_sprite = new cc.Sprite(texture_name);

            rope_sprite.x = rope.x * 16 + 8;
            rope_sprite.y = rope.y * 16 + 8;

            this.rope_objs[rope.x][rope.y] = rope_sprite;

            this.game_layer.addChild(rope_sprite);


            this.rope_num ++;

            this.last_add = true;
            this.last_repeat = false;

            console.log(this.rope_num);
        }

        if (isRemove) {

            var last_rope = this.rope_array.pop();

            var rope_sprite = this.rope_objs[last_rope.x][last_rope.y];

            rope_sprite.removeFromParent();

            this.rope_objs[last_rope.x][last_rope.y] = undefined;


            this.rope_num --;

            this.last_add = false;
            this.last_repeat = false;
        }

    },


    winGame : function() {

//        console.log("win game !");

        this.game_layer.gameWin();
    }

};