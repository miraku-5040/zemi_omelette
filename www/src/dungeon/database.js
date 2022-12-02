/* データベースアクセスを行うjs */
/* 作成中は固定値を記載して、後からDBに変更する */
class Database{

    static applicationKey = '143f42bd82f20826946c4c8cc877ce1bd500d3097a29a5c8a5abf86d903af183';
    static clientKey = '62e4efddf1009cd6b7558b2d720d395f4cd43c73cdfa89a289112ee54ed165ac';
    static ncmb;

    /* 初期化 */
    static initialize(){
        //this.ncmb = new NCMB(this.applicationKey, this.clientKey);
    }

    /* DB接続テストのメソッド */
    static test(){
        const id = 'test';
        const TestDataStore = this.ncmb.DataStore(id);
        const testDataStore = new TestDataStore();

        testDataStore.set('col', 'test1').set('col2', 'test2').set('col3', 'test3').save().then(function(testDataStore){
            //登録成功
            console.log('testDB:OK'); //test
        }).catch(function(err){
            //登録失敗
            console.log('testDB:NG'); //test
        });
    }

    /* プレイヤー情報取得 */
    static getPlayer(id = NaN){
        let playerData = {};
        return playerData;
    }
}