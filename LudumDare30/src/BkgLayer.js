/**
 * Created by chenryoutou on 14-8-23.
 */


var BkgLayer = cc.Layer.extend({

    onEnter : function () {
        this._super();

        var color_white_layer = new cc.LayerColor(cc.color(255,255,255), winsize.width, winsize.height);
        this.addChild(color_white_layer);
    }

});

BkgLayer.create = function () {

    var layer = new BkgLayer();

    if ( layer && layer.init() ){
        return layer;
    }
    return null;
};