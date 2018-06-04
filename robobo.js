var Remote = require('./remote-library/remotelib');


class Robobo {
    constructor(ip) {
        this.connectionState = 0;
        this.rem = new Remote(ip.trim(),'');
        this.rem.registerCallback('onConnectionChanges', arg => {
            console.log('Connection State: '+arg);
            this.connectionState = arg})

        this.unlockFunction = () => {  };

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

    async connect() {
        this.rem.connect();
        while (this.rem.connectionState == Remote.ConnectionStateEnum.CONNECTING) {
             await this.update();


        }
        console.log('Post Connect');

        
    }

    async disconnect() {
        this.rem.closeConnection(false);
        while (this.rem.connectionState != Remote.ConnectionStateEnum.DISCONNECTED) {
             await this.update();

        }
        console.log('Post Disconnect');
    }

    stopMotors() {
        this.rem.moveWheelsSeparated(0,0,0);

    }

    async moveWheelsByTime(speedR, speedL, time) {
        console.log('MOVEWHEELS')
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
        

    }

    async moveWheelsByDegrees(wheel, degrees, speed) {
        let unlock = false
        this.rem.moveWheelsByDegree(wheel,degrees,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;

    }

    async movePanTo(position, speed, blocking) {
        if ((blocking == undefined)||(blocking == false)){
            this.rem.movePan(position,speed);

        }
        else {
            let unlock = false
            this.rem.movePanWait(position,speed,()=>(unlock = true))
            while (!unlock){
                await this.update()
            }
            unlock=false;
        }


    }

    async moveTiltTo(position, speed, blocking) {
        if ((blocking == undefined)||(blocking == false)){

            this.rem.moveTilt(position,blocking)

        }else {
            let unlock = false
            this.rem.moveTiltWait(position,speed,()=>(unlock = true))
            while (!unlock){
               await this.update()
            }
            unlock=false;
        }

    }

    setLedColorTo(led, color) {
        this.rem.setLedColor(`${led}`,color);
    }

    setEmotionTo(emotion) {
        this.rem.changeEmotion(emotion);
    }

    async sayText(text) {
        let unlock = false
        this.rem.talk(text,()=>(unlock = true));
        while (!unlock){
            await this.update()
        }
        unlock=false;
    }

    playSound(sound) {
        this.rem.playEmotionSound(sound);
        
    }

    log(text) {
        console.log(text);
    }

    async playNote(note, time) {
        this.rem.playNote(note,time);
        await this.pause(time);
    }

    readWheelPosition(wheel) {
        
        return this.rem.getWheel(wheel,'position');
       
    }

    readWheelSpeed(wheel) {
        return this.rem.getWheel(wheel,'speed');

    }

    readPanPosition() {
        return this.rem.getPan();
    }

    readTiltPosition() {
        return this.rem.getTilt();
    }

    readIRSensor(sensor) {
        return this.rem.getIRValue(sensor);
    }

    readAllIRSensor() {
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
        
    }

    readBatteryLevel(device) {
        if (device == 'base'){
            return this.rem.checkBatt();
        }else{
            return this.rem.checkOboBatt();
        }
    }

    readFaceSensor() {
        return {
            distance : this.rem.getFaceDist(),
            x : this.rem.getFaceCoord('x'),
            y : this.rem.getFaceCoord('y')
        }
    }

    resetFaceSensor() {
        this.rem.resetFaceSensor();
    }

    readClapCounter() {
        return this.rem.getClaps();
    }

    resetClapCounter() {
        this.rem.resetClapSensor();
    }

    readLastNote() {
        return {
            note : this.rem.getLastNote(),
            duration : this.rem.getLastNoteDuration()
        }
    }

    resetLastNote() {
        this.rem.resetNoteSensor();
    }

    readColorBlob(color) {
        return {
            
            x: this.rem.getBlobCoord(color,'x'),
            y: this.rem.getBlobCoord(color,'y'),
            area: this.rem.getBlobSize(color),
        }

    }

    readAllColorBlobs() {
        return{
            red : this.readColorBlob('red'),
            green : this.readColorBlob('green'),
            blue : this.readColorBlob('blue'),
            custom : this.readColorBlob('custom'), 
        }
    }

    resetColorBlobs() {
        this.rem.resetBlobSensor();
    }

    setColorBlobDetectionActive(red, green, blue, custom) {
        this.rem.configureBlobDetection(red,green,blue,custom);
    }

    readFlingSensor() {
        return this.rem.checkFlingAngle();
    }

    resetFlingSensor() {
        this.rem.resetFlingSensor();
    }

    readTapSensor() {
        return {
            x: this.rem.getTapCoord('x'),
            y: this.rem.getTapCoord('y'),
            zone: this.rem.getTapZone()
        }
    }

    resetTapSensor() {
        this.rem.resetTapSensor();
    }

    readOrientationSensor() {
        return {
            x: this.rem.getOrientation('x'),
            y: this.rem.getOrientation('y'),
            z: this.rem.getOrientation('z')
        }
    }

    readAccelerationSensor() {
        return {
            x: this.rem.getAcceleration('x'),
            y: this.rem.getAcceleration('y'),
            z: this.rem.getAcceleration('z')
        }
    }

    readBrightnessSensor() {
        return this.rem.getLightBrightness();
    }

    async update() {
        return this.pause(0.01);
        
    }

    async pause(time) {
        return new Promise(r => setTimeout(r, time));

    }

    whenANoteIsDetected(fun) {
        this.rem.registerCallback("onNewNote",fun);
    }

    whenANewFaceIsDetected(fun) {
        this.rem.registerCallback("onNewFace",fun);
    }

    whenAFaceIsLost(fun) {
        this.rem.registerCallback("onLostFace",fun);
    }

    whenANewColorBlobIsDetected(fun) {
        this.rem.registerCallback("onNewBlob",fun);
    }

    whenATapIsDetected(fun) {
        this.rem.registerCallback("onNewTap",fun);
    }

    whenAFlingIsDetected(fun) {
        this.rem.registerCallback("onNewFling",fun);
    }
}

module.exports = Robobo;
