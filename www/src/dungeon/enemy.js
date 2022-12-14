/* 敵の処理 */
class Enemy{

    static enemyStatusArray; //座標に対応するエネミーのステータスを持つ二次元配列 [y][x]
    static tempEnemyStatusArray; //移動時の一時データ
    static noDataItem;
    static enemyIdArray; //エネミーのidの配列
    /*{enemyId:1, 
            enemyName:"スライム", 
            distinction:2,
            level: 1,
            hp: {current: 15,max: 15 , min: 0}, //体力
            atk: {current: 5,max: 100 , min: 0},//攻撃力
            def: {current: 2,max: 100 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 100,max: 100 , min: 0},//命中率 
            size:1}*/

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
            enemyId:1, 
            enemyName:"スライム", 
            distinction:2, 
            hp:{current:10, max:999, min:0}, 
            atk: {current: 2,max: 200 , min: 0},//攻撃力
            def: {current: 1,max: 2 , min: 0},//防御力
            cri: {current: 0.05,max: 0.25 , min: 0},//会心率
            avd: {current: 0.01,max: 0.05 , min: 0},//回避率
            dex: {current: 1,max: 100 , min: 0.5},//命中率 
            size:1};
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

    /* ステータス変化 */
    static updateStatus() {
    }

    /* 移動先設定 */
    static updateNextMove() {
        /* 開発用に上下に動くようにする */
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                const result = Aster.enemyMove
                (Stage.getStageBoard(),{x: indexX,y: indexY},Player.getPlayerNowPosition());
                let next = {};
                next.type = 'move';
                next.x = result.x;
                next.y = result.y;
                element.next = next;
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

    /*座標に応じた敵のレベル取得*/
    static getEnemyLevel(x,y){
        return this.enemyStatusArray[x][y].level
    }

    /*座標に応じた敵の現在の攻撃能力取得*/
    static getEnemyAttackStatus(x,y){
        let enemyStatus = {};
        if(this.enemyStatusArray[x][y].atk.current > this.enemyStatusArray.atk.max){
            enemyStatus.atk = this.enemyStatusArray.atk.max
        }else if(this.enemyStatusArray[x][y].atk.current < this.enemyStatusArray.atk.min){
            enemyStatus.atk = this.enemyStatusArray.atk.min
        }else{
            enemyStatus.atk = this.enemyStatusArray.atk.current
        }

        if(this.enemyStatusArray[x][y].cri.current > this.enemyStatusArray.cri.max){
            enemyStatus.cri = this.enemyStatusArray.cri.max
        }else if(this.enemyStatusArray[x][y].cri.current < this.enemyStatusArray.cri.min){
            enemyStatus.cri = this.enemyStatusArray.cri.min
        }else{
            enemyStatus.cri = this.enemyStatusArray.cri.current
        }

        if(this.enemyStatusArray[x][y].dex.current > this.enemyStatusArray.dex.max){
            enemyStatus.dex = this.enemyStatusArray.dex.max
        }else if(this.enemyStatusArray[x][y].dex.current < this.enemyStatusArray.dex.min){
            enemyStatus.dex = this.enemyStatusArray.dex.min
        }else{
            enemyStatus.dex = this.enemyStatusArray.dex.current
        }
        return  enemyStatus;
    }

    /*座標に応じた敵の現在の防御能力取得*/
    static getEnemyAttackStatus(x,y){
        let enemyStatus = {};
        if(this.enemyStatusArray[x][y].def.current > this.enemyStatusArray.def.max){
            enemyStatus.def = this.enemyStatusArray.def.max
        }else if(this.enemyStatusArray[x][y].def.current < this.enemyStatusArray.def.min){
            enemyStatus.def = this.enemyStatusArray.def.min
        }else{
            enemyStatus.def = this.enemyStatusArray.def.current
        }

        if(this.enemyStatusArray[x][y].avd.current > this.enemyStatusArray.adv.max){
            enemyStatus.adv = this.enemyStatusArray.adv.max
        }else if(this.enemyStatusArray[x][y].adv.current < this.enemyStatusArray.adv.min){
            enemyStatus.adv = this.enemyStatusArray.adv.min
        }else{
            enemyStatus.adv = this.enemyStatusArray.adv.current
        }

        return enemyStatus;
    }

    static enemyStatusFluctuation(x,y,status){
        //TODO
        for(let s in status){
            this.enemyStatusArray[x][y][s].current += status.s
        }
}

}