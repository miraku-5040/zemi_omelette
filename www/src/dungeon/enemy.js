/* 敵の処理 */
class Enemy{
    /*memo
    * 大きいサイズのデータを追加する
    * 生成
    * check
    * get
    * kill
    */

    static enemyStatusArray; //座標に対応するエネミーのステータスを持つ二次元配列 [y][x]
    static tempEnemyStatusArray; //移動時の一時データ
    static noDataItem;
    static bigSizeDataItem; //{type:"sub", ｘ:relativeX, y:relativeY}アンカーの相対座標 TODO 追加
    static enemyIdArray; //エネミーのidの配列
    /*      type:main, //データタイプ TODO 追加
            enemyId:1, //モンスターID
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
        this.bigSizeDataType = "sub";
        const col = new Array(Config.stageCols); //横の配列
        col.fill(this.noDataItem); //横の配列を0で埋める
        const row = new Array(Config.stageRows); //縦の配列
        for(let y = 0; y < row.length; y++){
            row[y]=col.concat();
        }
        this.enemyStatusArray = Tool.deepCopy(row);
        this.tempEnemyStatusArray = Tool.deepCopy(row);

        this.enemyIdArray = [];
        this.startFloor();
    }

    /* 階開始の処理 */
    static startFloor(){
        const generateEnemyArray = Stage.popEnemy()
        generateEnemyArray.forEach((enemy) => {
            this.enemyStatusArray[enemy.position.y][enemy.position.x] = Database.getEnemy(enemy.id)
            this.enemyIdArray.push(enemy.id);
            if(enemy.size === 1){
                // 1マスの場合はそのまま終了する
                return;
            }
            //subデータを配置する
            this.putBigSizeDataToEnemyStatusArray(enemy.position.x, enemy.position.y);
        });
        
        //Imageでenemyの画像を読み込む
        Image.createEnemyImages(this.enemyIdArray);
        /* 敵を描画 */
        this.screenRenderingAll();

    }

