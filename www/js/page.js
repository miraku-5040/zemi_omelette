// 画面遷移ボタン
// 以下フッターのボタン
function toHome() {
    // 音声再生
    go_sound();
    // ホーム画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function toSelectDanjyon() {
    // 音声再生
    go_sound();
    // ダンジョン選択画面へ遷移
    setTimeout('window.location.href = "danjyonSelect.html"', 600);
}

function toEquip() {
    // 音声再生
    go_sound();
    // 装備画面へ遷移
    setTimeout('window.location.href = "equip.html"', 600);
}

function toItem() {
    // 音声再生
    go_sound();
    // 持ち物画面へ遷移
    setTimeout('window.location.href = "item.html"', 600);
}

function toPower() {
    // 音声再生
    go_sound();
    // 強化選択画面へ遷移
    setTimeout('window.location.href = "power.html"', 600);
}

function toGatya() {
    // 音声再生
    go_sound();
    // ガチャ画面へ遷移
    setTimeout('window.location.href = "gatya.html"', 600);
}

// 以下ダンジョン選択画面のボタン
function toReady() {
    // 音声再生
    go_sound();
    // 戦闘準備画面へ遷移
    setTimeout('window.location.href = "../html/ready.html"', 600);
}

// 以下地図、街、ショップ画面のボタン
function toMap() {
    // 音声再生
    go_sound();
    // 地図画面へ遷移
    setTimeout('window.location.href = "map.html"', 600);
}

function goTown() {
    // 音声再生
    audio = new Audio("../sound/zoom.m4a");
    audio.play();
    // 街画面へ遷移
    setTimeout('window.location.href = "town.html"', 600);
}

function goHome() {
    // 音声再生
    audio = new Audio("../sound/zoom.m4a");
    audio.play();
    // 街画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function outShop() {
    // 音声再生
    go_sound();
    // 街画面へ遷移
    setTimeout('window.location.href = "town.html"', 600);
}

function toShop1() {
    // 音声再生
    audio = new Audio("../sound/shop.m4a");
    audio.play();
    // 武器屋画面へ遷移
    setTimeout('window.location.href = "weaponShop.html"', 1000);
}

function toShop2() {
    // 音声再生
    audio = new Audio("../sound/shop.m4a");
    audio.play();
    // 書店画面へ遷移
    setTimeout('window.location.href = "skillShop.html"', 1000);
}

function toShop3() {
    // 音声再生
    audio = new Audio("../sound/shop.m4a");
    audio.play();
    // 市場画面へ遷移
    setTimeout('window.location.href = "itemShop.html"', 1000);
}

// 以下ガチャ画面に関するボタン
function resultOne() {
    // 音声再生
    audio = new Audio("../sound/gatya.m4a");
    audio.play();
    // 1回ガチャ結果画面へ遷移
    setTimeout('window.location.href = "resultOne.html"', 1200);
}

function resultTen() {
    // 音声再生
    audio = new Audio("../sound/gatya.m4a");
    audio.play();
    // 10回ガチャ結果画面へ遷移
    setTimeout('window.location.href = "resultTen.html"', 1200);
}

function toPullItem1() {
    // 音声再生
    audio = new Audio("../sound/gatya.m4a");
    audio.play();
    // 1回ガチャ結果画面へ遷移
    setTimeout('window.location.href = "eventResultOne.html"', 1200);
}

function toPullItem10() {
    // 音声再生
    audio = new Audio("../sound/gatya.m4a");
    audio.play();
    // 10回ガチャ結果画面へ遷移
    setTimeout('window.location.href = "eventResultTen.html"', 1200);
}

// 以下強化方法選択画面に関するボタン
function toPowerStrengthen() {
    // 音声再生
    go_sound();
    // 強化画面へ遷移
    setTimeout('window.location.href = "powerStrengthen.html"', 600);
}

function toPowerEvolution() {
    // 音声再生
    go_sound();
    // 進化画面へ遷移
    setTimeout('window.location.href = "powerEvolution.html"', 600);
}

function toSkill() {
    // 音声再生
    go_sound();
    // 進化画面へ遷移
    setTimeout('window.location.href = "skill.html"', 600);
}

function toStatus() {
    // 音声再生
    go_sound();
    // ステータス強化画面へ遷移
    setTimeout('window.location.href = "status.html"', 600);
}

function toWeaponPower() {
    // 音声再生
    go_sound();
    // 強化武器選択画面へ遷移
    setTimeout('window.location.href = "weaponSelectPower.html"', 600);
}

