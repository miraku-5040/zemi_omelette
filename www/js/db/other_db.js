// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var CHARACTER_DB = "character";
var NOTICE_DB = "notice";
var PRESENT_DB = "present";
var ITEM_DB = "item";

// プレゼントデータ取得
function getPresentData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Present = ncmb.DataStore(this.PRESENT_DB);
    Present.fetchAll()
        .then(function (results) {
            setPresentData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    function setPresentData(results) {
        // 初期化
        document.getElementById("modal-body").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var present = results[i];
            // 新しいHTML要素を作成
            var presentHtml = '<div class="present_box"><h4 class="present_title">' + present.present_title + '</h4><p class="present_text">' + present.present_content + '</p><button class="present_button" id="present_button" value="' + present.objectId + '" onclick="getSoloPresentData()">受け取る</button></div>';
            // 作成した要素を追加
            document.getElementById("modal-body").insertAdjacentHTML('beforeend', presentHtml);
        }
    }
}

// プレゼントデータ1件取得→アイテムに追加
function getSoloPresentData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.ITEM_DB);
    var Present = ncmb.DataStore(this.PRESENT_DB);
    var item_count = "";
    var objectId = String(document.getElementById("present_button").value);
    // アイテムidからプレゼント個数を割り出す
    Present.equalTo("objectId", objectId)
        .fetchAll()
        .then(function (results) {
            var present = results[0];
            // ↓ここが出ていない
            item_count = present.present_count;
            // アイテム移動
            Item.equalTo("item_id", present.present_item)
                .fetchAll()
                .then(function (results) {
                    var item = results[0];
                    console.log(Number(item.sum) + Number(item_count));
                    // ↓更新が出来ない
                    results.set("sum", Number(item.sum) + Number(item_count))
                        .update();
                    console.log("ok");
                    presentReceive();
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}

// キャラクター情報取得
function getCharacterData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // キャラクター情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        // ランク入れ替え
        document.getElementById("rank_text").innerHTML = 'ランク：' + character.character_rank;
        // プレイヤー名入れ替え
        document.getElementById("player_name").innerHTML = character.character_name;
        // HP入れ替え
        document.getElementById("hp_ber").value = character.character_hp;
        document.getElementById("hp_ber_amount").innerHTML = character.character_hp + '/100';
        // MP入れ替え
        document.getElementById("mp_ber").value = character.character_mp;
        document.getElementById("mp_ber_amount").innerHTML = character.character_mp + '/100';
        // Exp入れ替え
        document.getElementById("exp_text").innerHTML = character.character_exp + '/1000';
        document.getElementById("exp_ber").value = character.character_exp;
        // 攻撃力入れ替え
        document.getElementById("attack").innerHTML = '攻撃力：' + character.character_attack;
        // 回避率入れ替え
        document.getElementById("avoid").innerHTML = '回避率：' + character.character_avoid;
        // 会心率入れ替え
        document.getElementById("avd").innerHTML = '会心率：' + character.character_avd;
        // 命中率入れ替え
        document.getElementById("hit").innerHTML = '命中率：' + character.character_hit;
        // 職業入れ替え
        document.getElementById("job").innerHTML = '職業：' + character.character_job;
    }
}

// キャラクター情報取得(短縮版)
function getShorteCharacterData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Character = ncmb.DataStore(this.CHARACTER_DB);
    Character.fetchAll()
        .then(function (results) {
            setCharacterData(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // キャラクター情報をHTMLに埋め込む
    function setCharacterData(results) {
        var character = results[0];
        // ランク入れ替え
        document.getElementById("rank_text").innerHTML = 'ランク' + character.character_rank;
        // プレイヤー名入れ替え
        document.getElementById("player_name").innerHTML = character.character_name;
        // HP入れ替え
        document.getElementById("hp_ber").value = character.character_hp;
        document.getElementById("hp_ber_amount").innerHTML = character.character_hp + '/100';
        // MP入れ替え
        document.getElementById("mp_ber").value = character.character_mp;
        document.getElementById("mp_ber_amount").innerHTML = character.character_mp + '/100';
        // Exp入れ替え
        document.getElementById("exp_text").innerHTML = character.character_exp + '/1000';
        document.getElementById("exp_ber").value = character.character_exp;
    }
}

// 通知情報取得
function getNoticeData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Notice = ncmb.DataStore(this.NOTICE_DB);
    Notice.fetchAll()
        .then(function (results) {
            setNoticeText(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // 通知の題名と文章をHTMLに埋め込む
    function setNoticeText(results) {
        // 初期化
        document.getElementById("notice_body").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var notice = results[i];
            // 新しいHTML要素を作成
            var noticeHtml = '<button class="notice_button"><h2>' + notice.notice_title + '</h2><p>' + notice.notice_content + '</p></button>';
            // 作成した要素を追加
            document.getElementById("notice_body").insertAdjacentHTML('beforeend', noticeHtml);
        }
    }
}