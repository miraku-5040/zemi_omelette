class CreateStage{

    /* ダンジョンのランダム生成を実装する */
    static randomStageCreate(){
        const col = new Array(Config.stageCols); //横の配列
            col.fill(Config.voidField); //横の配列を2で埋める
            const row = new Array(Config.stageRows); //縦の配列
            for(let y = 0; y < row.length; y++){
                row[y]=col.concat();
            }
        this.resultStage = JSON.parse(JSON.stringify(row));
        this.createRooms()
        return this.resultStage
    }
    
    static createRooms(){
        //フロア縦
        const divisionRow = Config.divisionRow
        //フロア横
        const divisionCol = Config.divisionCol
        //フロア分割数
        const divisionNumber = divisionCol * divisionRow
        //部屋ごとの最大縦
        const roomRowsMax = Config.roomRowsMax
        //部屋ごとの最大横
        const roomColsMax = Config.roomColsMax
        //部屋ごとの最小縦
        const roomRowsMin = Config.roomRowsMin
        //部屋ごとの最小横
        const roomColsMin = Config.roomColsMin
        //フロアに作る部屋の数
        const roomQuantity = Tool.getRandomInt(Config.roomCountMax,Config.roomCountMin)
        //部屋生成開始地点生成
        const roomPositions = []
        let num = 0
        for(let row = 0; row < divisionRow; row++){
            const y = row * 9 + 2
            for(let col = 0; col < divisionCol; col++){
                const x = col * 10 + 2
                //各部屋の基準になる座標と部屋番号を格納する
                const position = {}
                position.stertX = x
                position.stertY = y
                position.num = num
                num++
                roomPositions.push(position)
            }
        }

        //部屋の数を減らす
        //部屋の数が8未満の場合、右端の列の部屋を消す
        let removeStertNum = 0
        if(roomQuantity < 8){
            roomPositions.splice(14,1)
            roomPositions.splice(9,1)
            roomPositions.splice(4,1)
            removeStertNum = 3
        }
        for(let i = removeStertNum; i < divisionNumber - roomQuantity; i++){
            roomPositions.splice(Tool.getRandomInt(roomPositions.length),1)
        }

        //部屋が存在するか保持する
        const roomExistence = new Array(divisionNumber)
        roomExistence.fill(null)
        //部屋の生成
        roomPositions.forEach((position) => {
            roomExistence[position.num] = position
            const roomRows =   Tool.getRandomInt(roomRowsMax,roomRowsMin)
            const roomCols =   Tool.getRandomInt(roomColsMax,roomColsMin)
            for(let y = 0; y < roomRows; y++){
                for(let x = 0; x < roomCols; x++){
                    //部屋の縁の場合すべて戻る（なくてもできる）*
                    if(y == 0 && x == 0){
                        continue
                    }
                    if(y == 0 && x == roomCols-1){
                        continue
                    }
                    if(y == roomRows-1 && x == roomCols-1){
                        continue
                    }
                    if(y == roomRows-1 && x == 0){
                        continue
                    }
                    
                    if(y == roomRows-1){
                        continue
                    }
                    if(x == 0){
                        continue
                    }
                    if(y == 0){
                        continue
                    }

                    if(x == roomCols-1){
                        continue
                    }
                    //ここまで*
                    this.resultStage[position.stertY + y][position.stertX + x] = Config.regularField
                }
            }
            //部屋の右下の角の座標を保持する（stertとendで部屋の大きさがわかるため）
            position.endX = position.stertX + roomCols - 1
            position.endY = position.stertY + roomRows - 1
        });

        //道の特定
        roomPositions.forEach((position) => {
            //４方向の部屋の情報を定義
            const up = {}
            const down = {}
            const right = {}
            const left =  {}
            //縦
            for(let i = 0; i < divisionRow; i++ ){
                const vertical = divisionCol * i + position.num % divisionCol
                //同じ番地ははじく
                if(position.num == vertical){
                    continue
                }
                //違う番地かつそこに部屋がないなら戻る
                if(roomExistence[vertical] == null){
                    continue
                }
                if(vertical > position.num){
                    //下方向
                    down.num = vertical
                    down.selectX = Tool.getRandomInt(position.endX,position.stertX + 1)
                    down.selectY = position.endY
                    break
                }else{
                    //上方向
                    up.num = vertical
                    up.selectX = Tool.getRandomInt(position.endX,position.stertX + 1)
                    up.selectY = position.stertY
                }
            }
            for(let i = 0; i < divisionCol; i++ ){
                const horizontal = i + divisionCol * Math.floor(position.num / divisionCol)
                //同じ番地ははじく
                if(position.num == horizontal){
                    continue
                }
                //違う番地かつそこに部屋がないなら戻る
                if(roomExistence[horizontal] == null){
                    continue
                }
                if(horizontal > position.num){
                    //右方向
                    right.num = horizontal
                    right.selectX = position.endX
                    right.selectY = Tool.getRandomInt(position.endY,position.stertY + 1)
                    break
                }else{
                    //左方向
                    left.num = horizontal
                    left.selectX = position.stertX
                    left.selectY = Tool.getRandomInt(position.endY,position.stertY + 1)
                }
            }
            position.adjacent = [up,right,left,down]
        })
        //確定
        const noRoodRoom = []
        const upRood = []
        const downRood = []
        const rightRood = []
        const leftRood = []
        //道の生成
        roomPositions.forEach((position) => {
            if(position.adjacent == [{},{},{},{}]){
                noRoodRoom.push(position.num)
                return
            }
            position.adjacent.forEach((direction,directionIndex) => {
                if(Object.keys(direction).length == 0){
                    return
                }
                let halfway = 0
                if(directionIndex % 3 != 0){
                    halfway = Math.floor((roomExistence[direction.num].adjacent[3 - directionIndex].selectX - direction.selectX)/2)
                }else{
                    halfway = Math.floor((roomExistence[direction.num].adjacent[3 - directionIndex].selectY - direction.selectY)/2)
                }
                    switch(directionIndex){
                        case 0:
                            upRood.push({x:direction.selectX, y: direction.selectY + halfway, stertNum: position.num, endNum: direction.num})
                            for(let y = direction.selectY; y >= direction.selectY + halfway; y--){
                                this.resultStage[y][direction.selectX] =  Config.regularField
                            }
                            break
                        case 1:
                            rightRood.push({x: halfway + direction.selectX, y: direction.selectY,stertNum: position.num, endNum: direction.num})
                            for(let x = direction.selectX; x <= halfway + direction.selectX; x++){
                                this.resultStage[direction.selectY][x] =  Config.regularField
                            }
                            break
                        case 2:
                            leftRood.push({x: direction.selectX + halfway, y: direction.selectY,stertNum: position.num, endNum: direction.num})
                            for(let x = direction.selectX; x >= direction.selectX + halfway; x--){
                                this.resultStage[direction.selectY][x] =  Config.regularField
                            }
                            break
                        case 3:
                            downRood.push({x:direction.selectX, y:halfway + direction.selectY,stertNum: position.num, endNum: direction.num})
                            for(let y = direction.selectY; y <= halfway + direction.selectY; y++){
                                    this.resultStage[y][direction.selectX] =  Config.regularField
                            }
                            break
                    }
                //}
            });
            
        });

        
        //道をつなぐ

        //上下
        for(let i = 0; i < upRood.length; i++){
            let selectDownRood = ""
            for(let j = 0; j < downRood.length; j++){
                if(upRood[i].stertNum == downRood[j].endNum && upRood[i].endNum == downRood[j].stertNum){
                    selectDownRood = downRood[j]
                }
            }
            //y軸の確定
            let y = upRood[i].y
            //軸がかぶってない場合
            if(selectDownRood.y != upRood[i].y){
                y += 1
            }
            //x軸の確定、小さいほうを開始地点にする
            let stertX = upRood[i].x
            let endX = selectDownRood.x
            if(upRood[i].x > selectDownRood.x){
                stertX = selectDownRood.x
                endX = upRood[i].x
            }
            for(let x = stertX + 1; x < endX; x++){
                this.resultStage[y][x] =  Config.regularField
            }
        }
        //左右
        for(let i = 0; i < leftRood.length; i++){
            let selectRightRood = ""
            for(let j = 0; j < rightRood.length; j++){
                if(leftRood[i].stertNum == rightRood[j].endNum && leftRood[i].endNum == rightRood[j].stertNum){
                    selectRightRood = rightRood[j]
                }
            }
            let x = leftRood[i].x
            if(selectRightRood.x != leftRood[i].x){
                x += 1
            }
            let stertY = leftRood[i].y
            let endY = selectRightRood.y
            if(leftRood[i].y > selectRightRood.y){
                stertY = selectRightRood.y
                endY = leftRood[i].y
            }
            for(let y = stertY + 1; y < endY; y++){
                this.resultStage[y][x] =  Config.regularField
            }
        }
        const searchStertRoom = roomPositions[0]
        this.connectedRooms = Tool.deepCopy(roomExistence)
        this.searchRooms(searchStertRoom)
        if(JSON.stringify(this.connectedRooms) != JSON.stringify([null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])){
            const selectRooms = []
            for(let room of this.connectedRooms){
                if(room != null){
                    selectRooms.push(room)
                }
            }
            
        }
        //壁を張る
        for(let i = 2;i< Config.stageRows - 1; i++){
            for(let j = 2;j< Config.stageCols; j++){
                //周りを見て壁を置く
                this.createWall(j,i)
            }
        }

    }

    
    //部屋が全部つながってるか再帰探索
    static searchRooms(searchStertRoom){
        if(searchStertRoom == null){
            return
        }
        //４方向見る
        searchStertRoom.adjacent.forEach((direction) => {
            //情報がない
            if(Object.keys(direction).length == 0){
                return
            }
            //あるなら中身のルーム情報を保存
            const nextRoom = this.connectedRooms[direction.num]
            if(this.connectedRooms[direction.num]  == null){
                return
            }else{
                this.connectedRooms[direction.num] = null
            }
            this.searchRooms(nextRoom)
        })
    }

    //壁の設置
    static createWall(x,y){
        if(this.resultStage[y][x] == Config.regularField){
            return
        }
        const regularFieldArray = new Array(8)
        regularFieldArray.fill(false)
        let index = 0
        //8方向のフィールド情報を記録した配列を作る
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(i == 0 && j == 0){continue}
                if(this.resultStage[y + i][x + j] == Config.regularField){
                    regularFieldArray[index] = true
                }
                index++
            }
        }
        //配列の要素すべてがFALSE（床じゃない）場合の比較
        if(JSON.stringify(regularFieldArray) == JSON.stringify([false,false,false,false,false,false,false,false])){
            return
        }
        this.resultStage[y][x] = Config.wallField

    }

    //ボス部屋の作成 フロアの最大値を取った大部屋
    static bossStageCreate(){
        const col = new Array(Config.stageCols); //横の配列
        const walls = new Array(Config.stageCols);
            col.fill(Config.regularField); //横の配列を2で埋める
            col[0] = Config.wallField
            col[col.length - 1] = Config.wallField
            walls.fill(Config.wallField)
            const row = new Array(Config.stageRows); //縦の配列
            for(let y = 0; y < row.length; y++){
                if(y == 0 || y == row.length - 1){
                    row[y]=walls.concat();
                }else{
                    row[y]=col.concat();
                }
            }
            
        this.resultStage = JSON.parse(JSON.stringify(row));
        return this.resultStage
    }

}