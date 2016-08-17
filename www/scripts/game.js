var game;
var gameStates = new Array();
var currentPlanet = new Array();
var test = new Array();
var gasPlanetStates = new Array();
var electricPlanetStates = new Array();
var stormPlanetStates = new Array();
var currentTrialIndex = 0;  //global storage of where we are in the array
var losses = [0, 0, 0];//gas, electric, storm
var gameComplete = true;
var audio = document.createElement('audio');

var lastTrial = 0;
var completedPlanets = [false, false, false];//gas, electric, storm

var popup;
var hintText = null;

var timer = null;
var trialDuration = 10;
var timerDisplay;
var rect;



    var idleTimer = null;
var idleTime = 0;
var canIdle = true;
var pause = false;
var audio;  //the audio file that is used on the CongratulationsScreen

var trialLoseCount = 0;

//fonts
//42px
var dialogueTextWordWrapWidth = 710;
var dialogueTextStyle;
var dialogueText;
var nameTextStyle;
var nameText;

var skipKey;//skip key is space

//START OF GAME STATES
var Main = {};

window.onload = function () {
    document.ontouchstart = function (e) { e.preventDefault(); }//ontouchmove
    //var game;
    game = new Phaser.Game(1024, 768, Phaser.CANVAS, '', { preload: preload, create: create });//,false,false); //AUTO

    nameTextStyle = { font: "38px Tw Cen MT", fill: "#000000", align: "left" };//750
    dialogueTextStyle = { font: "40px Tw Cen MT", fill: "#000000", align: "left", wordWrap: true, wordWrapWidth: dialogueTextWordWrapWidth };


    function preload() {
        //game.load.image('background', 'images/background.png');
        //  Load the Google WebFont Loader script
        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    }
    function create() {
        //debug keys
        game.input.keyboard.inputEnabled = true;



        skipKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //check for activeness: from the original script but not working
     /*    if (canIdle) {
                  var area = document.getElementById("game").addEventListener('touchstart', resetIdleTimer);
                  var area = document.getElementById("game").addEventListener('touchmove', resetIdleTimer);
                  var area = document.getElementById("game").addEventListener('touchend', resetIdleTimer);
                  var area = document.getElementById("game").addEventListener('touchcancel', resetIdleTimer);
              }
           */
       

        //game.add.image(0, 0, 'background');
        game.state.add('boot', Main.Boot, true);//Main.Boot.key
        game.state.add('preloader', Main.Preloader);
        game.state.add('splashscreen', Main.SplashScreen);
        game.state.add('titlescreen', Main.TitleScreen);
        game.state.add('hangerscene', Main.HangerScene);
        game.state.add('cockpitscene', Main.CockpitScene);
        game.state.add('utilitybeltscene', Main.UtilityBeltScene);
        game.state.add('selectPlanet', Main.SelectPlanet);
        game.state.add('aliendialoguescene', Main.AlienDialogueScene);
        game.state.add('winscreen', Main.WinScreen);
        game.state.add('preloader', Main.Preloader);
        game.state.add('splashscreen', Main.SplashScreen);
        game.state.add('titlescreen', Main.TitleScreen);
        game.state.add('YesNo', Main.YesNo)
        game.state.add('Thanks', Main.Thanks)
        game.state.add('SS', Main.SS)
        game.state.add('EW', Main.EW)
        game.state.add('GW', Main.GW)
        game.state.add('badge', Main.badge);
        game.state.add('badgepic', Main.badgepic);
        //  game.state.add('printbadge', Main.printbadge);
        game.state.add('ThunderDialogue', Main.ThunderDialogue);
        game.state.add('GasDialogue', Main.GasDialogue);
        game.state.add('ElectricDialogue', Main.ElectricDialogue);
        game.state.add('printbadge', Main.printbadge);





        var randomvariable = Math.random();

        {
            var a0 = ['gasDetectorInstr', 'animalSoundInstr', 'rottenEggsInstr', 'followNoseInstr', 'grillInstr', 'stoveClutterInstr'];
            var a01 = a0.sort(function (a, b) { return 0.5 - randomvariable });
        } {
            var b0 = [Main.GasDetectorInstr, Main.AnimalSoundInstr, Main.RottenEggsInstr, Main.FollowNoseInstr, Main.GrillInstr, Main.StoveClutterInstr];

            var b01 = b0.sort(function (a, b) { return 0.5 - randomvariable });
        } {
            var c0 = ['gasDetector ', 'animalSound ', 'rottenEggs ', 'followNose ', 'grill ', 'stoveClutter ']

            var c01 = c0.sort(function (a, b) { return 0.5 - randomvariable });

        } {
            var d0 = [Main.GasDetector, Main.AnimalSound, Main.RottenEggs, Main.FollowNose, Main.Grill, Main.StoveClutter];

            var d01 = d0.sort(function (a, b) { return 0.5 - randomvariable });
        }

        makeAndStoreTrialStates(a01[0], b01[0], c01[0], d01[0], gasPlanetStates);
        makeAndStoreTrialStates(a01[1], b01[1], c01[1], d01[1], gasPlanetStates);

        makeAndStoreTrialStates(a01[2], b01[2], c01[2], d01[2], gasPlanetStates);


        // bhargav this is for electric planet
        {
            var e0 = ['safeOutletInstr', 'pullPlugInstr', 'moveFurnitureInstr', 'wetHandsInstr', 'tubMoverInstr', 'ladderInstr', 'kiteMoverInstr'];
            var e01 = e0.sort(function (a, b) { return 0.5 - randomvariable });
        }
        {
            var f0 = [Main.SafeOutletInstr, Main.PullPlugInstr, Main.MoveFurnitureInstr, Main.WetHandsInstr, Main.TubMoverInstr, Main.ladderInstr, Main.KiteMoverInstr];

            var f01 = f0.sort(function (a, b) { return 0.5 - randomvariable });
        }
        {
            var g0 = ['safeOutlet', 'pullPlug', 'moveFurniture', 'wetHands', 'tubMove', 'ladder', 'kiteMover']

            var g01 = g0.sort(function (a, b) { return 0.5 - randomvariable });

        }
        {
            var h0 = [Main.safeOutlet, Main.PullPlug, Main.MoveFurniture, Main.WetHands, Main.TubMover, Main.Ladder, Main.KiteMover];

            var h01 = h0.sort(function (a, b) { return 0.5 - randomvariable });

        }


        makeAndStoreTrialStates(e01[0], f01[0], g01[0], h01[0], electricPlanetStates);
        makeAndStoreTrialStates(e01[1], f01[1], g01[1], h01[1], electricPlanetStates);
        makeAndStoreTrialStates(e01[2], f01[2], g01[2], h01[2], electricPlanetStates);





        {
            var i0 = ['collectBatteriesInstr', 'pantryStockerInstr', 'phoneChargerInstr', 'waterCatcherInstr', 'closeRefrigeratorsInstr', 'turnOffAppliancesInstr', 'candleInstr'];
            var i01 = i0.sort(function (a, b) { return 0.5 - randomvariable });
        }
        {
            var j0 = [Main.CollectBatteriesInstr, Main.PantryStockerInstr, Main.PhoneChargerInstr, Main.WaterCatcherInstr, Main.CloseRefrigeratorsInstr, Main.TurnOffAppliancesInstr, Main.CandleInstr];

            var j01 = j0.sort(function (a, b) { return 0.5 - randomvariable });
        }
        {
            var k0 = ['collectBatteries', 'pantryStocker', 'phoneCharger', 'waterCatcher', 'closeRefrigerators', 'turnOffAppliances', 'candle']

            var k01 = k0.sort(function (a, b) { return 0.5 - randomvariable });

        }
        {
            var l0 = [Main.CollectBatteries, Main.PantryStocker, Main.PhoneCharger, Main.WaterCatcher, Main.CloseRefrigerators, Main.TurnOffAppliances, Main.Candle];

            var l01 = l0.sort(function (a, b) { return 0.5 - randomvariable });

        }


        makeAndStoreTrialStates(i01[0], j01[0], k01[0], l01[0], stormPlanetStates);
        makeAndStoreTrialStates(i01[1], j01[1], k01[1], l01[1], stormPlanetStates);
        makeAndStoreTrialStates(i01[2], j01[2], k01[2], l01[2], stormPlanetStates);


    }
    function makeAndStoreTrialStates(instrKey, instrObject, trialKey, trialObject, array) {
        game.state.add(instrKey, instrObject);
        game.state.add(trialKey, trialObject);
        array.push([instrKey, instrObject, trialKey, trialObject]);
    }//makeAndStoreTrialStates
}//onload

//BOOT SCREEN/STATE
Main.Boot = function (game) {
    this.game = game;
};

Main.Boot.prototype = {

    preload: function () {
        this.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;//Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.disableVisibilityChange = true;
        this.game.stage.disablePauseScreen = true;

        this.game.stage.scale.minWidth = 512;
        this.game.stage.scale.minHeight = 384;

        this.game.stage.scale.maxWidth = 1024;
        this.game.stage.scale.maxHeight = 768;
        this.game.stage.scale.pageAlignHorizontally = true;

        if (this.game.device.android && this.game.device.chrome == false) {
            this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
            this.game.stage.scale.maxIterations = 1;
        }
        playSound('sounds/welcome.mp3');
        this.load.image('loaderFull', 'images/preloadBar.png');
        //this.load.image('loaderEmpty', 'assets/UI/loaderEmpty.png');
        this.game.load.image('background_splash', 'images/background_splash.png');
        //this.load.image('loaderEmpty', 'assets/UI/loaderEmpty.png');
        this.game.load.image('PSC_planet', 'images/PSC_planet.png');
    },

    create: function () {
        //// this.game.stage.enableOrientationCheck(true, false, 'orientation');
        this.game.state.start('preloader', Main.Preloader);
    },

}//main boot prototype

//PRELOADER SCREEN/STATE
Main.Preloader = function (game) {
    this.game = game;
};

