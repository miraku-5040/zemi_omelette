// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("sound/select.m4a");
    audio.play();
}

// 以下ページ遷移
// 以下ホーム画面内
function toInfo() {
    // 音声再生
    go_sound();
    // プレイヤー情報画面へ遷移
    setTimeout('window.location.href = "html/playerInfo.html"', 600);
}

function toSet() {
    // 音声再生
    go_sound();
    // 設定画面へ遷移
    setTimeout('window.location.href = "html/setting.html"', 600);
}

function toStart() {
    // 音声再生
    go_sound();
    // スタート画面へ遷移
    setTimeout('window.location.href = "html/start.html"', 600);
}

function toCharaInfo() {
    // 音声再生
    go_sound();
    // キャラクター紹介画面へ遷移
    setTimeout('window.location.href = "html/character_info.html"', 600);
}

function toDiaBuy() {
    // 音声再生
    go_sound();
    // 水晶購入画面へ遷移
    setTimeout('window.location.href = "html/crystalBuy.html"', 600);
}

function toDayLogin() {
    // 音声再生
    go_sound();
    // 毎日ログイン画面へ遷移
    setTimeout('window.location.href = "html/dayLogin.html"', 600);
}

function toEvent() {
    // 音声再生
    audio = new Audio("sound/door_open.m4a");
    audio.play();
    // イベント画面へ遷移
    setTimeout('window.location.href = "html/event.html"', 600);
}

function toMap() {
    // 音声再生
    audio = new Audio("sound/map.m4a");
    audio.play();
    // 地図画面へ遷移
    setTimeout('window.location.href = "html/map.html"', 600);
}

function toPict() {
    // 音声再生
    audio = new Audio("sound/page.m4a");
    audio.play();
    // 図鑑画面へ遷移
    setTimeout('window.location.href = "html/pictoriary.html"', 600);
}

function toGuild() {
    // 音声再生
    audio = new Audio("sound/door_open.m4a");
    audio.play();
    // ギルド画面へ遷移
    setTimeout('window.location.href = "html/guild.html"', 600);
}

// 以下フッターのボタン
function toHome() {
    // 音声再生
    go_sound();
    // ホーム画面へ遷移
    setTimeout('window.location.href = "home.html"', 600);
}

function toSelectDanjyon() {
    // 音声再生
    go_sound();
    // ダンジョン選択画面へ遷移
    setTimeout('window.location.href = "html/danjyonSelect.html"', 600);
}

function toEquip() {
    // 音声再生
    go_sound();
    // 装備画面へ遷移
    setTimeout('window.location.href = "html/equip.html"', 600);
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
    // 強化方法選択画面へ遷移
    setTimeout('window.location.href = "html/power.html"', 600);
}

function toGatya() {
    // 音声再生
    go_sound();
    // ガチャ画面へ遷移
    setTimeout('window.location.href = "html/gatya.html"', 600);
}

// 以下動作
// キャラクターのボイス再生
function voice_fire() {
    var random = Math.floor(Math.random() * 11);
    if (random > 5) {
        audio = new Audio("sound/hello.m4a");
    } else {
        audio = new Audio("sound/go.m4a");
    }
    audio.play();
}

// プレゼント画面の受け取るボタンの見た目変更＆活性/不活性変更
function presentReceive() {
    // 音声再生
    audio = new Audio("sound/succsess.m4a");
    audio.play();
    // ボタン変更
    const presentButton = document.getElementById('present_button');
    presentButton.style.backgroundColor = '#D9D9D9';
    presentButton.disabled = true;
}

// 以下モーダルウィンドウの開閉
// コイン購入用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openCoin() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('coinModal');
    modal.style.display = 'block';
}

function closeCoin() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('coinModal');
    modal.style.display = 'none';
}

// お知らせ用モーダルウィンドウ用js
//モーダルウィンドウを開く
function noticeModalOpen() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('noticeModal');
    modal.style.display = 'block';
}

function noticeModalClose() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('noticeModal');
    modal.style.display = 'none';
}

// プレゼント用モーダルウィンドウ用js
//モーダルウィンドウを開く
function presentModalOpen() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('presentModal');
    modal.style.display = 'block';
}

function presentModalClose() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('presentModal');
    modal.style.display = 'none';
}

// メニュー用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openMenu() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('settingModal');
    modal.style.display = 'block';
}

function closeMenu() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('settingModal');
    modal.style.display = 'none';
}

// デイリー用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openDairy() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('dairyModal');
    modal.style.display = 'block';
}

function closeDairy() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('dairyModal');
    modal.style.display = 'none';
}

// 実績用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openAchieve() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('achieveModal');
    modal.style.display = 'block';
}

function closeAchieve() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('achieveModal');
    modal.style.display = 'none';
}

// フレンド用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openFriend() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('friendModal');
    modal.style.display = 'block';
}

function closeFriend() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('friendModal');
    modal.style.display = 'none';
}

// チャット用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openChat() {
    // 音声再生
    audio = new Audio("sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('chatModal');
    modal.style.display = 'block';
    getAllChatData();
}

function closeChat() {
    // 音声再生
    audio = new Audio("sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('chatModal');
    modal.style.display = 'none';
}

// BGM
function soundBGM() {
    // BGM再生
    audio = new Audio("sound/BGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}