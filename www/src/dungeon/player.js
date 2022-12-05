class Player{

    static playing(frame){
             const image = document.getElementById(`stage`);
        /*if(Controle.keyStatus.up && Controle.keyStatus.right) {

        }
        if(Controle.keyStatus.up && Controle.keyStatus.left) {

        }
        if(Controle.keyStatus.down && Controle.keyStatus.left) {

        }
        if(Controle.keyStatus.down && Controle.keyStatus.right) {

        }*/
        if(Controle.keyStatus.up) {
            image.style.top = -1 * Config.stageImgHeight + "px";
        }
        if(Controle.keyStatus.down) {
            image.style.top = 1 * Config.stageImgHeight + "px";
        }
        if(Controle.keyStatus.right) {
            image.style.left = -1 * Config.stageImgWidth + "px";
        }
        if(Controle.keyStatus.left) {
            image.style.left = 1 * Config.stageImgWidth + "px";
        }
        return 'enemy';
    }
}