Main.Preloader.prototype = {
    preloadBar: Phaser.Sprite,
    test: Phaser.Sprite,
    preload: function () {
        //TEXT
        var style = { font: "78px Tw Cen MT", fill: "#ffffff", align: "center" };//, wordWrap: true, wordWrapWidth: 635 
        var chooseText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Loading...", style);
        chooseText.anchor.setTo(0.5, 0.5);
        chooseText.stroke = '#000000';
        chooseText.strokeThickness = 10;

        this.preloadBar = this.add.sprite(this.game.world.centerX, 370, 'loaderFull');
        this.preloadBar.position.x = 512 - this.preloadBar.width / 2;
        //this.preloadBar.anchor.setTo(0.5, 0);
        this.load.setPreloadSprite(this.preloadBar);



        //this.game.load.image('background', 'images/background.png');
        this.game.load.image('background', 'images/pantonebackground.png');
        this.game.load.image('titlescreen', 'images/titlescreen.png');
        this.game.load.image('tap_to_start', 'images/tap_to_start.png');
        this.game.load.image('splashscreen', 'images/splashscreen.png');
        //this.game.load.image('star', 'images/star.png');
        this.game.load.image('kite', 'images/kite.png');
        this.game.load.image('wire_long', 'images/wire_long.png');
        this.game.load.image('wire_med', 'images/wire_med.png');
        this.game.load.image('cardboardbox', 'images/cardboardbox.png');
        this.game.load.image('battery1', 'images/battery1.png');
        this.game.load.image('battery2', 'images/battery2.png');
        this.game.load.image('battery3', 'images/battery3.png');
        this.game.load.image('battery4', 'images/battery4.png');
        this.game.load.image('battery5', 'images/battery5.png');
        this.game.load.image('battery6', 'images/battery6.png');
        this.game.load.image('paperclip', 'images/paperclip.png');
        this.game.load.image('penny', 'images/penny.png');
        this.game.load.image('lipstick', 'images/lipstick.png');
        this.game.load.image('small_milk', 'images/small_milk.png');
        this.game.load.image('steak', 'images/steak.png');
        this.game.load.image('waterdrop', 'images/waterdrop.png');
        this.game.load.image('basin', 'images/basin.png');
        this.game.load.image('phone', 'images/phone.png');
        this.game.load.image('charger', 'images/charger.png');
        this.game.load.image('house', 'images/house.png');
        this.game.load.image('guy', 'images/person1.png');
        this.game.load.image('girl', 'images/person2.png');
        this.game.load.image('kid', 'images/person4.png');
        this.game.load.image('dog', 'images/person3.png');
        this.game.load.image('dog2', 'images/quizdog.png');
        this.game.load.image('bird', 'images/bird.png');
        this.game.load.image('snake', 'images/snake.png');
        this.game.load.image('ear1', 'images/ear1.png');
        this.game.load.image('ear2', 'images/ear2.png');
        this.game.load.image('ear3', 'images/ear3.png');
        this.game.load.image('eye', 'images/eye.png');
        this.game.load.image('nose1', 'images/nose1.png');
        this.game.load.image('nose2', 'images/nose2.png');
        this.game.load.image('nose3', 'images/nose3.png');
        this.game.load.image('flower', 'images/flower.png');
        this.game.load.image('milk', 'images/milk.png');
        this.game.load.image('background_splash', 'images/background_splash.png');
        this.game.load.image('rottenEgg', 'images/rottenegg.png');


        //this.game.load.image('littlephone', 'images/littlephonedoodle.png');
        //this.game.load.image('littleoutlet', 'images/littleoutletdoodle.png');
        //this.game.load.image('hands', 'images/handsdoodle.png');
        this.game.load.image('wethands1', 'images/wethands1.png');
        this.game.load.image('wethands2', 'images/wethands2.png');
        this.game.load.image('wethands3', 'images/wethands3.png');
        this.game.load.image('tub', 'images/tub.png');
        // this.game.load.image('falling_controller', 'images/falling_controller.png');
        this.game.load.image('falling_controller', 'images/falling_controller.png');
        this.game.load.image('falling_lamp', 'images/falling_lamp.png');
        this.game.load.image('falling_toaster', 'images/falling_toaster.png');
        this.game.load.image('falling_phone', 'images/falling_phone.png');
        /*this.game.load.image('controller', 'images/controllerdoodle.png');
        this.game.load.image('lamp', 'images/lampdoodle.png');
        this.game.load.image('toaster', 'images/toasterdoodle.png');*/
        //this.game.load.image('glassbottle', 'images/glassbottledoodle.png');
        this.game.load.image('cereal', 'images/cereal.png');
        this.game.load.image('can1', 'images/can1.png');
        this.game.load.image('can2', 'images/can2.png');
        this.game.load.image('canopener', 'images/canopener.png');
        this.game.load.image('bottles', 'images/bottles.png');
        //this.game.load.image('pantry', 'images/pantrydoodle.png');
        this.game.load.image('candle', 'images/candle.png');
        this.game.load.image('flammablegirl1', 'images/flammablegirl1.png');
        this.game.load.image('flammablegirl2', 'images/flammablegirl2.png');
        this.game.load.image('flammablegirl3', 'images/flammablegirl3.png');
        this.game.load.image('book', 'images/book.png');
        this.game.load.image('tnt', 'images/tnt.png');
        this.game.load.image('blanket', 'images/blanket.png');
        this.game.load.image('grill', 'images/grill.png');
        this.game.load.image('wall', 'images/wall.png');
        this.game.load.image('ladderruler', 'images/ladderruler.png');

        this.game.load.image('safeOutlet', 'images/safeoutlet.png');
        this.game.load.image('overloadedOutlet', 'images/overloadedoutlet.png');
        this.game.load.image('brokenOutlet', 'images/brokenoutlet.png');

        this.game.load.image('ladder', 'images/ladder.png');
        this.game.load.image('powerLine', 'images/powerlines.png');
        this.game.load.image('ladderButton', 'images/ladderbutton.png');
        this.game.load.image('ladderButton_down', 'images/ladderbutton_down.png');

        this.game.load.image('fridge1Open', 'images/fridge1Open.png');
        this.game.load.image('fridge2Open', 'images/fridge2Open.png');
        this.game.load.image('fridge3Open', 'images/fridge3Open.png');
        this.game.load.image('fridge4Open', 'images/fridge4Open.png');
        this.game.load.image('fridge1Closed', 'images/fridge1Closed.png');
        this.game.load.image('fridge2Closed', 'images/fridge2Closed.png');
        this.game.load.image('fridge3Closed', 'images/fridge3Closed.png');
        this.game.load.image('fridge4Closed', 'images/fridge4Closed.png');

        this.game.load.image('acOn', 'images/acOn.png');
        this.game.load.image('blenderOn', 'images/blenderOn.png');
        this.game.load.image('tvOn', 'images/tvOn.png');
        this.game.load.image('lampOn', 'images/lampOn.png');
        this.game.load.image('computerOn', 'images/computerOn.png');
        this.game.load.image('acOff', 'images/acOff.png');
        this.game.load.image('blenderOff', 'images/blenderOff.png');
        this.game.load.image('tvOff', 'images/tvOff.png');
        this.game.load.image('lampOff', 'images/lampOff.png');
        this.game.load.image('computerOff', 'images/computerOff.png');
        //this.game.load.image('device6On', 'images/computerOn.png');

        //this.game.load.image('hand', 'images/bighand.png');
        this.game.load.image('hand1', 'images/bighand_1.png');
        this.game.load.image('hand2', 'images/bighand_2.png');
        this.game.load.image('hand3', 'images/bighand_3.png');
        this.game.load.image('pullCord', 'images/pullcord.png');
        this.game.load.image('pullPlug', 'images/pullplug.png');
        this.game.load.image('plugoutlet', 'images/plugoutlet.png');

        this.game.load.image('furniture1', 'images/chair1.png');
        this.game.load.image('furniture2', 'images/table.png');
        this.game.load.image('furniture3', 'images/rug.png');
        this.game.load.image('furniture4', 'images/chair2.png');
        this.game.load.image('furniture5', 'images/stool.png');
        this.game.load.image('furnitureCord', 'images/furniturecord.png');

        this.game.load.image('characterIntroBox', 'images/instruction_box.png');
        //this.game.load.image('characterIntro', 'images/characterTrialIntro.png');
        this.game.load.image('checkmark', 'images/checkmark.png');
        //this.game.load.image('noseFront', 'images/noseFront.png');
        //this.game.load.image('noseFrontRed', 'images/noseFrontRed.png');
        this.game.load.image('noseRed', 'images/noseRed.png');
        this.game.load.image('exclamationpoint', 'images/exclamationpoint.png');
        this.game.load.image('furnace', 'images/leak_furnace.png');
        this.game.load.image('dryer', 'images/leak_dryer.png');
        this.game.load.image('stove', 'images/leak_stove.png');
        this.game.load.image('fireplace', 'images/leak_fireplace.png');
        this.game.load.image('stovetop', 'images/stovetop.png');
        this.game.load.image('papertowels', 'images/papertowels.png');
        this.game.load.image('end_game', 'images/end_game.png');


        this.game.load.image('heart', 'images/heart.png');

        this.game.load.image('background_black', 'images/background_black.png');
        this.game.load.image('background_hanger', 'images/background_hanger.png');
        this.game.load.image('background_cockpit', 'images/background_cockpit.png');
        this.game.load.image('background_electric_planet', 'images/background_electric_planet.png');
        this.game.load.image('background_gas_planet', 'images/background_gas_planet.png');
        this.game.load.image('background_storm_planet', 'images/background_storm_planet.png');
        this.game.load.image('background_sky', 'images/background_sky.png');
        this.game.load.image('background_ladder', 'images/background_ladder.png');

        this.game.load.image('planet_electric_reg', 'images/planet_electric_reg.png');
        this.game.load.image('planet_gas_reg', 'images/planet_gas_reg.png');
        this.game.load.image('planet_storm_reg', 'images/planet_storm_reg.png');
        this.game.load.image('utility_belt_label', 'images/utility_belt_label.png');
        this.game.load.image('planet_label_storm', 'images/planet_label_storm.png');
        this.game.load.image('planet_label_gas', 'images/planet_label_gas.png');
        this.game.load.image('planet_label_electric', 'images/planet_label_electric.png');

        this.game.load.spritesheet('tap_spriteSheet', 'images/tap_spriteSheet.png', 150, 150, 2);
        //this.game.load.spritesheet('particle_electricity', 'images/particle_electricity.png', 30, 30, 3);
        //this.game.load.spritesheet('particle_fire', 'images/particle_fire.png', 30, 30, 3);
        this.game.load.image('particle_electricity', 'images/particle_electricity.png');
        this.game.load.image('particle_fire', 'images/particle_fire.png');

        this.game.load.image('dialogueBox', 'images/dialogue_box.png');
        this.game.load.image('dialogueBoxWide', 'images/dialogue_box_wide.png');
        this.game.load.image('safe-t_pose_atEase', 'images/safe-t_pose_atEase.png');
        this.game.load.image('gasian_pose_reg', 'images/gasian_pose_reg.png');
        this.game.load.image('boltian_pose_reg', 'images/boltian_pose_reg.png');
        this.game.load.image('stormian_pose_reg', 'images/stormian_pose_reg.png');

        this.game.load.image('lose_explode', 'images/lose_explode.png');
        this.game.load.image('lose_electric', 'images/lose_electric.png');
        this.game.load.image('lose_neutral', 'images/lose_neutral.png');
        this.game.load.image('win_popup', 'images/win_popup.png');

        this.game.load.image('PSC_planet', 'images/PSC_planet.png');
        this.game.load.image('psc_badge', 'images/PSC Captain Badge trimmed.png');
        this.game.load.image('restart_button', 'images/restart_button.png')

        //this.game.load.image('winscreen', 'images/winscreen.png');
    },
    create: function () {
        //this.game.state.start('trial1instr', Main.Trial1Instr);
        currentTrialIndex = 0;
        //goToInstructions();
        this.game.state.start('splashscreen', Main.SplashScreen);
        //this.game.state.start('titlescreen', Main.TitleScreen);
    },

}//PRELOADER


