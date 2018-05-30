/*var Robobo = require('./robobo');

robobo = new Robobo('192.168.0.253');
robobo.connect();
setTimeout(function(){ 
    robobo.say('AYY LMAO');
    robobo.disconnect();
 }, 3000);
*/

async function Update(){
    let wait = new Promise(function(resolve,reject){
    setTimeout(() => {console.log('test')
    resolve(1)},1000);
    })
    let result = await wait;
}

async function Test(){
    const WebSocket = require('ws');

    var x = false;




    ws = new WebSocket("ws://192.168.0.253:40404");
    ws.onopen = function () {
        x = true;
 
    }
    console.log('Antes');
    
        await Update();
        console.log('durante')
    
    console.log('Despues');
}



Test()