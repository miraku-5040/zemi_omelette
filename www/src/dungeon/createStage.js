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

        console.log(JSON.stringify(roomPositions))
        
        //部屋の数を減らす
        for(let i = 0; i < divisionNumber - roomQuantity; i++){
            roomPositions.splice(Tool.getRandomInt(roomPositions.length),1)
        }

        
        console.log(JSON.stringify(roomPositions))
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
                        //7番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.upLeftField
                        continue
                    }
                    if(y == 0 && x == roomCols-1){
                        //8番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.upRightField
                        continue
                    }
                    if(y == roomRows-1 && x == roomCols-1){
                        //9番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.downRightField
                        continue
                    }
                    if(y == roomRows-1 && x == 0){
                        //10番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.downLeftField
                        continue
                    }
                    
                    if(y == roomRows-1){
                        //3番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.downField
                        continue
                    }
                    if(x == 0){
                        //4番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.leftField
                        continue
                    }
                    if(y == 0){
                        //5番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.upField
                        continue
                    }

                    if(x == roomCols-1){
                        //6番を配置する
                        this.resultStage[position.stertY + y][position.stertX + x] = Config.rightField
                        continue
                    }
                    this.resultStage[position.stertY + y][position.stertX + x] = Config.regularField
                }
            }
            //部屋の右下の角の座標を保持する（stertとendで部屋の大きさがわかるため）
            position.endX = position.stertX + roomCols - 1
            position.endY = position.stertY + roomRows - 1
        });
        console.log(this.resultStage)

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

        //道の生成
        roomPositions.forEach((position) => {
            position.adjacent.forEach((direction,directionIndex) => {
                if(Object.keys(direction).length == 0){
                    return
                }
                let halfway = 0
                if(directionIndex % 3 != 0){
                    halfway = (roomExistence[direction.num].adjacent[3 - directionIndex].selectX - direction.selectX)/2
                }else{
                    halfway = (roomExistence[direction.num].adjacent[3 - directionIndex].selectY - direction.selectY)/2
                }
                console.log(position)

                    switch(directionIndex){
                        case 0:
                            for(let y = direction.selectY; y > direction.selectY + halfway; y--){
                                if(direction.selectY == y){
                                    this.resultStage[y][direction.selectX] =  Config.regularField
                                    if(this.resultStage[y][direction.selectX + 1] == Config.upRightField){
                                        this.resultStage[y][direction.selectX + 1] = Config.rightField
                                    }else{
                                        this.resultStage[y][direction.selectX + 1] = Config.upRightCornerField
                                    }
                                    if(this.resultStage[y][direction.selectX - 1] ==  Config.upLeftField){
                                        this.resultStage[y][direction.selectX - 1] = Config.leftField
                                    }else{
                                        this.resultStage[y][direction.selectX - 1] = Config.upLeftCornerField
                                    }
                                }else{
                                    this.createRoodVertical(direction,y)
                                }
                                if(this.resultStage[y - 1][direction.selectX] != Config.voidField){
                                    //ぶつかったところ
                                    this.createRoodConnect(direction)
                                    break
                                }
                            }
                            break
                        case 1:
                            for(let x = direction.selectX; x < halfway + direction.selectX; x++){
                                if(direction.selectX == x){
                                    this.resultStage[direction.selectY][x] =  Config.regularField
                                    if(this.resultStage[direction.selectY + 1][x] == Config.downRightField){
                                        this.resultStage[direction.selectY + 1][x] = Config.downField
                                    }else{
                                        this.resultStage[direction.selectY + 1][x] = Config.downRightCornerField
                                    }
                                    if(this.resultStage[direction.selectY - 1][x] == Config.upRightField){
                                        this.resultStage[direction.selectY - 1][x] = Config.upField
                                    }else{
                                        this.resultStage[direction.selectY - 1][x] = Config.upRightCornerField
                                    }
                                }else{
                                    this.createRoodHorizontal(direction,x)
                                }
                                if(this.resultStage[direction.selectY][x + 1] != Config.voidField){
                                    //ぶつかったところ
                                    this.createRoodConnect(direction)
                                    break
                                }
                            }
                            break
                        case 2:
                            for(let x = direction.selectX; x >= direction.selectX + halfway; x--){
                                if(direction.selectX == x){
                                    this.resultStage[direction.selectY][x] =  Config.regularField
                                    if(this.resultStage[direction.selectY + 1][x] == Config.downLeftField){
                                        this.resultStage[direction.selectY + 1][x] = Config.downField
                                    }else{
                                        this.resultStage[direction.selectY + 1][x] = Config.downLeftCornerField
                                    }
                                    if(this.resultStage[direction.selectY - 1][x] == Config.upLeftField){
                                        this.resultStage[direction.selectY - 1][x] = Config.upField
                                    }else{
                                        this.resultStage[direction.selectY - 1][x] = Config.upLeftCornerField
                                    }
                                }else{
                                    this.createRoodHorizontal(direction,x)
                                }
                                if(this.resultStage[direction.selectY][x - 1] != Config.voidField){
                                    //ぶつかったところ
                                    this.createRoodConnect(direction)
                                    break
                                }
                            }
                            break
                        case 3:
                            for(let y = direction.selectY; y <= halfway + direction.selectY; y++){
                                if(direction.selectY == y){
                                    this.resultStage[y][direction.selectX] =  Config.regularField
                                    if(this.resultStage[y][direction.selectX + 1] == Config.downRightField){
                                        this.resultStage[y][direction.selectX + 1] = Config.rightField
                                    }else{
                                        this.resultStage[y][direction.selectX + 1] = Config.downRightCornerField
                                    }
                                    if(this.resultStage[y][direction.selectX - 1] == Config.downLeftField){
                                        this.resultStage[y][direction.selectX - 1] = Config.leftField
                                    }else{
                                        this.resultStage[y][direction.selectX - 1] = Config.downLeftCornerField
                                    }
                                }else{
                                    this.createRoodVertical(direction,y)
                                }
                                if(this.resultStage[y + 1][direction.selectX] != Config.voidField){
                                    //ぶつかったところ
                                    this.createRoodConnect(direction)
                                    break
                                }
                            }
                            break
                    }
                
            });
        });

    }

    static createRoodHorizontal(direction,x){
            this.resultStage[direction.selectY][x] =  Config.regularField
            this.resultStage[direction.selectY + 1][x] = Config.downField
            this.resultStage[direction.selectY - 1][x] = Config.upField
    }

    static createRoodVertical(direction,y){
            this.resultStage[y][direction.selectX] =  Config.regularField
            this.resultStage[y][direction.selectX + 1] = Config.rightField
            this.resultStage[y][direction.selectX - 1] = Config.leftField
    }
    static checkRoodVerticalStert(x,y){
        this.resultStage[y][x] =  Config.regularField
        if(this.resultStage[y][x + 1] == 10){
            this.resultStage[y][x + 1] = Config.rightField
        }else{
            this.resultStage[y][x + 1] = Config.upRightCornerField
        }
        if(this.resultStage[y][x - 1] == 9){
            this.resultStage[y][x - 1] = Config.leftField
        }else{
            this.resultStage[y][x - 1] = Config.upLeftCornerField
        }
    }

    static createRoodConnect(direction){
        console.log(direction)
    }

    /* 中間点が2より下の場合大部屋にする */
    static halfwayBorder(){
    }

}