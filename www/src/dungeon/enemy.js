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
        /* 開発用にデータをセットする */
        //x=5, y=5に敵をセット
        this.enemyStatusArray[5][5] = {
            enemyId:1, //モンスターID
            enemyName:"スライム",//名前
            level: 1, //レベル
            distinction:2,//同モンスターの重複番号
            direction:"down",
            hp:{current:10, max:999, min:0}, 
            atk: {current: 2,max: 200 , min: 0},//攻撃力
            def: {current: 1,max: 2 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 1,max: 100 , min: 0.5},//命中率 
            exp: 2,//基礎経験値
            size:1//モンスターの使用ます
            };
        this.enemyIdArray.push(1);
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

    /* 移動先設定 */
    static updateNextMove() {
        /* 開発用に上下に動くようにする */
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                let next = {};
                /* move */
                // next.type = 'move';
                // if(this.checkAround(indexX,indexY)){
                //     next.x = indexX;
                //     next.y = indexY;
                //     element.next = next;
                //     return;
                // }
                // const result = Aster.enemyMove(Stage.getStageBoard(),{x: indexX,y: indexY},Player.getPlayerNowPosition());
                // if(result == "TypeError"){
                //     next.x = indexX;
                //     next.y = indexY;
                //     element.next = next;
                //     return;
                // }else{
                //     next.x = result.x;
                //     next.y = result.y;
                //     element.next = next;
                //     return;
                // }

                /* attack */
                next.type = "attack";
                element.next = next;
                // TODO 処理を追加する
                    
            });
        });
        /* end */
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

    /* 敵移動 */
    static moving(currentX, currentY){
        const elementItem = this.enemyStatusArray[currentY][currentX];
        const nextX = elementItem.next.x;
        const nextY = elementItem.next.y;
        const imgElement = document.getElementById("enemy_" + elementItem.enemyId + "_" + elementItem.distinction);
        imgElement.style.top = nextY * Config.stageImgHeight + "px";
        imgElement.style.left = nextX * Config.stageImgWidth + "px";
        this.tempEnemyStatusArray[nextY][nextX] = elementItem; //一時配列に次のデータをセットする
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

    static checkAround(enemyX,enemyY){
        let playerPosition = Player.getPlayerNowPosition()
        //周り８マスを確認する
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++){
                if(playerPosition.x == enemyX + x && playerPosition.y == enemyY + y){
                    //プレイヤーがいない
                    return true
                }
            }
        }
        //いる
        return false
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
        let enemyStatus = {};
        if(this.enemyStatusArray[y][x].atk.current > this.enemyStatusArray[y][x].atk.max){
            enemyStatus.atk = this.enemyStatusArray[y][x].atk.max
        }else if(this.enemyStatusArray[y][x].atk.current < this.enemyStatusArray[y][x].atk.min){
            enemyStatus.atk = this.enemyStatusArray[y][x].atk.min
        }else{
            enemyStatus.atk = this.enemyStatusArray[y][x].atk.current
        }

        if(this.enemyStatusArray[y][x].cri.current > this.enemyStatusArray[y][x].cri.max){
            enemyStatus.cri = this.enemyStatusArray[y][x].cri.max
        }else if(this.enemyStatusArray[y][x].cri.current < this.enemyStatusArray[y][x].cri.min){
            enemyStatus.cri = this.enemyStatusArray[y][x].cri.min
        }else{
            enemyStatus.cri = this.enemyStatusArray[y][x].cri.current
        }

        if(this.enemyStatusArray[y][x].dex.current > this.enemyStatusArray[y][x].dex.max){
            enemyStatus.dex = this.enemyStatusArray[y][x].dex.max
        }else if(this.enemyStatusArray[y][x].dex.current < this.enemyStatusArray[y][x].dex.min){
            enemyStatus.dex = this.enemyStatusArray[y][x].dex.min
        }else{
            enemyStatus.dex = this.enemyStatusArray[y][x].dex.current
        }
        return  enemyStatus;
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
    /* ステータス変化 */
    static enemyStatusFluctuation(x,y,status){
        //TODO
        console.log("enemyステータス変化:"+status); //test
        for(let s in status){
            this.enemyStatusArray[y][x][s].current += status.s
        }
    }

}