/* 敵の処理 */
class Enemy{

    static enemyStatusArray; //座標に対応するエネミーのステータスを持つ二次元配列 [y][x]
    static tempEnemyStatusArray; //移動時の一時データ
    static noDataItem;
    static enemyIdArray; //エネミーのidの配列
    /*      enemyId:1, //モンスターID
            enemyName:"スライム",//名前
            level: 1, //レベル
            distinction:2,//同モンスターの重複番号
            direction :"down" //方向
            hp:{current:10, max:999, min:0}, 
            atk: {current: 2,max: 200 , min: 0},//攻撃力
            def: {current: 1,max: 2 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 1,max: 100 , min: 0.5},//命中率 
            exp: 2,//基礎経験値
            size:1//モンスターの使用ます
    */

    /* 初期化 */
    static initialize() {
        /* enemyStatusArrayの準備 */
        this.noDataItem = 0;
        const col = new Array(Config.stageCols); //横の配列
        col.fill(this.noDataItem); //横の配列を0で埋める
        const row = new Array(Config.stageRows); //縦の配列
        for(let y = 0; y < row.length; y++){
            row[y]=col.concat();
        }
        this.enemyStatusArray = JSON.parse(JSON.stringify(row));
        this.tempEnemyStatusArray = JSON.parse(JSON.stringify(row));

        this.enemyIdArray = [];
        this.startFloor();
    }

    /* 階開始の処理 */
    static startFloor(){

        const generateEnemyArray = Stage.popEnemy()
        generateEnemyArray.forEach((enemy) => {
            this.enemyStatusArray[enemy.position.y][enemy.position.x] = Database.getEnemy(enemy.id)
            this.enemyIdArray.push(enemy.id);
        });
        
        //Imageでenemyの画像を読み込む
        Image.createEnemyImages(this.enemyIdArray);
        /* end */
        /* 敵を描画 */
        this.screenRenderingAll();

    }

