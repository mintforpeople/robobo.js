async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.45');


    await robobo.connect();
    robobo.whenANewQRCodeIsDetected(() => 
    {
        qr = robobo.readQR()
        console.log(qr);
       

    }


);

   

console.log('EOF');


}
main()


 