//SPLASH SCREEN OBJECT
Main.SplashScreen = function (game) {
    this.game = game;
};
Main.SplashScreen.prototype = {
    //text: Phaser.Text,
    //tapReady: Boolean, //to make sure if their finger was already down it doesn't skip

    create: function () {
        this.game.add.image(0, 0, 'background_splash');
        completedPlanets = [false, false, false];
        losses = [0, 0, 0];
        var splashImage = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'PSC_planet');
        splashImage.anchor.setTo(0.5, 0.5);
        //tapReady = false;
    },

    update: function () {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.goToTitle, this);
    },
    transitionToNextScreen: function () {
        blackFade = this.game.add.image(0, 0, 'background_black');
        blackFade.alpha = 0;
        fadeOutTween = this.game.add.tween(blackFade).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
        fadeOutTween.onComplete.add(this.goToTitle, this);
    },

    goToTitle: function () {
        //   this.game.state.start('titlescreen', Main.TitleScreen);
        this.game.state.start('hangerscene', Main.HangerScene);
    },

}//Main.SplashScreen

//TITLE SCREEN OBJECT
Main.TitleScreen = function (game) {
    this.game = game;
};
Main.TitleScreen.prototype = {
    tapReady: Boolean,
    delayDialogue: Boolean,
    dialogueStarted: Boolean,
    myNextScreen: Array,
    dialogue: Array,

    doFadeIn: Boolean,
    fadeOutTween: Phaser.Tween,
    fadeInTween: Phaser.Tween,
    blackFade: Phaser.Image,
    backTint: Phaser.Image,

    dialogueBox: Phaser.Image,
    currentDialogueObject: DialogueObject,
    previousDialogueObject: DialogueObject,
    currentCharacter: Phaser.Image,
    previousCharacter: Phaser.Image,

    flyOut: Phaser.Tween, //for exiting character

    tapAnimation: Phaser.Sprite,



    create: function () {
        currentCharacter = null;
        tapAnimation = null;
        flyOut = null;
        fadeOutTween = null;
        fadeInTween = null;
        doFadeIn = true;
        dialogue = [];
        currentDialogueObject = null;
        dialogueBox = null;
        delayDialogue = true;
        this.setup();
        tapReady = false;
        dialogueStarted = false;
        //this.game.add.image(0, 0, 'background');
        this.game.add.image(0, 0, 'titlescreen');
        //tapReady = false;
        completedPlanets = [false, false, false];
        losses = [0, 0, 0];

        tapMessage = this.game.add.image(this.game.world.centerX, this.game.height - 150, 'tap_to_start');
        tapMessage.anchor.setTo(0.5, 0.5);
    },

    update: function () {
        if (this.game.input.activePointer.isDown || skipKey.isDown)
            this.transitionToNextScreen();//this.game.state.start('hangerscene', Main.HangerScene);//goToInstructions();

    },

    transitionToNextScreen: function () {
        blackFade = this.game.add.image(0, 0, 'background_black');
        blackFade.alpha = 0;
        fadeOutTween = this.game.add.tween(blackFade).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
        fadeOutTween.onComplete.add(this.nextScreen, this);
    },

    nextScreen: function () {
        if (canIdle) {
            clearInterval(idleTimer);//prevent duplicate idle timers
            idleTimer = setInterval(idleTimerIncrement, 10000);//every 15 seconds
        }
        //this.game.state.start('hangerscene', Main.HangerScene);
        this.game.state.start('selectPlanet', Main.SelectPlanet); // wanted to go to the restart page as there is a redirecting error

    },

}//Main.TitleScreen




//YesNo screen

Main.YesNo = function (game) {
    this.game = game;
};
Main.YesNo.prototype = {
    yes: Phaser.Sprite,
    no: Phaser.Sprite,


    create: function () {

        this.game.add.image(0, 0, 'background_stars');
        this.game.add.image(0, 0, 'background_cockpit');
        audio.pause(); // to pause the existing runnign game soundss
        playSound('sounds/continue.mp3');
        yes = this.game.add.sprite(250, 230, 'checkmark');
        yes.anchor.setTo(0.5, 0.5);
        yes.inputEnabled = true;
        yes.events.onInputDown.add(this.click, this);

        no = this.game.add.sprite(this.game.width - 250, 230, 'exclamationpoint');
        no.anchor.setTo(0.5, 0.5);
        no.inputEnabled = true;
        no.events.onInputDown.add(this.click, this);

      


       var style = {
            font: "50px Helvetica", fill: "#ffffff", align: "center"
        };//, wordWrap: true, wordWrapWidth: 635 
        var chooseText =
             this.game.add.text(this.game.world.centerX, this.game.height - 300, "Do you want to continue to the next game? \nIf you choose No, \nCaptain Badge will not be provided.", style);
        chooseText.anchor.setTo(0.5, 0.5);
        chooseText.stroke = '#000000';
        chooseText.strokeThickness = 10;


    },

    click: function (yesno) {
        if (yesno == no) {
            // to go title screen
            this.game.state.start('Thanks', Main.Thanks);
            //  togoYesNo();


        }
        else {
            //   go to select planet screen
            this.game.state.start('selectPlanet', Main.SelectPlanet);
        }


    },


}


//Thanks screen
Main.Thanks = function (game) {
    this.game = game;
};
Main.Thanks.prototype = {
    clickhere: Phaser.Sprite,



    create: function () {

        this.game.add.image(0, 0, 'background_stars');
        this.game.add.image(0, 0, 'background_cockpit');
        audio.pause();
        playSound('sounds/ending.mp3');
        clickhere = this.game.add.image(this.game.world.centerX, 300, 'PSC_planet');
        clickhere.anchor.setTo(0.5, 0.5);
        clickhere.inputEnabled = true;
        clickhere.events.onInputDown.add(this.click, this);




        var style = {
            font: "76px Helvetica", fill: "#ffffff", align: "center"
        };//, wordWrap: true, wordWrapWidth: 635 
        var chooseText =
            this.game.add.text(this.game.world.centerX, this.game.height - 700, "Thanks for playing", style);
        chooseText.anchor.setTo(0.5, 0.5);
        chooseText.stroke = '#000000';
        chooseText.strokeThickness = 10;


    },

    click: function (Thanks) {
        if (Thanks == clickhere) {
            newDoc(); // creating a new funtion to restart a new game
        }



    },


}


// this function is to check to make sure that the pages are going to yes/no page and after all trials are over it redirects to all states complete page
function togoYesNo() {


    if (completedPlanets[0] == true && completedPlanets[1] == true && completedPlanets[2] == true)
        this.game.state.start('winscreen', Main.WinScreen);
    else {

        myNextScreen = ['YesNo', Main.YesNo];
    }


}
// this function is to check to make sure that the pages are going to yes/no page and after all trials are over it redirects to all states complete page
function newDoc() {
    window.location.assign("index.html")
}



