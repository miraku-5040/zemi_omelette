class Player{

     static initialize () {
        this.playerStatus = {
            playerId: 1,
            playerName: 1,
            hp: {current: 1,max: 1 , min: 0},
            sp: {current: 100,max: 100 , min: 0},
            x:  6,
            y:  9,
            nextX: 6,
            nextY: 9,
            
        };
        const characterElement = document.getElementById("player_layer");
        characterElement.style.width = Config.stageImgWidth + 'px';
        characterElement.style.height = Config.stageImgHeight + 'px';
        this.characterElement = characterElement;
        this.setCharacterImage();

     }

    

    static playing(){
        switch(Control.getPressedKeyStatus()){
        case 'up':
            this.playerStatus.nextY = this.playerStatus.y - 1;
            return 'move';
        case 'down':
            this.playerStatus.nextY = this.playerStatus.y + 1;
            return 'move';
        case 'right':
            this.playerStatus.nextX = this.playerStatus.x + 1;
            return 'move';
        case 'left':
            this.playerStatus.nextX = this.playerStatus.x - 1;
            return 'move';
        default:
            console.log('なんかしろ')
            return 'player';
        }
        
        //return 'attack';
        //return 'item';
        //return 'menu';

    }

    static moving(){
        //床判定
        if(Stage.checkStage(this.playerStatus.nextX, this.playerStatus.nextY)){
            //キャラの座標更新
            this.setCharacterPosition();
            //ステージの位置更新
            Stage.moveStage(this.playerStatus.y, this.playerStatus.x);
            return 'enemy';
        }
        return 'enemy';
    }

    static setCharacterImage() {
        // 画像を作成し配置する
        const characterImage = Image.getCharacterImage(1);
        characterImage.style.left = 7 * Config.stageImgWidth + "px";
        characterImage.style.top = 3 * Config.stageImgHeight + "px";
        this.characterElement.appendChild(characterImage);
    }

    static setCharacterPosition(){
        this.playerStatus.x = this.playerStatus.nextX
        this.playerStatus.y = this.playerStatus.nextY
        
    }

}

