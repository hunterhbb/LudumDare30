/**
 * Created by chenryoutou on 14-8-23.
 */
/**
 * Created by chenryoutou on 14-8-22.
 */




var TestLayer = cc.Layer.extend({

    init : function () {
        if ( ! this._super() ){
            return false;
        }

        return true;
    },

    onEnter : function () {
        this._super();


        var sprite = new cc.Sprite.create(res.Man_0_png);
        this.addChild(sprite);

        var animation = new cc.Animation();
        animation.addSpriteFrameWithFile(res.Rect_png);
        animation.addSpriteFrameWithFile(res.Rect_png);
        animation.setDelayPerUnit(0.5);
        animation.setLoops(1);
        var animate = new cc.Animate(animation);

        sprite.runAction(new cc.RepeatForever(animate));

        sprite.x = winsize.width/2;
        sprite.y = winsize.height/2;


    }

});


TestLayer.create = function () {

    var layer = new GameLayer();
    if( layer && layer.init() ){
        return layer;
    }
    return null;
};

TestLayer.scene = function () {

    var scene = new cc.Scene();
    var layer = GameLayer.create();

    var bkg_layer = BkgLayer.create();
    scene.addChild(bkg_layer);

    scene.addChild(layer);
    return scene;
};