function toMypage() {
    // マイページ画面へ遷移
    window.location.href = "html/mypage.html";
}

function toSelectDanjyon() {
    // ダンジョン選択画面へ遷移
    window.location.href = "index.html";
}

function toGatya() {
    // ガチャ画面へ遷移
    window.location.href = "html/gatya.html";
}

function result() {
    // ガチャ結果画面へ遷移
    window.location.href = "html/result.html";
}

function toItem() {
    // 持ち物画面へ遷移
    window.location.href = "html/item.html";
}

function toPower() {
    // 強化画面へ遷移
    window.location.href = "html/power.html";
}

function toSet() {
    // 設定画面へ遷移
    window.location.href = "html/setting.html";
}

function toDanjyon() {
    // ダンジョン画面へ遷移
    window.location.href = "html/danjyon.html";
}

// モーダルウィンドウ用js
function modalOpen() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'block';
}

function modalClose() {
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'none';
}
