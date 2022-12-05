
window.addEventListener("load", () => {
    // まずステージを整える
    initialize();
    loop();
});

function initialize() {
    console.log(screen.width+" "+screen.height)
    // 画像を準備する
    Image.initialize();
    // ステージを準備する
    Stage.initialize();
    //コントローラを準備する
    Control.initialize();
    // 開始フラグ
    mode = 'start';
    // フレームを初期化する
    frame = 0;
    Player.initialize();
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
           Player.playing();
            mode = 'enemy';
            break;
        case 'enemy':
            // 敵のターン
            mode = 'player';
            break;
    }
    frame++;
    requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
}
