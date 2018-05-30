async function main(){
var Robobo = require('./robobo');

robobo = new Robobo('192.168.0.253');
await robobo.connect();
/*robobo.whenATapIsDetected(async ()=>{await robobo.sayText('Hola mundo');
await robobo.sayText('Hola mundo');
});
await robobo.moveWheelsByTime(30,30,5);
await robobo.moveWheelsByDegrees('both',180,60);
await robobo.movePanTo(-100,30);
await robobo.movePanTo(0,30);
await robobo.moveTiltTo(110,30);
await robobo.moveTiltTo(90,30);
robobo.setLedColorTo('all','red');
await robobo.pause(1500);
robobo.setLedColorTo('all','blue');
await robobo.sayText('Hola mundo')*/
while (true){
    robobo.setLedColorTo('Front-C','red');
    await robobo.pause(200);
    robobo.setLedColorTo('Front-C','blue');
    await robobo.pause(200);

}


console.log('TEST');


}


main()
 