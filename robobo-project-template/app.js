
async function main(){
    /* conexión con Robobo */
    var Robobo = require('./lib/robobo');
    robobo = new Robobo('10.113.36.208');
    await robobo.connect();

    /* módulo que permite leer las pulsaciones de las teclas*/
    var readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    // variable con el valor inicial de la velocidad
    var speed = 20;

    /* usando if-else */
    process.stdin.on('keypress', (str, key) => {      
        if (key.name == 'up') {
            robobo.moveWheels(speed,speed);   
        }
        if (key.name == 'down') {             
            robobo.moveWheels(speed*(-1),speed*(-1));   
        }
        if (key.name == 'left') { 
            robobo.moveWheels(speed*(-1),speed);
        }
        if (key.name == 'right'){
            robobo.moveWheels(speed,speed*(-1));   
        }        
        if (key.name == 'space'){
            robobo.stopMotors();
        }
        if (key.name == 'c') {
            speed = speed + 10;
            console.log("Speed set to: "+speed)
        }
        if (key.name == 'd') {
            speed = speed - 10;
            console.log("Speed set to: "+speed)
        }   
    });    

    
}

main()

