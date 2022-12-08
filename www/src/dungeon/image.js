class Image {

    static playerImages; //playerのimgElementのMap
    static enemyImages; //enemyのimgElementのMap

    /**
     * 画像の生成
     * elementを持つ
     * **/
    static initialize() {
        this.createStageImages();
        this.createPlayerImages();
    }
    /**
     *  画像の要素を作成
     *  サンプル： <img src="img/stage_1.png" id="stage1">
     * **/
    static createElement(name,i){
        // 要素を作成
        var elem = document.createElement(`img`);
        // id
        elem.id = `${name}${i}`;
        //src
         elem.src = `img/${name}_${i}.png`;
        return elem;
    }

    /**
     * stageImagesに床、無、壁上右下左、角上右下左、道角上右下左の14個の画像が入る
     * **/
    static createStageImages(){
        this.stageImages = [];
        for(let i=0; i < Config.stageImageTotal; i++){
            const image = this.createElement('stage',i+1);
            image.removeAttribute('id');
            image.width = Config.stageImgWidth;
            image.height = Config.stageImgHeight;
            image.style.position = 'absolute';
            this.stageImages.push(image);
            if(i > 1){
                this.quadrupleDirection(image);
            }
        }
    }

    /**
     * 回転させて挿入する処理
     * **/
    static quadrupleDirection(image){
        for(let i=1; i < 4 ; i++){
        const newImage = image.cloneNode(false);
        newImage.style.transform  = "rotate("+90*i+"deg)"
        this.stageImages.push(newImage);
        }
    }

    /**
     * playerImagesにプレイキャラクターの画像が入る
     * **/
    static createPlayerImages(){
        const name = "player";
        this.playerImages = new Map();
        for(let i=0; i < Config.characterImageTotal; i++){
            const image = this.createElement(name, i+1);
            image.removeAttribute('id');
            image.width = Config.stageImgWidth;
            image.height = Config.stageImgHeight;
            image.style.position = 'absolute';
            this.playerImages.set(i+1, image);
        }
    }

    /**
     * enemyImagesにエネミーキャラクターの画像が入る
     * 引数のArrayで指定したenemyIdの画像をセットする
     */
    static createEnemyImages(enemyIdArray = []){
        const name = "enemy";
        const stageImgHeight = Config.stageImgHeight;
        const stageImgWidth = Config.stageImgWidth;
        this.enemyImages = new Map();
        enemyIdArray.forEach((element) => {
            const image = this.createElement(name, element);
            image.removeAttribute('id');
            image.width = stageImgWidth;
            image.height = stageImgHeight;
            image.style.position = 'absolute';
            this.playerImages.set(Number(element), image);
        });
    }

    /**
     * stageImagesの要素を取得
     * **/
     static getStageImage(index) {
        const image = this.stageImages[index - 1].cloneNode(true);
        return image;
    }

    /**
     * playerのimgをcharacterImagesの要素を取得
     * 
     * getPlayerImageに変更する
     * **/
     static getCharacterImage(index) { 
        const matchImage = this.playerImages.get(index);
        return matchImage.cloneNode();
    }

    /**
     * playerImagesの要素を取得
     */
    static getPlayerImage(playerId){
        const matchItem = this.playerImages.get(playerId);
        if(matchItem === undefined){
            //存在しない場合
            return null;
        }
        const image = matchItem.element.cloneNode();
        return image;
    }

    /**
     * enemyImagesの要素を取得
     */
    static getEnamyImage(enemyId){
        const matchItem = this.playerImages.get(enemyId);
        if(matchItem === undefined){
            //存在しない場合
            return null;
        }
        const image = matchItem.element.cloneNode();
        return image;
    }
}

