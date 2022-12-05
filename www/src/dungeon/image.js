class Image {

    /**
     * 画像の生成
     * ステージの配置
     * **/
    static initialize() {
        this.createStageImages();
        this.createCharacterImages();

        const image = document.getElementById(`stage`);
        image.style.left = -2 * Config.stageImgWidth + "px";
        image.style.top = -3 * Config.stageImgHeight + "px";
        image.style.position = 'absolute';
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
     * chracterImagesにプレイキャラ、エネミーの画像が入る
     * **/
    static createCharacterImages(){
        this.characterImages = [];
        for(let i=0; i < Config.characterImageTotal; i++){
            const image = this.createElement('character',i+1);
            console.log(image);
            image.removeAttribute('id');
            image.width = Config.stageImgWidth;
            image.height = Config.stageImgHeight;
            image.style.position = 'absolute';
            this.characterImages.push(image);
        }
    }

    /**
     * stageImagesの要素を取得
     * **/
     static getStageImage(index) {
        const image = this.stageImages[index - 1].cloneNode(true);
        return image;
    }

    /**
     * characterImagesの要素を取得
     * **/
     static getCharacterImage(index) {
        const image = this.characterImages[index - 1].cloneNode(true);
        return image;
    }
}

