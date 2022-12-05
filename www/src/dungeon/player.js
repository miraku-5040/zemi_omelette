class Player{

    static playing(frame){
             const image = document.getElementById(`stage`);
             keyStatus = Control.getPressedKeyStatus();
        /*if(Controle.keyStatus.up && Controle.keyStatus.right) {

        }
        if(Controle.keyStatus.up && Controle.keyStatus.left) {

        }
        if(Controle.keyStatus.down && Controle.keyStatus.left) {

        }
        if(Controle.keyStatus.down && Controle.keyStatus.right) {

        }*/
        if(keyStatus.up) {
            image.style.top = -1 * Config.stageImgHeight + "px";
            console.log(image.style.top)
        }
        if(keyStatus.down) {
            image.style.top = 1 * Config.stageImgHeight + "px";
            console.log(image.style.top)
        }
        if(keyStatus.right) {
            image.style.left = -1 * Config.stageImgWidth + "px";
            console.log(image.style.left)
        }
        if(keyStatus.left) {
            image.style.left = 1 * Config.stageImgWidth + "px";
            console.log(image.style.left)
        }
        return 'enemy';
    }
}

