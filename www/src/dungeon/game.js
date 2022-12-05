
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
}

function loop() {
    switch(mode) {
        case 'start':
            // 開始
            mode = 'player';
            break;
        case 'player':
            // プレイヤーのターン
            Player.playing(frame)
            mode = 'checkFall';
            break;
        case 'enemy':
            // 敵のターン
            mode = 'player';
            break;
    }
    frame++;
    requestAnimationFrame(loop); // 1/60秒後にもう一度呼び出す
}
