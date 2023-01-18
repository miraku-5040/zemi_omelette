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
        this.board =[[9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7]] 
        
        
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
        const possiblePositions = [];
        //ランダム生成
        this.board = CreateStage.randomStageSelect()
        this.board.forEach((col, indexY) => {
            col.forEach((element, indexX) => {
                    if(element != 1){
                        return
                    }
                    if(this.board[indexY+1][indexX] == 5 && this.board[indexY-1][indexX] == 3){
                        return
                    }
                    if(this.board[indexY][indexX+1] == 6 && this.board[indexY][indexX-1] == 4){
                        return
                    }
                    possiblePositions.push(indexY+","+indexX)
            });
        });
    }
    /**
     * ステージ画像や画像番号をステージの2次元配列に格納する
    **/
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

    /**
     * キャラクターの移動の際キャラクターの座標に応じてムービングレイヤーを動かす
     * **/
    static moveStage(x, y){
        this.movingLayersElement.style.top = -y * Config.stageImgHeight + "px";
        this.movingLayersElement.style.left = -x * Config.stageImgWidth + "px";

    }

    /**
     * 引数からそのマスが移動可能か判断する
     * **/
    static checkStage(x,y){
        //移動できる床か判定
        if(this.board[y][x].stageImageNumber != 1){
            return true;
        }
        if(Enemy.checkEnemy(x,y)){
            return true;
        }
        return false;   
    }

    /**
     * 引数の座標が床かを判定する
     * 床の場合はtrueを返す
     */
    static isFloor(x, y){
        if(this.board[y][x].stageImageNumber === 1){
            // 床の場合
            return true;
        }
        return false;
    }

    static checkStageCorner(direction, x, y){
        switch(direction){
        case 'leftup':
            if(this.board[y][x - 1] == 12 || this.board[y - 1][x] == 14){
                return false
            }
            return true;
        case 'rightup':
            if(this.board[y][x + 1] == 11 || this.board[y - 1][x] == 13){
                return false
            }
            return true;
        case 'rightdown':
            if(this.board[y][x + 1] == 14 || this.board[y + 1][x] == 12){
                return false
            }
            return true;
        case 'leftdown':
            if(this.board[y][x - 1] == 13 || this.board[y + 1][x] == 11){
                return false
            }
            return true;
        }
    }

    static getStageBoard(){
        return this.board
    }


}