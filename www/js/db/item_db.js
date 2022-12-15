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
    Item.fetchAll()
        .then(function (results) {
            console.log(results);
            setItemImage(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // アイテムの画像(仮)と残数をHTMLに埋め込む
    function setItemImage(results) {
        // 情報取得
        for (var i = 0; i <= results.length - 1; i++) {
            var item = results[i];
            // 新しいHTML要素を作成
            var itemHtml = '<div class="item_border" onclick="item_detail()"><img class="list_material" id="weapon" src="../image/item/item-provisional.png"><p class="item_text_position">×' + item.sum + '</p></div>';
            // 作成した要素を追加
            window.onload = function () {
                document.getElementById("items").insertAdjacentHTML('beforeend', itemHtml)
            }
        }
    }
}