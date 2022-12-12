class Player{

     static initialize () {
        this.playerStatus = {
            playerId: 1,
            playerName: 1,
            lebel: 1,
            //ここより下開発用データ
            hp: {current: 15,max: 15 , min: 0}, //体力
            sp: {current: 100,max: 100 , min: 0},//満腹度
            atk: {current: 5,max: 100 , min: 0},//攻撃力
            def: {current: 2,max: 100 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 100,max: 100 , min: 0},//命中率
            now:  {x:9, y:6},
            next: {x:9, y:6},
            direction: 'down'
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
            this.playerStatus.next.y = this.playerStatus.now.y - 1;
            return 'move';
        case 'down':
            this.playerStatus.next.y = this.playerStatus.now.y + 1;
            return 'move';
        case 'right':
            this.playerStatus.next.x = this.playerStatus.now.x + 1;
            return 'move';
        case 'left':
            this.playerStatus.next.x = this.playerStatus.now.x - 1;
            return 'move';
        case 'upDirection':
            this.playerStatus.next.y = this.playerStatus.now.y - 1;
            this.playerStatus.direction ='up';
            return 'stay';
        case 'downDirection':
            this.playerStatus.next.y = this.playerStatus.now.y + 1;
            this.playerStatus.direction ='down';
            return 'stay';
        case 'rightDirection':
            this.playerStatus.next.x = this.playerStatus.now.x + 1;
            this.playerStatus.direction ='right';
            return 'stay';
        case 'leftDirection':
            this.playerStatus.next.x = this.playerStatus.now.x - 1;
            this.playerStatus.direction ='left';
            return 'stay';
        default:
            return 'player';
        }
        
        //return 'attack';
        //return 'item';
        //return 'menu';

    }
    /**
     * キャラの進行方向を決める
     * **/
     static guide(){
         //進行方向を表示する　TODO
         document.getElementById('direction').innerHTML = this.playerStatus.direction;
         this.steyCharacterPosition();
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

    static getPlayerNowPosition(){
        return this.playerStatus.now
    }


}