//STORY SCREEN GENERIC OBJECT
Main.StoryScreen = function (game) {
    this.game = game;
};
Main.StoryScreen.prototype = {
    tapReady: Boolean,
    myNextScreen: Array,
    delayDialogue: Boolean,
    dialogueStarted: Boolean,
    dialogue: Array,

    doFadeIn: Boolean,
    fadeOutTween: Phaser.Tween,
    fadeInTween: Phaser.Tween,
    blackFade: Phaser.Image,
    backTint: Phaser.Image,

    dialogueBox: Phaser.Image,
    currentDialogueObject: DialogueObject,
    previousDialogueObject: DialogueObject,
    currentCharacter: Phaser.Image,
    previousCharacter: Phaser.Image,

    flyOut: Phaser.Tween, //for exiting character

    tapAnimation: Phaser.Sprite,

    create: function () {
        currentCharacter = null;
        tapAnimation = null;
        flyOut = null;
        fadeOutTween = null;
        fadeInTween = null;
        doFadeIn = true;
        dialogue = [];
        currentDialogueObject = null;
        dialogueBox = null;
        delayDialogue = true;
        dialogueStarted = false;

        this.setup();
        tapReady = false;
        if (doFadeIn == true) {
            blackFade = this.game.add.image(0, 0, 'background_black');
            fadeInTween = this.game.add.tween(blackFade).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        }//doFadeIn
        if (delayDialogue == true) {
            this.game.time.events.add(Phaser.Timer.SECOND * 0.7, this.startDialogue, this);//.5
        }
        else {
            this.startDialogue();
        }

        //for winscreen adding badge on top
        this.lateSetup();
    },

    startDialogue: function () {
        if (dialogue.length > 0) {

            if (delayDialogue == true) {
                backTint = this.game.add.image(0, 0, 'background_black');
                backTint.alpha = 0;
                this.game.add.tween(backTint).to({ alpha: 0.5 }, 300, Phaser.Easing.Linear.None, true);
                this.game.time.events.add(300, function () {
                    this.advanceDialogue(); dialogueStarted = true;
                }, this);
            }
            else {
                var blackOverlay = this.game.add.image(0, 0, 'background_black');
                blackOverlay.alpha = 0.5;
                this.advanceDialogue();
                dialogueStarted = true;
            }
        }
    },
    update: function () {
        if ((this.game.input.activePointer.isDown || skipKey.isDown) && (fadeInTween == null || fadeInTween.isRunning == false) && tapReady == true) {
            if (dialogue.length > 0) {
                skipKey.isDown = false;
                this.advanceDialogue();
            }
            else if (fadeOutTween == null && (flyOut == null || flyOut.isRunning == false)) {
                if (typeof currentDialogueObject != 'undefined' && currentDialogueObject != null && currentDialogueObject.flyOut == true && flyOut == null) {
                    //console.log("FLY OUT");
                    //currentCharacter.alpha = 0.5;
                    //previousCharacter.alpha = 0.5;
                    var tempPos = currentCharacter.position.clone();
                    if (currentDialogueObject.boxType == 0) tempPos.y += 500;
                    else if (currentDialogueObject.boxType == 1) tempPos.x -= 400;
                    else if (currentDialogueObject.boxType == 2) tempPos.x += 400;
                    flyOut = this.game.add.tween(currentCharacter.position).to({ x: tempPos.x, y: tempPos.y }, 200, Phaser.Easing.Linear.None, true);

                    if (typeof dialogueText != 'undefined')
                        dialogueText.destroy();
                    if (typeof nameText != 'undefined')
                        nameText.destroy();
                    if (typeof dialogueBox != 'undefined')
                        dialogueBox.destroy();
                    if (typeof tapAnimation != 'undefined')
                        tapAnimation.destroy();
                }
                else {
                    this.dialogueFinished();//this.transitionToNextScreen();//this.nextScreen();
                }
                skipKey.isDown = false;
            }
            tapReady = false;
        }
        if (this.game.input.activePointer.isDown == false && tapReady == false) {
            tapReady = true;
        }

        //FOR AFTER FLY OUT
        if (typeof currentDialogueObject != 'undefined' && currentDialogueObject != null && currentDialogueObject.flyOut == true && flyOut != null && flyOut.isRunning == false && dialogue.length == 0) {
            this.dialogueFinished();
        }
    },

    setup: function () {
        this.game.add.image(0, 0, 'background');
    },

    lateSetup: function () {

    },

    advanceDialogue: function () {
        //next piece of dialogue
        //if current dialogue object has another, do next
        //else next dialogue object
        //currentDialogueObject = dialogue.shift();
        if (currentDialogueObject == null)
            currentDialogueObject = dialogue[0];//.shift();

        if (currentDialogueObject.broughtIn == false) {
            if (typeof currentCharacter != 'undefined' && currentCharacter != null) {
                previousCharacter = currentCharacter;
                currentCharacter = null;//currentCharacter.destroy();
                if (previousDialogueObject.flyOut == true) {
                    var tempPos = previousCharacter.position.clone();
                    if (currentDialogueObject.boxType == 0) previousCharacter.position.y -= 500;
                    else if (currentDialogueObject.boxType == 1) previousCharacter.position.x += 300;
                    else if (currentDialogueObject.boxType == 2) previousCharacter.position.x -= 300;
                    flyOut = this.game.add.tween(previousCharacter.position).to({ x: tempPos.x, y: tempPos.y }, 200, Phaser.Easing.Linear.None, true);
                }
                else {
                    previousCharacter.destroy();
                }
            }

            //bring in tween
            currentCharacter = this.game.add.image(10, this.game.height, currentDialogueObject.pose);
            var x, y;
            y = this.game.height;
            if (currentDialogueObject.boxType == 0)//top
            {
                x = this.game.world.centerX;
                currentCharacter.anchor.setTo(0.5, 0.75);
            }
            else if (currentDialogueObject.boxType == 1)//left
            {
                //x = 10;
                //currentCharacter.anchor.setTo(0, 0.65);
                x = 140;
                currentCharacter.anchor.setTo(0.5, 0.65);
            }
            else //2, right
            {
                //x = this.game.width - 10;
                //currentCharacter.anchor.setTo(1, 0.65);
                x = this.game.width - 140;
                currentCharacter.anchor.setTo(0.5, 0.65);
                //currentCharacter.anchor.setTo(1, 0);
                //if (currentCharacter.key == 'gasian_pose_reg')
                //    currentCharacter.anchor.x = 0.7;
            }
            if (currentCharacter.key == 'gasian_pose_reg')
                currentCharacter.anchor.y = 0.8;
            if (currentCharacter.key == 'psc_badge')
                currentCharacter.anchor.y = 1.05;


            //currentCharacter.scale.setTo(1.5, 1.5); //TEMP
            currentCharacter.position.x = x;
            currentDialogueObject.broughtIn = true;

            if (currentDialogueObject.flyIn == true) {
                var tempPos = currentCharacter.position.clone();
                if (currentDialogueObject.boxType == 0) currentCharacter.position.y += 500;
                else if (currentDialogueObject.boxType == 1) currentCharacter.position.x -= 400;
                else if (currentDialogueObject.boxType == 2) currentCharacter.position.x += 400;
                var flyIn = this.game.add.tween(currentCharacter.position).to({ x: tempPos.x, y: tempPos.y }, 200, Phaser.Easing.Linear.None, true);
            }
        }//bring in

        //PLACE DIALOGUE BOX
        if (dialogueBox != null)
            dialogueBox.destroy();
        if (currentDialogueObject.boxType == 0) {
            dialogueBox = this.game.add.image(this.game.world.centerX, 0, 'dialogueBoxWide');
            dialogueBox.anchor.x = 0.5;
        }
        else if (currentDialogueObject.boxType == 1) {
            dialogueBox = this.game.add.image(this.game.width, this.game.height, 'dialogueBox');
            dialogueBox.anchor.setTo(1, 1);//dialogueBox.anchor.x = 1;
        }
        else {
            dialogueBox = this.game.add.image(0, this.game.height, 'dialogueBox');
            dialogueBox.anchor.setTo(0, 1);
        }

        if (currentDialogueObject.lines.length > 0) {
            //display text of currentDialogueObject.lines[0]
            this.placeText();
            currentDialogueObject.lines.shift();
        }
        if (currentDialogueObject.lines.length == 0) {
            previousDialogueObject = dialogue.shift();
            if (dialogue.length > 0) {
                currentDialogueObject = dialogue[0];
            }
        }
    },

    placeText: function () {
        //var style = { font: "60px Tw Cen MT", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 635 };
        //var textString = "default text";
        if (typeof dialogueText != 'undefined')
            dialogueText.destroy();
        if (typeof nameText != 'undefined')
            nameText.destroy();
        var style = dialogueTextStyle;//.clone();
        style.wordWrapWidth = dialogueTextWordWrapWidth;
        if (currentDialogueObject.boxType == 0) {
            style.wordWrapWidth = 924;
            dialogueText = this.game.add.text(50, 50, currentDialogueObject.lines[0], style);
            nameText = this.game.add.text(55, 5, currentDialogueObject.name, nameTextStyle);
            this.placeTapAnimation(this.game.width - 150, this.game.height - 200);
        }
        else if (currentDialogueObject.boxType == 1) {
            dialogueText = this.game.add.text(300, 588, currentDialogueObject.lines[0], style);
            nameText = this.game.add.text(305, 548, currentDialogueObject.name, nameTextStyle);
            this.placeTapAnimation(this.game.width - 300, this.game.height - 280);
        }
        else {
            dialogueText = this.game.add.text(20, 588, currentDialogueObject.lines[0], style);
            nameText = this.game.add.text(25, 548, currentDialogueObject.name, nameTextStyle);
            this.placeTapAnimation(500, this.game.height - 280);
        }
        //dialogueText.anchor.setTo(0.5, 0.5);

    },

    placeTapAnimation: function (tapX, tapY) {
        //if (typeof tapAnimation != 'undefined')
        //    tapAnimation.destroy();
        if (typeof tapAnimation == 'undefined' || tapAnimation == null) {
            tapAnimation = game.add.sprite(tapX, tapY, 'tap_spriteSheet');
            tapAnimation.anchor.setTo(0.5, 0.5);
            tapAnimation.animations.add('tap');
            tapAnimation.animations.play('tap', 3, true);
        }
        tapAnimation.position.setTo(tapX, tapY);
    },

    dialogueFinished: function () {
        this.transitionToNextScreen();
    },

    transitionToNextScreen: function () {
        //tween black fade, then switch states
        blackFade = this.game.add.image(0, 0, 'background_black');
        blackFade.alpha = 0;
        fadeOutTween = this.game.add.tween(blackFade).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
        fadeOutTween.onComplete.add(this.nextScreen, this);
        //this.nextScreen();
    },

    nextScreen: function () {
        this.game.state.start(myNextScreen[0], myNextScreen[1]);//'titlescreen', Main.TitleScreen);
    },

}//Main.StoryScreen

