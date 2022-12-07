class Stage {

    static movingLayersElement;
    static stageLayerElement;

    static initialize() {
        // HTML からステージの元となる要素を取得し、大きさを設定する
        //キャラ移動用のステージの座標
        //ステージクリエイトで変更
        this.stageStatusTop = 3; //開発用
        this.stageStatusLeft = 7; //開発用
        const startingPointElement = document.getElementById(`starting_point`);
        startingPointElement.style.top = this.stageStatusTop * Config.stageImgHeight + "px";
        startingPointElement.style.left = this.stageStatusLeft * Config.stageImgWidth + "px";
        startingPointElement.style.position = 'absolute';

        const movingLayersElement = document.getElementById(`moving_layers`);
        movingLayersElement.style.top = -6 * Config.stageImgHeight + "px"; //開発用
        movingLayersElement.style.left = -9 * Config.stageImgWidth + "px"; //開発用
        movingLayersElement.style.position = 'absolute';
        this.movingLayersElement = movingLayersElement;

        const stageLayerElement = document.getElementById("stage_layer");
        stageLayerElement.style.width = Config.stageImgWidth * Config.stageCols + 'px';
        stageLayerElement.style.height = Config.stageImgHeight * Config.stageRows + 'px';
        this.stageElement = stageLayerElement; //old
        this.stageLayerElement = stageLayerElement; //new


                // メモリを準備する
        this.board = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,5,5,5,5,5,5,10,2,2,2,2,2,2,2,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,6,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,9,5,5,5,5,5,5,5,5,5,10,2,2,2,2,2,2,4,1,1,1,1,1,1,14,5,5,5,5,5,5,5,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,14,5,5,5,5,5,5,13,1,1,1,1,1,1,11,3,3,12,1,11,3,3,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,11,3,3,3,3,3,3,12,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,4,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,8,3,3,3,3,12,1,11,3,3,7,2,2,2,2,2,2,4,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,3,7,2,2,4,1,6,2,2,8,3,3,3,3,3,3,3,12,1,11,3,3,3,3,7,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,9,5,5,5,5,5,5,5,5,5,5,5,5,13,1,14,10,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,9,5,5,13,1,14,5,5,10,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,9,5,5,5,13,1,14,5,5,5,10,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,14,5,5,5,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,11,3,3,3,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,13,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,14,5,5,5,5,5,5,5,5,5,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,3,3,3,3,3,3,3,3,3,3,3,3,3,12,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,11,3,3,3,3,3,3,3,3,3,3,3,7,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,8,3,3,3,3,3,3,3,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,3,3,3,3,7,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];
        
        for(let y = 0; y < Config.stageRows; y++) {
            const line = this.board[y] || (this.board[y] = []);
            for(let x = 0; x < Config.stageCols; x++) {
                const stageImageNumber = line[x];
                if(stageImageNumber >= 1  && stageImageNumber < 20) {
                    this.setStageImage(x, y, stageImageNumber);
                } else {
                    line[x] = null;
                }
            }
        }
        

    }

    static createStage(){
        //ランダム生成
        //キャラの最初の座標特定

    }

    static setStageImage(x, y, stageImageNumber) {
        // 画像を作成し配置する
        const stageImage = Image.getStageImage(stageImageNumber);
        stageImage.style.left = x * Config.stageImgWidth + "px";
        stageImage.style.top = y * Config.stageImgHeight + "px";
        this.stageLayerElement.appendChild(stageImage);
        // メモリにセットする
        this.board[y][x] = {
            stageImageNumber: stageImageNumber,
            element: stageImage
        }
    }

    /* 移動 */
    static moveStage(x, y){
        this.movingLayersElement.style.top = -y * Config.stageImgHeight + "px";
        this.movingLayersElement.style.left = -x * Config.stageImgWidth + "px";

    }

    static checkStage(x,y){
        //移動できる床か判定
        if(this.board[y][x].stageImageNumber == 1){
            return true;
        }
        return false;
        
    }


}