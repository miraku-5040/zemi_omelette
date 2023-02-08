/* エフェクトを表示するjs */
class Effect {

    /**
     * 初期化
     */
    static initialize() {
        this.effectData = new Map();
        this.#setAllEffectData();
        this.effectReadyData = new Map();
        this.effectReadyData.set(0, "");
        // {imgElement, sound, direction}
        this.stageImgHeight = Config.stageImgHeight;
        this.stageImgWidth = Config.stageImgWidth;
        this.topReferencePoint = Config.playerReferencePointTop * Config.stageImgHeight;
        this.leftReferencePoint = Config.playerReferencePointLeft * Config.stageImgWidth;
    }

    /**
 * スキル範囲のエフェクトを表示する
 * effectIdが"SE"(scopeEffect)のものを処理する
 * positionArrayの形式:[{x, y, direction, length}, ...]
 */
    static scopeEffectDisplay(effectId, positionArray) {
        const readyKey = this.#setEffectReadyData(effectId);
        const effectReadyData = this.effectReadyData.get(readyKey);
        if (effectReadyData.move) { //画像移動あり
            this.#moveEffectDisplay(effectReadyData, positionArray);
        } else { //画像移動なし
            this.#fixEffectDisplay(effectReadyData, positionArray);
        }
        this.endEffectDisplay(readyKey);
    }

    /**
 * スキル対象のエフェクトの準備をする
 * effectIdが"TE"(targetEffect)のものを処理する
 */
    static targetEffectReady(effectId) {
        const readyKey = this.#setEffectReadyData(effectId);
        return readyKey;
    }

