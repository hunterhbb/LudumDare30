var winsize = null;

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(568, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);

    winsize = cc.director.getWinSize();

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(GameLayer.scene());
    }, this);
};
cc.game.run();