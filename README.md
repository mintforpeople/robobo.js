# Robobo.js

Robobo.js is the library used to create programs for the Robobo educational robot (http://www.theroboboproject.com) in the Javascript language.

Currently only remote programming and command is supported (programs run in a computer), but native execution in the robot is planned for the near future. Remote programming is usefull for learning, testing and debugging the programs. When native support is supported, after testing the program it will be possible to upload it to the robot for autonomous excution.

## Installation

To use this library on your project, clone or download this repositoy and put the robobo.js file and the remote-library in your project folder. Or download our [template project from releases](https://github.com/mytechia/robobo.js/releases/tag/project-template-v0.9.1).

The library runs on the Node.js runtime, and it must be installed before using the library, which also depends on the Websocket library, that must be installed via the node package manager using the command `npm install ws`.

We recommend Visual Studio Code as the developing environment as it has autocomplete for the language and allows the debug of the code.

## Basic usage

To use the library within your code you have first to import it using require and then create a instance of the Robobo class:

```javascript
    // This loads the library
    var Robobo = require('./robobo.js');

    // This creates a instance of the Robobo class with the indicated ip address
    var robobo = new Robobo('192.168.0.253');
```

After the library is instantiated, we can connect to the robot via the `connect()` method of the class

``` javascript
    // Connect to the robobo base
    await robobo.connect();
```

Note that the word `await` is used before the call to the function, this is because the connect function is a asyncronous one, await pauses the execution until the the connection is stablished, then resume the execution of the rest of the lines. `await` is used in more functions and its usage will be explained further in this document. 
To allow the usage of the await keyword, the code must be inside of an async funtion, so the code we have until this point would be like this:

``` javascript
async function main(){

    // This loads the library
    var Robobo = require('./robobo.js');
    // This creates a instance of the Robobo class with the indicated ip address
    var robobo = new Robobo('192.168.0.253');

    // Connect to the robobo base
    await robobo.connect();
}
main()
```

When the robot is connected we can start to execute command on it.
There are 5 types of methods in the library, connection functions, like the ones that we talked before, commands to use the actuators of the robot, such as the wheels or the pan/tilt, methods to recover the status of the sensors, reset functions to clean the sensor values and callback setters to react to events in real time.

### Conection Methods

The connection methods are used to manage the connection with the robot:

``` javascript
    /** Establishes a remote connection with the Robobo indicated by
     * the IP address associated to this instance. */
    async connect() 

    /** Disconnects the library from the Robobo robot  */
    async disconnect() 
```

### Actuator methods

The functions for controlling the effectors on the robot are the following:

``` javascript

    /** Stops the movement of the wheels
     */
    stopMotors()

    /** Starts moving the wheels of the robot at the specified speed.*/
    moveWheels(speedR, speedL)

    /** Moves the wheels of the robot at the specified speeds during the specified time.*/
    async moveWheelsByTimeBLK(speedR, speedL, time)

    /** Moves the wheels of the robot by some degress at the specified speed.
     */
    async moveWheelsByDegreesBLK(wheel, degrees, speed)

    /** Moves the PAN of the base to the specified position at the specified speed*/
    movePanTo(position, speed) 
    /** Moves the PAN of the base to the specified position at the specified speed and
     * waits until the movement has finished. */
    async movePanToBLK(position, speed) 

    /** Moves the TILT of the base to the specified position at the specified speed */
    moveTiltTo(position, speed) 

    /** Moves the TILT of the base to the specified position at the specified speed and
     * waits until the movement has finished.*/
    async moveTiltToBLK(position, speed, blocking) 


    /** Changes the color of a LED of the base*/
    setLedColorTo(led, color) 

    /** Changes the emotion of showed by the face of Robobo */
    setEmotionTo(emotion) 

    /** Commands the robot say the specified text */
     sayText(text) 

    /** Commands the robot say the specified text and waits until the 
     * robots finishes reading the text*/
    async sayTextBLK(text)

    /** Commands the robot to play the specified emotion sound */
    playSound(sound)

    /** Commands the robot to play a musical note */
    playNote(note, time) 
    
    /** Commands the robot to play a musical note and wait until finishes playing it */
    async playNoteBLK(note, time)

```

The functions that end on BLK are blocking functions, they stop the execution of the program until the action is completed, to work correctly they must be called with `await`.

Next we will see a simple program example:
In this example the robot will move The pan and tilt at the same time, and move forward, wait until the forward movement is completed, say "Hello world" wait until the speech is completed, and move back.

``` javascript
async function main(){

    // This loads the library
    var Robobo = require('./robobo.js');
    // This creates a instance of the Robobo class with the indicated ip address
    var robobo = new Robobo('192.168.0.253');

    // Connect to the robobo base
    await robobo.connect();

    // Move pan and tilt and wheels and wait for the weels to complete
    robobo.movePanToBLK(100, 20);
    robobo.moveTiltToBLK(110, 20);
    await robobo.moveWheelsByTimeBLK(40, 40, 3);

    // Say text and wait to finish
    await robobo.sayText("Hello world");

    // Move robot without waiting to complete
    robobo.moveWheelsByTime(-40, -40, 3);
}
main()
    


```
### Sensor methods

The sensor methods are used to fretrieve the information from the different sensors of the robobo platform.

``` javascript

    /** Returns the position of the wheel in degrees  */
    readWheelPosition(wheel)

    /** Returns the current speed of the wheel  */
    readWheelSpeed(wheel)

    /** Returns the current position of the PAN */
    readPanPosition()

    /** Returns the current position of the TILT  */
    readTiltPosition()

    /** Returns the current value sensed by the specified IR*/
    readIRSensor(sensor)

    /** Returns the values of all the IR sensors.
     * 
     * Example of use:
     * let irs = readAllIRSensor();
     * console.log(irs.BackR);
     * console.log(irs.FrontRR);
     */
    readAllIRSensor() 

    /** Returns the battery level of the base or the smartphone  */
    readBatteryLevel(device) 

    /** Returns the position and distance of the last face detected by the robot
     * 
     * Example of use:
     * let face = robobo.readFaceSensor();
     * console.log(face.distance); //the distance to the person
     * console.log(face.x); //the position of the face in X axis
     * console.log(fase.y); //the position of the face in Y axis
     */
    readFaceSensor()

    /** Returns the number of claps registered since the last reset  */
    readClapCounter() 

    /** Returns the last note detected by the note sensor */
    readLastNote() 

    /** Reads the last detected blob of color of the indicated color  */
    readColorBlob(color)

    /** Reads all the color blob data   */
    readAllColorBlobs()

    /** Returns the last note detected by the note sensor  */
    readLastNote()

```
All the sensor methods are synchonous and don't need to be called with the `await` keyword.
If you need to call this functions on a loop you must call either the `robobo.update()` or `robobo.pause()` methods at least once per iteration. 
The following example shows the values of all sensors in real time:

```javascript

async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.71');

    await robobo.connect();

    await robobo.pause(1);
    while(true){
        await robobo.update();
        robobo.print("SENSOR STATUS:")
        robobo.print("IR: "+JSON.stringify(robobo.readAllIRSensor()));
        robobo.print("Blob: "+JSON.stringify(robobo.readAllColorBlobs()));
        robobo.print("Face: "+JSON.stringify(robobo.readFaceSensor()));
        robobo.print("Acceleration: "+JSON.stringify(robobo.readAccelerationSensor()));
        robobo.print("Orientation: "+JSON.stringify(robobo.readOrientationSensor()));
        robobo.print("Claps: "+JSON.stringify(robobo.readClapCounter()));
        robobo.print("Fling: "+JSON.stringify(robobo.readFlingSensor()));
        robobo.print("Tap: "+JSON.stringify(robobo.readTapSensor()));
        robobo.print("Battery: "+JSON.stringify(robobo.readBatteryLevel()));

    }
}
```

There are some methods that allow to clear the sensor readings to the default values:

``` javascript

    /** Resets the face sensor.
     * After this function, and until a new face is detected, the face sensor
     * will return 0 as values for distance, x and y position.
     */
    resetFaceSensor()
    
    /** Resets the clap counter  */
    resetClapCounter()

     /** Resets the color blob detector  */
    resetColorBlobs()

     /** Resets the state of the Fling sensor  */
    resetFlingSensor()

    /** Resets the tap sensor value  */
    resetTapSensor() 

    /** Resets the last note registered by the note sensor  */
    resetLastNote()
    
```
### Configuration methods

The configuration methods allow to configure diferent parameters of the robot:

``` javascript

    /** Activates the individual tracking of each color. 
     * Warning: Color tracking is a computionally intensive task,
     * activating all the colors may impact performance  */
    setColorBlobDetectionActive(red, green, blue, custom)

    /** Changes the frequency of the status (LOW, NORMAL,HIGH, MAX)  */
    changeStatusFrequency(freq)
```
### Callback methods

The last type of methods allow the user to set up callback functions that will be called when a especific event is triggered.

``` javascript
    /** Configures the callback that is called when a new note is detected  */
    whenANoteIsDetected(fun) 

    /** Configures the callback that is called when a new face is detected  */
    whenANewFaceIsDetected(fun) 

    /** Configures the callback that is called when a face is lost  */
    whenAFaceIsLost(fun)

    /** Configures the callback that is called when a new color blob is detected  */
    whenANewColorBlobIsDetected(fun)

    /** Configures the callback that is called when a new tap is detected  */
    whenATapIsDetected(fun) 

    /** Configures the callback that is called when a new fling is detected  */
    whenAFlingIsDetected(fun) 
```