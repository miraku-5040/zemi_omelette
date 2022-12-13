function toHome() {
    // 音声再生
    go_sound();
    // マイページ画面へ遷移
    setTimeout('window.location.href = "home.html"', 600);
}

function toSelectDanjyon() {
    // 音声再生
    go_sound();
    getDanjyonData();
    // ダンジョン選択画面へ遷移
    setTimeout('window.location.href = "html/danjyonSelect.html"', 600);
}

function toGatya() {
    // 音声再生
    go_sound();
    // ガチャ画面へ遷移
    setTimeout('window.location.href = "html/gatya.html"', 600);
}

function toItem() {
    // 音声再生
    go_sound();
    // 持ち物画面へ遷移
    setTimeout('window.location.href = "html/item.html"', 600);
}

function toPower() {
    // 音声再生
    go_sound();
    // 強化画面へ遷移
    setTimeout('window.location.href = "html/power.html"', 600);
}

function toSet() {
    // 音声再生
    go_sound();
    // 設定画面へ遷移
    setTimeout('window.location.href = "html/setting.html"', 600);
}

// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("sound/select.m4a");
    audio.play();
}

// お知らせ用モーダルウィンドウ用js
//モーダルウィンドウを開く
function noticeModalOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('noticeModal');
    modal.style.display = 'block';
}

function noticeModalClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('noticeModal');
    modal.style.display = 'none';
}

// プレゼント用モーダルウィンドウ用js
//モーダルウィンドウを開く
function presentModalOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('presentModal');
    modal.style.display = 'block';
}

function presentModalClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('presentModal');
    modal.style.display = 'none';
}
