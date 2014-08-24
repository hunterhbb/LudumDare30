/**
 * Created by chenryoutou on 14-8-23.
 */


var KEY_UP_ = 38;
var KEY_DOWN_ = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

var MAN_VELOCI = 50;

var Man = cc.Sprite.extend({


    isMoving : false,
    veloci : null,


    onEnter : function () {


        cc.eventManager.addListener({
                event : cc.EventListener.KEYBOARD,
                onKeyPressed : this.onKeyPressed,
                onKeyReleased : this.onKeyReleased
        },
        this);

    },


    onKeyPressed : function (key , event) {

        var target = event.getCurrentTarget();

        switch (key) {
            case KEY_UP_ :
                target.isMoving = true;
                target.veloci = cc.p(0, MAN_VELOCI);
                target.texture = cc.textureCache.textureForKey(res.Man_Up_png);

                break;

            case KEY_DOWN_ :
                target.isMoving = true;
                target.veloci = cc.p(0, -MAN_VELOCI);
                target.texture = cc.textureCache.textureForKey(res.Man_Down_png);


                break;

            case KEY_LEFT :
                target.isMoving = true;
                target.veloci = cc.p(-MAN_VELOCI, 0);
                target.texture = cc.textureCache.textureForKey(res.Man_Left_png);

                break;

            case KEY_RIGHT :
                target.isMoving = true;
                target.veloci = cc.p(MAN_VELOCI, 0);
                target.texture = cc.textureCache.textureForKey(res.Man_Right_png);

                break;

            default :
                break;
        }

    },

    onKeyReleased : function (key, event) {

        var target = event.getCurrentTarget();

        switch (key) {
            case KEY_UP_ :
                target.veloci.y = 0;
                break;

            case KEY_DOWN_ :
                target.veloci.y = 0;
                break;

            case KEY_LEFT :
                target.veloci.x = 0;
                break;

            case KEY_RIGHT :
                target.veloci.x = 0;
                break;

            default :
                break;
        }


        if (cc.pLength(target.veloci) === 0) {
            target.isMoving = false;
        }



    }



});

Man.create = function () {

    var man = new Man(res.Man_Down_png);

    return man;
};