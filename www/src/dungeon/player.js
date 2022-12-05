class Player{

     static initialize () {
        this.stageStatusTop = 0;
        this.stageStatusLeft = 0;
     }

    

    static playing(){
             const image = document.getElementById(`stage`);
             let keyStatus = Control.getPressedKeyStatus();
             
        if(keyStatus.up) {
            this.stageStatusTop+=1
            image.style.top = this.stageStatusTop * Config.stageImgHeight + "px";
            console.log(this.stageStatusLeft+" "+this.stageStatusTop);
        }
        if(keyStatus.down) {
            this.stageStatusTop-=1
            image.style.top = this.stageStatusTop * Config.stageImgHeight + "px";
            console.log(this.stageStatusLeft+" "+this.stageStatusTop);
        }
        if(keyStatus.right) {
            this.stageStatusLeft-=1
            image.style.left = this.stageStatusLeft * Config.stageImgWidth + "px";
            console.log(this.stageStatusLeft+" "+this.stageStatusTop);
        }
        if(keyStatus.left) {
            this.stageStatusLeft+=1
            image.style.left = this.stageStatusLeft * Config.stageImgWidth + "px";
            console.log(this.stageStatusLeft+" "+this.stageStatusTop);
        }
        return 'enemy';
    }
}

