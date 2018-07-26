

async function main(){
    /* conexión con Robobo */
    var Robobo = require('./lib/robobo');
    robobo = new Robobo('10.113.36.173');
    await robobo.connect();

    robobo.moveWheels(30,30);

    while (robobo.readIRSensor('Front-C')<30) {
        await robobo.update();
    }
    robobo.stopMotors();

}

main()