//HANGER SCENE
Main.HangerScene = function (game) {
    Main.StoryScreen.call(this);
}
Main.HangerScene.prototype = Object.create(Main.StoryScreen.prototype);
Main.HangerScene.prototype.setup = function () {
    this.game.add.image(0, 0, 'background_hanger');
    myNextScreen = ['cockpitscene', Main.CockpitScene];
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/hello.mp3');
    var d1 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 0, true);
    d1.lines.push("Hello, you must be the new trainee! Welcome to the Planetary Safety Commission. My name is Safe-T 1000, and I'll be assisting you on your missions. Let's get aboard the ship.");
   dialogue.push(d1);

    /*var tapAnimation = game.add.sprite(game.width - 100, game.height - 100, 'tap_spriteSheet');
    tapAnimation.animations.add('tap');
    tapAnimation.animations.play('tap', 3, true);*/
}//create
//HANGER SCENE

//COCKPIT SCENE
Main.CockpitScene = function (game) {
    Main.StoryScreen.call(this);
}
Main.CockpitScene.prototype = Object.create(Main.StoryScreen.prototype);
Main.CockpitScene.prototype.setup = function () {
    this.game.add.image(0, 0, 'background_cockpit');
   
    myNextScreen = ['utilitybeltscene', Main.UtilityBeltScene];
    audio.pause();
    playSound('sounds/to_be_officially_certified.mp3');
    var d1 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 1, true);
    d1.lines.push("To be officially certified as a captain, you must complete training missions on the planets of the Utility Belt. Each planet specializes in one utility.");
  
    dialogue.push(d1);
}//create
//COCKPIT SCENE

//UTILITY BELT SCENE
Main.UtilityBeltScene = function (game) {
    Main.StoryScreen.call(this);
}
Main.UtilityBeltScene.prototype = Object.create(Main.StoryScreen.prototype);
Main.UtilityBeltScene.prototype.setup = function () {
    this.game.add.image(0, 0, 'background_cockpit');

    var electricPlanet = this.game.add.sprite(this.game.width - 250, 230, 'planet_electric_reg');//this.game.world.centerX, 400,
    electricPlanet.anchor.setTo(0.5, 0.5);

    var gasPlanet = this.game.add.sprite(this.game.world.centerX, 365, 'planet_gas_reg');//250, 230,
    gasPlanet.anchor.setTo(0.5, 0.5);

    var stormPlanet = this.game.add.sprite(250, 230, 'planet_storm_reg');//this.game.width - 250, 230,
    stormPlanet.anchor.setTo(0.5, 0.5);

    audio.pause();
    playSound('sounds/weve_arrived.mp3');
    var d1 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 1, false, true);
    d1.lines.push("We've arrived at the Utility Belt. Please select which planet you'd like to complete the trials for first..");
    dialogue.push(d1);
 
    myNextScreen = ['selectPlanet', Main.SelectPlanet];


}//create
Main.UtilityBeltScene.prototype.transitionToNextScreen = function () {
    this.nextScreen();  //skip the fadeOut
}//transitionToNextScreen
//UTILITY BELT SCENE

Main.SelectPlanet = function (game) {
    this.game = game;
}
Main.SelectPlanet.prototype = {
    electricPlanet: Phaser.Sprite,
    gasPlanet: Phaser.Sprite,
    stormPlanet: Phaser.Sprite,
    test: Phaser.Image,

    planets: Array,

    utilityBeltLabel: Phaser.Image,



    create: function () {

        this.game.add.image(0, 0, 'background_stars');
        this.game.add.image(0, 0, 'background_cockpit');
      

        electricPlanet = this.game.add.sprite(this.game.width - 250, 230, 'planet_electric_reg');
        electricPlanet.anchor.setTo(0.5, 0.5);
        electricPlanet.inputEnabled = true;
        electricPlanet.events.onInputDown.add(this.click, this);

        gasPlanet = this.game.add.sprite(this.game.world.centerX, 365, 'planet_gas_reg');
        gasPlanet.anchor.setTo(0.5, 0.5);
        gasPlanet.inputEnabled = true;
        gasPlanet.events.onInputDown.add(this.click, this);

        stormPlanet = this.game.add.sprite(250, 230, 'planet_storm_reg');
        stormPlanet.anchor.setTo(0.5, 0.5);
        stormPlanet.inputEnabled = true;
        stormPlanet.events.onInputDown.add(this.click, this);

        // this.game.add.image(0, 0, 'background_cockpit');

        planets = [gasPlanet, electricPlanet, stormPlanet];
      
        //adding end game image		
        test = this.game.add.sprite(this.game.world.centerX + 400, 650, 'end_game');
        test.anchor.setTo(0.5, 0.5);
        test.inputEnabled = true;
        test.events.onInputDown.add(this.click, this);


        //checkmarks for completing planets
        for (var i = 0; i < planets.length; i++) {
            if (completedPlanets[i]) {
                planets[i].inputEnabled = false;
                addCheckMarkTo(planets[i]);
            }
        }
        addPlanetLabels();
        audio.pause();
        playSound('sounds/select_planet.mp3');

        //TEXT
        var style = {
            font: "78px Tw Cen MT", fill: "#ffffff", align: "center"
        };//, wordWrap: true, wordWrapWidth: 635 
        var chooseText = this.game.add.text(this.game.world.centerX, this.game.height - 120, "-Select a Planet-", style);
        chooseText.anchor.setTo(0.5, 0.5);
        chooseText.stroke = '#000000';
        chooseText.strokeThickness = 10;

        currentTrialIndex = 0;//no matter what planet, start at the beginning

        for (var i = 0; i < planets.length; i++) {
            if (completedPlanets[i] == false) {
                gameComplete = false;
            }
        }
        if (gameComplete) {
            this.game.state.start('Thanks', Main.Thanks);
        }

    },

    click: function (planet) {
        if (planet == gasPlanet) {
     //       //go to gas trials
            currentPlanet = gasPlanetStates;
        }
        if (planet == electricPlanet) {
            //go to gas trials
            currentPlanet = electricPlanetStates;
        }
        if (planet == stormPlanet) {
            //go to gas trials
            currentPlanet = stormPlanetStates;
        }

        if (currentPlanet.length > 0) {
            gameStates = currentPlanet.slice();
            //goToInstructions();
            this.game.state.start('aliendialoguescene', Main.AlienDialogueScene);
        }
        else

            this.game.state.start('Thanks', Main.Thanks);
        //   togoYesNo();
    },
}
//Select Planet

//ALIEN DIALOGUE SCENE
Main.AlienDialogueScene = function (game) {
    Main.StoryScreen.call(this);
}
Main.AlienDialogueScene.prototype = Object.create(Main.StoryScreen.prototype);
Main.AlienDialogueScene.prototype.setup = function () {
    delayDialogue = false;
    this.game.add.image(0, 0, 'background_cockpit');

    doFadeIn = false;

    var electricPlanet = this.game.add.sprite(this.game.width - 250, 230, 'planet_electric_reg');//this.game.world.centerX, 400,
    electricPlanet.anchor.setTo(0.5, 0.5);

    var gasPlanet = this.game.add.sprite(this.game.world.centerX, 365, 'planet_gas_reg');//250, 230,
    gasPlanet.anchor.setTo(0.5, 0.5);

    var stormPlanet = this.game.add.sprite(250, 230, 'planet_storm_reg');//this.game.width - 250, 230,
    stormPlanet.anchor.setTo(0.5, 0.5);

    var planets = [gasPlanet, electricPlanet, stormPlanet];

    //addPlanetLabels();

    //checkmarks for completing planets
    for (var i = 0; i < planets.length; i++) {
        if (completedPlanets[i]) {
            addCheckMarkTo(planets[i]);
        }
    }


    //utilityBeltLabel = this.game.add.image(this.game.world.centerX, 0, 'utility_belt_label');
    //utilityBeltLabel.anchor.setTo(0.5, 0);
     var d1;
     if (currentPlanet == gasPlanetStates) {
         audio.pause();
        playSound('sounds/greetings_clumpus.mp3');


        d1 = new DialogueObject('Clumpus', 'gasian_pose_reg', 2, true);
        d1.lines.push("Greetings and many splorblags to you, traveler.  I am Clumpus. On my planet I will teach you the ways of natural gas safety.");
      }
    else if (currentPlanet == electricPlanetStates) {
        audio.pause();
        playSound('sounds/shocks_intro.mp3');

        d1 = new DialogueObject('Shocks', 'boltian_pose_reg', 2, true);
        d1.lines.push("What's zappenin', Captain? You can call me Shocks.  I'm gonna show you all about electric safety. High five! Just kidding, I'm made out of electricity!");
      }
    else if (currentPlanet == stormPlanetStates) {
       audio.pause();
        playSound('sounds/intro_thunder.mp3');
        d1 = new DialogueObject('Thunder Helm', 'stormian_pose_reg', 2, true);
        d1.lines.push("I am the honorable warrior known as Thunder Helm. I will be guiding you through the basics of storm safety. Come, there's no time to waste.");
     }

    //var d1 = new DialogueObject('safe-t_pose_atEase', 1, true);
    //d1.lines.push("We've arrived at the Utility Belt.  Please select which planet you'd like to complete the trials for first.");
    dialogue.push(d1);
    //myNextScreen = ['selectPlanet', Main.SelectPlanet];
}//set up
Main.AlienDialogueScene.prototype.nextScreen = function () {
    goToInstructions();
    /*if (currentPlanet.length > 0) {
        gameStates = currentPlanet.slice();
        goToInstructions();
    }*/
}//nextScreen
//ALIEN DIALOGUE SCENE

//WIN SCREEN
Main.WinScreen = function (game) {
    Main.StoryScreen.call(this);
}
Main.WinScreen.prototype = Object.create(Main.StoryScreen.prototype);
Main.WinScreen.prototype.setup = function () {
    playSound('sounds/your_training.mp3');
    clearInterval(idleTimer);
    delayDialogue = false;
    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

 //   myNextScreen = ['ThunderDialogue', Main.ThunderDialogue];

    var d1 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 0, true);

    d1.lines.push("Your training exercises are complete.  Let's see how the ambassadors think you did.");
    dialogue.push(d1);

}//setup
Main.WinScreen.prototype.lateSetup = function () {
    //add badge
    var badge = this.game.add.image(this.game.world.width / 5, this.game.world.centerY + 50, 'psc_badge');
    badge.anchor.setTo(0.5, 0.5);
    badge.scale.setTo(0.25, 0.25);
}


