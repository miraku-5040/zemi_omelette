class CreateStage{
    
    static initialize(){
        this.stageArray = []
        let stage = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,5,5,5,5,5,5,10,2,2,2,2,2,2,2,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,6,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,9,5,5,5,5,5,5,5,5,5,10,2,2,2,2,2,2,4,1,1,1,1,1,1,14,5,5,5,5,5,5,5,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,14,5,5,5,5,5,5,13,1,1,1,1,1,1,11,3,3,12,1,11,3,3,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,11,3,3,3,3,3,3,12,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,4,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,8,3,3,3,3,12,1,11,3,3,7,2,2,2,2,2,2,4,1,1,1,1,1,1,6,2,2,4,1,6,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,3,7,2,2,4,1,6,2,2,8,3,3,3,3,3,3,3,12,1,11,3,3,3,3,7,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,9,5,5,5,5,5,5,5,5,5,5,5,5,13,1,14,10,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,9,5,5,13,1,14,5,5,10,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,4,1,6,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,9,5,5,5,13,1,14,5,5,5,10,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,14,5,5,5,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,11,3,3,3,12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,6,2,2,2,2,2,2,2,2,2,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,13,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,14,5,5,5,5,5,5,5,5,5,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,3,3,3,3,3,3,3,3,3,3,3,3,3,12,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,4,1,1,1,1,1,1,1,11,3,3,3,3,3,3,3,3,3,3,3,7,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,8,3,3,3,3,3,3,3,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,1,1,6,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,3,3,3,3,7,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];
        this.stageArray.push(stage)
        stage = [[9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7]] 
        this.stageArray.push(stage)
        stage = [[9,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [8,3,3,12,1,11,3,3,3,3,3,3,3,3,12,1,11,3,3,7],
                    [2,2,2,4,1,6,2,2,2,2,2,2,2,2,4,1,6,2,2,2],
                    [9,5,5,13,1,14,5,5,5,5,5,5,5,5,13,1,14,5,5,10],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6],
                    [8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7]] 
        this.stageArray.push(stage)
    }

    static randomStageSelect(){
        this.initialize()
        const index = Tool.getRandomInt(this.stageArray.length)
        return this.stageArray[1]
    }

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
    /*凍結*/
    static createRooms(){
        //フロア縦
        const divisionRow = 3
        //フロア横
        const divisionCol = 5
        //フロア分割数
        const divisionNumber = divisionCol * divisionRow
        //部屋ごとの最大縦
        const roomRowsMax = 10
        //部屋ごとの最大横
        const roomColsMax = 10
        //部屋ごとの最小縦
        const roomRowsMin = 6
        //部屋ごとの最小横
        const roomColsMin = 6
        //フロアに作る部屋の数
        const roomQuantity = Tool.getRandomInt(11,6)
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

        //console.log(JSON.stringify(roomPositions))
        
        //部屋の数を減らす
        for(let i = 0; i < divisionNumber - roomQuantity; i++){
            roomPositions.splice(Tool.getRandomInt(roomPositions.length),1)
        }

        
        //console.log(JSON.stringify(roomPositions))
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
                    this.resultStage[position.stertY + y][position.stertX + x] = Config.regularField
                }
            }
            //部屋の右下の角の座標を保持する（stertとendで部屋の大きさがわかるため）
            position.endX = position.stertX + roomCols - 1
            position.endY = position.stertY + roomRows - 1
        });
        //console.log(this.resultStage)

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
        //壁を張る
        for(let i = 2;i< Config.stageRows - 1; i++){
            for(let j = 2;j< Config.stageCols; j++){
                //周りを見て壁を置く
                this.createWall(j,i)
            }
        }

    }

    static createWall(x,y){
        if(this.resultStage[y][x] == Config.regularField){
            return
        }
        const regularFieldArray = new Array(8)
        regularFieldArray.fill(false)
        let index = 0
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(i == 0 && j == 0){continue}
                if(this.resultStage[y + i][x + j] == Config.regularField){
                    regularFieldArray[index] = true
                }
                index++
            }
        }
        if(JSON.stringify(regularFieldArray) == JSON.stringify([false,false,false,false,false,false,false,false])){
            return
        }
        this.resultStage[y][x] = Config.wallField

        
    }

}