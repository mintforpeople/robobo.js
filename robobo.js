var Remote = require('./remote-library/remotelib');

function Robobo(ip){
    this.connectionState = 0;
    this.rem = new Remote(ip.trim(),'');
    this.rem.registerCallback('onConnectionChanges', function(arg){
        console.log('Connection State: '+arg);
        this.connectionState = arg}.bind(this))

    this.unlock = false;
    this.unlockFunction = function(){  }.bind(this);

    this.rem.registerCallback('talkCallback',this.unlockFunction);
    this.rem.registerCallback('onNewBlob',this.unlockFunction);
    this.rem.registerCallback('onLowBatt',this.unlockFunction);
    this.rem.registerCallback('onLowOboBatt',this.unlockFunction);
    this.rem.registerCallback('onLostFace',this.unlockFunction);
    this.rem.registerCallback('onNewFace',this.unlockFunction);
    this.rem.registerCallback('onFall',this.unlockFunction);
    this.rem.registerCallback('onGap',this.unlockFunction);
    this.rem.registerCallback('onNewTap',this.unlockFunction);
    this.rem.registerCallback('onError',this.unlockFunction);
    this.rem.registerCallback('onPhrase',this.unlockFunction);
    this.rem.registerCallback('onNewNote',this.unlockFunction);



}

