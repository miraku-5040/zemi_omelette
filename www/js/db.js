var APPLICATION_KEY = "e6f9020ac8d5ecea47cd27edccdb5e8c54e0b9213bf5b9d3ca38eef71e521e4b";
var CLIENT_KEY = "ec91fc6e35a7dc7b17195450909e170105054be57619cc5e0c8bf9bbaa0d3a60";

// ダンジョン情報表示
function getDanjyonData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore("danjyon");
    Danjyon.fetchAll()
        .then(function (results) {
            console.log(getUser.janjyon_name);
            setDanjyonName(results);
        })
        .catch(function (err) {
            console.log(err);
        });

    // ユーザデータを設定
    function setDanjyonName(array) {
        for (i = 0; i < array.length; i++) {
            // 新しいHTML要素を作成
            var danjyonHtml = '<img class="note_button_image" src="../image/danjyonSelectButton.png" onclick="modalOpen()"><p class="note_button_text">' + array[i].danjyon_name + '</p>';
            // 作成した要素を追加
            document.querySelector('#note').insertAdjacentHTML('beforeend', danjyonHtml);
        }
    }
}