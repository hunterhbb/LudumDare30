var winsize = null;

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(576, 320, cc.ResolutionPolicy.EXACT_FIT);
    cc.view.resizeWithBrowserSize(true);
    cc.director.setDisplayStats(false);

    winsize = cc.director.getWinSize();

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(GameLayer.scene());
    }, this);
};
cc.game.run();