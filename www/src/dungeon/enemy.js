/* 敵の処理 */
class Enemy{

    static enemyStatusArray; //敵のステータスの配列
    //static 

    /* 初期化 */
    static initialize() {
        this.enemyStatusArray = [];
        this.startFloor();
    }

    /* 階開始の処理 */
    static startFloor(){
        /* 開発用にデータをセットする */
        console.log("startFloorCheck"); //test
        //x=7, y=7に敵をセット
        const testItem = {enemyId:1, enemyName:"スライム", distinction:1, hp:{current:100, max:100, min:0}, x:7, y:7, size:1};
        this.enemyStatusArray.push(testItem);
        Image.createEnemyImages([1]);
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
        console.log("enemyId:" + enemyStatusArrayElement.enemyId);
        const imgElement = Image.getEnamyImage(enemyStatusArrayElement.enemyId);
        console.log("imgElement:" + imgElement);
        imgElement.id = "enemy_" + enemyStatusArrayElement.enemyId + "_" + enemyStatusArrayElement.distinction;
        imgElement.style.top = enemyStatusArrayElement.x * Config.stageImgHeight + "px";
        imgElement.style.left = enemyStatusArrayElement.y * Config.stageImgWidth + "px";
        enemyLayerElement.appendChild(imgElement);
    }

    /* ステータス変化 */
    static updateStatus() {
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