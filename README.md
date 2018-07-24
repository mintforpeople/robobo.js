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

Note that the word `await` is used before the call to the function, this is becaus the connect function is a asyncronous one, await pauses the execution until the the connection is stablished, then resume the execution of the rest of the lines. `await` is used in more functions and its usage will be explained further in this document. 
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
     * 
     * @param {string} wheel - Wheels to move [left | right | both]
     * @param {integer} degrees - Degress to move the wheel
     * @param {integer} speed  - Speed factor [-100..100]
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

### Callback methods