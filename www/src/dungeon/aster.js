class Aster{
    static node(parent=null, position=null){
        let node = {parent: parent, //親ノードの設定
                position: {x:position.x,y:position.y},//(row, column)のタプル ※row：行、column：列
                g:0,
                h:0,
                f:0
        }
        return node;
        }

    static astar(maze,start,end){

        //指定された迷路の指定された開始点から指定された終了点までのパスとして連想配列を返します
        // maze: 迷路リスト、start:スタートポジション、end:ゴールポジション
        // ゴールまでの最短経路のリストを返す関数

        // Create start and end node
        // スタート、エンド（ゴール）ノードの初期化
        let start_node = this.node(null, start); // 親ノードは無し
        start_node.g = start_node.h = start_node.f = 0
        let end_node = this.node(null, end);
        end_node.g = end_node.h = end_node.f = 0

        this.open_list = [] // 経路候補を入れとくリスト
        this.closed_list = [] // 計算終わった用済みリスト
        // Add the start node
        // 経路候補にスタートノードを追加して計算スタート
        this.open_list.push(start_node)

        //最後を見つけるまでループする
        let i = 0;
        while(this.open_list.length > 0){
            i++
            if(i > 100){
                break;
            }
            //現在のノードを取得する
            let current_node = this.open_list[0]
            let current_index = 0
            for(let index in this.open_list){
                //オープンリストの中でF値が一番小さいノードを選ぶ
                if(this.open_list[index].f < current_node.f){
                current_node = this.open_list[index]
                current_index = index
                }
            }
            //開いているリストから現在をポップし、閉じたリストに追加する
            //一番小さいF値のノードをオープンリストから削除して、クローズリストに追加
            this.open_list.splice(current_index)
            this.closed_list.push(current_node)
            // Found the goal
        // ゴールに到達してれば経路(Path)を表示して終了
        if(current_node.position.x == end_node.position.x && current_node.position.y == end_node.position.y){
            let path = []
            let current = current_node
            while(current != null){
                path.push(current.position)
                current = current.parent
            }
            return path // Return パスを返す
        }
        //ゴールに到達してなければ子ノードを生成
        let children = []

        // for new_position in [(0, -1), (0, 1), (-1, 0), (1, 0), (-1, -1), (-1, 1), (1, -1), (1, 1)]: // 斜め移動ありの場合
        const positions = [{x:0,y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}]
        for(let index in positions){ // 上下左右移動のみ 
            //ノード位置取得
            let node_position = { x:current_node.position.x + positions[index].x,  y:current_node.position.y + positions[index].y}


            // Make sure within range
            // 迷路内の移動に限る
            if(node_position.x > (maze.length - 1) || node_position.x < 0 || node_position.y > (maze[maze.length-1].length -1) || node_position.y < 0){
                continue;
            }

            //移動できる位置に限る（障害物は移動できない）
            if(maze[node_position.x][node_position.y] > 1){
                continue;
            }

            // 移動できる位置のノードのみを生成
            let new_node = this.node(current_node, node_position)

            // 子リストに追加
            children.push(new_node)
            // 各子ノードでG, H, Fを計算
        for(index in children){

            // Child is on the closed list
            let closed_child_list = []
            for(let closed_child in this.closed_list){
                if(closed_child == children[index]){
                    closed_child_list.push(closed_child)
                }
            }
            if(closed_child_list.length > 1){
                continue
            }

            // Create the f, g, and h values
            // G は親ノード + 1
            children[index].g = current_node.g + 1
            // H は （現在位置 - エンド位置)の2乗
            children[index].h = ((children[index].position.x - end_node.position.x) ** 2) + ((children[index].position.y - end_node.position.y) ** 2)
            // F = G + H
            children[index].f = children[index].g + children[index].h

            // Child is already in the open list
            let open_node_list = []
            for(let open_node in this.open_list){
                if(open_node == children[index]){
                    open_node_list.push(open_node)
                }
            }
            if(open_node_list.length > 0){
                continue
            }

            // Add the child to the open list
            // 子ノードをオープンリストに追加
            this.open_list.push(children[index])
        }
        }
        }

    }


    static enemyMove(maze,start,end){
        /*let maze =
        let start = {x:5, y:5}
        let end = {x:7, y:9}*/
        /*end = {x: end.y,y:end.x}*/
        let result = this.astar(maze,start,end)
        try{
            return result[result.length-2]
        }catch(e){
            if (e instanceof TypeError) {
                return "TypeError";
            }
        }
    }
}