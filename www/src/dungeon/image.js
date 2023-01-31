class Image {

    static playerImages; //playerのimgElementのMap
    static enemyImages; //enemyのimgElementのMap
    

    /* 画像の生成, elementを持つ */
    static initialize() {
        this.createStageImages();
        this.createPlayerImages();
        this.createDropItemImages();
        this.createArrow()
    }
    /* 画像の要素を作成
     *  サンプル： <img src="img/stage_1.png" id="stage1"> */
    static createElement(id = '00000'){
        // 要素を作成
        const elem = document.createElement(`img`);
        //src
        elem.src = `img/${id}.png`;
        elem.width = Config.stageImgWidth;
        elem.height = Config.stageImgHeight;
        elem.style.position = 'absolute';
        return elem;
    }


    static createItemList(playerId, itemList){
        Player.getPlayerItems(playerId).forEach((item,i) => {
            var elem = document.createElement(`img`);
            elem.id = `item_list_index_${i}`;
            //getItemImageする
            elem.src = `img/${item.itemId}.png`;
            elem.style.position = 'absolute';
            elem.style.left = Config.itemListImageWidth * i + "px";
            elem.width = Config.itemListImageWidth;
            elem.height = Config.itemListImageHeight;
            elem.setAttribute('onclick', `Control.itemSelect(${i})`);
            itemList.appendChild(elem);
        });
    }

    /* stageImagesに床、無、壁上右下左、角上右下左、道角上右下左の14個の画像が入る */
    static createStageImages(){
        this.stageImages = [];
        for(let i=1; i <= Config.stageImageTotal; i++){
            const image = this.createElement(`F000${i}`);
            this.stageImages.push(image);
            if(i > 2){
                this.quadrupleDirection(image);
            }
        }
    }

    /* 回転させて挿入する処理 */
    static quadrupleDirection(image){
        for(let i=1; i < 4 ; i++){
        const newImage = image.cloneNode(false);
        newImage.style.transform  = "rotate("+90*i+"deg)"
        this.stageImages.push(newImage);
        }
    }

    /* playerImagesにプレイキャラクターの画像が入る */
    static createPlayerImages(){
        const errorIndex = 0;
        this.playerImages = new Map();
        //エラー用の画像をセット
        const errorImage = this.createElement();
        this.playerImages.set(errorIndex, errorImage);
        for(let i=1; i < Config.characterImageTotal; i++){
            const image = this.createElement(`P000${i}`);
            this.playerImages.set(`P000${i}`, image);
        }
    }

    /* enemyImagesにエネミーキャラクターの画像が入る
     * 引数のArrayで指定したenemyIdの画像をセットする */
    static createEnemyImages(enemyIdArray = []){
        const errorIndex = 0;
        this.enemyImages = new Map();
        //エラー用の画像をセット
        const errorImage = this.createElement();
        this.enemyImages.set(errorIndex, errorImage);

        enemyIdArray.forEach((element) => {
            const image = this.createElement(element);
            this.enemyImages.set(element, image);
        });
    }

    static createTrapImages(trapIdArray = []){
        const errorIndex = 0;
        this.trapImages = new Map();
        //エラー用の画像をセット
        const errorImage = this.createElement();
        this.trapImages.set(errorIndex, errorImage);

        trapIdArray.forEach((element) => {
            const image = this.createElement(element);
            this.trapImages.set(element, image);
        });
    }

     static createItemImages(itemIdArray = []){
        const errorIndex = 0;
        this.itemImages = new Map();
        //エラー用の画像をセット
        const errorImage = this.createElement();
        this.enemyImages.set(errorIndex, errorImage);

        itemIdArray.forEach((element) => {
            const image = this.createElement(element);
            this.enemyImages.set(element, image);
        });
     }

    /* itemImagesにフィールド上に落ちているアイテムの画像を格納 */
    static createDropItemImages(){
        this.dropItemImages = [];
        const image = this.createElement('ID000');
        this.dropItemImages.push(image);
    }

    static createArrow(){
        const index = [8,9,6,3,2,1,4,7]
        this.arrowImages = new Array(9)
        for(let i = 0; i < 8; i++){
            const newImage = this.createElement("arrow").cloneNode(false);
            newImage.style.transform  = "rotate("+45*i+"deg)"
            this.arrowImages[index[i]] = newImage
        }
    }

    /* stageImagesの要素を取得 */
     static getStageImage(index) {
        const image = this.stageImages[index - 1].cloneNode(true);
        return image;
    }

    /* minmapの要素を取得 */
     static getMinmapImage(index) {
         const elem = document.createElement(`img`);
        //src
        elem.width = 5;
        elem.height = 5;
        elem.style.position = 'absolute';
        if(index == 1){
            elem.style.backgroundColor = "#FF6600";
        }else if(index == 2){
            elem.style.backgroundColor = "#000000";
        }else{
            elem.style.backgroundColor = "#CCCCCC";
        }
        return elem;
    }



    /* playerImagesの要素を取得 */
    static getPlayerImage(playerId){
        const errorIndex = 0;
        const matchObject = this.playerImages.get(playerId);
        if(matchObject === undefined){
            //存在しない場合
            return this.playerImages.get(errorIndex).cloneNode();
        }
        const image = matchObject.cloneNode();
        return image;
    }

    /* enemyImagesの要素を取得 */
    static getEnamyImage(enemyId){
        const errorIndex = 0;
        const matchObject = this.enemyImages.get(enemyId);
        if(matchObject === undefined){
            //存在しない場合
            return this.enemyImages.get(errorIndex).cloneNode();
        }
        const image = matchObject.cloneNode();
        return image;
    }

    static getItemImage(itemId){
        const errorIndex = 0;
        const matchObject = this.itemImages.get(itemId);
        if(matchObject === undefined){
            return this.itemImages.get(errorIndex).cloneNode();
        }
        const image = matchObject.cloneNode();
        return image;
    }

    static getTrapImage(trapId){
        const errorIndex = 0;
        const matchObject = this.trapImages.get(trapId);
        if(matchObject === undefined){
            return this.trapImages.get(errorIndex).cloneNode();
        }
        const image = matchObject.cloneNode();
        return image;
    }

    /* itemImagesの要素を取得 */
    static getDropItemImage(index){
        const image = this.dropItemImages[index].cloneNode(true)
        return image
    }

    static getArrowImages(index){
        const image = this.arrowImages[index].cloneNode(true)
        return image
    }
}

