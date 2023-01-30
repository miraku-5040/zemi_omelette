/* エフェクトを表示するjs */
class Effect{

    /**
     * 初期化
     */
    static initialize(){
        this.effectData = new Map();
        this.#setAllEffectData();
        this.effectReadyData = new Map();
        this.effectReadyData.set(0, "");
        // {imgElement, sound, direction}
        this.stageImgHeight = Config.stageImgHeight;
        this.stageImgWidth = Config.stageImgWidth;
        this.topReferencePoint = 0; // TODO 画面表示の基準点 player画像の左上の位置
        this.leftReferencePoint = 0; // TODO
    }

    /**
     * スキル範囲のエフェクトを表示する
     * effectIdが"SE"(scopeEffect)のものを処理する
     * positionArrayの形式:[{x, y, direction, length}, ...]
     */
    static scopeEffectDisplay(effectId, positionArray){
        const displayTime = 1000; //ms
        const readyKey = this.#setEffectReadyData(effectId, displayTime);
        this.effectDisplay(readyKey, positionArray);
        this.endEffectDisplay(readyKey);
    }

    /**
     * スキル対象のエフェクトの準備をする
     * effectIdが"TE"(targetEffect)のものを処理する
     */
    static targetEffectReady(effectId){
        const displayTime = 1000; //ms
        const readyKey = this.#setEffectReadyData(effectId, displayTime);
        return readyKey;
    }

    /**
     * エフェクト表示を行う
     */
    static effectDisplay(readyKey, positionArray){
        const effectReadyData = this.effectReadyData.get(readyKey);
        // 表示処理
        if(effectReadyData.move){ //画像移動あり
            this.#moveEffectDisplay(effectReadyData, positionArray);
        }else{ //画像移動なし
            this.#fixEffectDisplay(effectReadyData, positionArray);
        }
    }

