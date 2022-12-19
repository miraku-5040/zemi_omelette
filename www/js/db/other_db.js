// DBを使用する際に使用するキー＆DB名
var APPLICATION_KEY = "158b2446e92d4ee3d4c8aaae041c1b98bb09e8b524c12375e5428dfb532ba5f9";
var CLIENT_KEY = "f83827ab1b5914e21026733a26c5a92ef53b415b17ec3a2a90512179430297ed";

var NOTICE_DB = "notice";
var PRESENT_DB = "present";

// 通知情報取得
function getNoticeData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Item = ncmb.DataStore(this.NOTICE_DB);
    Item.fetchAll()
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