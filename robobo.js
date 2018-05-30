var Remote = require('./remote-library/remotelib');

function Robobo(ip){
    this.connectionState = 0;
    this.rem = new Remote(ip.trim(),'');
    this.rem.registerCallback('onConnectionChanges', function(arg){
        console.log('Connection State: '+arg);
        this.connectionState = arg}.bind(this))

    this.unlock = false;
    this.unlockFunction = function(){ this.unlock = true }.bind(this);

    this.rem.registerCallback('talkCallback',this.unlockFunction);

}

Robobo.prototype = {
    connect : async function(){
        this.rem.connect();
        while (this.rem.connectionState == Remote.ConnectionStateEnum.CONNECTING) {
            await this.update();


        }
        console.log('Post Connect');

        
    },
    disconnect : async function(){
        this.rem.closeConnection(false);
        while (this.rem.connectionState != Remote.ConnectionStateEnum.DISCONNECTED) {
            await this.update();

        }
        console.log('Post Disconnect');
    },
    sayText : async function(text){
        var unlock = false
        this.rem.talk(text,()=>(unlock = true));
        while (!unlock){
            await this.update()
        }

        unlock=false;
    },

    moveWheelsByTime : async function(speedR, speedL, time){
        var unlock = false
        this.rem.moveWheelsByDegree(wheel,degrees,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;

    },
    
    moveWheelsByDegrees : async function(wheel,degrees,speed){
        var unlock = false
        this.rem.moveWheelsByDegree(wheel,degrees,speed,()=>(unlock = true))
        while (!unlock){
            await this.update()
        }
        unlock=false;

    },
    update : async function (){
        let wait = new Promise(function(resolve,reject){
        setTimeout(() => {
        resolve(1)},10);
        });
        let result = await wait;
    }
}
module.exports = Robobo;