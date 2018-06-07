
async function main(){

    /* conexión con Robobo */
    var Robobo = require('./lib/robobo');
    robobo = new Robobo('10.113.36.208');
    await robobo.connect();

    /* módulo que permite leer las pulsaciones de las teclas*/
    var readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', keyPressed);     

    /**
     * Usar esta función para realizar alguna acción cuando se pulsa una tecla
     * @param {*} str Carácter que represena la tecla
     * @param {*} key Objeto tecla (el nombre es tecla.name)
     */
    function keyPressed(str,key) {
        console.log(str);
        console.log(key);
    }
    
}

main()

