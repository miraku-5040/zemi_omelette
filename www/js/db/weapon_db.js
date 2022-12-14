// 武器情報取得
function getItemData() {
    var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
    var Danjyon = ncmb.DataStore(this.WEAPON_DB);
    Danjyon.fetchAll()
        .then(function (results) {
            console.log(results);
        })
        .catch(function (err) {
            console.log(err);
        });
}