    /**
     *  ターゲットエフェクトを表示する
     */
    static targetEffectDisplay(readyKey, positionArray) {
        // データ準備
        const effectReadyData = this.effectReadyData.get(readyKey);
        if (effectReadyData === undefined) { //keyエラー
            console.error("readyKeyエラー");
            return;
        }
        const effectLayerElement = document.getElementById("effect_layer");
        const imgElementArray = [];
        positionArray.forEach((position) => {
            const relativePosition = this.#convertAbsoluteToRelative(position);
            const cloneImgElement = effectReadyData.imgElement.cloneNode();
            cloneImgElement.style.top = relativePosition.y * this.stageImgHeight + this.topReferencePoint + "px"; // 位置を設定する(相対)
            cloneImgElement.style.left = relativePosition.x * this.stageImgWidth + this.leftReferencePoint + "px"; // 位置を設定する(相対)
            if(effectReadyData.rotation){
                //回転する場合
                const angle = this.#getAngle(relativePosition.direction);
                cloneImgElement.style.transform = "rotate(" + angle + "deg)";
            }
            cloneImgElement.style.display = "none"; //非表示で配置する
            effectLayerElement.appendChild(cloneImgElement);
            imgElementArray.push(cloneImgElement);
        });
        // 表示と削除
        const audioElement = effectReadyData.audioElement;
        audioElement.play();
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
    static endEffectDisplay(readyKey) {
        if (Number(readyKey) === NaN || readyKey === 0) {
            // エラー
            return;
        }
        const effectReadyData = this.effectReadyData.get(readyKey);
        effectReadyData.imgElement.remove();
        this.effectReadyData.delete(readyKey);
    }

    /* 座標移動するエフェクトを表示する */
    static #moveEffectDisplay(effectReadyData, positionArray) {
        // データ準備
        const effectLayerElement = document.getElementById("effect_layer");
        const imgElement = effectReadyData.imgElement;
        const imgElementArray = [];
        const displayTime = effectReadyData.time;
        positionArray.forEach((position) => {
            const relativePosition = this.#convertAbsoluteToRelative(position);
            const cloneImgElement = imgElement.cloneNode();
            cloneImgElement.style.top = relativePosition.y * this.stageImgHeight + this.topReferencePoint + "px"; // 位置を設定する(相対)
            cloneImgElement.style.left = relativePosition.x * this.stageImgWidth + this.leftReferencePoint + "px"; // 位置を設定する(相対)
            if(effectReadyData.rotation){
                //回転する場合
                const angle = this.#getAngle(relativePosition.direction);
                cloneImgElement.style.transform = "rotate(" + angle + "deg)";
            }
            cloneImgElement.style.display = "none"; //非表示で配置する
            effectLayerElement.appendChild(cloneImgElement);
            imgElementArray.push(cloneImgElement);
            //animation
            const endPosition = this.#getNextPosition({ x: 0, y: 0 }, relativePosition.direction, relativePosition.length);
            const moveX = endPosition.x * this.stageImgWidth;
            const moveY = endPosition.y * this.stageImgHeight;
            const animateKeyfreames = [
                { transform: "translate(0, 0)" }, // check
                { transform: "translate(" + moveX + "px, " + moveY + "px)" } // check
            ]; //キーフレーム
            const animateOption = {
                fill: "forwards",
                iterations: 1,
                duration: displayTime,
                composite: 'accumulate'
            }; //オプション
            const animate = cloneImgElement.animate(animateKeyfreames, animateOption);
            animate.pause();
        });
        // 表示と削除
        const audioElement = effectReadyData.audioElement;
        audioElement.play();
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
    static #fixEffectDisplay(effectReadyData, relativePositionArray) {
        // データ準備
        const effectLayerElement = document.getElementById("effect_layer");
        const imgElement = effectReadyData.imgElement;
        const imgElementArray = [];
        relativePositionArray.forEach((position) => {
            const relativePosition = this.#convertAbsoluteToRelative(position);
            const getNextPositionFunction = this.#getNextPositionFunction(relativePosition.direction);
            let nextPosition = relativePosition;
            for (let i = relativePosition.length; i >= 0; i--) {
                const cloneElement = imgElement.cloneNode();
                cloneElement.style.top = nextPosition.y * this.stageImgHeight + this.topReferencePoint + "px"; // 位置を設定する(相対)
                cloneElement.style.left = nextPosition.x * this.stageImgWidth + this.leftReferencePoint + "px"; // 位置を設定する(相対)
                if(effectReadyData.rotation){
                    //回転する場合
                    const angle = this.#getAngle(relativePosition.direction);
                    cloneImgElement.style.transform = "rotate(" + angle + "deg)";
                }
                cloneElement.style.display = "none"; //非表示で配置する
                effectLayerElement.appendChild(cloneElement);
                imgElementArray.push(cloneElement);
                nextPosition = getNextPositionFunction(nextPosition);
            }
        });
        // 表示と削除
        const audioElement = effectReadyData.audioElement;
        audioElement.play();
        const displayTime = effectReadyData.time;
        imgElementArray.forEach((imgElement) => {
            imgElement.style.display = "block";
            setTimeout((imgElement) => {
                imgElement.remove();
            }, displayTime, imgElement);
        });
    }
    /* 全てのエフェクトデータをセットする */
    static #setAllEffectData() {
        const effectSE000 = { move: true, rotation: true, time: 1000, audio: "EM000", image: "EF000" };
        this.effectData.set("SE000", effectSE000);
        const effectSE001 = { move: false, rotation: true, time: 1000, audio: "EM000", image: "EF001" };
        this.effectData.set("SE001", effectSE001);
        const effectSE002 = { move: true, rotation: true, time: 1000, audio: "EM000", image: "EF001" };
        this.effectData.set("SE002", effectSE002);
        const effectTE000 = { move: false, rotation: false, time: 1000, audio: "EM000", image: "EF000" };
        this.effectData.set("TE000", effectTE000);
        const effectTE001 = { move: false, rotation: true, time: 1000, audio: "EM000", image: "EF001" };
        this.effectData.set("TE001", effectTE001);
        const effectTE002 = { move: false, rotation: true, time: 1000, audio: "EM000", image: "EF001" };
        this.effectData.set("TE002", effectTE002);
        // TODO 追加する
    }

    /* エフェクト準備データをセットする */
    static #setEffectReadyData(effectId) {
        // readyData作成と設定
        const effectData = this.effectData.get(effectId);
        const data = {};
        // {id, move, rotation, time, audioElement, imgElement}
        data.id = effectId;
        data.move = effectData.move;
        data.rotation = effectData.rotation;
        data.time = effectData.time;
        data.audioElement = this.#createAudioElement(effectData.audio);
        const imgElement = Image.getEffectImage(effectData.image);
        imgElement.style.height = this.stageImgHeight;
        imgElement.style.width = this.stageImgWidth;
        data.imgElement = imgElement;
        const maxKey = Math.max(...this.effectReadyData.keys());
        const newKey = maxKey + 1;
        this.effectReadyData.set(newKey, data);
        return newKey;
    }

    /* audioElementを作成する */
    static #createAudioElement(audioId) {
        if (audioId === "") {
            //効果音なしの場合
            return new Audio();
        }
        const fileExtension = ".mp3";
        const fileName = audioId + fileExtension;
        const basePath = "./sound/";
        const filePath = basePath + fileName;
        const audioElement = new Audio(filePath);
        audioElement.autoplay = false;
        audioElement.loop = false;
        return audioElement;
    }

    /* 画像の回転角を取得する */
    static #getAngle(direction) {
        let angle = 0;
        switch (direction) {
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
    static #getNextPositionFunction(direction) {
        let getNextFunction
        switch (direction) {
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
    static #getNextPosition(position, direction, length = 0) {
        const nextPosition = {};
        switch (direction) {
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

    /* ステージ座標(絶対座標)からプレイヤー相対座標に変換 */
    static #convertAbsoluteToRelative(absoluteX, absoluteY){
        const startingPoint = Player.getPlayerNowPosition();
        const relativeX = absoluteX - startingPoint.x;
        const relativeY = absoluteY - startingPoint.y;
        return { x: relativeX, y: relativeY }
    }
}