Robobo.prototype = {

    connect : async function(){
        this.rem.connect();
        while (this.rem.connectionState == Remote.ConnectionStateEnum.CONNECTING) {
            await this.update();


        }
        console.log('Post Connect');

        
    },

    disconnect : async function(){
        this.rem.closeConnection(false);
        while (this.rem.connectionState != Remote.ConnectionStateEnum.DISCONNECTED) {
            await this.update();

        }
        console.log('Post Disconnect');
    },

    stopMotors: function(){
        this.rem.moveWheelsSeparated(0,0,0);

    },
    moveWheelsByTime : async function(speedR, speedL, time){
        let unlock = false
        if (time == undefined){
            this.rem.moveWheelsSeparated(speedR, speedL, 2147483647);
        }else{
            
            this.rem.moveWheelsSeparatedWait(speedR, speedL, time,()=>(unlock = true));
            while (!unlock){
                await this.update()
            }

            unlock=false;
        }
        

    },
    
    moveWheelsByDegrees : async function(wheel,degrees,speed){
        let unlock = false
        this.rem.moveWheelsByDegree(wheel,degrees,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;

    },

    movePanTo : async function(position,speed){
        let unlock = false
        this.rem.movePanWait(position,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;

    },
    sayText : async function(text){
        let unlock = false
        this.rem.talk(text,()=>(unlock = true));
        while (!unlock){
            await this.update()
        }
        console.log('desbloqueo')
        unlock=false;
    },

    moveTiltTo : async function(position,speed){
        let unlock = false
        this.rem.moveTiltWait(position,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;

    },

    setLedColorTo : function(led,color){
        this.rem.setLedColor(led+'',color);
    },
    
    setEmotionTo : function(emotion){
        this.rem.changeEmotion(emotion);
    },



    playSound :  function(sound){
        this.rem.playEmotionSound(sound);
        
    },

    playNote : async function(note, time){
        this.rem.playNote(note,time);
        await this.pause(time);
    },

    readWheelPosition: function(wheel){
        
        return this.rem.getWheel(wheel,'position');
       
    },

    readWheelSpeed: function(wheel){
        return this.rem.getWheel(wheel,'speed');

    },

    readPanPosition : function(){
        return this.rem.getPan();
    },

    readTiltPosition : function(){
        return this.rem.getTilt();
    },

    readIRSensor : function(sensor){
        return this.rem.getIRValue(sensor);
    },
    
    readAllIRSensor : function(){
        return {
            BackR: this.rem.getIRValue('Back-R'),
            BackC: this.rem.getIRValue('Back-C'),
            FrontRR: this.rem.getIRValue('Front-RR'),
            FrontR: this.rem.getIRValue('Front-R'),
            FrontC: this.rem.getIRValue('Front-C'), 
            FrontL: this.rem.getIRValue('Front-L'),
            FrontLL: this.rem.getIRValue('Front-LL'),
            BackL: this.rem.getIRValue('Back-L'),

            
        }
        
    },

    readBatteryLevel : function(device){
        if (device == 'base'){
            return this.rem.checkBatt();
        }else{
            return this.rem.checkOboBatt();
        }
    },

    readFaceSensor : function(){
        return {
            distance : this.rem.getFaceDist(),
            x : this.rem.getFaceCoord('x'),
            y : this.rem.getFaceCoord('y')
        }
    },

    resetFaceSensor : function (){
        this.rem.resetFaceSensor();
    },

    readClapCounter : function () {
        return this.rem.getClaps();
    },

    resetClapCounter : function() {
        this.rem.resetClapSensor();
    },

    readLastNote : function(){
        return {
            note : this.rem.getLastNote(),
            duration : this.rem.getLastNoteDuration()
        }
    },

    resetLastNote : function(){
        this.rem.resetNoteSensor();
    },

    readColorBlob : function(color){
        return {
            
            x: this.rem.getBlobCoord(color,'x'),
            y: this.rem.getBlobCoord(color,'y'),
            area: this.rem.getBlobSize(color),
        }

    },

    readAllColorBlobs : function(){
        return{
            red : this.readColorBlob('red'),
            green : this.readColorBlob('green'),
            blue : this.readColorBlob('blue'),
            custom : this.readColorBlob('custom'), 
        }
    },

    resetColorBlobs : function(){
        this.rem.resetBlobSensor();
    },

    setColorBlobDetectionActive : function(red, green, blue, custom){
        this.rem.configureBlobDetection(red,green,blue,custom);
    },

    readFlingSensor : function(){
        return this.rem.checkFlingAngle();
    },

    resetFlingSensor : function(){
        this.rem.resetFlingSensor();
    },

    readTapSensor : function(){
        return {
            x: this.rem.getTapCoord('x'),
            y: this.rem.getTapCoord('y'),
            zone: this.rem.getTapZone()
        }
    },

    resetTapSensor : function(){
        this.rem.resetTapSensor();
    },

    readOrientationSensor : function(){
        return {
            x: this.rem.getOrientation('x'),
            y: this.rem.getOrientation('y'),
            z: this.rem.getOrientation('z')
        }
    },
    
    readAccelerationSensor : function(){
        return {
            x: this.rem.getAcceleration('x'),
            y: this.rem.getAcceleration('y'),
            z: this.rem.getAcceleration('z')
        }
    },

    readBrightnessSensor : function(){
        return this.rem.getLightBrightness();
    },

    update : async function (){
        let wait = new Promise(function(resolve,reject){
        setTimeout(() => {
        resolve(1)},10);
        });
        let result = await wait;
    },



    pause : async function (time){
        let wait = new Promise(function(resolve,reject){
        setTimeout(() => {
        resolve(1)},time*1000);
        });
        let result = await wait;
    },

    whenANoteIsDetected : function(fun){
        this.rem.registerCallback("onNewNote",fun);
    },
    whenANewFaceIsDetected : function(fun){
        this.rem.registerCallback("onNewFace",fun);
    },
    whenAFaceIsLost : function(fun){
        this.rem.registerCallback("onLostFace",fun);
    },

    whenANewColorBlobIsDetected : function(fun){
        this.rem.registerCallback("onNewBlob",fun);
    },
    whenATapIsDetected : function(fun){
        this.rem.registerCallback("onNewTap",fun);
    },

    whenAFlingIsDetected : function(fun){
        this.rem.registerCallback("onNewFling",fun);
    },

}
module.exports = Robobo;