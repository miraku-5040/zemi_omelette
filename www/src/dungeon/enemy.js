/* 敵の処理 */
class Enemy{

    static enemyStatusArray; //座標に対応するエネミーのステータスを持つ二次元配列 [y][x]
    static tempEnemyStatusArray; //移動時の一時データ
    static noDataItem;
    static enemyIdArray; //エネミーのidの配列

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
        //x=7, y=7に敵をセット
        this.enemyStatusArray[7][7] = {enemyId:1, enemyName:"スライム", distinction:1, hp:{current:100, max:100, min:0}, size:1};
        this.enemyIdArray.push(1);
        //x=5, y=5に敵をセット
        this.enemyStatusArray[5][5] = {enemyId:1, enemyName:"スライム", distinction:2, hp:{current:100, max:100, min:0}, size:1};
        this.enemyIdArray.push(1);
        //x=4, y=6に敵をセット
        this.enemyStatusArray[6][4] = {enemyId:1, enemyName:"スライム", distinction:3, hp:{current:100, max:100, min:0}, size:1};
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
        const enemyStatusArrayElement = enemyStatusArray[indexY][indexX];
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
        console.log("updateNextMoveCheck"); //test
        /* 開発用に上下に動くようにする */
        this.enemyStatusArray.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                if(element === this.noDataItem){
                    return;
                }
                if(indexY % 2 === 0){
                    //偶数 up
                    console.log("up"); //test
                    const nextItem = {};
                    nextItem.type = "move";
                    nextItem.x = indexX;
                    nextItem.y = indexY -1;
                    element.next = nextItem;
                }else{
                    //奇数 down
                    console.log("down"); //test
                    const nextItem = {};
                    nextItem.type = "move";
                    nextItem.x = indexX;
                    nextItem.y = indexY +1;
                    element.next = nextItem;
                }
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
                console.log("element.type:" + element.next.type + ", x:" + element.next.x); //test
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
        if(enemyStatusArray[x][y] === this.noDataItem){
            // 敵が存在しない
            return false;
        }
        // 敵が存在する
        return true;
    }
}