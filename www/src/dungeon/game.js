
window.addEventListener("load", () => {
    // まずステージを整える
    initialize();
    loop();
});

function initialize() {
    // 画像を準備する
    Image.initialize();
    // ステージを準備する
    Stage.initialize();
    //プレイヤーの準備
    Player.initialize();
    //コントローラを準備する
    Control.initialize();
    // 開始フラグ
    mode = 'start';
    // フレームを初期化する
    frame = 0;
}

function loop() {
    switch(mode) {
        case 'start':
            // 開始
            Stage.createStage();
            mode = 'player';
            break;
        case 'player':
            // プレイヤーのターン
            //ボタン入力待ち
            mode = Player.playing();
            break;
        case 'move':
            // 移動に関するとこ
            //床の判定含む
            mode = Player.moving();
            // 階段なら mode = 'nextfloor'
            break;
        case 'attack':
            // 攻撃に関するとこ
            mode = 'enemy';
            break;
        case 'item':
            // 道具に関するとこ
            mode = 'enemy';
            break;
        case 'menu':
            // メニュー
            mode = 'enemy';
            break;
        case 'field':
            //トラップ
            //階段
            //落ちてるアイテム
            break;
        case 'enemy':
            // 敵のターン
            mode = 'end';
            break;
        case 'end':
                mode = 'player';
            break;
        case 'nextfloor':
            //次のフロアの準備及び次々のフロアの作成
            break;
    }
    frame++;
    requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
}
