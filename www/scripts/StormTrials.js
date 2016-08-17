//TRIAL 1 INSTRUCTIONS
Main.CollectBatteriesInstr = function (game) {
    Main.Instr.call(this);
}
Main.CollectBatteriesInstr.prototype = Object.create(Main.Instr.prototype);
//Main.CollectBatteriesInstr.prototype.create = Main.Instr.prototype.create.apply(this);
//Main.CollectBatteriesInstr.prototype.create = Main.Instr.prototype.create.call(this);
/*{
    value: function()
    {
        Main.Instr.prototype.create.apply(this);
    }
}*/
Main.CollectBatteriesInstr.prototype.changeText = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/to_prepare_for_your_power.mp3');// adding the sound function
    text.text = "To prepare for a power outage you should gather battery operated radios, flashlights and a supply of fresh batteries.";
}//changeText

//TRIAL 1 SCREEN/STATE
Main.CollectBatteries = function (game) {
    Main.Collect.call(this);
}

Main.CollectBatteries.prototype = Object.create(Main.Collect.prototype);

Main.CollectBatteries.prototype.setObjectsToGather = function () {
    collectionObjectsArray = ["battery1", "battery2", "battery3", "battery4", "battery5", "battery6"];
    wrongObjectsArray = ["paperclip", "penny", "lipstick"];//, "notBattery4"
}

Main.CollectBatteries.prototype.setGoalType = function () {
    goal = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cardboardbox');
    goal.anchor.setTo(0.5, 0.5);
}

Main.CollectBatteries.prototype.setText = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/gather_batteries.mp3');// adding the sound function
    setTrialTextString("Gather batteries before the power goes out!");
}//Main.CollectBatteries

Main.CollectBatteries.prototype.lose = function () {
  //  audio.pause(); // to pause the existing runnign game sounds
   // playSound('sounds/qucikle_drag_batteries.mp3');// adding the sound function
    hintText = "Quickly drag all the batteries into the center.";
    loseNeutral1();
}

//CANDLE KEEP AWAY
//TRIAL 4 INSTRUCTIONS
Main.CandleInstr = function (game) {
    Main.Instr.call(this);
}
Main.CandleInstr.prototype = Object.create(Main.Instr.prototype);
Main.CandleInstr.prototype.changeText = function () {
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/you_can_use_candles.mp3');// adding the sound function
    text.text = "You can use candles or storm lanterns during a power outage.\nHowever, you should keep them away from flammable materials to prevent a fire.";
}//changeText
//TRIAL 4 SCREEN/STATE
Main.Candle = function (game) {
    this.game = game;
};

Main.Candle.prototype = Object.create(Main.Avoider.prototype);

Main.Candle.prototype.setPlayer = function () {
    player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'candle');
    player.anchor.setTo(0.5, 0.5);

    playerHitBox = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, null);
    playerHitBox.anchor.setTo(1, 0.5);
    playerHitBox.width = 50;
    playerHitBox.height = 125;
    playerHitBox.alpha = 0.2;
}

Main.Candle.prototype.setObstacles = function ()
{
    var rand = this.game.rnd.integerInRange(1, 3);
    var girlString = "flammablegirl" + rand.toString();;
    obstaclesList = ['tnt', girlString, 'blanket', 'book'];
    obstacleSpeed = [4, 2, 4, 6];
}

Main.Candle.prototype.setEmitter = function ()
{
    usesEmitter = true;
    emitter = this.game.add.emitter(0, 0, 100);
    emitter.makeParticles('particle_fire');
    emitterPositionOffset.y = -50;
    emitterPositionOffset.x = -13;
    emitter.gravity = 200;
}

Main.Candle.prototype.setText = function () {
//
   audio.pause(); // to pause the existing runnign game sounds

   playSound('sounds/keep_the_candle.mp3');// adding the sound function
    setTrialTextString("Keep the candle away from the flammable materials!");
}

Main.Candle.prototype.lose = function ()
{
  //  audio.pause(); // to pause the existing runnign game sounds
  //  playSound('sounds/keep_candle_away.mp3');// adding the sound function
    hintText = "Drag the candle away from the moving objects until time runs out.";
    loseNeutral0();
}
//Main.Candle


//WATER CATCHER
//TRIAL 6 ISTRUCTIONS
Main.WaterCatcherInstr = function (game) {
    Main.Instr.call(this);
}
Main.WaterCatcherInstr.prototype = Object.create(Main.Instr.prototype);
Main.WaterCatcherInstr.prototype.changeText = function () {
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/if_you_believe_poweroutrage.mp3');// adding the sound function
    text.text = "If you believe a power outage is coming, you should fill spare containers with water.\nThis water can be used for cooking and/or cleaning.";
}//changeText

