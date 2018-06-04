async function main(){
    var Robobo = require('./robobo');

    robobo = new Robobo('192.168.0.253');

    await robobo.connect();

   /* robobo.whenANoteIsDetected(()=>(console.log('New Note '+ robobo.readLastNote().note)));
    robobo.whenANewFaceIsDetected(()=>(console.log('New Face ' +robobo.readFaceSensor().distance)));
    robobo.whenAFaceIsLost(() => (console.log('Face Lost')));
    robobo.whenANewColorBlobIsDetected(() => (console.log(robobo.readAllColorBlobs())))
    robobo.whenATapIsDetected(()=>(console.log('New Tap ' +robobo.readTapSensor().zone)));
    robobo.whenAFlingIsDetected(()=>(console.log('New Fling ' +robobo.readFlingSensor())));

    //robobo.sayText('Hola mundo');
    //await robobo.sayText('Hola mundo');
    //await robobo.sayText('Hola mundo');

    

    /*console.log('ANTES');
     await robobo.moveWheelsByTime(30,30,1);
     console.log('DESPUES');
     await robobo.moveWheelsByTime(-30,30,1);

    await robobo.moveWheelsByDegrees('both',180,60);
    console.log('DSPUes2');
     robobo.movePanTo(-100,30);
    await robobo.movePanTo(0,30);
    await robobo.moveTiltTo(110,30);
    await robobo.moveTiltTo(90,30);
    robobo.setLedColorTo('all','red');
    await robobo.pause(1.5);
    robobo.setLedColorTo('all','blue');
    await robobo.sayText('Hola mundo')
    await robobo.pause(1.5);
    x = false
   */

/*
  robobo.moveWheelsByTime(30,30,1);
  await robobo.pause(2000);
    

  console.log('DESPUES');

  robobo.moveWheelsByTime(-30,-30,1);
  console.log('DESPUES');
*/
/*
    robobo.sayText('AYAYAYAAYAY');


    await robobo.sayText('Hola mundo');


    robobo.moveWheelsByTime(30,30,1000);
    console.log('DESPUES');
    await robobo.pause(0.2);
    robobo.moveWheelsByTime(-30,-30,100);
    await robobo.pause(0.2);

    await     robobo.moveWheelsByTime(-30,-30,1);


console.log('DESPUES');
*/

while (true){
    console.log(robobo.readAllIRSensor());
    await robobo.pause(0.5);
}


}
main()

 