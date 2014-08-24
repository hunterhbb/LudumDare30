/**
 * Created by chenryoutou on 14-8-24.
 */

var UILayer = cc.Layer.extend({

    remain_crystal_label : null,
    remain_rope_label : null,

    touch_to_move : null,
    tips : null,
    start_menu : null,

    isShowScores : false,

    init : function () {

        if ( ! this._super() ){
            return false;
        }


        return true;
    },


    onEnter : function () {
        this._super();

        this.touch_to_move = new cc.Sprite(res.Touch_to_move_png);
        this.touch_to_move.setPosition(cc.p(winsize.width/2 , winsize.height/2));
        this.addChild(this.touch_to_move);

        this.tips = new cc.LabelBMFont("Try to connect all the crystals to escape dungeon ! \n\n          Remember your energy rope is limited !", res.West_England_64_fnt);
        this.tips.setPosition(cc.p(winsize.width/2 , winsize.height / 2 - 50));
        this.tips.setScale(0.3, 0.35);
        this.tips.setColor(cc.color(200, 0, 50));
        this.tips.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.tips);


        var statr_menu = new cc.MenuItemFont("Start", function (sender) {

                this.beginGame();

        },
        this);
        statr_menu.fontSize = 20;
        statr_menu.fontName = res.West_England_64_fnt;

        this.start_menu = new cc.Menu(statr_menu);
        this.start_menu.setPosition(winsize.width/2, winsize.height/2 - 120);
        this.addChild(this.start_menu);



        this.remain_crystal_label = new cc.LabelBMFont("Remain Crystal : " + MoveController.crystal_num_win, res.West_England_64_fnt);
        this.remain_crystal_label.setPosition(cc.p(winsize.width  /2, winsize.height * 4/5));
        this.remain_crystal_label.setScale(0.25, 0.3);
        this.remain_crystal_label.setColor(cc.color(70, 150, 240));
        this.addChild(this.remain_crystal_label);

        this.remain_rope_label = new cc.LabelBMFont("Remain Energy-Rope : " + MoveController.rope_num_max, res.West_England_64_fnt);
        this.remain_rope_label.setPosition(cc.p(winsize.width    /2, winsize.height * 4/5 - 30));
        this.remain_rope_label.setScale(0.25, 0.3);
        this.remain_rope_label.setColor(cc.color(70, 150, 240));
        this.addChild(this.remain_rope_label);


//        this.remain_crystal_label.runAction(label_action);
//        this.remain_rope_label.runAction(label_action.clone());

        this.scheduleUpdate();
    },

    update : function (dt) {

        if( MoveController.game_layer.isBegin && this.isShowScores ){

            this.remain_crystal_label.setString(/*"Remain Crystal : " + */(MoveController.crystal_num_win - MoveController.crystal_num) );
            this.remain_rope_label.setString(/*"Remain Energy-Rope : " + */(MoveController.rope_num_max - MoveController.rope_num) );

        }

    },


    beginGame : function () {

        var label_action = new cc.Sequence(/*new cc.DelayTime(2.0),*/  new cc.EaseBackIn(new  cc.ScaleTo(1.0, 0.0, 0.0)) );

        this.remain_crystal_label.runAction(label_action);
        this.remain_rope_label.runAction(label_action.clone());
        this.touch_to_move.runAction(label_action.clone());
        this.tips.runAction(label_action.clone());
        this.start_menu.runAction(label_action.clone());


        MoveController.game_layer.beginGame();

        this.runAction(new cc.Sequence(new cc.DelayTime(1.5), new cc.CallFunc(this.showGameMenu, this)));

    },


    showGameMenu : function () {

        this.isShowScores = true;

        var action = new cc.Sequence( new cc.EaseBackOut(new cc.ScaleTo(1.0, 0.25, 0.3)));

        this.remain_crystal_label.setString( "" + (MoveController.crystal_num_win - MoveController.crystal_num ) );
        this.remain_rope_label.setString("" + (MoveController.rope_num_max - MoveController.rope_num) );

        this.remain_crystal_label.setPosition(550, 305);
        this.remain_rope_label.setPosition(550, 290);

        this.remain_crystal_label.runAction(action);
        this.remain_rope_label.runAction(action.clone());


        var retry = new cc.MenuItemImage(res.Retry_png, res.Retry_png, function (sender) {

            cc.director.runScene(GameLayer.scene());

        }, this);
        retry.setScale(1.0, 1.0);
        var menu = new cc.Menu(retry);
        this.addChild(menu);
        menu.setPosition(515, 300);

    },

    showGameOverMenu : function () {

        var lose_game = new cc.LabelBMFont(" Game Over !", res.West_England_64_fnt);
        lose_game.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lose_game.setScale(0, 0);
        lose_game.setColor(cc.color(255, 50, 0));
        lose_game.setPosition(winsize.width/2, winsize.height/2);
        this.addChild(lose_game);

        var lose_tips = new cc.LabelBMFont(" You have lost in dungeon.", res.West_England_64_fnt);
        lose_tips.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lose_tips.setScale(0, 0);
        lose_tips.setColor(cc.color(220, 50, 0));
        lose_tips.setPosition(winsize.width/2, winsize.height/2 - 35);
        this.addChild(lose_tips);


        var retry = new cc.MenuItemFont("Retry", function(sender){

            cc.director.runScene(GameLayer.scene());

        }, this);
        retry.fontSize = 20;
        retry.setScale(0, 0 );

        var menu = new cc.Menu(retry);
        menu.setPosition(winsize.width/2 , winsize.height/2 - 100);
        this.addChild(menu);


        var action = new cc.Sequence( new cc.EaseBackOut(new cc.ScaleTo(0.8, 0.5, 0.6)));
        lose_game.runAction(action);

        action = new cc.EaseBackOut(new cc.ScaleTo(0.8, 0.3, 0.4));
        lose_tips.runAction(action);

        action = new cc.EaseBackOut( new cc.ScaleTo(0.8, 1.0, 1.0));
        retry.runAction((action));
    },


    showGameWinMenu : function () {

        var win_game = new cc.LabelBMFont(" Win Game !", res.West_England_64_fnt);
        win_game.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        win_game.setScale(0, 0);
        win_game.setColor(cc.color(255, 0, 50));
        win_game.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(win_game);

        var action = new cc.Sequence( new cc.EaseBackOut(new cc.ScaleTo(0.8, 0.5, 0.6)));
        win_game.runAction(action);

        var win_tips = new cc.LabelBMFont(" You have escaped the dungeon successfully.", res.West_England_64_fnt);
        win_tips.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        win_tips.setScale(0, 0);
        win_tips.setColor(cc.color(220, 0, 50));
        win_tips.setPosition(cc.p(winsize.width/2, winsize.height/2 - 35));
        this.addChild(win_tips);

        action = new cc.EaseBackOut(new cc.ScaleTo(0.8, 0.3, 0.4));
        win_tips.runAction(action);


        var retry = new cc.MenuItemFont("Replay", function(sender){

            cc.director.runScene(GameLayer.scene());

        }, this);
        retry.fontSize = 20;
        retry.setScale(0, 0 );

        var menu = new cc.Menu(retry);
        menu.setPosition(winsize.width/2 , winsize.height/2 - 100);
        this.addChild(menu);

        action = new cc.EaseBackOut( new cc.ScaleTo(0.8, 1.0, 1.0));
        retry.runAction((action));
    }

});


UILayer.create = function () {

    var layer = new UILayer();

    if ( layer && layer.init() ){
        return layer;
    }
    return null;
};