Main.WinScreen.prototype.dialogueFinished = function () {
    this.game.state.start('ThunderDialogue', Main.ThunderDialogue);
    //  this.game.state.start('badge', Main.badge);


}
//WIN SCREEN


// JavaScript source code

//badge Instruciton Screen
Main.ThunderDialogue = function (game) {
    Main.StoryScreen.call(this);
}
Main.ThunderDialogue.prototype = Object.create(Main.StoryScreen.prototype);
Main.ThunderDialogue.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;

    myNextScreen = ['GasDialogue', Main.GasDialogue];

    //  this.game.state.start('Thanks', Main.Thanks);

    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

    var d2 = new DialogueObject('Thunder Helm', 'stormian_pose_reg', 0, true);
    if (losses[2] == 0) {
        audio.pause();
        playSound('sounds/you_completed_thunder.mp3');


        d2.lines.push("You completed each trial on your first attempt, like a true warrior. Overall, you pass storm safety.");
    }
    else if (losses[2] <= 5) {
        audio.pause();
        playSound('sounds/you_made_thunder.mp3');

        d2.lines.push("You made a few mistakes, but eventually pulled through. A good warrior needs perseverance. Overall, you pass storm safety.");
    }
    else {
        audio.pause();
        playSound('sounds/you_seem_thunder.mp3');

        d2.lines.push("You seem to have had some trouble, but finished none the less. Overall, you pass storm safety.");
    }

    //  d2.lines.push("Overall, you pass storm safety.");
    dialogue.push(d2);

}//setup



Main.GasDialogue = function (game) {
    Main.StoryScreen.call(this);
}
Main.GasDialogue.prototype = Object.create(Main.StoryScreen.prototype);
Main.GasDialogue.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;

    myNextScreen = ['ElectricDialogue', Main.ElectricDialogue];

    //  this.game.state.start('Thanks', Main.Thanks);

    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

    var d3 = new DialogueObject('Clumpus', 'gasian_pose_reg', 0, true);
    if (losses[0] == 0) {
        audio.pause();
        playSound('sounds/Perfect_score_gas.mp3');


        d3.lines.push("A perfect score on the gas trials! Well done, human. You pass gas safety!");
    }
    else if (losses[0] <= 5) {
        audio.pause();
        playSound('sounds/minimal_problems_gas.mp3');


        d3.lines.push("Minimal problems.  Not bad, human. You pass gas safety!");
    }
    else {
        audio.pause();
        playSound('sounds/you_had_gas.mp3');

        d3.lines.push("You had some rough patches, but I stink you'll be just fine. You pass gas safety!");
    }
    // d3.lines.push("You pass gas safety!");
    dialogue.push(d3);


}//setup


Main.ElectricDialogue = function (game) {
    Main.StoryScreen.call(this);
}
Main.ElectricDialogue.prototype = Object.create(Main.StoryScreen.prototype);
Main.ElectricDialogue.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;

    myNextScreen = ['badge', Main.badge];

    //  this.game.state.start('Thanks', Main.Thanks);

    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

    var d4 = new DialogueObject('Shocks', 'boltian_pose_reg', 0, true);
    if (losses[1] == 0) {
        audio.pause();
        playSound('sounds/whoa_shocks.mp3');


        d4.lines.push("Whoa, you didn't mess up once on the electric trials. Most excellent job! Electrical safety is totally a pass!");
    }
    else if (losses[1] <= 5) {
        audio.pause();
        playSound('sounds/you_messed_shocks.mp3');


        d4.lines.push("You messed up a little, but who doesn't? Electrical safety is totally a pass!");
    }
    else {
        audio.pause();
        playSound('sounds/looks_like_shocks.mp3');

        d4.lines.push("Looks like you had some problems. You still won in the end, though. Electrical safety is totally a pass!");
    }
    //   d4.lines.push("Electrical safety is totally a pass!");
    dialogue.push(d4);



}//setup




//WIN SCREEN





// Bhargav
//Gas WIN SCREEN

Main.GW = function (game) {
    Main.StoryScreen.call(this);
}
Main.GW.prototype = Object.create(Main.StoryScreen.prototype);
Main.GW.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;
    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');
    //    myNextScreen = ['YesNo', Main.YesNo];
    togoYesNo();


    for (var i = 0; i < planets.length; i++) {
        if (completedPlanets[i]) {
            addCheckMarkTo(planets[i]);
        }
    }

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/congrats_gas.mp3');
    //bhargav
  
  
    var d5 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 0, true);
    d5.lines.push("Congratulations! You've completed your training and are now an officially certified captain of the Gas Planetary Commission, New York State Division! Click to continue");
    dialogue.push(d5);


}//setup

Main.GW.prototype.lateSetup = function () {
    //add badge
    var badge = this.game.add.image(this.game.world.width / 5, this.game.world.centerY + 50, 'psc_badge');
    badge.anchor.setTo(0.5, 0.5);
    badge.scale.setTo(0.25, 0.25);
}


// end of Gas WIN SCREEN

// end of Gas WIN SCREEN


// Bhargav
//Storm WIN SCREEN

Main.SS = function (game) {
    Main.StoryScreen.call(this);
}
Main.SS.prototype = Object.create(Main.StoryScreen.prototype);
Main.SS.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;
    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

    //  myNextScreen = ['YesNo', Main.YesNo];
    togoYesNo();



    for (var i = 0; i < planets.length; i++) {
        if (completedPlanets[i]) {
            addCheckMarkTo(planets[i]);
        }
    }
    
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/Congratulations_thunders.mp3');
    var d5 = new DialogueObject('Thunder Helm', 'stormian_pose_reg', 0, true);
    d5.lines.push("Congratulations! You've completed your training and are now an officially certified captain of the Storm Planetary Commission, New York State Division! Click to continue");
    dialogue.push(d5);
  

}//setup

Main.SS.prototype.lateSetup = function () {
    //add badge
    var badge = this.game.add.image(this.game.world.width / 5, this.game.world.centerY + 50, 'psc_badge');
    badge.anchor.setTo(0.5, 0.5);
    badge.scale.setTo(0.25, 0.25);
}

// end of Storm WIN SCREEN



// Bhargav
//Electric WIN SCREEN

Main.EW = function (game) {
    Main.StoryScreen.call(this);
}
Main.EW.prototype = Object.create(Main.StoryScreen.prototype);
Main.EW.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;
    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

    //   myNextScreen = ['YesNo', Main.YesNo];
    togoYesNo();

    //bhargav.
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/congrats_electric.mp3');
  

    var d5 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 0, true);
    d5.lines.push("Congratulations! You've completed your training and are now an officially certified captain of the Electric Planet Safety Commission, New York State Division! Click to Continue");
    dialogue.push(d5);

  


}//setup



Main.EW.prototype.lateSetup = function () {
    //add badge
    var badge = this.game.add.image(this.game.world.width / 5, this.game.world.centerY + 50, 'psc_badge');
    badge.anchor.setTo(0.5, 0.5);
    badge.scale.setTo(0.25, 0.25);
}

// end of Electric WIN SCREEN


//badge Instruciton Screen
Main.badge = function (game) {
    Main.StoryScreen.call(this);
}
Main.badge.prototype = Object.create(Main.StoryScreen.prototype);
Main.badge.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;

    myNextScreen = ['badgepic', Main.badgepic];

  //  this.game.state.start('Thanks', Main.Thanks);

    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');
    audio.pause();
    playSound('sounds/congrats.mp3');
  

    var d9 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 0, true);
    d9.lines.push("Congratulations! You've completed your training and are now an officially certified captain of the Planetary Safety Commission, New York State Division!");
    dialogue.push(d9);


}//setup


Main.badgepic = function (game) {
    Main.StoryScreen.call(this);
}
Main.badgepic.prototype = Object.create(Main.StoryScreen.prototype);
Main.badgepic.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;

    myNextScreen = ['Thanks', Main.Thanks];

    //  this.game.state.start('Thanks', Main.Thanks);

    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');
    audio.pause();
    playSound('sounds/show_an.mp3');


    var d9 = new DialogueObject('Safe-T 1000', 'safe-t_pose_atEase', 0, true);
    d9.lines.push("Show an attendant that you won and you'll be given a badge proving your rank.  Good luck on future missions, Captain!");
    dialogue.push(d9);




}

Main.badgepic.prototype.lateSetup = function () {
    //add badge
    var badge = this.game.add.image(this.game.world.width / 5, this.game.world.centerY + 50, 'psc_badge');
    badge.anchor.setTo(0.5, 0.5);
    badge.scale.setTo(0.25, 0.25);
}
// the below code is the web version
/*
Main.printbadge = function (game) {
    Main.StoryScreen.call(this);
}
Main.printbadge.prototype = Object.create(Main.StoryScreen.prototype);
Main.printbadge.prototype.setup = function () {
    clearInterval(idleTimer);
    delayDialogue = false;

    myNextScreen = ['Thanks', Main.Thanks];

    //  this.game.state.start('Thanks', Main.Thanks);

    this.game.add.image(0, 0, 'background_stars');
    this.game.add.image(0, 0, 'background_cockpit');

    audio.pause();
    playSound('sounds/chimes.mp3');

}


Main.printbadge.prototype.lateSetup = function () {
    //add badge
    var badge = this.game.add.image(this.game.world.width / 5, this.game.world.centerY, 'psc_badge');
    badge.anchor.setTo(-0.5, 0.75);
    badge.scale.setTo(0.25, 0.25);
}

*/






//GENERIC INSTRUCTION SCREEN OBJECT
Main.Instr = function (game) {
    this.game = game;
};

