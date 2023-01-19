class Player{

     static initialize () {
        this.playerStatus = {
            playerId: 'P0000',
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
        //プレイヤーの画面上の位置を決定する
        const characterElement = document.getElementById("player_layer");
        characterElement.style.width = Config.stageImgWidth + 'px';
        characterElement.style.height = Config.stageImgHeight + 'px';
        this.characterElement = characterElement;
        this.setCharacterImage()

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
            Control.itemDisplay()
            Item.itemUserData = this.playerStatus.playerId
            return 'itemSelect'
        default:
            return 'player';
        }

    }
    /**
     * キャラの進行方向を決める
     * **/
     static guide(){
         //進行方向を表示する TODO
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
        if(Item.checkItem(this.playerStatus.now.x, this.playerStatus.now.y)){
            //アイテムがある
            return 'itemPick'
        }
        if(Trap.checkTrap(this.playerStatus.now.x, this.playerStatus.now.y)){
            //アイテムがある
            return 'trap'
        }
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

    /* キャラクターを配置する */
    static setCharacterImage() {
        const characterImage = Image.getPlayerImage('P0000')
        characterImage.style.left = Config.playerReferencePointLeft * Config.stageImgWidth + "px";
        characterImage.style.top = Config.playerReferencePointTop * Config.stageImgHeight + "px";
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

    static resetCharacterPosition(x,y){
        //最初の地点決定
        this.playerStatus.now.x = x
        this.playerStatus.now.y = y
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
            return Object.assign({}, this.playerStatus.now); //シャローコピー
        }
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        }
        return Object.assign({}, this.playerStatus.now); //シャローコピー
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

    /* playerIdに応じたプレイヤー名を取得 */
    static getPlayerName(playerId){
        if(this.playerStatus.playerId !== playerId){
            //playerIdが存在しない
            return null;
        } 
        return this.playerStatus.playerName;
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
    
    static checkLimitValue(matchPlayerStatus, status){
        if(matchPlayerStatus[status].current > matchPlayerStatus[status].max){
            return matchPlayerStatus[status].max;
        }else if(matchPlayerStatus[status].current < matchPlayerStatus[status].min){
            return matchPlayerStatus[status].min
        }else{
            return matchPlayerStatus[status].current;
        }
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
        playerAttackStatus.atk = this.checkLimitValue(matchPlayerStatus,'atk')
        playerAttackStatus.cri = this.checkLimitValue(matchPlayerStatus,'cri')
        playerAttackStatus.dex = this.checkLimitValue(matchPlayerStatus,'dex')

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
        playerAttackStatus.def = this.checkLimitValue(matchPlayerStatus,'def')
        playerAttackStatus.avd = this.checkLimitValue(matchPlayerStatus,'avd')

        return playerDefenseStatus;
    }

    static getPlayerItems(playerId){
        return Tool.deepCopy(Player.playerStatus.items);
    }

    static addPlayerItem(item){
        this.playerStatus.items.push(item)
    }

    static splicePlayerItem(index){
        this.playerStatus.items.splice(index, 1)
    }

    /* hp変化 */
    static playerHpFluctuation(playerId, incrementValue){
        if(this.playerStatus.playerId !== playerId){
            //存在しない場合終了
            return;
        }
        const updateValue = this.playerStatus.hp.current + incrementValue;
        if(this.playerStatus.hp.min <= updateValue && updateValue <= this.playerStatus.hp.max){ //hpの範囲内
            this.playerStatus.hp.current = updateValue;
        }else if(updateValue < this.playerStatus.hp.min){ //hpの最小値より小さい
            this.playerStatus.hp.current = this.playerStatus.hp.min;
        }else{ //hpの最大値より大きい
            this.playerStatus.hp.current = this.playerStatus.hp.max;
        }
        //メッセージ
        if(incrementValue <= 0){
            //ダメージ
            Message.playerHpDecreaseMessage(this.playerStatus.playerName, incrementValue);
        }else{
            //回復
            // TODO
        }
    }
}

