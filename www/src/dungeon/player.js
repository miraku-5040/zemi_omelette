class Player{

     static initialize () {
        this.playerStatus = {
            playerId: 1,
            playerName: 1,
            hp: {current: 1,max: 1 , min: 0},
            sp: {current: 100,max: 100 , min: 0},
            now:  {x:9, y:6},
            next: {x:9, y:6}
            
        };
        const characterElement = document.getElementById("player_layer");
        characterElement.style.width = Config.stageImgWidth + 'px';
        characterElement.style.height = Config.stageImgHeight + 'px';
        this.characterElement = characterElement;
        this.setCharacterImage();

     }

    
    /**
     * control.jsから取得できる入力キーから次の動作を判断する
     * **/
    static playing(){
        switch(Control.getPressedKeyStatus()){
        case 'up':
            this.playerStatus.nextY = this.playerStatus.now.y - 1;
            return 'move';
        case 'down':
            this.playerStatus.nextY = this.playerStatus.now.y + 1;
            return 'move';
        case 'right':
            this.playerStatus.nextX = this.playerStatus.now.x + 1;
            return 'move';
        case 'left':
            this.playerStatus.nextX = this.playerStatus.now.x - 1;
            return 'move';
        default:
            return 'player';
        }
        
        //return 'attack';
        //return 'item';
        //return 'menu';

    }
    /**
     * キャラの移動に関することをする
     * **/
    static moving(){
        //床判定
        if(Stage.checkStage(this.playerStatus.next.x, this.playerStatus.next.y)){
            //キャラの座標更新
            this.setCharacterPosition();
            //ステージの位置更新
            Stage.moveStage(this.playerStatus.now.x, this.playerStatus.now.y);
            return 'enemy';
        }
        this.steyCharacterPosition();
        return 'player';
    }

    /**
     * キャラクターを画面の真ん中に配置する
     * **/
    static setCharacterImage() {
        // 画像を作成し配置する
        const characterImage = Image.getCharacterImage(1);
        characterImage.style.left = 7 * Config.stageImgWidth + "px";
        characterImage.style.top = 3 * Config.stageImgHeight + "px";
        this.characterElement.appendChild(characterImage);
    }

    /**
     * 新しい座標をセットする
     * **/
    static setCharacterPosition(){
        this.playerStatus.now.x = this.playerStatus.next.x
        this.playerStatus.now.y = this.playerStatus.next.y
    }
    /**
     * 現状維持の座標をセットする
     * **/
    static steyCharacterPosition(){
        this.playerStatus.next.x = this.playerStatus.now.x
        this.playerStatus.next.y = this.playerStatus.now.y
    }

    /**
     * ターンによる満腹度の減少
     * **/
    static spDecrease(turn){
        if(turn%10 == 0){
            this.playerStatus.sp.current-=1;
            document.getElementById("sp").innerHTML = this.playerStatus.sp.current;
        }
    }


}