Main.Instr.prototype = {
    text: Phaser.Text,
    tapReady: Boolean, //to make sure if their finger was already down it doesn't skip
    canSkip: Boolean,
    character: Phaser.Image,

    create: function () {
        //this.game.add.image(0, 0, 'background');
        //this.game.add.image(-5, 5, 'characterIntro');
        var textColor;
        //CHARACTER
        if (currentPlanet == gasPlanetStates) {
            this.game.add.image(0, 0, 'background_gas_planet');
            character = this.game.add.image(170, this.game.height + 60, 'gasian_pose_reg');
            textColor = "#97b748";//"#7d973b";
        }
        else if (currentPlanet == electricPlanetStates) {
            this.game.add.image(0, 0, 'background_electric_planet');
            character = this.game.add.image(170, this.game.height + 60, 'boltian_pose_reg');
            textColor = "#fffd3c";
        }
        else if (currentPlanet == stormPlanetStates) {
            this.game.add.image(0, 0, 'background_storm_planet');
            character = this.game.add.image(170, this.game.height + 60, 'stormian_pose_reg');
            textColor = "#dd6f8e";//cc2150
        }
        character.anchor.setTo(0.5, 1);

        tapReady = false;
        canSkip = false;
        trialLoseCount = 0;

        game.time.events.add(Phaser.Timer.SECOND * 1.25, function () {

            var instructBox = this.game.add.image(this.game.width - 5, 20, 'characterIntroBox');
            instructBox.anchor.setTo(1, 0);

            //var style = { font: "68px Tw Cen MT", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 950 };
            var style = {
                font: "60px Tw Cen MT", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 615
            }; //635//630
            style.fill = textColor;
            var textString = "default text";
            text = this.game.add.text(this.game.width * 0.68, this.game.world.centerY - 50, textString, style);//this.game.world.centerX //this.game.width * 0.66
            text.anchor.setTo(0.5, 0.5);
            //text.anchor.setTo(0.25, 0.5);
            text.stroke = '#000000';
            text.strokeThickness = 8;

            style = {
                font: "52px Tw Cen MT", fill: "#ffffff", align: "center"
            };//58px
            var textString = "(Tap to continue)";
            var tapText = this.game.add.text(this.game.width * 0.68, this.game.height - 80, textString, style);
            tapText.anchor.setTo(0.5, 0.5);
            //tapText.anchor.setTo(0.25, 0.5);
            tapText.stroke = '#000000';
            tapText.strokeThickness = 8;

            tapReady = false;
            canSkip = true;

            this.changeText();
        }, this);
    },

    update: function () {
        if (skipKey.isDown) {
            goToTrial();
        }
        if (this.game.input.activePointer.isDown && this.tapReady && canSkip) {
            goToTrial();
        }
        if (this.game.input.activePointer.isDown == false && this.tapReady == false) {
            tapReady = true;
        }
    },

    changeText: function () {
        //override this
    },

}//Main.Instr


//START OF GLOBAL FUNCTIONS
var started = false;
var trialOver = false;
var timeUp = false;
var tween = null;
var lives = 3;
var hearts = [];
var deadHearts = [];
var immune = false;
var immunityDuration = 75;//1.25 seconds
var immunityTimer = 0;

//var trialTextString;// String,
var trialTextStyle = { font: "68px Tw Cen MT", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 950 };
var trialText;// Phaser.Text,

function DialogueObject(aName, aPose, aBoxType, doFlyIn, doFlyOut) {
    this.name = aName || "";
    this.pose = aPose;
    this.boxType = aBoxType;
    this.flyIn = doFlyIn;
    this.flyOut = doFlyOut || false;
    this.lines = new Array();
}
DialogueObject.prototype = {
    broughtIn: false,
    pose: String,
    flyIn: true,
    flyOut: false,
    boxType: 0,
    lines: Array,
    name: String,
}//DialogueObject

function goToInstructions() {
    game.state.start(gameStates[currentTrialIndex][0], gameStates[currentTrialIndex][1]);
}//goToInstructions

function goToTrial()//from instructions
{
    trialOver = false;
    game.state.start(gameStates[currentTrialIndex][2], gameStates[currentTrialIndex][3]);
}//goToTrial

//TEMPORARY - GOES THROUGH INSTR AND TRIALS IN SAME ORDER EACH TIME
function nextTrial() {

    if (gameStates.length == currentTrialIndex) //(gameStates.length <= 0) //planet done, back to planet select
    {
        //save that you finished that planet
        if (completedPlanets[0] == true && completedPlanets[1] == true && completedPlanets[2] == true)
            //  togoYesNo();
            this.game.state.start('Thanks', Main.Thanks);
            //this.game.state.start('titlescreen', Main.TitleScreen);

        else if (currentPlanet == gasPlanetStates) {

            completedPlanets[0] = true;
            this.game.state.start('GW', Main.GW);
        }
        else if (currentPlanet == electricPlanetStates) {
            completedPlanets[1] = true;
            this.game.state.start('EW', Main.EW);
        }

        else if (currentPlanet == stormPlanetStates) {
            completedPlanets[2] = true;
            this.game.state.start('SS', Main.SS);
        }

        else
            this.game.state.start('Thanks', Main.Thanks);
        //      togoYesNo();
        currentPlanet = new Array();
        return;
        //currentTrialIndex = 0;
    }
    else if (lastTrial == currentTrialIndex) {
        goToTrial();
    }
    else {
        goToInstructions();
    }
}//nextTrial

var background;
function createMiniGame() {
    lastTrial = currentTrialIndex;
    lives = 3;
    immune = false;
    immunityTimer = 0;
    //trialOver = true;
    started = false;
    timeUp = false;
    hintText = null;
    background = this.game.add.image(0, 0, 'background');
    //setBackground('background');
}
/*
function setBackground(backgroundString)
{
    background = this.game.add.image(0, 0, backgroundString);
    //background.sendToBack();
}//setBackground*/

function makeTrialText(forQuiz) {
    //var style = { font: "68px Tw Cen MT", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 950 };
    trialText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "", trialTextStyle);//textString
    trialText.anchor.setTo(0.5, 0.5);
    trialText.stroke = '#000000';
    trialText.strokeThickness = 8;
    if (forQuiz != null && forQuiz == true) {
        //var style = { font: "68px Tw Cen MT", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 950 };
        trialText = this.game.add.text(this.game.world.centerX, 25, "", trialTextStyle);
        trialText.anchor.setTo(0.5, 0);
        //text.stroke = '#000000';
        //text.strokeThickness = 8;
    }
}//makeTrialText

function setTrialTextString(myString) {
    trialText.text = myString;
}//setTrialTextString

var blackOverlay;
function showTrialResult(imageKey)//,callbackFunction)
{
    if ((tween == null || tween.isRunning == false) && trialOver == false) {
        blackOverlay = this.game.add.image(0, 0, 'background_black');//var
        blackOverlay.alpha = 0.5;

        if (trialLoseCount > 2) {
            imageKey = "skip_popup";
        }

        popup = game.add.sprite(game.world.centerX, game.height + 200, imageKey);//var 
        popup.anchor.setTo(0.5, 0.5);
        tween = game.add.tween(popup.position).to({ y: game.world.centerY }, 1000, Phaser.Easing.Elastic.Out, true);
        trialOver = true;
        started = false;
        blackOverlay.inputEnabled = true;//popup
        //Delay mostly for ladder game so button mashing doesn't skip result
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
            blackOverlay.events.onInputDown.add(function () //popup
            {
                blackOverlay.inputEnabled = false;
                //popup = null;
                tween = null;
                nextTrial();
            }, this);//nullify tween in case they click before it's done
        }, this);


        if (hintText != null) {
            var hint = game.add.sprite(0, game.world.height, 'dialogueBoxWide');
            hint.anchor.setTo(0, 1);
            hint.position.y = game.world.height + hint.height;

            var style = dialogueTextStyle;
            style.wordWrapWidth = 924;
            //var text = game.add.text(hint.width / 2, game.world.height - hint.height / 2, hintText, style);
            var text = game.add.text(hint.width / 2, -hint.height / 2, hintText, style);
            text.anchor.setTo(0.5, 0.5);

            nameText = this.game.add.text(125, (-hint.height) + 5, "Tip", nameTextStyle);//x 50

            hint.addChild(nameText);
            hint.addChild(text);

            var hintTween = game.add.tween(hint.position).to({ y: game.world.height }, 100, Phaser.Easing.Linear.None, true).delay(200).start();
        }

        if (timer != null) {
            stopTimer();
        }
    }
    //if (callbackFunction != null && typeof (callbackFunction) === "function")
    // tween.onCompleteCallback(callbackFunction);
}//showResult

function win()//callbackFunction)
{
    currentTrialIndex++;
    trialLoseCount = 0;
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/chimes.mp3');

    showTrialResult('win_popup');//, callbackFunction);
    /*var popup = game.add.sprite(game.world.centerX, game.height + 200, 'win_popup');
    //popup.height = popup.width = 400;
    popup.anchor.setTo(0.5, 0.5);
    tween = game.add.tween(popup.position).to({ y: game.world.centerY }, 1000, Phaser.Easing.Elastic.Out, true);
    trialOver = true;
    if (callbackFunction != null && typeof (callbackFunction) === "function")
        tween.onCompleteCallback(callbackFunction);*/
}//win


function incrementLoss() {
    if (currentPlanet == gasPlanetStates)
        losses[0]++;
    else if (currentPlanet == electricPlanetStates)
        losses[1]++;
    else if (currentPlanet == stormPlanetStates)
        losses[2]++;
    trialLoseCount++;
}

function loseExploded1() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    //  playSound('sounds/drag_grill.mp3');
    playSound('sounds/drag_everyone.mp3');
    showTrialResult('lose_explode');
}//loseloseExplode


function loseExploded2() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/a_gas_leak_hissing.mp3');
    //  playSound('sounds/explosion.mp3');
    showTrialResult('lose_explode');
}//lo

function loseExploded3() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    //  playSound('sounds/drag_grill.mp3');
    playSound('sounds/a_gas_leak_can.mp3');
    showTrialResult('lose_explode');
}//loseloseExplode


function loseExploded4() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/flowers.mp3');
    //  playSound('sounds/explosion.mp3');
    showTrialResult('lose_explode');
}//lo

function loseExploded6() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    //  playSound('sounds/drag_grill.mp3');
    playSound('sounds/nose.mp3');
    showTrialResult('lose_explode');
}//loseloseExplode


function loseExploded8() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_object.mp3');
    //  playSound('sounds/explosion.mp3');
    showTrialResult('lose_explode');
}//lo
function loseExploded7() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_grill.mp3');
    //  playSound('sounds/explosion.mp3');
    showTrialResult('lose_explode');
}//loseloseExplode

