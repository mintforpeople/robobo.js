async function main(){
    console.log("pepedentro");

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




    //robobo.moveWheelsByTime(30,30,10);
    //
    robobo.setEmotionTo('surprised');
    
    robobo.moveWheelsByDegrees('both',900,100);
    robobo.moveWheelsByTime(30,30,2);
    robobo.playSound('moan');

    robobo.moveWheelsByDegrees('both',900,-100);

    robobo.movePanTo(40,10,true);
    robobo.playSound('moan');
    robobo.setEmotionTo('normal')
    robobo.movePanTo(0,10, true);
    robobo.movePanTo(-40,10, true);

    robobo.moveTiltTo(120,10,true);
    


console.log('EOF');


/*while (true){
    console.log(robobo.readAllIRSensor());
    await robobo.pause(0.5);
}*/
}
main()
console.log("pepefuera");


 