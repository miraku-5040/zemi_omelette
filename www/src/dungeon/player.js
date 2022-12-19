class Player{

     static initialize () {
        this.playerStatus = {
            playerId: 'P0',
            playerName: '勇者',
            level: 1,
            //ここより下開発用データ
            hp: {current: 15,max: 15 , min: 0}, //体力
            sp: {current: 100,max: 100 , min: 0},//満腹度
            atk: {current: 5,max: 100 , min: 0},//攻撃力
            def: {current: 2,max: 100 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 100,max: 100 , min: 0},//命中率
            exp: 0,//これまでの経験値
            weapon:{skill: 1},
            job:{skill: 2},
            items:[],
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
        case 'leftup':
            this.playerStatus.next.y = this.playerStatus.now.y - 1;
            this.playerStatus.next.x = this.playerStatus.now.x - 1;
            return 'move';
        case 'rightup':
            this.playerStatus.next.y = this.playerStatus.now.y - 1;
            this.playerStatus.next.x = this.playerStatus.now.x + 1;
            return 'move';
        case 'rightdown':
            this.playerStatus.next.x = this.playerStatus.now.x + 1;
            this.playerStatus.next.y = this.playerStatus.now.y + 1;
            return 'move';
        case 'leftdown':
            this.playerStatus.next.x = this.playerStatus.now.x - 1;
            this.playerStatus.next.y = this.playerStatus.now.y + 1;
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
        case 'leftupDirection':
            this.playerStatus.next.x = this.playerStatus.now.x - 1;
            this.playerStatus.next.y = this.playerStatus.now.y - 1;
            this.playerStatus.direction ='leftup';
            return 'stay';
        case 'rightupDirection':
            this.playerStatus.next.y = this.playerStatus.now.x + 1;
            this.playerStatus.next.y = this.playerStatus.now.y - 1;
            this.playerStatus.direction ='rightup';
            return 'stay';
        case 'rightdownDirection':
            this.playerStatus.next.x = this.playerStatus.now.x + 1;
            this.playerStatus.next.y = this.playerStatus.now.y + 1;
            this.playerStatus.direction ='rightdown';
            return 'stay';
        case 'leftdownDirection':
            this.playerStatus.next.x = this.playerStatus.now.x - 1;
            this.playerStatus.next.y = this.playerStatus.now.y + 1;
            this.playerStatus.direction ='leftdown';
            return 'stay';
        case 'attack':
            Skill.playerUseNormalAttack(this.playerStatus.playerId);
            return 'skillReady'
        case 'skill1':
            Skill.playerUseSkill(this.playerStatus.weapon.skill,this.playerStatus.playerId);
            return 'skillReady'
        case 'skill2':
            Skill.playerUseSkill(this.playerStatus.job.skill,this.playerStatus.playerId);
            return 'skillReady'
        case 'item':
            console.log('item')
            const elem = document.getElementById('itemList');
            elem.style.display = "inline";
            return 'itemSelect'
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
            this.steyCharacterPosition();
            return 'player';
        }
        //キャラの座標更新
        this.setCharacterPosition();
        //ステージの位置更新
        Stage.moveStage(this.playerStatus.now.x, this.playerStatus.now.y);
        //足元チェック
        /*if(Item.checkItem(this.playerStatus.now.x, this.playerStatus.now.y)){
            //アイテムがある
            return 'itemPick'
        }*/
        return 'enemy'
            
    
          
    }

    /* キャラの攻撃に関する*/
    static attack(){
        Player.playerUseNormalAttack(this.playerStatus.playerId);
    }

    /* キャラスキル発火 */
    static skill(){
        Player.playerUseNormalAttack(this.playerStatus.playerId);
    }

    /* キャラクターを画面の真ん中に配置する */
    static setCharacterImage() {
        // 画像を作成し配置する
        const characterImage = Image.getCharacterImage(1);
        characterImage.style.left = 7 * Config.stageImgWidth + "px";
        characterImage.style.top = 3 * Config.stageImgHeight + "px";
        this.characterElement.appendChild(characterImage);
    }

    /* 新しい座標をセットする */
    static setCharacterPosition(){
        this.playerStatus.now.x = this.playerStatus.next.x
        this.playerStatus.now.y = this.playerStatus.next.y
    }
    /* 現状維持の座標をセットする */
    static steyCharacterPosition(){
        this.playerStatus.next.x = this.playerStatus.now.x
        this.playerStatus.next.y = this.playerStatus.now.y
    }

    /* ターンによる満腹度の減少 */
    static spDecrease(turn){
        if(turn%10 == 0){
            this.playerStatus.sp.current-=1;
            document.getElementById("sp").innerHTML = this.playerStatus.sp.current;
        }
    }

    /**
     * playerIdからプレイヤーの現在座標を取得する
     * playerIdが存在しない場合はNullを返す
     * 引数なしの場合は最初のプレイヤーの現在座標を返す
     */
    static getPlayerNowPosition(playerId){
        if(playerId === undefined){
            //引数なしの場合
            return this.playerStatus.now;
        }
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        }
        return this.playerStatus.now;
    }

    /* 座標に応じたプレイヤーの存在チェック */
    static isPlayerExistence(x,y) {
        const nowCoordinate = this.playerStatus.now;
        if(nowCoordinate.x === x && nowCoordinate.y === y){
            //存在する
            return true;
        }
        return false;
    }

    /* 座標に応じたプレイヤーのplayerIdを取得
     * 座標にプレイヤーが存在しない場合はNullを返す */
    static getPlayerId(x, y) {
        const nowCoordinate = this.playerStatus.now;
        if(nowCoordinate.x === x && nowCoordinate.y === y){
            //存在する
            return this.playerStatus.playerId;
        }
        return null;
    }

    /**
     * playerIdに応じたレベルの数値を取得する
     * playerIdが存在しない場合はNullを返す
     */
    static getPlayerLevel(playerId) {
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        }      
        return this.playerStatus.level;
    }

    /**
     * playerIdからプレイヤーの方向を取得する
     * playerIdが存在しない場合はNullを返す
     */
    static getPlayerDirection(playerId){
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        }
        return this.playerStatus.direction;
    }
    
    /**
     * playerIdに応じたプレイヤーの現在の攻撃能力取得
     * playerIdが存在しない場合はNullを返す
     */
    static getPlayerAttackStatus(playerId){
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        }
        const matchPlayerStatus = this.playerStatus;
        const playerAttackStatus = {};
        if(matchPlayerStatus.atk.current > matchPlayerStatus.atk.max){
            playerAttackStatus.atk = matchPlayerStatus.atk.max;
        }else if(matchPlayerStatus.atk.current < matchPlayerStatus.atk.min){
            playerAttackStatus.atk = matchPlayerStatus.atk.min
        }else{
            playerAttackStatus.atk = matchPlayerStatus.atk.current;
        }

        if(matchPlayerStatus.cri.current > matchPlayerStatus.cri.max){
            playerAttackStatus.cri = matchPlayerStatus.cri.max;
        }else if(matchPlayerStatus.cri.current < matchPlayerStatus.cri.min){
            playerAttackStatus.cri = matchPlayerStatus.cri.min;
        }else{
            playerAttackStatus.cri = matchPlayerStatus.cri.current;
        }

        if(matchPlayerStatus.dex.current > matchPlayerStatus.dex.max){
            playerAttackStatus.dex = matchPlayerStatus.dex.max;
        }else if(matchPlayerStatus.dex.current > matchPlayerStatus.dex.min){
            playerAttackStatus.dex = matchPlayerStatus.dex.min;
        }else{
            playerAttackStatus.dex = matchPlayerStatus.dex.current;
        }

        return playerAttackStatus;
    }

    /**
     * playerIdに応じたプレイヤーの現在の防御能力取得
     */
    static getPlayerDefenseStatus(playerId){
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        }
        const matchPlayerStatus = this.playerStatus;
        const playerDefenseStatus = {};
        if(matchPlayerStatus.def.current > matchPlayerStatus.def.max){
            playerDefenseStatus.def = matchPlayerStatus.def.max;
        }else if(matchPlayerStatus.def.current < matchPlayerStatus.def.min){
            playerDefenseStatus.def = matchPlayerStatus.def.min;
        }else{
            playerDefenseStatus.def = matchPlayerStatus.def.current;
        }

        if(matchPlayerStatus.avd.current > matchPlayerStatus.avd.max){
            playerDefenseStatus.avd = matchPlayerStatus.avd.max;
        }else if(matchPlayerStatus.avd.current < matchPlayerStatus.avd.min){
            playerDefenseStatus.avd = matchPlayerStatus.avd.min;
        }else{
            playerDefenseStatus.avd = matchPlayerStatus.avd.current;
        }

        return playerDefenseStatus;
    }

    static getPlayerItems(){
        return Player.playerStatus.items;
    }

    /**
     * playerIdに応じたプレイヤーのステータス変動
     */
    static playerStatusFluctuation(playerId,status){
        // TODO ステータスを更新する
    }
}