function loseElectric0() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/carefully_drag_kite.mp3');
    showTrialResult('lose_electric');
}

function loseElectric1() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_tub.mp3');
    showTrialResult('lose_electric');
}//loseElectric
function loseElectric2() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_hands.mp3');
    showTrialResult('lose_electric');
}
function loseElectric3() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/press_button.mp3');
    showTrialResult('lose_electric');
}

function loseElectric4() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/a_safe_outlet.mp3');
    showTrialResult('lose_electric');
}//loseElectric

function loseElectric5() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_hand.mp3');
    showTrialResult('lose_electric');
}//loseElectric

function loseElectric6() {
    incrementLoss();

    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_furniture.mp3');
    showTrialResult('lose_electric');
}//loseElectric









function loseNeutral0() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_candle.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral
function loseNeutral6() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/tap_on_all_elect.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral




function loseNeutral1() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/qucikle_drag_batteries.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral

function loseNeutral2() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_basin.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral

function loseNeutral3() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_all_objects_to_center.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral

function loseNeutral4() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/drag_charger.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral

function loseNeutral5() {
    incrementLoss();
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/tap_on_all.mp3');

    showTrialResult('lose_neutral');
}//loseNeutral







//SPRITE FUNCTIONS
function localSpriteTop(mySprite) {
    var aTop = mySprite.height;
    if (mySprite.anchor.y != 0)
        aTop = mySprite.height - mySprite.height * mySprite.anchor.y;
    return aTop;
}//localSpriteTop

function localSpriteBottom(mySprite) {
    var aBottom = 0;
    if (mySprite.anchor.y != 0)
        aBottom = mySprite.height * mySprite.anchor.y;
    return aBottom;
}//localSpriteBottom

function localSpriteLeft(mySprite) {
    var aLeft = 0;
    if (mySprite.anchor.x != 0)
        aLeft = mySprite.width * mySprite.anchor.x;
    return aLeft;
}//localSpriteLeft

function localSpriteRight(mySprite) {
    var aRight = mySprite.width;
    if (mySprite.anchor.x != 0)
        aRight = mySprite.width - mySprite.width * mySprite.anchor.x;
    return aRight;
}//localSpriteRight

function spriteTop(mySprite) {
    var aTop = mySprite.position.y + mySprite.height;
    if (mySprite.anchor.y != 0)
        aTop = mySprite.position.y + localSpriteTop(mySprite);
    return aTop;
}//spriteTop

function spriteBottom(mySprite) {
    var aBottom = mySprite.position.y;
    if (mySprite.anchor.y != 0)
        aBottom = mySprite.position.y - localSpriteBottom(mySprite);
    return aBottom;
}//spriteBottom

function spriteLeft(mySprite) {
    var aLeft = mySprite.position.x;
    if (mySprite.anchor.x != 0)
        aLeft = mySprite.position.x - localSpriteLeft(mySprite);
    return aLeft;
}//spriteLeft

function spriteRight(mySprite) {
    var aRight = mySprite.position.x + mySprite.width;
    if (mySprite.anchor.x != 0)
        aRight = mySprite.position.x + localSpriteRight(mySprite);
    return aRight;
}//spriteRight

function keepSpriteOnScreen(sprite) {
    if (spriteTop(sprite) > game.height)
        sprite.position.y = game.height - localSpriteTop(sprite);
    if (spriteBottom(sprite) < 0)
        sprite.position.y = 0 + localSpriteBottom(sprite);
    if (spriteLeft(sprite) < 0)
        sprite.position.x = 0 + localSpriteLeft(sprite);
    if (spriteRight(sprite) > game.width)
        sprite.position.x = game.width - localSpriteRight(sprite);
}//keepSpriteOnScreen
/*
function testAABBCollision(a, b)
{
    //if (aLeft < bRight && aRight > bLeft && aBottom < bTop && aTop > bBottom)
    if (spriteLeft(a) < spriteRight(b) && spriteRight(a) > spriteLeft(b) && spriteBottom(a) < spriteTop(b) && spriteTop(a) > spriteBottom(b) )
        return true;
    return false;
}//testAABBCollision*/
function testAABBCollision(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}//testAABBCollision

function addCheckMarkTo(mySprite) {
    var checkmark = this.game.add.sprite(0, 0, 'checkmark');
    checkmark.anchor.setTo(0.35, 0.65);
    checkmark.scale.setTo(0.7, 0.7);
    mySprite.addChild(checkmark);
}//addCheckMarkTo

function flyInText(myText) {
    myText.scale.setTo(4, 4);
    game.add.tween(myText.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None, true);
}//flyInText

function setTimer() {
    started = true;
    timer = game.time.events.add(Phaser.Timer.SECOND * trialDuration, function () {
        timeUp = true;
    }, this);
    timerDisplay = this.game.add.graphics(0, 0);
}//setTimer

function stopTimer() {
    game.time.events.remove(timer);
}//stopTimer

function setUpHearts() {
    hearts = new Array();
    deadHearts = new Array();
    for (var i = 0; i < 3; i++) {
        var heart = game.add.image(10 + i * 10, 10, 'heart');
        heart.position.x += heart.width * i + heart.width / 2;
        heart.position.y += heart.height / 2;
        heart.anchor.setTo(0.5, 0.5);
        hearts.push(heart);
    }
    //hearts.push(game.add.image(10, 10, 'heart'));
    //hearts.push(game.add.image(130, 10, 'heart'));
    //hearts.push(game.add.image(250, 10, 'heart'));
}//setUpHearts

function destroyHeart() {
    var heart = deadHearts.shift();
    heart.destroy();
}//destroyHeart

function updateHearts() {
    if (hearts.length > lives) {
        var heart = hearts.pop();
        deadHearts.push(heart);
        //heart.destroy();
        var heartTween = game.add.tween(heart.scale).to({ x: 0, y: 0 }, 100, Phaser.Easing.Linear.None, true);
        heartTween.onComplete.add(destroyHeart, this);
        //heartTween.onCompleteCallback(heart.destroy);
    }
}//updateHearts

function setImmunity() {
    if (lives > 0) {
        immune = true;
        immunityTimer = 0;
    }
}//setImmunity

function checkImmunity(sprite) {
    if (immunityTimer >= immunityDuration) {
        immune = false;
        if (typeof sprite != 'undefined' && sprite != null)
            sprite.alpha = 1;
    }
    if (immune == true) {
        immunityTimer++;
    }
    if (typeof sprite != 'undefined' && sprite != null) {
        if (immune) {
            if (immunityTimer < 15)
                sprite.alpha = 0.5;
            else if (immunityTimer < 30)
                sprite.alpha = 1;
            else if (immunityTimer < 45)
                sprite.alpha = 0.5;
            else if (immunityTimer < 60)
                sprite.alpha = 1;
            else //if (immunityTimer < 60)
                sprite.alpha = 0.5;
        }
    }

}//checkImmunity

//All trials should call this method in update. This is a global update function.
//updates timer display
function globalUpdate() {
    if (!trialOver) {
        debug();

        if (timer != null && started) {
            var percent = timer.timer.duration / (Phaser.Timer.SECOND * trialDuration);

            var red = 0;
            var green = 255;

            if (percent * 100 <= 75) {
                var rPercent = ((percent * 100) - 50) / 25;
                if (rPercent < 0) {
                    rPercent = 0;
                }

                red = 255 * (1 - rPercent);
            }

            if (percent * 100 <= 50) {
                var gPercent = ((percent * 100) - 25) / 25;
                if (gPercent < 0) {
                    gPercent = 0;
                }

                green = 255 * gPercent;
            }

            timerDisplay.clear();

            timerDisplay.beginFill(Phaser.Color.getColor(red, green, 0));
            timerDisplay.drawRect(0, this.game.world.height - 25, this.game.world.width * percent, 25);
            timerDisplay.alpha = 0.75;
        }
    }
}


function debug() {
    if (skipKey.isDown) {
        win();
    }
}


function addPlanetLabels() {
    var utilityBeltLabel = this.game.add.image(this.game.world.centerX, 0, 'utility_belt_label');
    utilityBeltLabel.anchor.setTo(0.5, 0);

    var label = this.game.add.sprite(250, 230, 'planet_label_storm');
    label.anchor.setTo(0.5, 0.5);
    label = this.game.add.sprite(this.game.world.centerX, 350, 'planet_label_gas');
    label.anchor.setTo(0.5, 0.5);
    label = this.game.add.sprite(this.game.width - 250, 230, 'planet_label_electric');
    label.anchor.setTo(0.5, 0.5);
}//addPlanetLabels


/**
*  This function is from the trivia game
 * Plays a sound file.
 * @param {string} file Name of the sound file.
 */
function playSound(file) {
 
    audio.src = file;
    audio.load();
    audio.play();
}

function resetIdleTimer() {
    idleTime = 0;
}


//EMITTER
/*function ElectricityParticle(game, x, y)
{
    window.Phaser.Particle.call(this, game, x, y, game.cache.getRenderTexture('electricityParticle'));
}

ElectricityParticle.prototype = Object.create(window.Phaser.Particle.prototype);
ElectricityParticle.prototype.constructor = ElectricityParticle;

function makeElectricEmitter(emitter)
{
    var particle = game.add.sprite(400, 800, 'particle_electric');
    //particle.animations.add('particleAnim');
    //particle.animations.play('particleAnim', 30, true);
    //game.sa.gameLayers[layer.slot].add(particle);
    game.cache.addRenderTexture('electricityParticle', particle);

    emitter = game.add.emitter(0, 0, 100);//x y maxParticles
    //emitter.width = 800;
    emitter.particleClass = ElectricityParticle;
    //emitter.gravity = 200;
    emitter.makeParticles();
    emitter.forEach(function (singleParticle)
    {
        singleParticle.animations.add('particleAnim');
        singleParticle.animations.play('particleAnim', 30, true);
    });
}//makeElectricEmitter*/

//END OF GLOBAL FUNCTIONS/VARIABLES


