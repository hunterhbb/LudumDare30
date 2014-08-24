/**
 * Created by chenryoutou on 14-8-23.
 */


var BkgLayer = cc.Layer.extend({

    map : null,

    init : function () {

        if ( ! this._super() ) {
            return false;
        }

        this.map = new cc.TMXTiledMap(res.Map_1_tmx);

        this.addChild(this.map);

        return true;
    },

    onEnter : function () {
        this._super();

//        var layer = new cc.LayerColor(cc.color(255,255,255), winsize.width, winsize.height);
//        this.addChild(layer);



    }

});

BkgLayer.create = function () {

    var layer = new BkgLayer();

    if ( layer && layer.init() ){
        return layer;
    }
    return null;
};