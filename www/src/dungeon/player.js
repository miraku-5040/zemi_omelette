class Player{

     static initialize () {
        this.playerStatus = {
            top: 3,
            left: 7
        };
        const characterElement = document.getElementById("character");
        characterElement.style.width = Config.stageImgWidth + 'px';
        characterElement.style.height = Config.stageImgHeight + 'px';
        this.characterElement = characterElement;
        this.setCharacterImage();

     }

    

    static playing(){
        this.keyStatus = Control.getPressedKeyStatus();
        switch(this.keyStatus){
        case 'up':
        case 'down':
        case 'right':
        case 'left':
            return 'move';
        default:
            return 'player';
        }
        
        //return 'attack';
        //return 'item';
        //return 'menu';

    }

    static moving(){
        //床判定
        
        //キャラの座標更新
        this.setCharacterPosition(this.keyStatus);
        //ステージの位置更新
        Stage.moveStage(this.keyStatus);
        
        return 'player';
    }

    static setCharacterImage() {
        // 画像を作成し配置する
        const characterImage = Image.getCharacterImage(1);
        characterImage.style.left = 7 * Config.stageImgWidth + "px";
        characterImage.style.top = 3 * Config.stageImgHeight + "px";
        this.characterElement.appendChild(characterImage);
    }

    static setCharacterPosition(){
        switch(this.keyStatus){
        case 'up':
            this.playerStatus.top+=1
            break;
        case 'down':
            this.playerStatus.top-=1
            break;
        case 'right':
            this.playerStatus.left-=1
            break;
        case 'left':
            this.playerStatus.left+=1
            break;
        }
    }

}

