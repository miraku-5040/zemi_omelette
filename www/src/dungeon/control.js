class Control{

    static pressedKeyStatus; //キーボード入力のフラグ
    static longPressKeyStatus; //キーボード入力長押しのフラグ
    //同時押しはキャンセルする
    static initialize () {
        // キーボードの入力を確認する
        this.pressedKeyStatus = {
            right: false,
            left: false,
            up: false,
            down: false
        };

        //キーボード長押しの入力を確認する
        this.longPressedKeyStatus = {
            right: false,
            left: false,
            up: false,
            down: false
        };

        // ブラウザのキーボードの入力を取得するイベントリスナを登録する
        document.addEventListener('keydown', (e) => {
            // TODO 長押し判定の処理を追加する
            // キーボードが押された場合
            switch(e.key) {
                case "ArrowLeft": // 左向きキー
                    this.pressedKeyStatus.left = true;
                    e.preventDefault(); return false;
                case "ArrowUp": // 上向きキー
                    this.pressedKeyStatus.up = true;
                    e.preventDefault(); return false;
                case "ArrowRight": // 右向きキー
                    this.pressedKeyStatus.right = true;
                    e.preventDefault(); return false;
                case "ArrowDown": // 下向きキー
                    this.pressedKeyStatus.down = true;
                    e.preventDefault(); return false;
            }
        });
        document.addEventListener('keyup', (e) => {
            // キーボードが離された場合
            switch(e.key) {
                case "ArrowLeft": // 左向きキー
                    this.pressedKeyStatus.left = false;
                    this.longPressedKeyStatus.left = false;
                    e.preventDefault(); return false;
                case "ArrowUp": // 上向きキー
                    this.pressedKeyStatus.up = false;
                    this.longPressedKeyStatus.up = false;
                    e.preventDefault(); return false;
                case "ArrowRight": // 右向きキー
                    this.pressedKeyStatus.right = false;
                    this.longPressedKeyStatus.right = false;
                    e.preventDefault(); return false;
                case "ArrowDown": // 下向きキー
                    this.pressedKeyStatus.down = false;
                    this.longPressedKeyStatus.down = false;
                    e.preventDefault(); return false;
            }
        });
    }
    /* pressedKeyStatus取得 */
    static getPressedKeyStatus(){
        //どのキーがtrueか確認
        if(this.pressedKeyStatus.up) {
            return 'up';
        }
        if(this.pressedKeyStatus.down) {
            return 'down';
        }
        if(this.pressedKeyStatus.right) {
            return 'right';
        }
        if(this.pressedKeyStatus.left) {
            return 'left';
        }
    }
}