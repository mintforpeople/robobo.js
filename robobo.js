/*******************************************************************************
 * Copyright 2018 Mytech Ingenieria Aplicada <http://www.mytechia.com>
 * Copyright 2018 Luis Llamas <luis.llamas@mytechia.com>
 * Copyright 2018 Gervasio Varela <gervasio.varela@mytechia.com>
 * 
 * <p>
 * This file is part of Robobo.js, the Robobo Javascript Programming Library.
 * <p>
 * Robobo.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * <p>
 * Robobo.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * <p>
 * You should have received a copy of the GNU Lesser General Public License
 * along with Robobo.js.  If not, see <http://www.gnu.org/licenses/lgpl.html>.
 ******************************************************************************/

var Remote = require('./remote-library/remotelib');


/** 
 * Robobo.js is the library used to create programs for the Robobo educational 
 * robot (http://www.theroboboproject.com) in the Javascript language.
 * 
 * For more information and documentation: https://github.com/mytechia/robobo.js
 * 
 */
class Robobo {

    /** Creates a new Robobo.js library instance.
     *  
     * @constructor
     * @param {string} ip The IP address of the Robobo robot
     */
    constructor(ip) {
        this.connectionState = 0;
        this.ip = ip.trim();
        this.rem = new Remote(this.ip,'');
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


    /** Establishes a remote connection with the Robobo indicated by
     * the IP address associated to this instance.    
     */
    async connect() {
        this.rem.connect();
        while (this.rem.connectionState == Remote.ConnectionStateEnum.CONNECTING) {
             await this.update();
        }

        console.log('ROBOBO: Connected to robot at '+this.ip);
    }

    /** Disconnects the library from the Robobo robot
     * 
     */
    async disconnect() {
        this.rem.closeConnection(false);
        while (this.rem.connectionState != Remote.ConnectionStateEnum.DISCONNECTED) {
             await this.update();

        }
        console.log('ROBOBO: Disconnected from '+this.ip);
    }


    /** Stops the movement of the wheels
     */
    stopMotors() {
        this.rem.moveWheelsSeparated(0,0,0);
    }

    /** Starts moving the wheels of the robot at the specified speed.
     * 
     * @param {integer} speedR Speed factor for the right wheel [-100 - 100]
     * @param {integer} speedL Speed factor for the right wheel [-100 - 100]
    */
    moveWheels(speedR, speedL) {
        this.rem.moveWheelsSeparated(speedR, speedL, 2147483647);
    }

    /** Moves the wheels of the robot at the specified speeds during the specified time.
     * This functions is blocking, it doesn't returns the control until the movement
     * is finished.
     * 
     * @param {integer} speedR Speed factor for the right wheel [-100..100]
     * @param {integer} speedL Speed factor for the right wheel [-100..100]
     * @param {integer} time Time duration of the movement in seconds
     */
    async moveWheelsByTimeBLK(speedR, speedL, time) {
        let unlock = false
        this.rem.moveWheelsSeparatedWait(speedR, speedL, time,()=>(unlock = true));
        while (!unlock){
                await this.update()
        }
        unlock = false;
    }

    /** Moves the wheels of the robot by some degress at the specified speed.
     * 
     * @param {string} wheel - Wheels to move [left | right | both]
     * @param {integer} degrees - Degress to move the wheel
     * @param {integer} speed  - Speed factor [-100..100]
     */
    async moveWheelsByDegreesBLK(wheel, degrees, speed) {
        let unlock = false
        this.rem.moveWheelsByDegree(wheel,degrees,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;
    }

    /** Moves the PAN of the base to the specified position at the specified speed
     * 
     * @param {integer} position Position in degress of the PAN [-160..160]
     * @param {integer} speed  Speed factor [-100..100]
     */
    movePanTo(position, speed) {
        this.rem.movePan(position,speed);
    }

    /** Moves the PAN of the base to the specified position at the specified speed and
     * waits until the movement has finished.
     * 
     * @param {integer} position Position in degress of the TILT [-160..160]
     * @param {integer} speed  Speed factor [-100..100]
     */
    async movePanToBLK(position, speed) {
        let unlock = false
        this.rem.movePanWait(position,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;
    }

    /** Moves the TILT of the base to the specified position at the specified speed
     * 
     * @param {integer} position - Position in degress of the PAN [5..105]
     * @param {integer} speed  - Speed factor [-100..100]
     */
    moveTiltTo(position, speed) {
        this.rem.moveTilt(position, speed)
    }

    /** Moves the TILT of the base to the specified position at the specified speed and
     * waits until the movement has finished.
     * 
     * @param {integer} position Position in degress of the TILT [5..105]
     * @param {integer} speed  Speed factor [-100..100]
     */
    async moveTiltToBLK(position, speed, blocking) {
        let unlock = false
        this.rem.moveTiltWait(position,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;
    }


    /** Changes the color of a LED of the base
     * 
     * @param {string} led The ID of the led ['Front-C','Front-L','Front-LL','Front-R','Front-RR','Back-L','Back-R','all']
     * @param {string} color The new color ['off','white','red','blue','cyan','magenta','yellow','green','orange']
     */
    setLedColorTo(led, color) {
        this.rem.setLedColor(`${led}`,color);
    }

    /** Changes the emotion of showed by the face of Robobo
     *  
     * @param {string} emotion One of ['happy','laughing','surprised','sad','angry','normal','sleeping','tired','afraid']
     */
    setEmotionTo(emotion) {
        this.rem.changeEmotion(emotion);        
    }

    /** Commands the robot say the specified text 
     * 
     * @param {string} text The text to say
     */
    sayText(text) {
        let unlock = false
        this.rem.talk(text,()=>(unlock = false));
    }

    /** Commands the robot say the specified text and waits until the 
     * robots finishes reading the text
     * 
     * @param {string} text The text to say
     */
    async sayTextBLK(text) {
        let unlock = false
        this.rem.talk(text,()=>(unlock = true));
        while (!unlock){
            await this.update()
        }
        unlock=false;
    }

    /** Commands the robot to play the specified emotion sound
     * 
     * @param {string} sound One of ['moan','purr',"angry","approve","disapprove","discomfort","doubtful","laugh","likes","mumble","ouch","thinking","various"]
     */
    playSound(sound) {
        this.rem.playEmotionSound(sound);    
    }

    /** Commands the robot to play a musical note
     *  
     * @param {integer} note Musical note index [48..72]. Anglo-Saxon notation is used and there are 25 possible notes with the following basic correspondence. Any integer between 48 and 72.
     * @param {integer} time Duration of the note in seconds (decimals can be used to used, like 0.2 or 0.5) 
     */
    playNote(note, time) {
        this.rem.playNote(note,time*1000); //the Robobo remote expects millis        
    }
    
    /** Commands the robot to play a musical note and wait until finishes playing it
     *  
     * @param {integer} note Musical note index [48..72]. Anglo-Saxon notation is used and there are 25 possible notes with the following basic correspondence. Any integer between 48 and 72.
     * @param {float} time Duration of the note in seconds (decimals can be used to used, like 0.2 or 0.5) 
     */
    async playNoteBLK(note, time) {
        this.rem.playNote(note,time*1000); //the Robobo remote expects millis
        await this.pause(time);
    }


    /** Returns the position of the wheel in degrees
     *  
     * @param {string} wheel - One of [left, right]
     * @returns the position of the wheel in degress
     */
    readWheelPosition(wheel) {
        return this.rem.getWheel(wheel,'position');
    }

    /** Returns the current speed of the wheel
     *  
     * @param {string} wheel One of [left, right]
     * @returns the current speed of the wheel in degress
     */
    readWheelSpeed(wheel) {
        return this.rem.getWheel(wheel,'speed');
    }

    /** Returns the current position of the PAN
     * 
     * @returns the current position of the pan
     */
    readPanPosition() {
        return this.rem.getPan();
    }

    /** Returns the current position of the TILT
     * 
     * @returns the current position of the TILT
     */
    readTiltPosition() {
        return this.rem.getTilt();
    }

    /** Returns the current value sensed by the specified IR
     *  
     * @param {string} sensor One of ['Front-C','Front-L','Front-LL','Front-R','Front-RR','Back-C','Back-L','Back-R'] 
     * @returns {integer} the current value of the IR
     */
    readIRSensor(sensor) {
        return this.rem.getIRValue(sensor);
    }

    /** Returns the values of all the IR sensors.
     * 
     * Example of use:
     * let irs = readAllIRSensor();
     * console.log(irs.BackR);
     * console.log(irs.FrontRR);
     * 
     * @returns {integer} The values of all the IR sensors of the base
     */
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

    /** Returns the battery level of the base or the smartphone
     *  
     * @param {string} device One of 'base' or 'smartphone'
     * @returns {integer} the battery level of the base or the smartphone
     */
    readBatteryLevel(device) {
        if (device == 'base'){
            return this.rem.checkBatt();
        }else{
            return this.rem.checkOboBatt();
        }
    }

    /** Returns the position and distance of the last face detected by the robot
     * 
     * Example of use:
     * let face = robobo.readFaceSensor();
     * console.log(face.distance); //the distance to the person
     * console.log(face.x); //the position of the face in X axis
     * console.log(fase.y); //the position of the face in Y axis
     * 
     * @returns the position and distance of the last face detected by the robot
     */
    readFaceSensor() {
        return {
            distance : this.rem.getFaceDist(),
            x : this.rem.getFaceCoord('x'),
            y : this.rem.getFaceCoord('y')
        }
    }

    /** Resets the face sensor.
     * After this function, and until a new face is detected, the face sensor
     * will return 0 as values for distance, x and y position.
     */
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

    /** Forces an update of the robot sensors.
     * This functiona must be call any time the robot sensors are used in a conditional loop.
     */
    async update() {
        return this.pause(0.01);
        
    }

    /** Pauses the program for the specified time (in seconds)
     * This functions requires 'await' to work properly
     * 
     * @param {float} time - Time in seconds (accepts decimals like 0.2)
     */
    async pause(time) {
        return new Promise(r => setTimeout(r, time*1000));
    }

    /** Writes the specified text in the Robobo log (console by default)
     * 
     * @param {string} text - The text to log
     */
    log(text) {
        console.log(text);
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