    /* 座標移動するエフェクトを表示する */
    static #moveEffectDisplay(effectReadyData, positionArray){
        // データ準備
        const effectLayerElement = document.getElementById("effect_layer");
        const imgElement = effectReadyData.imgElement;
        const imgElementArray = [];
        positionArray.forEach((position) => {
            const cloneImgElement = imgElement.cloneNode();
            const angle = this.#getAngle(position.direction);
            cloneImgElement.style.top = position.y * this.stageImgHeight + this.topReferencePoint + "px"; // 位置を設定する(相対)
            cloneImgElement.style.left = position.x * this.stageImgWidth + this.leftReferencePoint + "px"; // 位置を設定する(相対)
            cloneImgElement.style.transform = "rotate(" + angle + "deg)";
            cloneImgElement.style.display = "none"; //非表示で配置する
            effectLayerElement.appendChild(cloneImgElement);
            imgElementArray.push(cloneImgElement);
            //animation
            const endPosition = this.#getNextPosition({x:0, y:0}, position.direction, position.length);
            const moveX = endPosition.x * this.stageImgWidth;
            const moveY = endPosition.y * this.stageImgHeight;
            const animateKeyfreames = [
                {transform: "translate(0, 0)"}, // check
                {transform: "translate(" + moveX + "px, " + moveY + "px)"} // check
            ]; //キーフレーム
            const animateOption = {
                fill: "forwards",
                iterations: 1,
                duration: 1000,
                composite: 'accumulate'
            }; //オプション
            const animate = cloneImgElement.animate(animateKeyfreames, animateOption);
            animate.pause();
        });
        // 表示と削除
        const displayTime = effectReadyData.time;
        imgElementArray.forEach((imgElement) => {
            imgElement.style.display = "block";
            const animateArray = imgElement.getAnimations();
            animateArray.forEach((animate) => {
                animate.play();
            });
            setTimeout((imgElement) => {
                imgElement.remove();
                }, displayTime, imgElement);
        });
    }

    /* 座標移動しないエフェクトを表示する */
    static #fixEffectDisplay(effectReadyData, positionArray){
        // データ準備
        const effectLayerElement = document.getElementById("effect_layer");
        const imgElement = effectReadyData.imgElement;
        const imgElementArray = [];
        positionArray.forEach((position) => {
            const angle = this.#getAngle(position.direction);
            const getNextPositionFunction = this.#getNextPositionFunction(position.direction);
            let nextPosition = position;
            for(let i = position.length ; i >= 0 ; i--){
                const cloneElement = imgElement.cloneNode();
                cloneElement.style.top = nextPosition.y * this.stageImgHeight + this.topReferencePoint + "px"; // 位置を設定する(相対)
                cloneElement.style.left = nextPosition.x * this.stageImgWidth + this.leftReferencePoint + "px"; // 位置を設定する(相対)
                cloneElement.style.transform = "rotate(" + angle + "deg)";
                cloneElement.style.display = "none"; //非表示で配置する
                effectLayerElement.appendChild(cloneElement);
                imgElementArray.push(cloneElement);
                nextPosition = getNextPositionFunction(nextPosition);
            }
        });
        // 表示と削除
        const displayTime = effectReadyData.time;
        imgElementArray.forEach((imgElement) => {
            imgElement.style.display = "block";
            setTimeout((imgElement) => {
                imgElement.remove();
                }, displayTime, imgElement);
        });
    }

    /**
     * エフェクト表示の終了
     * エフェクト準備のデータを削除する
     */
    static endEffectDisplay(readyKey){
        if(Number(readyKey) === NaN || readyKey === 0){
            // エラー
            return;
        }
        const effectReadyData = this.effectReadyData.get(readyKey);
        effectReadyData.imgElement.remove();
        this.effectReadyData.delete(readyKey);
    }

    /* 全てのエフェクトデータをセットする */
    static #setAllEffectData(){
        const effectEF000 = {move:true, rotation:true, sound:"00000"};
        this.effectData.set("EF000", effectEF000);
        const effectEF001 = {move:false, rotation:true, sound:"00000"};
        this.effectData.set("EF001", effectEF001);
        // TODO 追加する
    }

    /* エフェクト準備データをセットする */
    static #setEffectReadyData(effectId, time){
        // readyData作成と設定
        const effectData = this.effectData.get(effectId);
        const data = {};
        // {type, move, rotation, sound, time, imgElement}
        data.type = effectData.type;
        data.move = effectData.move;
        data.rotation = effectData.rotation;
        data.sound = effectData.sound;
        data.time = time;
        const imgElement = Image.getEffectImage(effectId);
        imgElement.style.height = this.stageImgHeight;
        imgElement.style.width = this.stageImgWidth;
        data.imgElement = imgElement;
        const maxKey = Math.max(...this.effectReadyData.keys());
        const newKey = maxKey + 1;
        this.effectReadyData.set(newKey, data);
        return newKey;
    }

    /* 画像の回転角を取得する */
    static #getAngle(direction){
        let angle = 0;
        switch(direction){
            case "up":
                angle = 0;
                break;
            case "rightup":
                angle = 45;
                break;
            case "right":
                angle = 90;
                break;
            case "rightdown":
                angle = 135;
                break;
            case "down":
                angle = 180;
                break;
            case "leftdown":
                angle = 225;
                break;
            case "left":
                angle = 270;
                break;
            case "leftup":
                angle = 315;
                break;
            default:
                // エラー
                angle = 0;
                break;
        }
        return angle;
    }

    /* 方向別の次座標作成用関数 */
    static #getNextPositionFunction(direction){
        let getNextFunction
        switch(direction){
            case "up":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x;
                    nextPosition.y = position.y - length;
                    return nextPosition;
                }
                break;
            case "rightup":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x + length;
                    nextPosition.y = position.y - length;
                    return nextPosition;
                }
                break;
            case "right":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x + length;
                    nextPosition.y = position.y;
                    return nextPosition;
                }
                break;
            case "rightdown":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x + length;
                    nextPosition.y = position.y + length;
                    return nextPosition;
                }
                break;
            case "down":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x;
                    nextPosition.y = position.y + length;
                    return nextPosition;
                }
                break;
            case "leftdown":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x - length;
                    nextPosition.y = position.y + length;
                    return nextPosition;
                }
                break;
            case "left":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x - length;
                    nextPosition.y = position.y;
                    return nextPosition;
                }
                break;
            case "leftup":
                getNextFunction = (position, length = 1) => {
                    const nextPosition = {};
                    nextPosition.x = position.x - length;
                    nextPosition.y = position.y - length;
                    return nextPosition;
                }
                break;
            default:
                // エラー
                getNextFunction = (position) => {
                    return position;
                }
                break;
        }
        return getNextFunction;
    }

    /* 次座標作成 */
    static #getNextPosition(position, direction, length = 0){
        const nextPosition = {};
        switch(direction){
            case "up":
                nextPosition.x = position.x;
                nextPosition.y = position.y - length;
                break;
            case "rightup":
                nextPosition.x = position.x + length;
                nextPosition.y = position.y - length;
                break;
            case "right":
                nextPosition.x = position.x + length;
                nextPosition.y = position.y;
                break;
            case "rightdown":
                nextPosition.x = position.x + length;
                nextPosition.y = position.y + length;
                break;
            case "down":
                nextPosition.x = position.x;
                nextPosition.y = position.y + length;
                break;
            case "leftdown":
                nextPosition.x = position.x - length;
                nextPosition.y = position.y + length;
                break;
            case "left":
                nextPosition.x = position.x - length;
                nextPosition.y = position.y;
                break;
            case "leftup":
                nextPosition.x = position.x - length;
                nextPosition.y = position.y - length;
                break;
            default:
                break;
            }
        return nextPosition;
    }
}