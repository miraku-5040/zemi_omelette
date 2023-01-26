// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";

// アイテム情報取得
function getItemData() {
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
        document.getElementById("items").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var item = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="item_border" id="' + item.item_id + '" onclick="item_detail();getSoloItemData(this)"><img class="list_material1" src="' + item.item_image + '"><p class="item_text_position1">×' + item.sum + '</p></div>';
            // 作成した要素を追加
            document.getElementById("items").insertAdjacentHTML('beforeend', itemHtml);
        }
    }
}

// アイテム情報取得(1件)
function getSoloItemData(element) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.equalTo("item_id", Number(element.id))
        .fetchAll()
        .then(function (results) {
            setItemImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテムの画像(仮)と残数をHTMLに埋め込む
    function setItemImage(results) {
        // 情報取得
        var item = results[0];
        // 新しいHTML要素を作成
        document.getElementById("item_image").src = item.item_image;
        document.getElementById("item_modal_title").innerHTML = item.item_name;
        document.getElementById("item_modal_note").innerHTML = item.item_content;
    }
}

// アイテム残数更新(強化)
function updateItemSum() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    let element = document.getElementById('counter1');
    var remaining = Number(element.max) - Number(element.value);
    Item.equalTo("item_id", 1)
        .fetch()
        .then(function (results) {
            console.log(results);
            results.set("sum", Number(remaining));
            results.update();

            element = document.getElementById('counter2');
            remaining = Number(element.max) - Number(element.value);
            Item.equalTo("item_id", 2)
                .fetch()
                .then(function (results) {
                    console.log(results);
                    results.set("sum", Number(remaining));
                    results.update();

                    element = document.getElementById('counter3');
                    remaining = Number(element.max) - Number(element.value);
                    Item.equalTo("item_id", 3)
                        .fetch()
                        .then(function (results) {
                            console.log(results);
                            results.set("sum", Number(remaining));
                            results.update();
                            PowerUpSuccsess();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}

// アイテム残数更新(進化)
function updateEvoItemSum() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    let element = document.getElementById('power_ber');
    var remaining = Number(element.max) - Number(element.value);
    Item.equalTo("item_id", 9)
        .fetch()
        .then(function (results) {
            results[0].set("sum", Number(remaining));
            return results[0].update();
        })
        .catch(function (err) {
            console.log(err);
        });
}

// アイテム残数取得(強化)
function getItemSum() {
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
}

// アイテムの残数をHTMLに埋め込む
function setItemImage(results) {
    // 初期化
    document.getElementById("item_frame").innerHTML = '';
    // 情報取得
    var item = results[0];
    // 新しいHTML要素を作成
    var itemHtml = '<div class="power_for_item"><img class="power_for_item_image" src="../image/item/r_powerItem.png"><p class="power_for_item_text">' + item.item_name + '</p> <div class="power_for_item_count"><button class="power_for_item_count_minus" onclick="countDown1()"><p class="count_button_text">－</p></button><input class="power_for_item_count_number" id="counter1" value="0" max="' + item.sum + '"><button class="power_for_item_count_plus" onclick="countUp1()"><p class="count_button_text">＋</p></button></div></div>';
    // 作成した要素を追加
    document.getElementById("item_frame").insertAdjacentHTML('beforeend', itemHtml);

    // 情報取得
    var item = results[1];
    // 新しいHTML要素を作成
    var itemHtml = '<div class="power_for_item"><img class="power_for_item_image" src="../image/item/sr_powerItem.png"><p class="power_for_item_text">' + item.item_name + '</p> <div class="power_for_item_count"><button class="power_for_item_count_minus" onclick="countDown2()"><p class="count_button_text">－</p></button><input class="power_for_item_count_number" id="counter2" value="0" max="' + item.sum + '"><button class="power_for_item_count_plus" onclick="countUp2()"><p class="count_button_text">＋</p></button></div></div>';
    // 作成した要素を追加
    document.getElementById("item_frame").insertAdjacentHTML('beforeend', itemHtml);

    // 情報取得
    var item = results[2];
    // 新しいHTML要素を作成
    var itemHtml = '<div class="power_for_item"><img class="power_for_item_image" src="../image/item/ssr_powerItem.png"><p class="power_for_item_text">' + item.item_name + '</p> <div class="power_for_item_count"><button class="power_for_item_count_minus" onclick="countDown3()"><p class="count_button_text">－</p></button><input class="power_for_item_count_number" id="counter3" value="0" max="' + item.sum + '"><button class="power_for_item_count_plus" onclick="countUp3()"><p class="count_button_text">＋</p></button></div></div>';
    // 作成した要素を追加
    document.getElementById("item_frame").insertAdjacentHTML('beforeend', itemHtml);
}

// アイテム残数取得(進化)
function getEvoItemSum() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    Item.equalTo("item_id", 9)
        .fetchAll()
        .then(function (results) {
            setItemImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテムの残数をHTMLに埋め込む
    function setItemImage(results) {
        // 初期化
        document.getElementById("item_frame").innerHTML = '';
        // 情報取得
        var item = results[0];
        // 新しいHTML要素を作成
        var itemHtml = '<div class="power_for_item"><img class="power_for_item_image" src="../image/item/IW4008.png"><p class="power_for_item_text">' + item.item_name + '</p><div class="power_for_item_count"><button class="power_for_item_count_minus" onclick="evoCountDown()"><p class="count_button_text">－</p></button><input class="power_for_item_count_number" id="counterEvo" value="0" max="' + item.sum + '"><button class="power_for_item_count_plus"onclick="evoCountUp()"><p class="count_button_text">＋</p></button> </div></div>';
        // 作成した要素を追加
        document.getElementById("item_frame").insertAdjacentHTML('beforeend', itemHtml);
    }
}

// ガチャロジック
function pullItem1() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    // 乱数発生(1から9)
    var random = Math.floor(Math.random() * 9) + 1;
    // 武器の全データ取得
    Item.equalTo("item_id", Number(random))
        .fetchAll()
        .then(function (results) {
            var item = results[0];
            // 背景色変更
            var weaponHtml = '<img class="result_image" src="' + item.item_image +'">';
            // 作成した要素を追加
            document.getElementById("results").insertAdjacentHTML('beforeend', weaponHtml);
            updateEventPointCount(20);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// ガチャロジック
function pullItem10() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    for (var i = 1; i <= 10; i++) {
        // 乱数発生(1から9)
    var random = Math.floor(Math.random() * 9) + 1;
    // 武器の全データ取得
    Item.equalTo("item_id", Number(random))
        .fetchAll()
        .then(function (results) {
            var item = results[0];
            // 背景色変更
            var weaponHtml = '<img class="result_image" src="' + item.item_image +'">';
            // 作成した要素を追加
            document.getElementById("results").insertAdjacentHTML('beforeend', weaponHtml);
            updateEventPointCount(200);
        })
        .catch(function (err) {
            console.log(err);
        });        
    }
}