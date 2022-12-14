// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var DANJYON_DB = "danjyon";
var ITEM_DB = "item";
var WEAPON_DB = "weapon";

// ダンジョン情報全件取得
function getDanjyonData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore(this.DANJYON_DB);
    Danjyon.fetchAll()
        .then(function (results) {
            setDanjyonName(results);
        })
        .catch(function (err) {
            console.log("ng" + err);
        });

    // ダンジョン名をHTMLに埋め込む
    function setDanjyonName(results) {
        // 初期化
        document.getElementById("note").innerHTML = '';
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var danjyon = results[i];
            // 新しいHTML要素を作成
            var danjyonHtml = '<div id="' + danjyon.danjyon_id + '" onclick="modalOpen();searchDanjyonData(this)"><img class="note_button_image" src="../image/danjyonSelectButton.png" ><p class="note_button_text">' + danjyon.danjyon_name + '</p></div>';
            // 作成した要素を追加
            document.getElementById("note").insertAdjacentHTML('beforeend', danjyonHtml);
        }
    }
}

// ダンジョン情報詳細取得
function searchDanjyonData(danjyonId) {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore(this.DANJYON_DB);
    Danjyon.equalTo("danjyon_id", danjyonId.id)
        .fetchAll()
        .then(function (results) {
            setDanjyonDetail(results);
        })
        .catch(function (err) {
            console.log("ng" + err);
        });

    // ダンジョンの説明をHTMLに埋め込む
    function setDanjyonDetail(results) {
        // 初期化
        var danjyon = results[0];
        document.getElementById("modal_text").innerHTML = '';
        // 情報取得
        // 新しいHTML要素を作成
        var danjyonHtml = '<p class="modal_title" >' + danjyon.danjyon_name.replace("<br>", "") + '</p><p class="modal_note">' + danjyon.danjyon_detail + '</p>';
        console.log(danjyonHtml);
        // 作成した要素を追加
        document.getElementById("modal_text").insertAdjacentHTML('beforeend', danjyonHtml);
    }
}