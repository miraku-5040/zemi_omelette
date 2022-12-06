class Stage {

    static initialize() {
        // HTML からステージの元となる要素を取得し、大きさを設定する
        const stageElement = document.getElementById("stage_layer");
        stageElement.style.width = Config.stageImgWidth * Config.stageCols + 'px';
        stageElement.style.height = Config.stageImgHeight * Config.stageRows + 'px';
        this.stageElement = stageElement;


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
        //キャラ移動用のステージの座標
        //ステージクリエイトで変更
        
        this.stageStatusTop = -3;
        this.stageStatusLeft = -2;
        const image = document.getElementById(`stage_layer`);
        image.style.top = this.stageStatusTop * Config.stageImgHeight + "px";
        image.style.left = this.stageStatusLeft * Config.stageImgWidth + "px";
        image.style.position = 'absolute';
        
        

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
        this.stageElement.appendChild(stageImage);
        // メモリにセットする
        this.board[y][x] = {
            stageImageNumber: stageImageNumber,
            element: stageImage
        }
    }

    static moveStage(keyStatus){
        const image = document.getElementById(`stage_layer`);
        switch(keyStatus){
        case 'up':
            this.stageStatusTop+=1
            image.style.top = this.stageStatusTop * Config.stageImgHeight + "px";
            return 'enemy';
        case 'down':
            this.stageStatusTop-=1
            image.style.top = this.stageStatusTop * Config.stageImgHeight + "px";
            return 'enemy';
        case 'right':
            this.stageStatusLeft-=1
            image.style.left = this.stageStatusLeft * Config.stageImgWidth + "px";
            return 'enemy';
        case 'left':
            this.stageStatusLeft+=1
            image.style.left = this.stageStatusLeft * Config.stageImgWidth + "px";
            return 'enemy';
        }

    }

    static checkStage(top, left, keyStatus){
        //移動できる床か判定
        console.log(top+" "+left);
        switch(keyStatus){
        case 'up':
            console.log(this.board[top-1][left].stageImageNumber);
            console.log(top-1+" "+left);
            return true;
        case 'down':
            console.log(this.board[top+1][left].stageImageNumber);
            console.log(top+1+" "+left);
            return true;
        case 'right':
            console.log(this.board[top][left+1].stageImageNumber);
            console.log(top+" "+(left+1));
            return true;
        case 'left':
            console.log(this.board[top][left-1].stageImageNumber);   
            console.log(top+" "+(left-1)); 
            return true;
        }
        return true;
    }


}