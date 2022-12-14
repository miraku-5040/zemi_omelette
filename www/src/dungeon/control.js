class Control{

    static pressedKeyStatus; //キーボード入力のフラグ
    static longPressKeyStatus; //キーボード入力長押しのフラグ
    //同時押しはキャンセルする
    static initialize () {
        // キーボードの入力を確認する
        this.pressedKeyStatus = {
            right: 0,
            left: 0,
            up: 0,
            down: 0,
            leftup: 0,
            rightup: 0,
            rightdown: 0,
            leftdown: 0,
            attack: 0,
            defence: 0,
            skill: 0,
            item: 0

        };
        // ブラウザのキーボードの入力を取得するイベントリスナを登録する
        document.addEventListener('keydown', (e) => {
            // キーボードが押された場合
            switch(e.key) {
                case "4": // 左向きキー
                    this.pressedKeyStatus.left += 1;
                    e.preventDefault(); return false;
                case "8": // 上向きキー
                    this.pressedKeyStatus.up += 1;
                    e.preventDefault(); return false;
                case "6": // 右向きキー
                    this.pressedKeyStatus.right += 1;
                    e.preventDefault(); return false;
                case "2": // 下向きキー
                    this.pressedKeyStatus.down += 1;
                    e.preventDefault(); return false;
                case "7": // 左上向きキー
                    this.pressedKeyStatus.leftup += 1;
                    e.preventDefault(); return false;
                case "9": // 右上向きキー
                    this.pressedKeyStatus.rightup += 1;
                    e.preventDefault(); return false;
                case "3": // 右下向きキー
                    this.pressedKeyStatus.rightdown += 1;
                    e.preventDefault(); return false;
                case "1": // 左下向きキー
                    this.pressedKeyStatus.leftdown += 1;
                    e.preventDefault(); return false;
                case "q": // 攻撃キー
                    this.pressedKeyStatus.attack += 1;
                    e.preventDefault(); return false;
                case "w": // 防御キー
                    this.pressedKeyStatus.defence += 1;
                    e.preventDefault(); return false;
                case "e": // スキルキー
                    this.pressedKeyStatus.skill += 1;
                    e.preventDefault(); return false;
                case "r": // 道具キー
                    this.pressedKeyStatus.item += 1;
                    e.preventDefault(); return false;
            }
        });
        document.addEventListener('keyup', (e) => {
            // キーボードが離された場合
            switch(e.key) {
                case "4": // 左向きキー
                    this.pressedKeyStatus.left = 0;
                    e.preventDefault(); return false;
                case "8": // 上向きキー
                    this.pressedKeyStatus.up = 0;
                    e.preventDefault(); return false;
                case "6": // 右向きキー
                    this.pressedKeyStatus.right = 0;
                    e.preventDefault(); return false;
                case "2": // 下向きキー
                    this.pressedKeyStatus.down = 0;
                    e.preventDefault(); return false;
                case "7": // 左上向きキー
                    this.pressedKeyStatus.leftup = 0;
                    e.preventDefault(); return false;
                case "9": // 右上向きキー
                    this.pressedKeyStatus.rightup = 0;
                    e.preventDefault(); return false;
                case "3": // 右下向きキー
                    this.pressedKeyStatus.rightdown = 0;
                    e.preventDefault(); return false;
                case "1": // 左下向きキー
                    this.pressedKeyStatus.leftdown = 0;
                    e.preventDefault(); return false;
                case "q": // 攻撃キー
                    this.pressedKeyStatus.attack = 0;
                    e.preventDefault(); return false;
                case "w": // 防御キー
                    this.pressedKeyStatus.defence = 0;
                    e.preventDefault(); return false;
                case "e": // スキルキー
                    this.pressedKeyStatus.skill = 0;
                    e.preventDefault(); return false;
                case "r": // 道具キー
                    this.pressedKeyStatus.item = 0;
                    e.preventDefault(); return false;
            }
        });
    }
    /* pressedKeyStatus取得 */
    static getPressedKeyStatus(){
        //どのキーがtrueか確認
        if(this.pressedKeyStatus.up > Config.keyPressedCount) {
            this.pressedKeyStatus.up = 0;
            return 'up';
        }else if (this.pressedKeyStatus.up <= Config.keyPressedCount && this.pressedKeyStatus.up > 0){
            return 'upDirection';
        }else{
        }

        if(this.pressedKeyStatus.down > Config.keyPressedCount) {
            this.pressedKeyStatus.down = 0;
            return 'down';
        }else if (this.pressedKeyStatus.down <= Config.keyPressedCount && this.pressedKeyStatus.down > 0){
            return 'downDirection';
        }else{
        }

        if(this.pressedKeyStatus.right > Config.keyPressedCount) {
            this.pressedKeyStatus.right = 0;
            return 'right';
        }else if (this.pressedKeyStatus.right <= Config.keyPressedCount && this.pressedKeyStatus.right > 0){
            return 'rightDirection';
        }else{
        }
        
        if(this.pressedKeyStatus.left > Config.keyPressedCount) {
            this.pressedKeyStatus.left = 0;
            return 'left';
        }else if (this.pressedKeyStatus.left <= Config.keyPressedCount && this.pressedKeyStatus.left > 0){
            return 'leftDirection';
        }else{
        }

        if(this.pressedKeyStatus.leftup > Config.keyPressedCount) {
            this.pressedKeyStatus.leftup = 0;
            return 'leftup';
        }else if (this.pressedKeyStatus.leftup <= Config.keyPressedCount && this.pressedKeyStatus.leftup > 0){
            return 'leftupDirection';
        }else{
        }

        if(this.pressedKeyStatus.rightup > Config.keyPressedCount) {
            this.pressedKeyStatus.rightup = 0;
            return 'rightup';
        }else if (this.pressedKeyStatus.rightup <= Config.keyPressedCount && this.pressedKeyStatus.rightup > 0){
            return 'rightupDirection';
        }else{
        }

        if(this.pressedKeyStatus.rightdown > Config.keyPressedCount) {
            this.pressedKeyStatus.rightdown = 0;
            return 'rightdown';
        }else if (this.pressedKeyStatus.rightdown <= Config.keyPressedCount && this.pressedKeyStatus.rightdown > 0){
            return 'rightdownDirection';
        }else{
        }

        if(this.pressedKeyStatus.leftdown > Config.keyPressedCount) {
            this.pressedKeyStatus.leftdown = 0;
            return 'leftdown';
        }else if (this.pressedKeyStatus.leftdown <= Config.keyPressedCount && this.pressedKeyStatus.leftdown > 0){
            return 'leftdownDirection';
        }else{
        }

        if(this.pressedKeyStatus.attack) {
            return 'attack';
        }
        if(this.pressedKeyStatus.defence) {
            return 'defence';
        }
        if(this.pressedKeyStatus.skill) {
            return 'skill';
        }
        if(this.pressedKeyStatus.item) {
            return 'item';
        }
        return false;
    }
}