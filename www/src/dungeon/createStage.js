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
        roomPositions.forEach((positions) => {
            roomExistence[positions.num] = positions
            const roomRows =   Tool.getRandomInt(roomRowsMax,roomRowsMin)
            const roomCols =   Tool.getRandomInt(roomColsMax,roomColsMin)
            for(let y = 0; y < roomRows; y++){
                for(let x = 0; x < roomCols; x++){
                    if(y == 0 && x == 0){
                        //7番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.upLeftField
                        continue
                    }
                    if(y == 0 && x == roomCols-1){
                        //8番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.upRightField
                        continue
                    }
                    if(y == roomRows-1 && x == roomCols-1){
                        //9番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.downRightField
                        continue
                    }
                    if(y == roomRows-1 && x == 0){
                        //10番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.downLeftField
                        continue
                    }
                    
                    if(y == roomRows-1){
                        //3番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.downField
                        continue
                    }
                    if(x == 0){
                        //4番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.leftField
                        continue
                    }
                    if(y == 0){
                        //5番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.upField
                        continue
                    }

                    if(x == roomCols-1){
                        //6番を配置する
                        this.resultStage[positions.stertY + y][positions.stertX + x] = Config.rightField
                        continue
                    }
                    this.resultStage[positions.stertY + y][positions.stertX + x] = Config.regularField
                }
            }
            //部屋の右下の角の座標を保持する（stertとendで部屋の大きさがわかるため）
            positions.endX = positions.stertX + roomCols - 1
            positions.endY = positions.stertY + roomRows - 1
        });
        console.log(this.resultStage)
        //道の特定
        roomPositions.forEach((positions) => {
            //縦
            for(let i = 0; i < divisionRow; i++ ){
                const vertical = divisionCol * i + positions.num % divisionCol
                const verticalInfo = {}
                //同じ番地ははじく
                if(positions.num == vertical){
                    continue
                }
                //違う番地かつそこに部屋があるなら保存
                if(roomExistence[vertical] != null){
                    verticalInfo.num = vertical
                }else{
                    continue
                }
                //道が伸びる方向を決める
                if(verticalInfo.num > positions.num){
                    //下方向
                    verticalInfo.selectX = Tool.getRandomInt(positions.endX,positions.stertX)
                    verticalInfo.selectY = positions.endY
                    verticalInfo.direction = "down"
                }else{
                    //上方向
                    verticalInfo.selectX = Tool.getRandomInt(positions.endX,positions.stertX)
                    verticalInfo.selectY = positions.stertY
                    verticalInfo.direction = "up"
                }
                positions.vertical = verticalInfo
                break
            }
            //横
            for(let i = 0; i < divisionCol; i++ ){
                const horizontal = i + divisionCol * Math.floor(positions.num / divisionCol)
                const horizontalInfo = {}
                //同じ番地ははじく
                if(positions.num == horizontal){
                    continue
                }
                //違う番地かつそこに部屋があるなら保存する
                if(roomExistence[horizontal] != null){
                    horizontalInfo.num = horizontal
                }else{
                    continue
                }
                //道が伸びる方向を決める
                if(horizontalInfo.num > positions.num){
                    //右方向
                    horizontalInfo.selectX = positions.endX
                    horizontalInfo.selectY = Tool.getRandomInt(positions.endY,positions.stertY)
                    horizontalInfo.direction = "right"
                }else{
                    //左方向
                    horizontalInfo.selectX = positions.stertX
                    horizontalInfo.selectY = Tool.getRandomInt(positions.endY,positions.stertY)
                    horizontalInfo.direction = "left"
                }
                positions.horizontal = horizontalInfo
                break
            }
            console.log("基準点：" + positions.num )
            try{
            console.log("縦方向：" + positions.vertical.num)
            }catch(TypeError){
                console.log("なし")
            }
            try{
            console.log("横方向：" + positions.horizontal.num)
            }catch(TypeError){
                console.log("なし")
            }
        })
        //道の生成
        //横
        roomPositions.forEach((positions) => {
            try{
            console.log("終点："+roomExistence[positions.horizontal.num].horizontal.selectX)
            console.log("始点:"+positions.horizontal.selectX)
            const halfway = Math.abs((roomExistence[positions.horizontal.num].horizontal.selectX - positions.horizontal.selectX)/2)
            console.log(halfway)
            switch(positions.horizontal.direction){
            case "right":
            console.log("right")
                for(let x = positions.horizontal.selectX; x < halfway + positions.horizontal.selectX; x++){
                    if(positions.horizontal.selectX == x){
                        this.resultStage[positions.horizontal.selectY][x] =  Config.regularField
                        this.resultStage[positions.horizontal.selectY + 1][x] = Config.downRightCornerField
                        this.resultStage[positions.horizontal.selectY - 1][x] = Config.upRightCornerField
                    }else{
                        this.resultStage[positions.horizontal.selectY][x] =  Config.regularField
                        this.resultStage[positions.horizontal.selectY + 1][x] = Config.downField
                        this.resultStage[positions.horizontal.selectY - 1][x] = Config.upField
                    }
                    if(this.resultStage[positions.horizontal.selectY][x + 1] != Config.voidField){
                        //ぶつかったところ
                        //this.resultStage[positions.horizontal.selectY][x + 1] = Config.regularField
                        break
                    }
                }
                break
            case "left":
            console.log("left")
                for(let x = positions.horizontal.selectX; x > positions.horizontal.selectX - halfway; x--){
                    if(positions.horizontal.selectX == x){
                        this.resultStage[positions.horizontal.selectY][x] =  Config.regularField
                        this.resultStage[positions.horizontal.selectY + 1][x] = Config.downLeftCornerField
                        this.resultStage[positions.horizontal.selectY - 1][x] = Config.upLeftCornerField
                    }else{
                        this.resultStage[positions.horizontal.selectY][x] =  Config.regularField
                        this.resultStage[positions.horizontal.selectY + 1][x] = Config.downField
                        this.resultStage[positions.horizontal.selectY - 1][x] = Config.upField
                    }
                    if(this.resultStage[positions.horizontal.selectY][x - 1] != Config.voidField){
                        //ぶつかったところ
                        //this.resultStage[positions.horizontal.selectY][x - 1] = Config.regularField
                        break
                    }
                }
                break
            }
         }catch (TypeError){
            }
            
        });
        //縦
        roomPositions.forEach((positions) => {
            try{
            console.log("終点："+roomExistence[positions.vertical.num].vertical.selectY)
            console.log("始点:"+positions.vertical.selectY)
            const halfway = Math.abs((roomExistence[positions.vertical.num].vertical.selectY - positions.vertical.selectY)/2)
            console.log(halfway)

            switch(positions.vertical.direction){
            case "down":
            console.log("down")
                for(let y = positions.vertical.selectY; y < halfway + positions.vertical.selectY; y++){
                    if(positions.vertical.selectY == y){
                        this.resultStage[y][positions.vertical.selectX] =  Config.regularField
                        this.resultStage[y][positions.vertical.selectX + 1] = Config.downRightCornerField
                        this.resultStage[y][positions.vertical.selectX - 1] = Config.downLeftCornerField
                    }else{
                        this.resultStage[y][positions.vertical.selectX] =  Config.regularField
                        this.resultStage[y][positions.vertical.selectX + 1] = Config.rightField
                        this.resultStage[y][positions.vertical.selectX - 1] = Config.leftField
                    }
                    if(this.resultStage[y + 1][positions.vertical.selectX] != Config.voidField){
                        //ぶつかったところ
                        //this.resultStage[y + 1][positions.vertical.selectX] = Config.regularField
                        break
                    }
                }
                break
            case "up":
            console.log("up")
                for(let y = positions.vertical.selectY; y > positions.vertical.selectY - halfway; y--){
                    if(positions.vertical.selectY == y){
                        this.resultStage[y][positions.vertical.selectX] =  Config.regularField
                        this.resultStage[y][positions.vertical.selectX + 1] = Config.upRightCornerField
                        this.resultStage[y][positions.vertical.selectX - 1] = Config.upLeftCornerField
                    }else{
                        this.resultStage[y][positions.vertical.selectX] =  Config.regularField
                        this.resultStage[y][positions.vertical.selectX + 1] = Config.rightField
                        this.resultStage[y][positions.vertical.selectX - 1] = Config.leftField
                    }
                    if(this.resultStage[y - 1][positions.vertical.selectX] != Config.voidField){
                        //ぶつかったところ
                        //this.resultStage[y - 1][positions.vertical.selectX] = Config.regularField
                        break
                    }
                }
                break
            }
         }catch (TypeError){
            }
        });

    }

}