    /* 画面描画 */
    static screenRenderingAll() {
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                this.screenRenderingOne(indexX, indexY);
            });
        });
    }
    static screenRenderingOne(indexX, indexY) {
        const enemyLayerElement = document.getElementById("enemy_layer");
        const enemyStatusArrayElement = this.enemyStatusArray[indexY][indexX];
        const imgElement = Image.getEnamyImage(enemyStatusArrayElement.enemyId);
        imgElement.id = "enemy_" + enemyStatusArrayElement.enemyId + "_" + enemyStatusArrayElement.distinction;
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        enemyLayerElement.appendChild(imgElement);
    }

    /* 敵行動 */
    static action(){
        this.updateNextMove(); //次の行動(移動先)を設定
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                switch(element.next.type){
                    case "move": //移動の場合
                        this.moving(indexX, indexY);
                        break;
                    case "attack": //攻撃の場合
                        console.log("enemy_attack_test"); //test
                        Skill.enemyUseNormalAttack(indexX, indexY);
                        Skill.skillReady();
                        Skill.skillGo();
                        break;
                    default:
                        break;
                }
            });
        });
        this.enemyStatusArray = JSON.parse(JSON.stringify(this.tempEnemyStatusArray)); //ディープコピー
        this.tempEnemyStatusArray.forEach((element) => element.fill(this.noDataItem)); //一時配列を初期化
    }

    /* 移動先設定 */
    static updateNextMove() {
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                let next = {};
                /* move */
                next.type = 'move';
                
                if(this.checkAround(indexX,indexY)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    element.next = next;
                    return;
                }
                const result = Aster.enemyMove(Stage.getStageBoard(),{x: indexX,y: indexY},Player.getPlayerNowPosition());
                if(result == "TypeError"){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    element.next = next;
                    return;
                }
                if(Stage.checkStage(result.x,result.y)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    element.next = next;
                    return;
                }
                if(this.checkEnemy(result.x,result.y)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    element.next = next;
                    return;
                }
                if(this.checkPredictEnemy(result.x,result.y)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    element.next = next;
                    return;
                }
                next.x = result.x;
                next.y = result.y;
                this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                element.next = next;
                return;

                /* attack */
                //next.type = "attack";
                //element.next = next;
                // TODO 処理を追加する
                    
            });
        });
        /* end */
    }

    

    /* 敵移動 */
    static moving(currentX, currentY){
        const elementItem = this.enemyStatusArray[currentY][currentX];
        const nextX = elementItem.next.x;
        const nextY = elementItem.next.y;
        const imgElement = document.getElementById("enemy_" + elementItem.enemyId + "_" + elementItem.distinction);
        imgElement.style.top = nextY * Config.stageImgHeight + "px";
        imgElement.style.left = nextX * Config.stageImgWidth + "px";
        
    }

    /* 敵配置
     * ステージ生成時に敵を配置する
    */
    static createEnemy(){
    }

    /* データベース取得
     * 敵作成時にデータベースから敵のデータを取得する
    */
    static findDataBase(){
    }

    /* 指定マスに敵の存在チェック */
    static checkEnemy(x, y){
        if(this.enemyStatusArray[y][x] === this.noDataItem){
            // 敵が存在しない
            return false;
        }
        // 敵が存在する
        return true;
    }

    static checkPredictEnemy(x,y){
        if(this.tempEnemyStatusArray[y][x] === this.noDataItem){
            // 敵が存在しない
            return false;
        }
        // 敵が存在する
        return true;
    }

    static checkAround(enemyX,enemyY){
        //周り８マスを確認する
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                if(Player.isPlayerExistence(enemyX + x, enemyY + y)){
                    //プレイヤーがいる
                    return true;
                }

            }
        }
        //いない
        return false;
    }

    /* 座標に応じた敵名を取得 */
    static getEnemyName(x, y){
        if(this.enemyStatusArray[y][x] === this.noDataItem){
            // 敵が存在しない
            return null;
        }
        const name = this.enemyStatusArray[y][x].enemyName;
        const distinction = this.enemyStatusArray[y][x].distinction;
        return name + distinction;
    }

    /*座標に応じた敵のレベル取得*/
    static getEnemyLevel(x,y){
        return this.enemyStatusArray[x][y].level
    }

    /* 座標に応じた敵の方向取得 */
    static getDirection(x,y){
        return this.enemyStatusArray[x][y].direction;
    }

    /*座標に応じた敵の現在の攻撃能力取得*/
    static getEnemyAttackStatus(x,y){
        const enemyStatus = this.enemyStatusArray[y][x];
        const enemyAttackStatus = {};
        if(enemyStatus.atk.current > enemyStatus.atk.max){
            enemyAttackStatus.atk = enemyStatus.atk.max
        }else if(enemyStatus.atk.current < enemyStatus.atk.min){
            enemyAttackStatus.atk = enemyStatus.atk.min
        }else{
            enemyAttackStatus.atk = enemyStatus.current
        }

        if(enemyStatus.cri.current > enemyStatus.cri.max){
            enemyAttackStatus.cri = enemyStatus.cri.max
        }else if(enemyStatus.cri.current < enemyStatus.cri.min){
            enemyAttackStatus.cri = enemyStatus.cri.min
        }else{
            enemyAttackStatus.cri = enemyStatus.cri.current
        }

        if(enemyStatus.dex.current > enemyStatus.dex.max){
            enemyAttackStatus.dex = enemyStatus.dex.max
        }else if(enemyStatus.dex.current < enemyStatus.dex.min){
            enemyAttackStatus.dex = enemyStatus.dex.min
        }else{
            enemyAttackStatus.dex = enemyStatus.dex.current
        }
        return  enemyAttackStatus;
    }

    /*座標に応じた敵の現在の防御能力取得*/
    static getEnemyDefenceStatus(x,y){
        const enemyStatus = this.enemyStatusArray[y][x];
        const enemyDefenceStatus = {};
        if(enemyStatus.def.current > enemyStatus.def.max){
            enemyDefenceStatus.def = enemyStatus.def.max
        }else if(enemyStatus.def.current < enemyStatus.def.min){
            enemyDefenceStatus.def = enemyStatus.def.min
        }else{
            enemyDefenceStatus.def = enemyStatus.def.current
        }

        if(enemyStatus.avd.current > enemyStatus.avd.max){
            enemyDefenceStatus.avd = enemyStatus.avd.max
        }else if(enemyStatus.avd.current < enemyStatus.avd.min){
            enemyDefenceStatus.avd = enemyStatus.avd.min
        }else{
            enemyDefenceStatus.avd = enemyStatus.avd.current
        }
        return enemyDefenceStatus;
    }

    /* hp変化 */
    static enemyHpFluctuation(x, y, incrementValue){
        const enemyStatus = this.enemyStatusArray[y][x]
        if(enemyStatus === this.noDataItem){
            //存在しない場合終了
            return;
        }
        const updateValue = enemyStatus.hp.current + incrementValue;
        if(enemyStatus.hp.min <= updateValue && updateValue <= enemyStatus.hp.max){ //hpの範囲内
            enemyStatus.hp.current = updateValue;
        }else if(updateValue < enemyStatus.hp.min){ //hpの最小値より小さい
            enemyStatus.hp.current = enemyStatus.hp.min;
        }else{ //hpの最大値より大きい
            enemyStatus.hp.current = enemyStatus.hp.max;
        }
        //ダメージ(回復)メッセージ
        if(incrementValue <= 0){
            //ダメージ
            Message.enemyHpDecreaseMessage(enemyStatus.enemyName+enemyStatus.distinction, -incrementValue);
        }else{
            //回復
            // TODO
        }
        //キル確認
        if(enemyStatus.hp.current <= 0){
            //hpが0以下でキルする
            this.enemyKill(x, y);
        }
    }

    /**
     * 座標に存在するエネミーをキルする
     * キルメッセージを表示する
     */
    static enemyKill(x, y){
        const enemyStatus = this.enemyStatusArray[y][x];
        if(enemyStatus === this.noDataItem){
            //存在しない場合終了
            return;
        }
        const elementId = "enemy_" + enemyStatus.enemyId + "_" + enemyStatus.distinction;
        const enemyImgElement = document.getElementById(elementId);
        Message.enemyKillMessage(enemyStatus.enemyName + enemyStatus.distinction);
        enemyImgElement.style.display = "none";
        enemyImgElement.remove();
        this.enemyStatusArray[y][x] = this.noDataItem;
        return true;
    }

}