//TRIAL 6 SCREEN/STATE
Main.WaterCatcher = function (game) {
    Main.FallingObjects.call(this);
};

Main.WaterCatcher.prototype = Object.create(Main.FallingObjects.prototype);

Main.WaterCatcher.prototype.setObjects = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/collect_water.mp3');// adding the sound function
    applianceStringArray = ["waterdrop"];
    textString = "Collect water!";
    avoid = false;

    collector = this.game.add.sprite(this.game.world.centerX, 720, 'basin');
    collector.anchor.setTo(0.5, 1);
}//Main.WaterCatcher

Main.WaterCatcher.prototype.lose = function () {
  //  audio.pause(); // to pause the existing runnign game sounds
 //   playSound('drag_basin.mp3');// adding the sound function
    hintText = "Drag the basin side to side and catch the falling water drops until time runs out.";
    loseNeutral2();
}

//PANTRY STOCKER
//TRIAL 8 INSTRUCTIONS
Main.PantryStockerInstr = function (game) {
    Main.Instr.call(this);
}
Main.PantryStockerInstr.prototype = Object.create(Main.Instr.prototype);
Main.PantryStockerInstr.prototype.changeText = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/create_pantry.mp3');// adding the sound function
    text.text = "To prepare for a power outage, create a pantry of at least 3 days worth of bottled water and food that doesn't require refrigeration or cooking.";
}//changeText
//TRIAL 8 SCREEN/STATE
Main.PantryStocker = function (game) {
    Main.Collect.call(this);
}

Main.PantryStocker.prototype = Object.create(Main.Collect.prototype);

Main.PantryStocker.prototype.setObjectsToGather = function () {
    collectionObjectsArray = ["cereal", "can1", "can2", "canopener", "bottles"];//"glassbottle"
    wrongObjectsArray = ["small_milk", "steak", "falling_toaster"];//, "notBattery4"
}

Main.PantryStocker.prototype.setGoalType = function () {
    goal = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cardboardbox');//'pantry'
    goal.anchor.setTo(0.5, 0.5);
}

Main.PantryStocker.prototype.setText = function () {
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/stock_up.mp3');// adding the sound function
    setTrialTextString("Stock up!");//"Stock the pantry!"
}//Main.PantryStocker

Main.PantryStocker.prototype.lose = function () {
    hintText = "Drag all the objects related to non-preishable food to the center.";
    loseNeutral3();
}


//PHONE CHARGER
//TRIAL 9 INSTRUCTIONS
Main.PhoneChargerInstr = function (game) {
    Main.Instr.call(this);
}
Main.PhoneChargerInstr.prototype = Object.create(Main.Instr.prototype);
Main.PhoneChargerInstr.prototype.changeText = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/in_case_of_power_outrage.mp3');// adding the sound function
    text.text = "In case of a power outage, make sure you have access to a phone that can be used without power, such as a charged cellphone. Telepathy works better, but it seems you don't have that.";
}//changeText
//TRIAL 9 SCREEN/STATE
Main.PhoneCharger = function (game) {
    Main.DragToGoal.call(this);
};

Main.PhoneCharger.prototype = Object.create(Main.DragToGoal.prototype);

var phoneMovingUp = false;
var phoneSpeed = 3;
var wallSpeed = 2.5;
var wallMovingUp = true;
var buffer = 30;

var charger;
var phone;
var wall;

Main.PhoneCharger.prototype.setPlayer = function () {
    charger = this.game.add.sprite(900, this.game.world.centerY, 'charger');
    charger.anchor.setTo(0, 0.25);

    player = this.game.add.sprite(900, this.game.world.centerY, null);
    player.anchor.setTo(0, 0.5);
    player.height = 60;
    player.width = 100;
    player.alpha = 0.2;
}

Main.PhoneCharger.prototype.setGoal = function () {
    phone = this.game.add.sprite(this.game.world.centerX - 100, this.game.world.centerY, 'phone');
    phone.anchor.setTo(1, 0.5);

    goal = this.game.add.sprite(phone.position.x, phone.position.y, null);//change to null for invisible
    goal.anchor.setTo(0.5, 0.5);
    goal.width = 60;
    goal.height = 60;
    goal.alpha = 0.2;

    phone.bringToTop();
}

Main.PhoneCharger.prototype.setObstacles = function () {
    snapBack = true;

    wall = obstacles.create(this.game.world.centerX + 100, this.game.world.height, 'wall');
    wall.anchor.setTo(0.5, 0.5);
    wall.position.y -= wall.height / 2 + buffer;
    wall.bringToTop();

    //var wall2 = obstacles.create(this.game.world.centerX + 100, this.game.world.centerY - 150, 'wall');
    //wall2.anchor.setTo(0.5, 0.5);
}

