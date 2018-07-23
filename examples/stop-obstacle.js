async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.253');

    await robobo.connect();
    robobo.moveWheels(20, 20);
    while (robobo.readIRSensor('Front-C')<100){
        console.log(robobo.readIRSensor('Front-C'));

        await robobo.update();
    }
    robobo.stopMotors();
    await robobo.sayTextBLK('Obstaculo');


   

console.log('EOF');


}
main()


 