/**
 * Created by chenryoutou on 14-8-22.
 */


var BKG_LAYER_TAG = 11;
var COVER_LAYER_TAG = 12;
var UI_LAYER_TAG = 13;

var GameLayer = cc.Layer.extend({

    isBegin : false,
    isOver : false,
    man : null,

    init : function () {
        if ( ! this._super() ){
            return false;
        }

        return true;
    },

    onEnter : function () {
        this._super();


        this.man = Man.create();
        this.addChild(this.man);

//        var animation = new cc.Animation();
//        animation.addSpriteFrameWithFile(res.Man_Down_png);
//        animation.addSpriteFrameWithFile(res.Man_Down_png);
//        animation.setDelayPerUnit(0.5);
//        animation.setLoops(1);
//        var animate = new cc.Animate(animation);
//
//        sprite.runAction(new cc.RepeatForever(animate));

        this.man.x = 24;
        this.man.y = winsize.height - 24;

        var bkg_layer = this.getParent().getChildByTag(BKG_LAYER_TAG);
        MoveController.init(this.man, bkg_layer.map, this);

        HunterController.init(this.man, this);


        this.scheduleUpdate();

//        this.isBegin = true;
    },



    beginGame : function () {

        this.isBegin = true;

        this.getParent().getChildByTag(COVER_LAYER_TAG).updateCover();

        HunterController.createHunter();

    },

    gameOver : function () {

        this.isOver = true;

        this.getParent().getChildByTag(UI_LAYER_TAG).showGameOverMenu();

    },

    gameWin : function () {

        this.isOver = true;

        this.getParent().getChildByTag(UI_LAYER_TAG).showGameWinMenu();

    },


    update : function (dt) {

        if(this.isBegin && !this.isOver){

            MoveController.update(dt);

            HunterController.update(dt);
        }

    }

});


GameLayer.create = function () {

    var layer = new GameLayer();
    if( layer && layer.init() ){
        return layer;
    }
    return null;
};

GameLayer.scene = function () {

    var scene = new cc.Scene();
    var layer = GameLayer.create();

    var bkg_layer = BkgLayer.create();
    bkg_layer.setTag(BKG_LAYER_TAG);
    scene.addChild(bkg_layer);

    scene.addChild(layer);

    var cover_layer = Cover.create();
    cover_layer.setTag(COVER_LAYER_TAG);
    scene.addChild(cover_layer);

    var ui_layer = UILayer.create();
    ui_layer.setTag(UI_LAYER_TAG);
    scene.addChild(ui_layer);

    return scene;
};