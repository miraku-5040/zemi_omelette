// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var ITEM_DB = "item";
var PICTORIARY_DB = "pictorialWeapon";
var ENEMY_DB = "enemy";
var STORY_DB = "story";

// 剣の表示
function getPictorialSoadData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.PICTORIARY_DB);
    Weapon.equalTo("weapon_type", "soad")
        .fetchAll()
        .then(function (results) {
            setSoadImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setSoadImage(results) {
        // 初期化
        document.getElementById("pictorial").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="pictoriary_item"><img class="pictoriary_item_image" src="' + weapon.weapon_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 盾の表示
function getPictorialShieldData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.PICTORIARY_DB);
    Weapon.equalTo("weapon_type", "shield")
        .fetchAll()
        .then(function (results) {
            setSoadImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setSoadImage(results) {
        // 初期化
        document.getElementById("pictorial").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="pictoriary_item"><img class="pictoriary_item_image" src="' + weapon.weapon_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// 宝石の表示
function getPictorialDecorationData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.PICTORIARY_DB);
    Weapon.equalTo("weapon_type", "decoration")
        .fetchAll()
        .then(function (results) {
            setSoadImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 武器の画像(仮)とレベルをHTMLに埋め込む
    function setSoadImage(results) {
        // 初期化
        document.getElementById("pictorial").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var weapon = results[i];
            // 新しいHTML要素を作成
            var weaponHtml = '<div class="pictoriary_item"><img class="pictoriary_item_image" src="' + weapon.weapon_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// アイテム情報取得
function getPictorialItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.fetchAll()
        .then(function (results) {
            setItemImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテムの画像(仮)と残数をHTMLに埋め込む
    function setItemImage(results) {
        // 初期化
        document.getElementById("pictorial").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var item = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="pictoriary_item"><img class="pictoriary_item_image" src="' + item.item_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// 敵情報取得
function getEnemyData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Enemy = ncmb.DataStore(this.ENEMY_DB);
    Enemy.fetchAll()
        .then(function (results) {
            setItemImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテムの画像(仮)と残数をHTMLに埋め込む
    function setItemImage(results) {
        // 初期化
        document.getElementById("pictorial").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var enemy = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="pictoriary_item"><img class="pictoriary_item_image" src="' + enemy.image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// 物語情報取得
function getStoryData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Story = ncmb.DataStore(this.STORY_DB);
    Story.fetchAll()
        .then(function (results) {
            setItemImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテムの画像(仮)と残数をHTMLに埋め込む
    function setItemImage(results) {
        // 初期化
        document.getElementById("pictorial").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var item = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="pictoriary_item"><img class="pictoriary_item_image"><p class="pictoriary_item_text">第' + (i + 1) + '話</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}