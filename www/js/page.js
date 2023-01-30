function toHome() {
    // 音声再生
    go_sound();
    // マイページ画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function toReady() {
    // 音声再生
    go_sound();
    // 戦闘準備画面へ遷移
    setTimeout('window.location.href = "../html/ready.html"', 600);
}

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

function outShop() {
    // 音声再生
    go_sound();
    // 街画面へ遷移
    setTimeout('window.location.href = "town.html"', 600);
}

function toSelectDanjyon() {
    // 音声再生
    go_sound();
    // ダンジョン選択画面へ遷移
    setTimeout('window.location.href = "danjyonSelect.html"', 600);
}

function toGameImage() {
    // 音声再生
    audio = new Audio("../sound/start.m4a");
    audio.play();
    // スタート画面からのマイページ画面へ遷移
    setTimeout('window.location.href = "../home.html"', 600);
}

function toGatya() {
    // 音声再生
    go_sound();
    // ガチャ画面へ遷移
    setTimeout('window.location.href = "gatya.html"', 600);
}

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

function toItem() {
    // 音声再生
    go_sound();
    // 持ち物画面へ遷移
    setTimeout('window.location.href = "item.html"', 600);
}

function toEquip() {
    // 音声再生
    go_sound();
    // 装備画面へ遷移
    setTimeout('window.location.href = "equip.html"', 600);
}

function toPower() {
    // 音声再生
    go_sound();
    // 強化選択画面へ遷移
    setTimeout('window.location.href = "power.html"', 600);
}

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

function toDanjyon() {
    // 音声再生
    audio = new Audio("../sound/danjyon_start.m4a");
    audio.play();
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

function toEventGatya() {
    // 音声再生
    go_sound();
    // イベントガチャ画面へ遷移
    setTimeout('window.location.href = "eventGatya.html"', 600);
}

function toEventStory() {
    // 音声再生
    go_sound();
    // イベントガチャ画面へ遷移
    setTimeout('window.location.href = "eventStory.html"', 600);
}

function toEvent() {
    // 音声再生
    go_sound();
    // イベント画面へ遷移
    setTimeout('window.location.href = "../html/event.html"', 600);
}

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

// 項目ボタンの切り替え
function weaponColumn(element) {
    // 音声再生
    go_sound();
    // 項目ボタンのCSS初期化
    ColumnButtonInitialization();
    // ボタンを金色にする
    const weaponColumn = document.getElementById(element.id);
    weaponColumn.style.background = 'black';
    weaponColumn.style.border = 'black';
    weaponColumn.style.borderRight = '5px solid rgb(85, 85, 85)';
    weaponColumn.style.borderBottom = '5px solid rgb(99, 99, 99)';
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
    itemColumn.style.background = 'black';
    itemColumn.style.border = 'black';
    itemColumn.style.borderRight = '5px solid rgb(85, 85, 85)';
    itemColumn.style.borderBottom = '5px solid rgb(99, 99, 99)';
    itemColumn.style.color = 'white';
}

// モーダルウィンドウ用js
//モーダルウィンドウを開く
function modalOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'block';
}

function modalClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('explanationModal');
    modal.style.display = 'none';
}

// ガチャ用モーダルウィンドウ用js
//モーダルウィンドウを開く
function modalOpen1() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('gatyaOneModal');
    modal.style.display = 'block';
}

function modalClose1() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('gatyaOneModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function modalOpen10() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('gatyaTenModal');
    modal.style.display = 'block';
}

function modalClose10() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('gatyaTenModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function targetOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('targetModal');
    modal.style.display = 'block';
}

function targetClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('targetModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function skillOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('skillModal');
    modal.style.display = 'block';
}

function skillClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('skillModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function memberOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('memberModal');
    modal.style.display = 'block';
}

function memberClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('memberModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function guildRewardOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('guildRewardModal');
    modal.style.display = 'block';
}

function guildRewardClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('guildRewardModal');
    modal.style.display = 'none';
}

//モーダルウィンドウを開く
function pictExplainOpen() {
    // 音声再生
    audio = new Audio("../sound/menu_open.m4a");
    audio.play();
    // モーダルウィンドウを開く
    const modal = document.getElementById('PictDetailModal');
    modal.style.display = 'block';
}

function pictExplainClose() {
    // 音声再生
    audio = new Audio("../sound/cansel.m4a");
    audio.play();
    // モーダルウィンドウを閉じる
    const modal = document.getElementById('PictDetailModal');
    modal.style.display = 'none';
}

// 辞書の題名変更
function setSoadTitle() {
    document.getElementById('pict_title').innerHTML = "武器";
}

function setShieldTitle() {
    document.getElementById('pict_title').innerHTML = "防具";
}

function setDecorationTitle() {
    document.getElementById('pict_title').innerHTML = "装飾";
}

function setItemTitle() {
    document.getElementById('pict_title').innerHTML = "アイテム";
}

function setEnemyTitle() {
    document.getElementById('pict_title').innerHTML = "敵";
}

function setStoryTitle() {
    document.getElementById('pict_title').innerHTML = "物語";
}

// 音声再生用のjs
// 画面遷移用の音声再生
function go_sound() {
    audio = new Audio("../sound/select.m4a");
    audio.play();
}

function go_movie() {
    video = new Video("../image/train.gif");
    video.play();
}

// 項目ボタンのCSS初期化
function ColumnButtonInitialization() {
    document.getElementById('soadcolumn').style.background = 'rgb(231, 231, 231)';
    document.getElementById('soadcolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('soadcolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('soadcolumn').style.borderBottom = '5px solid white';
    document.getElementById('soadcolumn').style.color = 'black';

    document.getElementById('shieldcolumn').style.background = 'rgb(231, 231, 231)';
    document.getElementById('shieldcolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('shieldcolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('shieldcolumn').style.borderBottom = '5px solid white';
    document.getElementById('shieldcolumn').style.color = 'black';

    document.getElementById('decorationcolumn').style.background = 'rgb(231, 231, 231)';
    document.getElementById('decorationcolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('decorationcolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('decorationcolumn').style.borderBottom = '5px solid white';
    document.getElementById('decorationcolumn').style.color = 'black';
}

function ColumnButtonInitializationPlus() {
    document.getElementById('othercolumn').style.background = 'white';
    document.getElementById('othercolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('othercolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('othercolumn').style.borderBottom = '5px solid white';
    document.getElementById('othercolumn').style.color = 'black';

    document.getElementById('soadcolumn').style.background = 'white';
    document.getElementById('soadcolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('soadcolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('soadcolumn').style.borderBottom = '5px solid white';
    document.getElementById('soadcolumn').style.color = 'black';

    document.getElementById('shieldcolumn').style.background = 'white';
    document.getElementById('shieldcolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('shieldcolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('shieldcolumn').style.borderBottom = '5px solid white';
    document.getElementById('shieldcolumn').style.color = 'black';

    document.getElementById('decorationcolumn').style.background = 'white';
    document.getElementById('decorationcolumn').style.border = 'rgb(231, 231, 231)';
    document.getElementById('decorationcolumn').style.borderRight = '5px solid rgb(241, 241, 241)';
    document.getElementById('decorationcolumn').style.borderBottom = '5px solid white';
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