async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.71');



    console.log(process.argv);
    await robobo.connect();

    
    await robobo.sayText('uno');

    //robobo.changeStatusFrequency('MAX');
    //robobo.changeStatusFrequency('LOW');
    
    /*await robobo.moveTiltToBLK(80, 20);
    await robobo.moveTiltToBLK(110, 20);
    await robobo.sayText('dos');

    await robobo.moveTiltToBLK(1, 20);
    await robobo.moveTiltToBLK(4000, 20);
    await robobo.sayText('fin');*/
    await robobo.movePanToBLK(-269, 90);
    await robobo.movePanToBLK(263, 90);

    


   

console.log('EOF');


}
main()


 