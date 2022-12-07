/* 敵の処理 */
class Enemy{

    static enemyStatusArray; //敵のステータスの配列

    /* 初期化 */
    static initialize () {
        this.enemyStatusArray = [];

        /* 開発用にデータをセットする */
        //x=7, y=7に敵をセット
        this.enemyStatusArray = [{enemyId:1, enemyName:"スライム", hp:{current:100, max:100, min:0}, currentX:7, currentY:7, size:1}];
        /* end */


    }

    /* 階開始の処理 */
    static startFloor(){
        /* 敵を描画 */

    }

    /* 画面描画 */
    static screenRenderingAll() {
        this.enemyStatusArray.forEach(element => this.#screenRenderingExe)(element);
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
        const imgElement = document.createElement('img');

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