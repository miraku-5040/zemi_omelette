class Control{

    static pressedKeyStatus; //キーボード入力のフラグ

    static initialize () {
        // キーボードの入力を確認する
        this.pressedKeyStatus = {
            right: false,
            left: false,
            up: false,
            down: false
        };

        // ブラウザのキーボードの入力を取得するイベントリスナを登録する
        document.addEventListener('keydown', (e) => {
            DevelopmentMessage.setMessage(e.code);
            // キーボードが押された場合
            switch(e.code) {
                case 37: // 左向きキー
                    this.pressedKeyStatus.left = true;
                    e.preventDefault(); return false;
                case 38: // 上向きキー
                    this.keyStatus.up = true;
                    e.preventDefault(); return false;
                case 39: // 右向きキー
                    this.keyStatus.right = true;
                    e.preventDefault(); return false;
                case 40: // 下向きキー
                    this.keyStatus.down = true;
                    e.preventDefault(); return false;
            }
        });
        document.addEventListener('keyup', (e) => {
            // キーボードが離された場合
            switch(e.code) {
                case 37: // 左向きキー
                    this.keyStatus.left = false;
                    e.preventDefault(); return false;
                case 38: // 上向きキー
                    this.keyStatus.up = false;
                    e.preventDefault(); return false;
                case 39: // 右向きキー
                    this.keyStatus.right = false;
                    e.preventDefault(); return false;
                case 40: // 下向きキー
                    this.keyStatus.down = false;
                    e.preventDefault(); return false;
            }
        });  
    }
    /* pressedKeyStatus取得 */
    static getPressedKeyStatus(){
        return this.pressedKeyStatus;
    }
}