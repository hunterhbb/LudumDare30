/**
 * Created by chenryoutou on 14-8-23.
 */

var BATCH_COVER_NODE = 110;

var Cover = cc.Layer.extend({


    cover_objs : [],

    init : function () {

        if ( !this._super() ){
            return false;
        }

        this.cover_objs = [];
        for (var i =0; i < 36; i++){
            this.cover_objs[i] = [];
        }


        var batch_node = new cc.SpriteBatchNode(res.Cover_png, 720);
        batch_node.setTag(BATCH_COVER_NODE);
        this.addChild(batch_node);

        this.addFullScreenCover();

        return true;
    },


    addFullScreenCover : function () {

        var batch_node = this.getChildByTag(BATCH_COVER_NODE);

        for (var i = 0; i < 36; i++){

            for (var k = 0; k < 20; k++){

                var x = i * 16 + 8;
                var y = k * 16 + 8;

                var sprite = new cc.Sprite(batch_node.texture);
                sprite.x = x;
                sprite.y = y;
//                sprite.setOpacity(0);
                batch_node.addChild(sprite);

                this.cover_objs[i][k] = sprite;

            }

        }


    },

    updateCover : function () {

        var man = MoveController.man;

        var man_x = Math.floor( man.x / 16 );
        var man_y = Math.floor( man.y / 16 );


        for (var i = 0; i < 5 ; i ++){

            for (var k = 0; k < 5; k++){

                if( i + k <= 4){

                    var x_plus = man_x + i;
                    var x_minus = man_x - i;
                    var y_plus = man_y + k;
                    var y_minus = man_y - k;

                    var value = i + k;

                    var opacity = 30 + value * 40;
//                    if (i + k === 5) opacity = 210;
                    if (i === 0 && k === 0) opacity = 0;

                    if (x_plus >= 0 && x_plus <= 35){

                        if (y_plus >= 0 && y_plus <= 19){
                            var sprite = this.cover_objs[x_plus][y_plus];
                            sprite.setOpacity(opacity)
                            sprite.stopAllActions();
                        }

                        if (y_minus>= 0 && y_minus <= 19){
                            var sprite = this.cover_objs[x_plus][y_minus];
                            sprite.setOpacity(opacity);
                            sprite.stopAllActions();
                        }

                    }
                    if (x_minus >= 0 && x_minus <= 35){

                        if (y_plus >= 0 && y_plus <= 19){
                            var sprite = this.cover_objs[x_minus][y_plus];
                            sprite.setOpacity(opacity);
                            sprite.stopAllActions();
                        }

                        if (y_minus >= 0 && y_minus <= 19){
                            var sprite = this.cover_objs[x_minus][y_minus];
                            sprite.setOpacity(opacity);
                            sprite.stopAllActions();
                        }

                    }

                }

            }

        }


        var crystal_objs = MoveController.crystal_objs;
        var rope_objs = MoveController.rope_objs;

        for (var j = 0; j < crystal_objs.length; j++){

            var crystal_o = crystal_objs[j];

            var c_x = Math.floor( (crystal_o.x + 8) / 16);
            var c_y = Math.floor( (crystal_o.y + 8) / 16);

            var sprite = this.cover_objs[c_x][c_y];

            if(rope_objs[c_x][c_y]){
                sprite.setOpacity(40);
            }
            else if(sprite.getOpacity() > 200 && sprite.getNumberOfRunningActions() === 0){

                var action = new cc.RepeatForever( new cc.Sequence(cc.fadeTo(1, 255), new cc.DelayTime(1), cc.fadeTo(1, 100)) );
                sprite.runAction(action);

            }

        }


    }


});


Cover.create = function () {

    var layer = new Cover();

    if ( layer && layer.init() ){
        return layer;
    }
    return null;
};