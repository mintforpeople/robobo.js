async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.71');



    console.log(process.argv);

    await robobo.connect();
    
    robobo.changeStatusFrequency('MAX');
    robobo.setLedColorTo('Front-R','red');
    //robobo.setLedColorTo('all','blue');

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



   

robobo.print('EOF');


}
main()


 