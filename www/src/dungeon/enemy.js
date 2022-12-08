/* 敵の処理 */
class Enemy{

    static enemyStatusArray; //エネミーのステータスの配列
    static enemyIdArray; //エネミーのidの配列

    /* 初期化 */
    static initialize() {
        this.enemyStatusArray = [];
        this.enemyIdArray = [];
        this.startFloor();
    }

    /* 階開始の処理 */
    static startFloor(){
        /* 開発用にデータをセットする */
        //x=7, y=7に敵をセット
        this.enemyStatusArray.push({enemyId:1, enemyName:"スライム", distinction:1, hp:{current:100, max:100, min:0}, x:7, y:7, size:1});
        this.enemyIdArray.push(1);
        //x=5, y=5に敵をセット
        this.enemyStatusArray.push({enemyId:1, enemyName:"スライム", distinction:2, hp:{current:100, max:100, min:0}, x:5, y:5, size:1});
        this.enemyIdArray.push(1);
        //Imageでenemyの画像を読み込む
        Image.createEnemyImages(this.enemyIdArray);
        /* end */
        /* 敵を描画 */
        this.screenRenderingAll();

    }

    /* 画面描画 */
    static screenRenderingAll() {
        this.enemyStatusArray.forEach(element => this.#screenRenderingExe(element));
    }
    static screenRenderingOne(enemyId = null) {
        const matchArray = this.enemyStatusArray.filter((array) => array.enemyId === enemyId);
        if(matchArray.length() !== 1){
            //件数が1件以外 NG
            return false;
        }
        matchArray.forEach(element => this.#screenRenderingExe(element));
    }
    static #screenRenderingExe(enemyStatusArrayElement){
        const enemyLayerElement = document.getElementById("enemy_layer");
        const imgElement = Image.getEnamyImage(enemyStatusArrayElement.enemyId);
        imgElement.id = "enemy_" + enemyStatusArrayElement.enemyId + "_" + enemyStatusArrayElement.distinction;
        imgElement.style.top = enemyStatusArrayElement.x * Config.stageImgHeight + "px";
        imgElement.style.left = enemyStatusArrayElement.y * Config.stageImgWidth + "px";
        enemyLayerElement.appendChild(imgElement);
    }

    /* ステータス変化 */
    static updateStatus() {
    }

    /* 移動先設定 */
    static updateNextMove() {
        /* 開発用に上下に動くようにする */
        this.enemyStatusArray.forEach((element) => {
            if(element.y % 2 === 0){
                //偶数 up
                nextItem = {};
                nextItem.type = "move";
                nextItem.x = this.enemyStatusArray.x;
                nextItem.y = this.enemyStatusArray.y -1;
                this.enemyStatusArray.next = nextItem;
            }else{
                //奇数 down
                nextItem = {};
                nextItem.type = "move";
                nextItem.x = this.enemyStatusArray.x;
                nextItem.y = this.enemyStatusArray.y +1;
                this.enemyStatusArray.next = nextItem;
            }
        });
        /* end */
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
}