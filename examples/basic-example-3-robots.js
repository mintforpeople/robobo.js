async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.45');
    var robobo2 = new Robobo('192.168.0.253');
    var robobo3 = new Robobo('192.168.0.71');


    console.log(process.argv);

    await robobo.connect();
    await robobo2.connect();
    await robobo3.connect();

    robobo.changeStatusFrequency('MAX');
    robobo2.changeStatusFrequency('MAX');
    robobo3.changeStatusFrequency('HIGH');


    //robobo.changeStatusFrequency('NORMAL');
    await robobo.sayTextBLK('Robobo 1 Listo');
    await robobo2.sayTextBLK('Robobo 2 Listo');
    await robobo3.sayTextBLK('Robobo 3 Listo');

    robobo.movePanTo(-100, 40);
    robobo2.movePanTo(-100, 40);
    await robobo3.movePanToBLK(-100, 40);

    robobo.movePanTo(100, 40);
    robobo2.movePanTo(100, 40);
    await robobo3.movePanToBLK(100, 40);


    robobo.moveTiltTo(110, 20);
    robobo2.moveTiltTo(110, 20);
    await robobo3.moveTiltToBLK(110, 20);

    robobo.moveTiltTo(70, 20);
    robobo2.moveTiltTo(70, 20);
    await robobo3.moveTiltToBLK(70, 20);
    


    robobo.movePanTo(0, 40);
    robobo2.movePanTo(0, 40);
    robobo3.movePanTo(0, 40);

    robobo.moveTiltTo(70, 20); 
    robobo2.moveTiltTo(70, 20); 
    robobo3.moveTiltTo(70, 20); 

   

console.log('EOF');


}
main()


 