function toWeaponEvo() {
    // 音声再生
    go_sound();
    // 進化武器選択画面へ遷移
    setTimeout('window.location.href = "weaponSelectEvo.html"', 600);
}

// 以下その他
function toGameImage() {
    // 音声再生
    audio = new Audio("../sound/start.m4a");
    audio.play();
    // スタート画面からのマイページ画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function toSet() {
    // 音声再生
    go_sound();
    // 設定画面へ遷移
    setTimeout('window.location.href = "setting.html"', 600);
}

function toStart() {
    // 音声再生
    go_sound();
    // スタート画面へ遷移
    setTimeout('window.location.href = "start.html"', 600);
}

// イベント画面のボタン
function toEvent() {
    // 音声再生
    go_sound();
    // イベント画面へ遷移
    setTimeout('window.location.href = "../html/event.html"', 600);
}

function toEventGatya() {
    // 音声再生
    go_sound();
    // イベントガチャ画面へ遷移
    setTimeout('window.location.href = "eventGatya.html"', 600);
}

function toEventStory() {
    // 音声再生
    go_sound();
    // イベントストーリー画面へ遷移
    setTimeout('window.location.href = "eventStory.html"', 600);
}

// 以下ギルド画面のボタン
function toGuild() {
    // 音声再生
    go_sound();
    // ギルド画面へ遷移
    setTimeout('window.location.href = "../html/guild.html"', 600);
}

function toGuildShop() {
    // 音声再生
    go_sound();
    // ギルドショップ画面へ遷移
    setTimeout('window.location.href = "../html/guildShop.html"', 600);
}

// 以下動作
// ダンジョン開始音声
function toDanjyon() {
    // 音声再生
    audio = new Audio("../sound/danjyon_start.m4a");
    audio.play();
}

// 項目ボタンの切り替え
function weaponColumn(element) {
    // 音声再生
    go_sound();
    // 項目ボタンのCSS初期化
    ColumnButtonInitialization();
    // ボタンを黒色にする
    const weaponColumn = document.getElementById(element.id);
    weaponColumn.style.background = 'rgb(0, 0, 0, 0.9)';
    weaponColumn.style.border = 'rgb(0, 0, 0, 0.9)';
    weaponColumn.style.borderRight = '5px solid rgb(85, 85, 85, 0.9)';
    weaponColumn.style.borderBottom = '5px solid rgb(99, 99, 99, 0.9)';
    weaponColumn.style.color = 'white';
}

// 項目ボタンの切り替え
function itemColumn(element) {
    // 音声再生
    go_sound();
    // 項目ボタンのCSS初期化
    ColumnButtonInitializationPlus();
    // ボタンを金色にする
    const itemColumn = document.getElementById(element.id);
    itemColumn.style.background = 'rgb(0, 0, 0, 0.9)';
    itemColumn.style.border = 'rgb(0, 0, 0, 0.9)';
    itemColumn.style.borderRight = '5px solid rgb(85, 85, 85, 0.9)';
    itemColumn.style.borderBottom = '5px solid rgb(99, 99, 99, 0.9)';
    itemColumn.style.color = 'white';
}

// モーダルウィンドウ用js
//モーダルウィンドウを開く
function modalOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // ダンジョン説明用モーダルウィンドウを開く
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'block';
}

function modalClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // ダンジョン説明用モーダルウィンドウを閉じる
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'none';
}

// ガチャ用モーダルウィンドウ用js
//モーダルウィンドウを開く
function modalOpen1() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // ガチャ確認用(1連用)モーダルウィンドウを開く
    const modal = document.getElementById('gatyaOneModal');
    modal.style.display = 'block';
}

function modalClose1() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // ガチャ確認用(1連用)モーダルウィンドウを閉じる
    const modal = document.getElementById('gatyaOneModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function modalOpen10() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // ガチャ確認用(10連用)モーダルウィンドウを開く
    const modal = document.getElementById('gatyaTenModal');
    modal.style.display = 'block';
}

function modalClose10() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // ガチャ確認用(10連用)モーダルウィンドウを閉じる
    const modal = document.getElementById('gatyaTenModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function targetOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // イベント目標用モーダルウィンドウを開く
    const modal = document.getElementById('targetModal');
    modal.style.display = 'block';
}

function targetClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // イベント目標用モーダルウィンドウを閉じる
    const modal = document.getElementById('targetModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function skillOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // スキル選択用モーダルウィンドウを開く
    const modal = document.getElementById('skillModal');
    modal.style.display = 'block';
}

function skillClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // スキル選択用モーダルウィンドウを閉じる
    const modal = document.getElementById('skillModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function memberOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // ギルドメンバー用モーダルウィンドウを開く
    const modal = document.getElementById('memberModal');
    modal.style.display = 'block';
}

function memberClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // ギルドメンバー用モーダルウィンドウを閉じる
    const modal = document.getElementById('memberModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function guildRewardOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // 報酬用モーダルウィンドウを開く
    const modal = document.getElementById('guildRewardModal');
    modal.style.display = 'block';
}

function guildRewardClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // 報酬用モーダルウィンドウを閉じる
    const modal = document.getElementById('guildRewardModal');
    modal.style.display = 'none';
}

// チャット用モーダルウィンドウ用js
//モーダルウィンドウを開く
function openGuildChat() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('guildChatModal');
    modal.style.display = 'block';
    getGuildChatData();
}

function closeGuildChat() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('guildChatModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function pictExplainOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // 辞書詳細説明用モーダルウィンドウを開く
    const modal = document.getElementById('PictDetailModal');
    modal.style.display = 'block';
}

function pictExplainClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // 辞書詳細説明用モーダルウィンドウを閉じる
    const modal = document.getElementById('PictDetailModal');
    modal.style.display = 'none';
}

// 辞書の題名変更
function setSoadTitle() {
    // 音声再生
    audio = new Audio("../sound/page.m4a");
    audio.play();
    document.getElementById('pict_title').innerHTML = "武器";
}

function setShieldTitle() {
    // 音声再生
    audio = new Audio("../sound/page.m4a");
    audio.play();
    document.getElementById('pict_title').innerHTML = "防具";
}

function setDecorationTitle() {
    // 音声再生
    audio = new Audio("../sound/page.m4a");
    audio.play();
    document.getElementById('pict_title').innerHTML = "装飾";
}

function setItemTitle() {
    // 音声再生
    audio = new Audio("../sound/page.m4a");
    audio.play();
    document.getElementById('pict_title').innerHTML = "アイテム";
}

function setEnemyTitle() {
    // 音声再生
    audio = new Audio("../sound/page.m4a");
    audio.play();
    document.getElementById('pict_title').innerHTML = "敵";
}

function setStoryTitle() {
    // 音声再生
    audio = new Audio("../sound/page.m4a");
    audio.play();
    document.getElementById('pict_title').innerHTML = "物語";
}

// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("../sound/select.m4a");
    audio.play();
}

// 項目ボタンのCSS初期化
function ColumnButtonInitialization() {
    document.getElementById('soadcolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('soadcolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('soadcolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('soadcolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('soadcolumn').style.color = 'black';

    document.getElementById('shieldcolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('shieldcolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('shieldcolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('shieldcolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('shieldcolumn').style.color = 'black';

    document.getElementById('decorationcolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('decorationcolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('decorationcolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('decorationcolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('decorationcolumn').style.color = 'black';
}

function ColumnButtonInitializationPlus() {
    document.getElementById('othercolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('othercolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('othercolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('othercolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('othercolumn').style.color = 'black';

    document.getElementById('soadcolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('soadcolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('soadcolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('soadcolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('soadcolumn').style.color = 'black';

    document.getElementById('shieldcolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('shieldcolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('shieldcolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('shieldcolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('shieldcolumn').style.color = 'black';

    document.getElementById('decorationcolumn').style.background = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('decorationcolumn').style.border = 'rgb(231, 231, 231, 0.9)';
    document.getElementById('decorationcolumn').style.borderRight = '5px solid rgb(241, 241, 241, 0.9)';
    document.getElementById('decorationcolumn').style.borderBottom = '5px solid rgb(255, 255, 255, 0.9)';
    document.getElementById('decorationcolumn').style.color = 'black';
}

function soundBGM() {
    // BGM再生
    audio = new Audio("../sound/BGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}

function soundEventBGM() {
    // BGM再生
    audio = new Audio("../sound/eventBGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}

function soundCityBGM() {
    // BGM再生
    audio = new Audio("../sound/cityBGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}

function soundGuildBGM() {
    // BGM再生
    audio = new Audio("../sound/guildBGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}

function soundPictBGM() {
    // BGM再生
    audio = new Audio("../sound/pictBGM.m4a");
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}