    /* 画面描画 */
    static screenRenderingAll() {
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem || element.type === this.bigSizeDataType){
                    return;
                }
                this.screenRenderingOne(indexX, indexY);
            });
        });
    }
    static screenRenderingOne(indexX, indexY) {
        const enemyLayerElement = document.getElementById("enemy_layer");
        const enemyStatusArrayElement = this.enemyStatusArray[indexY][indexX];
        const size = enemyStatusArrayElement.size;
        const imgElement = Image.getEnamyImage(enemyStatusArrayElement.enemyId);
        imgElement.id = "enemy_" + enemyStatusArrayElement.enemyId + "_" + enemyStatusArrayElement.distinction;
        imgElement.style.top = indexY * Config.stageImgHeight + "px";
        imgElement.style.left = indexX * Config.stageImgWidth + "px";
        if(size > 1){
            //大きいサイズの敵の場合は画像を大きくする
            imgElement.style.height = size * Config.stageImgHeight + "px";
            imgElement.style.width = size * Config.stageImgWidth + "px"; 
        }
        enemyLayerElement.appendChild(imgElement);
    }

    /* 敵行動 */
    static action(){
        this.updateNextMove(); //次の行動(移動先)を設定
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem || element.type === this.bigSizeDataType){
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
                if(element === this.noDataItem || element.type === this.bigSizeDataType){
                    return;
                }
                let next = {};
                if(this.checkAround(indexX,indexY)){
                    /* attack */
                    element.direction = this.checkAroundDirection(indexX,indexY)
                    next.type = "attack";
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    if(element.size > 1){
                        //TODO
                    }
                    element.next = next;
                    return;
                }
                
                /* move */
                next.type = 'move';
                const result = Aster.enemyMove(Stage.getStageBoard(),{x: indexX,y: indexY},Player.getPlayerNowPosition());
                if(result == "TypeError"){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    this.putBigSizeDataToTempEnemyStatusArray(next.x, next.y);
                    element.next = next;
                    return;
                }
                if(Stage.checkStage(result.x,result.y)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    this.putBigSizeDataToTempEnemyStatusArray(next.x, next.y);
                    element.next = next;
                    return;
                }
                if(this.checkEnemy(result.x,result.y)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    this.putBigSizeDataToTempEnemyStatusArray(next.x, next.y);
                    element.next = next;
                    return;
                }
                if(this.checkPredictEnemy(result.x,result.y)){
                    next.x = indexX;
                    next.y = indexY;
                    this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                    this.putBigSizeDataToTempEnemyStatusArray(next.x, next.y);
                    element.next = next;
                    return;
                }
                next.x = result.x;
                next.y = result.y;
                this.tempEnemyStatusArray[next.y][next.x] = Tool.deepCopy(element); //一時配列に次のデータをセットする
                this.putBigSizeDataToTempEnemyStatusArray(next.x, next.y);
                element.next = next;
                return;
            });
        });
        /* end */
    }

    

    /* 敵移動 */
    static moving(currentX, currentY){
        const elementItem = this.enemyStatusArray[currentY][currentX];
        console.log("enemy_" + elementItem.enemyId + "_" + elementItem.distinction);
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

    /* サイズが大きいエネミーのデータをenemyStatusArrayに配置する */
    static putBigSizeDataToEnemyStatusArray(anchorX, anchorY){
        const mainData = this.enemyStatusArray[anchorY][anchorX];
        const size = mainData.size;
        for(let colIndex = 0; colIndex < size; colIndex++){
            for(let rowIndex = 0; rowIndex < size; rowIndex++){
                if(colIndex <= 0 && rowIndex <= 0){
                    //mainの位置(0, 0)はスキップする
                    continue;
                }
                const subData = {};
                subData.type = this.bigSizeDataType;
                subData.relativeX = -rowIndex;
                subData.relativeY = -colIndex;
                this.enemyStatusArray[anchorY + rowIndex][anchorX + colIndex] = subData;
            }
        }
    }

    /* サイズが大きいエネミーのデータをtempEnemyStatusArrayに配置する */
    static putBigSizeDataToTempEnemyStatusArray(anchorX, anchorY){
        const mainData = this.tempEnemyStatusArray[anchorY][anchorX];
        const size = mainData.size;
        for(let colIndex = 0; colIndex < size; colIndex++){
            for(let rowIndex = 0; rowIndex < size; rowIndex++){
                if(colIndex <= 0 && rowIndex <= 0){
                    //mainの位置(0, 0)はスキップする
                    continue;
                }
                const subData = {};
                subData.type = this.bigSizeDataType;
                subData.relativeX = -rowIndex;
                subData.relativeY = -colIndex;
                this.tempEnemyStatusArray[anchorY + rowIndex][anchorX + colIndex] = subData;
            }
        }
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

    static checkAroundDirection(enemyX,enemyY){
        const direction = [["leftup","up","rightup"],["left","","right"],["leftdown","down","rightdown"]]
        //周り８マスを確認する
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                if(Player.isPlayerExistence(enemyX + x, enemyY + y)){
                    
                    return direction[y+1][x+1];
                }

            }
        }
        return false;
    }

    /* 座標に応じた敵名を取得 */
    static getEnemyName(x, y){
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        const name = this.enemyStatusArray[checkedPosition.y][checkedPosition.x].enemyName;
        const distinction = this.enemyStatusArray[checkedPosition.y][checkedPosition.x].distinction;
        return name + distinction;
    }

    /*座標に応じた敵のレベル取得*/
    static getEnemyLevel(x,y){
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        return this.enemyStatusArray[checkedPosition.y][checkedPosition.x].level
    }

    /* 座標に応じた敵の方向取得 */
    static getDirection(x,y){
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        return this.enemyStatusArray[checkedPosition.y][checkedPosition.x].direction;
    }

    /* 座標に応じた敵のサイズを取得 */
    static getEnemySize(x, y){
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        return this.enemyStatusArray[checkedPosition.y][checkedPosition.x].size;
    }

    /* 座標に応じた敵のアンカー座標を取得 */
    static getEnemyAnchorPoint(x, y){
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        return {x:checkedPosition.x, y:checkedPosition.y};
    }

    /*座標に応じた敵の現在の攻撃能力取得*/
    static getEnemyAttackStatus(x,y){
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        const enemyStatus = this.enemyStatusArray[checkedPosition.y][checkedPosition.x];
        const enemyAttackStatus = {};
        if(enemyStatus.atk.current > enemyStatus.atk.max){
            enemyAttackStatus.atk = enemyStatus.atk.max
        }else if(enemyStatus.atk.current < enemyStatus.atk.min){
            enemyAttackStatus.atk = enemyStatus.atk.min
        }else{
            enemyAttackStatus.atk = enemyStatus.atk.current
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
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        const enemyStatus = this.enemyStatusArray[checkedPosition.y][checkedPosition.x];
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
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return null;
        }
        const enemyStatus = this.enemyStatusArray[checkedPosition.y][checkedPosition.x]
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
        const checkedPosition = this.#checkEnemyStatusArray(x, y);
        if(checkedPosition === null){
            //エネミーが存在しないので終了する
            return false;
        }
        const enemyStatus = this.enemyStatusArray[checkedPosition.y][checkedPosition.x];
        const elementId = "enemy_" + enemyStatus.enemyId + "_" + enemyStatus.distinction;
        const enemyImgElement = document.getElementById(elementId);
        Message.enemyKillMessage(enemyStatus.enemyName + enemyStatus.distinction);
        enemyImgElement.style.display = "none";
        enemyImgElement.remove();
        const size = enemyStatus.size;
        for(let colIndex = 0; colIndex < size; colIndex++){
            for(let rowIndex = 0; rowIndex < size; rowIndex++){
                this.enemyStatusArray[checkedPosition.y + rowIndex][checkedPosition.x + colIndex] = this.noDataItem;
            }
        }
        return true;
    }

    /* enemyStatusArrayのデータをチェックする get系のメソッドで使用 */
    static #checkEnemyStatusArray(x, y){
        if(x >= Config.stageCols && y >= Config.stageRows){
            //座標が配列外の場合はエラー
            return null;
        }
        if(this.enemyStatusArray[y][x] === this.noDataItem){
            // 敵が存在しない
            return null;
        }
        if(this.enemyStatusArray[y][x].type === this.bigSizeDataType){
            //subデータの場合
            const subData = this.enemyStatusArray[y][x];
            x = x + subData.relativeX;
            y = y + subData.relativeY;
        }
        return {x:x, y:y};
    }
}