class Image {

    static initialize() {
        this.createStageImages();
    }

    static createElement(name,i){
        // 要素を作成
        var elem = document.createElement(`img`);
        // id
        elem.id = `${name}${i}`;
        //src
         elem.src = `img/${name}_${i}.png`;
        return elem;
    }

    static createStageImages(){
        //stageImages 床　無　壁上右下左　角　道角
        this.stageImages = [];
        for(let i=0; i < Config.stageImageTotal; i++){
            const image = this.createElement('stage',i+1);
            //const image = document.getElementById(`stage${i+1}`);
            image.removeAttribute('id');
            image.width = Config.stageImgWidth;
            image.height = Config.stageImgHeight;
            image.style.position = 'absolute';
            this.stageImages.push(image);
            if(i>1){
            const newImage = image.cloneNode(false);
            newImage.style.transform = "rotate(90deg)"
            this.stageImages.push(newImage);

            const newImage1 = image.cloneNode(false);
            newImage1.style.transform = "rotate(180deg)"
            this.stageImages.push(newImage1);

            const newImage2 = image.cloneNode(false);
            newImage2.style.transform = "rotate(270deg)"
            this.stageImages.push(newImage2);
            }
        }
    }


    static createCharacterImages(){
        //TODO
    }

     static getStageImage(index) {
        const image = this.stageImages[index - 1].cloneNode(true);
        return image;
    }
}

