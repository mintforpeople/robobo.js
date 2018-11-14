async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.1.27');



    console.log(process.argv);
    await robobo.connect();

    
    //await robobo.sayText('asas');

    //robobo.changeStatusFrequency('MAX');
    //robobo.changeStatusFrequency('LOW');
    //await robobo.sayText('asas');
    //await robobo.movePanToBLK(-100, 20);
    //await robobo.movePanToBLK(100, 20);
    //await robobo.moveTiltToBLK(110, 20);
    //await robobo.moveTiltToBLK(80, 20);
    //robobo.movePanTo(0, 20);
    //robobo.moveTiltTo(90, 20); 


   

console.log('EOF');


}
main()


 