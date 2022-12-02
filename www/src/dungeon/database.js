/* データベースアクセスを行うjs */
class Database{

    static applicationKey = '143f42bd82f20826946c4c8cc877ce1bd500d3097a29a5c8a5abf86d903af183';
    static clientKey = '62e4efddf1009cd6b7558b2d720d395f4cd43c73cdfa89a289112ee54ed165ac';
    static ncmb;

    /* 初期化 */
    static initialize(){
        this.ncmb = new NCMB(this.applicationKey, this.clientKey);
        //this.test();
        this.getPlayer(1);
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

    /* プレイヤー取得 */
    static getPlayer(id = NaN){
        const checkedId = Number(id);
        if(checkedId === NaN){
            //引数エラー
            return null;
        }
        const PlayerDataStore = 
        this.ncmb.DataStore('player');
        let queryResultArray = [];
        PlayerDataStore.equalTo("player_id", checkedId)
         .order("player_id",true)
         .fetchAll()
         .then(function(results){
             for(let i = 0; i < results.length; i++){
                queryResultArray.push(results[i]);
             }
          }).catch(function(err){
            console.log(err);
          });
          console.log(queryResultArray); //test
          return queryResultArray;
    }
}
window.addEventListener('load', Database.initialize());