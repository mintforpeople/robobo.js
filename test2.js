async function main(){
var Robobo = require('./robobo');

robobo = new Robobo('192.168.0.253');
await robobo.connect();
await robobo.say('ayy');
console.log('TEST1');


}
 main()
 console.log("pepe");
 