Main.PhoneCharger.prototype.setText = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/charge_your_phone.mp3');// adding the sound function
    setTrialTextString("Charge your phone before the power goes out!");
}

Main.PhoneCharger.prototype.otherUpdate = function () {
    if (phoneMovingUp)
        phone.position.y -= phoneSpeed;
    else
        phone.position.y += phoneSpeed;
    if (phoneMovingUp == false && spriteTop(phone) >= this.game.height - buffer)
        phoneMovingUp = true;
    else if (phoneMovingUp && spriteBottom(phone) <= buffer)
        phoneMovingUp = false;

    if (wallMovingUp)
        wall.position.y -= wallSpeed;
    else
        wall.position.y += wallSpeed;
    if (wallMovingUp == false && spriteTop(wall) >= this.game.height - buffer)
        wallMovingUp = true;
    else if (wallMovingUp && spriteBottom(wall) <= buffer)
        wallMovingUp = false;

    charger.position.copyFrom(player.position);
    goal.position.copyFrom(phone.position);
}

Main.PhoneCharger.prototype.goalHit = function () {
    charger.position.copyFrom(phone.position);
    charger.position.x -= 20;
}

Main.PhoneCharger.prototype.lose = function () {
   // audio.pause(); // to pause the existing runnign game sounds
    hintText = "Drag the charger cord to the phone.";
    loseNeutral4();
}

//CLOSE REFRIGERATORS
//TRIAL 12 INSTRUCTIONS
Main.CloseRefrigeratorsInstr = function (game) {
    Main.Instr.call(this);
}
Main.CloseRefrigeratorsInstr.prototype = Object.create(Main.Instr.prototype);
Main.CloseRefrigeratorsInstr.prototype.changeText = function () {
    audio.pause(); // to pause the existing runnign game sounds

    playSound('sounds/food_from_spoiling.mp3');// adding the sound function
    text.text = "To help prevent food from spoiling during a power outage, keep refrigerators and freezers closed.  This also keeps mutant storm beasts from stealing your leftovers.";
}//changeText
//TRIAL 12 SCREEN/STATE
Main.CloseRefrigerators = function (game) {
    Main.ClickAll.call(this);
};

Main.CloseRefrigerators.prototype = Object.create(Main.ClickAll.prototype);

Main.CloseRefrigerators.prototype.setAppliances = function () {
    appliancesOnList = ['fridge1Open', 'fridge2Open', 'fridge4Open', 'fridge3Open'];
    appliancesOffList = ['fridge1Closed', 'fridge2Closed', 'fridge4Closed', 'fridge3Closed'];
}

Main.CloseRefrigerators.prototype.setText = function () {
    audio.pause(); // to pause the existing runnign game sounds
    playSound('sounds/powersout_fridge.mp3');// adding the sound function
    setTrialTextString("The power's out, close all the refrigerators and freezers!");
}//Main.CloseRefrigerators

Main.CloseRefrigerators.prototype.lose = function () {
    hintText = "Tap on all the open refrigerators and freezers to close them.";
    loseNeutral5();
}

//TURN OFF APPLIANCES
//TRIAL 13 INSTRUCTIONS
Main.TurnOffAppliancesInstr = function (game) {
    Main.Instr.call(this);
}
Main.TurnOffAppliancesInstr.prototype = Object.create(Main.Instr.prototype);
Main.TurnOffAppliancesInstr.prototype.changeText = function () {
  //  audio.pause();
    playSound('sounds/during_power.mp3');// adding the sound function
    text.text = "During a power outage, it is wise to unplug all major appliances to prevent damage from an electrical surge when the power comes back on.";
}//changeText
//TRIAL 13 SCREEN/STATE
Main.TurnOffAppliances = function (game) {
    Main.ClickAll.call(this);
};

Main.TurnOffAppliances.prototype = Object.create(Main.ClickAll.prototype);

Main.TurnOffAppliances.prototype.setAppliances = function () {
    appliancesOnList = ['lampOn', 'acOn', 'tvOn', 'computerOn', 'blenderOn'];
    appliancesOffList = ['lampOff', 'acOff', 'tvOff', 'computerOff', 'blenderOff'];
}

Main.TurnOffAppliances.prototype.setText = function () {
    audio.pause();
    playSound('sounds/powersout.mp3');// adding the sound function
    setTrialTextString("The power's out, turn off all major appliances!");
}

Main.TurnOffAppliances.prototype.lose = function ()
{
    hintText = "Tap on all the electrical devices to turn them off.";
    loseNeutral6();
}//Main.TurnOffAppliances
