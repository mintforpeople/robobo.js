async function main(){

    var Robobo = require('../robobo');

    var robobo = new Robobo('192.168.0.71');


    await robobo.connect();
    robobo.whenQRCodeIsDetected(() => 
    {
        qr = robobo.readQR()
        //console.log(qr);
       

    }


);

   

console.log('EOF');


}
main()


 