/**
 * Created by chenryoutou on 14-8-24.
 */


var HunterController = {

    man : null,
    game_layer : null,
    hunters : null,

    init : function (man, game_layer){

        this.man = man;
        this.game_layer = game_layer;

        this.hunters = [];

    },

    createHunter : function () {

        var map = MoveController.map;

        var hunter_born_group = map.getObjectGroup("hunter_born");
        var hunter_born_objs = hunter_born_group.getObjects();

        for (var i = 0 ; i < hunter_born_objs.length; i ++ ) {

            var hunter_born_o = hunter_born_objs[i];
            var hox = Math.floor( (hunter_born_o.x + 8) / 16 );
            var hoy = Math.floor( (hunter_born_o.y + 8) / 16 );

            var x = hox * 16 + 8;
            var y = hoy * 16 + 8;

            var hunter = Hunter.create();
            hunter.x = x;
            hunter.y = y;

            this.game_layer.addChild(hunter, 100);
//            hunter.start();

            this.hunters.push(hunter);
        }


    },

    update : function (dt) {

        //check start
        for (var i = 0; i < this.hunters.length; i++){
            var hunter = this.hunters[i];
            if ( ! hunter.isStart ){
                var dis = cc.pDistance(this.man.getPosition(), hunter.getPosition());
                if (dis <= 70){
                    hunter.start();
                }
            }
        }

        //check hit man
        for (var k = 0; k < this.hunters.length; k++){

            var hunter = this.hunters[k];

            var man_p = this.man.getPosition();
            var hunter_box = hunter.getBoundingBox();

            if (cc.rectContainsPoint(hunter_box, man_p) ){

                var man_blood = new cc.Sprite(res.Man_Blood_png);
                man_blood.setPosition(cc.p(this.man.x , this.man.y));
                this.game_layer.addChild(man_blood);

                //hit man.
                this.game_layer.gameOver();

            }

        }


    }


};