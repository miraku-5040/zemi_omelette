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
            var weaponHtml = '<div class="pictoriary_item" onclick="getPictWeaponSoloData(' + weapon.weapon_id + ');pictExplainOpen()"><img class="pictoriary_item_image" src="' + weapon.weapon_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加ima
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
            var weaponHtml = '<div class="pictoriary_item" onclick="getPictWeaponSoloData(' + weapon.weapon_id + ');pictExplainOpen()"><img class="pictoriary_item_image" src="' + weapon.weapon_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
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
            var weaponHtml = '<div class="pictoriary_item" onclick="getPictWeaponSoloData(' + weapon.weapon_id + ');pictExplainOpen()"><img class="pictoriary_item_image" src="' + weapon.weapon_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', weaponHtml);
        }
    }
}

// アイテム情報取得
function getPictorialItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.order("item_id", false)
        .fetchAll()
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
            var itemHtml = '<div class="pictoriary_item" onclick="getPictItemSoloData(' + item.item_id + ');pictExplainOpen()"><img class="pictoriary_item_image" src="' + item.item_image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
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
            var itemHtml = '<div class="pictoriary_item" onclick="getPictEnemySoloData(' + enemy.id + ');pictExplainOpen()"><img class="pictoriary_item_image" src="' + enemy.image + '"><p class="pictoriary_item_text">No.' + (i + 1) + '</p></div>';
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
            var story = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="pictoriary_item" onclick="getPictStorySoloData(' + story.id + ');pictExplainOpen()"><img class="pictoriary_item_image" src="../image/book_icon.png"><p class="pictoriary_item_text1">第' + (i + 1) + '話</p></div>';
            // 作成した要素を追加
            document.getElementById("pictorial").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// 1件の武器情報取得
function getPictWeaponSoloData(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Weapon = ncmb.DataStore(this.PICTORIARY_DB);
    Weapon.equalTo("weapon_id", id)
        .fetchAll()
        .then(function (results) {
            setModal(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setModal(results) {
        // 情報取得
        var weapon = results[0];
        // 新しいHTML要素を作成
        document.getElementById("item_image").src = weapon.weapon_image;
        document.getElementById("item_modal_title").innerHTML = weapon.weapon_name;
        document.getElementById("item_modal_note").innerHTML = weapon.weapon_explain;
    }
}

// 1件のアイテム情報取得
function getPictItemSoloData(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.equalTo("item_id", id)
        .fetchAll()
        .then(function (results) {
            setModal(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setModal(results) {
        // 情報取得
        var item = results[0];
        // 新しいHTML要素を作成
        document.getElementById("item_image").src = item.item_image;
        document.getElementById("item_modal_title").innerHTML = item.item_name;
        document.getElementById("item_modal_note").innerHTML = item.item_content;
    }
}

// 1件の敵情報取得
function getPictEnemySoloData(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Enemy = ncmb.DataStore(this.ENEMY_DB);
    Enemy.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            setModal(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setModal(results) {
        // 情報取得
        var enemy = results[0];
        // 新しいHTML要素を作成
        document.getElementById("item_image").src = enemy.image;
        document.getElementById("item_modal_title").innerHTML = enemy.name;
        document.getElementById("item_modal_note").innerHTML = enemy.explain;
    }
}

// 1件の物語情報取得
function getPictStorySoloData(id) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Story = ncmb.DataStore(this.STORY_DB);
    Story.equalTo("id", id)
        .fetchAll()
        .then(function (results) {
            setModal(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setModal(results) {
        // 情報取得
        var story = results[0];
        // 新しいHTML要素を作成
        document.getElementById("item_image").src = "../image/book_icon.png";
        document.getElementById("item_modal_title").innerHTML = story.title;
        document.getElementById("item_modal_note").innerHTML = story.explain;
    }
}