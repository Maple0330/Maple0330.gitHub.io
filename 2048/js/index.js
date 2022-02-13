$(function(){
	var	board = new Array(); // 空数组
	var score = 0; // 游戏分数
	var scoreMax = 0; // 最高分数
	var body = document.querySelector('body');
	var index = window.location.search; // 获取用户选择的棋盘格式
	index = index.slice(1,2);
	var wAndH = 0; // 格子大小
	wAndH = wh(index) // 先获取到格子大小
	var hasConflicted = new Array(); // 核对，避免多次添加

	newgame(); // 开始游戏

	function newgame(){  // 开始游戏
		// 初始化棋盘格
		init();
		// 在随机的两个格子里生成数字
		generateOneNumber();
		generateOneNumber();

		var startX, startY,moveEndX,moveEndY,X,Y; // 判断移动方向的变量
		// 手指按下
		body.addEventListener('touchstart', function(e) {
			// 获取手指初始坐标
			startX = e.targetTouches[0].pageX;
			startY = e.targetTouches[0].pageY;
		})
		// 手指移动
		body.addEventListener('touchmove',function(e){
			moveEndX = e.targetTouches[0].pageX;
			moveEndY = e.targetTouches[0].pageY;
			X = moveEndX - startX;
			Y = moveEndY - startY;
			e.preventDefault();
		})
		// 手指离开 进行判断
		body.addEventListener('touchend',function(e){ 
			if( Math.abs(X) > Math.abs(Y) && X > 0 ) {// right
				console.log('向右');
				if(moveRight()){ // 给个返回值 判断能不能移动
					setTimeout(function(){generateOneNumber()},210);
					setTimeout(function(){isgameover()},300);// 新增一个数组后 判断游戏结束不结束
				}
			}
			else if( Math.abs(X) > Math.abs(Y) && X < 0 ) {// left
				console.log('向左');
				if(moveLeft()){ // 给个返回值 判断能不能移动
					setTimeout(function(){generateOneNumber()},210);
					setTimeout(function(){isgameover()},300);// 新增一个数组后 判断游戏结束不结束
				}
			}
			else if( Math.abs(Y) > Math.abs(X) && Y > 0) {// down
				console.log('向下');
				if(moveDown()){ // 给个返回值 判断能不能移动
					setTimeout(function(){generateOneNumber()},210);
					setTimeout(function(){isgameover()},300);// 新增一个数组后 判断游戏结束不结束
				}
			}
			else if( Math.abs(Y) > Math.abs(X) && Y < 0 ) {// up
				console.log('向上');
				if(moveUp()){ // 给个返回值 判断能不能移动
					setTimeout(function(){generateOneNumber()},210);
					setTimeout(function(){isgameover()},300);// 新增一个数组后 判断游戏结束不结束
				}
			}
		})
		// 刷新网页
		$(".restart").click(function(){
			location.reload();
		});
		// 返回上一步
		$(".regret").click(function(){
			location.reload();
		});
	}
	// 向左移动
	function moveLeft(){
		if(!canMoveLeft(board)){ // 根据返回值判断是否能向左移动
			return false;
		}

		// moveLeft
		for(var i = 0; i < index; i++){
			for(var j = 1; j < index; j++){
				if(board[i][j] !=0 ){
					for(var k = 0; k < j; k++){
						if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){ // 判断到落脚点之间有没有障碍物
							// move
							showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0; 
							continue;
						}
						else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ){
							// move
							showMoveAnimation(i,j,i,k);
							// add 移动后叠加
							board[i][k] += board[i][j];
							board[i][j] = 0;

							score += board[i][k]; // 分数加上
							updateScore(score);
							hasConflicted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(function(){
			updateBoardView();
		},200)
	
		return true;
	}
	// 向右移动
	function moveRight(){
		if(!canMoveRight(board)){ // 根据返回值判断是否能向左移动
			return false;
		}

		// moveRight
		for(var i = 0; i < index; i++){
			for(var j = 2; j >= 0; j--){
				if(board[i][j] !=0 ){
					for(var k = 3; k > j; k--){
						if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){ // 判断到落脚点之间有没有障碍物
							// move
							showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0; 
							continue;
						}
						else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)&& !hasConflicted[i][k] ){
							// move
							showMoveAnimation(i,j,i,k);
							// add 移动后叠加
							board[i][k] += board[i][j];
							board[i][j] = 0;
							score += board[i][k]; // 分数加上
							updateScore(score);
							hasConflicted[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(function(){
			updateBoardView();
		},200)
	
		return true;
	}
	// 向上移动
	function moveUp(){
		if(!canMoveUp(board)){ // 根据返回值判断是否能向左移动
			return false;
		}

		// moveUp
		for(var j = 0; j < index; j++){
			for(var i = 1; i < index; i++){
				if(board[i][j] !=0 ){
					for(var k = 0; k < i; k++){
						if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){ // 判断到落脚点之间有没有障碍物
							// move
							showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0; 
							continue;
						}
						else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)&& !hasConflicted[k][j] ){
							// move
							showMoveAnimation(i,j,k,j);
							// add 移动后叠加
							board[k][j] += board[i][j];
              board[i][j] = 0;
							console.log(board[i][k]);
							score += board[i][k]; // 分数加上
							score += 4;
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
		setTimeout(function(){
			updateBoardView();
		},200)
	
		return true;
	}
	// 向下移动
	function moveDown(){
		if(!canMoveDown(board)){ // 根据返回值判断是否能向左移动
			return false;
		}
	
		// moveUp
		for(var j = 0; j < index; j++){
			for(var i = 2; i >= 0; i--){
				if(board[i][j] != 0){
					for( var k = 3 ; k > i ; k -- ){
						if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
							showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}
						else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board)&& !hasConflicted[k][j] ){
							showMoveAnimation(i,j,k,j);
							board[k][j] += board[i][j];
							board[i][j] = 0;
							score += board[i][k]; // 分数加上
							score += 4;
							updateScore(score);
							hasConflicted[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(function(){
			updateBoardView();
		},200)
	
		return true;
	}
	function init(){	// 初始化棋盘格
		// 创建格子 打印到棋盘 设置坐标位置
		for(var i = 0;i < index; i++){
			for(var j = 0;j < index; j++){
				$('.box-map').append(`<div class="lattice${index}" id="lattice-${i}-${j}"></div>`); // 插入用户选择大小的格子)
				var lattice = $(`#lattice-${i}-${j}`); // 获取当前坐标的格子
				lattice.css('top',getPosTop( i , j, lattice)); // 根据坐标信息计算topleft值
				lattice.css('left',getPosLeft( i , j, lattice));
			}
		}
		// 创建二维数组
		for(var i = 0; i < index; i++){
			board[i] = new Array();
			hasConflicted[i] = new Array();
			for(var j = 0; j < index; j++){
				board[i][j] = 0;
				hasConflicted[i][j] = false;
			}
		}
		updateBoardView(); // 初始化数字格

		score = 0;
		scoreMax = localStorage.getItem('scoreMax');
		$('#scoreMax').text(scoreMax);
	}
	function updateBoardView(){ // // 初始化数字格
		$(`.number-cell${index}`).remove();
		// 创建数字格子
		for(var i = 0; i < index; i++){
			for(var j = 0; j < index; j++){
				$('.box-map').append(`<div class="number-cell${index}" id="number-cell-${i}-${j}"></div>`); // 插入用户选择大小的格子)
				var theNumberCell = $(`#number-cell-${i}-${j}`);
				// 对当前数组进行判断
				if( board[i][j] == 0){
					theNumberCell.css('width','0px');
					theNumberCell.css('height','0px');
					theNumberCell.css('top',getPosTop( i , j, theNumberCell)); // 根据坐标信息计算topleft值
					theNumberCell.css('left',getPosLeft( i , j, theNumberCell));
				}else{
					// 判断棋盘格式 赋予格子大小 
					theNumberCell.css('width',wAndH+'vw');
					theNumberCell.css('height',wAndH+'vw');
					theNumberCell.css('top',getPosTop( i , j, theNumberCell)); // 根据坐标信息计算top left 背景色 文字色
					theNumberCell.css('left',getPosLeft( i , j, theNumberCell));
					theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
					theNumberCell.css('color',getNumberColor(board[i][j]));
					theNumberCell.text(board[i][j]);
				}
				hasConflicted[i][j] = false;
			}
		
		}
	}
	function generateOneNumber(){ // 生成数字
		if(nospace(board)) // 判断棋盘格有无空间
			return false;

		// 随机一个位置
		var randx = parseInt(Math.floor(Math.random() * index));
		var randy = parseInt(Math.floor(Math.random() * index));

		var times = 0;

		while(times<50){
			if(board[randx][randy] == 0) // 循环判断是否相同
			break;

			randx = parseInt(Math.floor(Math.random() * index));
			randy = parseInt(Math.floor(Math.random() * index));

			times++;
		}
		if(times == 50){
			for(var i = 0; i < index; i++){
				for(var j = 0; j < index; j++){
					if(board[i][j] == 0){
						randx = i;
						randy = j;
					}
				}
			}
		}

		// 随机一个数字
		var randNumber = Math.random()<0.5?2:4; // 随机生成2或者4
		// 在随机位置显示随机数字
		board[randx][randy] = randNumber;
		showNumberWithAnimation( randx, randy, randNumber);

		return true;
	}
	// 计算当前格子Top
	function getPosTop( i , j , lattice ){
		var mapH = parseInt($('.box-map').css('height')); // 棋盘的高度 
		var gH = parseInt($(lattice).css('height')); // 格子的高度
		var top = ((mapH - gH * parseInt(index)) / (parseInt(index)+1)) * (i+1) + gH * i; 
		// 格子在棋盘的距离 =  (棋盘的高度 - 总格子的高度) / 边的总数 * 当前边的个数  * 当前所有格子的总高度 
		return top; 
	}
	// 计算当前格子Left
	function getPosLeft( i , j , lattice ){
		// 以此类推
		var mapW = parseInt($('.box-map').css('width'));
		var gW = parseInt($(lattice).css('width'));
		var left = ((mapW - gW * parseInt(index)) / (parseInt(index)+1)) * (j+1) + gW * j; 
		return left; 
	}
	// 格子颜色
	function getNumberBackgroundColor(number){
		switch(number){
			case 2:return '#eee6db';break;
			case 4:return '#ede1c9';break;
			case 8:return '#FFCC99';break;
			case 16:return '#f49663';break;
			case 32:return '#f57c5f';break;
			case 64:return '#f55f3e';break;
			case 128:return '#edcc6f';break;
			case 256:return '#eecc60';break;
			case 515:return '#e9c854';break;
			case 1024:return '#ecc63f';break;
			case 2048:return '#ebc653';break;
			case 4096:return '#a6c';break;
			case 8192:return '#93c';break;
			case 16384:return 'green';break;
			case 32768:return 'red';break;
		}
		return 'black';
	}
	// 格子子颜色
	function getNumberColor(number){
		if(number <= 4){
			return '#776e65';
		}
		return 'white';
	}
	// 判断棋盘格有无空间
	function nospace(board){
		for(var i = 0; i < index; i++){ 
			for(var j = 0; j < index; j++){
				if(board[i][j] == 0){ // 变量判断是否还有没有为0的元素
					return false;
				}
			}
		}
		return true;
	}
	// 判断左右是否有障碍物
	function noBlockHorizontal(row,coll,col2,board){
		for(var i = coll + 1; i < col2; i++){
			if(board[row][i] != 0){
				return false;
			}
		}
		return true;
	}
	// 判断上下是否有障碍物
	function noBlockVertical(col,row1,row2,board){
		for(var i = row1 + 1; i < row2; i++){
			if(board[i][col] != 0){
				return false;
			}
		}
		return true;
	}
	// 判断能否向左移动
	function canMoveLeft(board){
		for(var i = 0; i < index; i++){
			for(var j = 1; j < index; j++){
				if(board[i][j] != 0){
					if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	// 判断能否向右移动
	function canMoveRight(board){
		for(var i = 0; i < index; i++){
			for(var j = 2; j >= 0 ; j--){
				if(board[i][j] != 0){
					if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	// 判断能否向上移动
	function canMoveUp(board){
		for(var j = 0; j < index; j++){
			for(var i = 1; i < index; i++){
				if(board[i][j] != 0){
					if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	// 判断能否向下移动
	function canMoveDown(board){
		for(var j = 0; j < index; j++){
			for(var i = 2; i >= 0; i--){
				if(board[i][j] != 0){
					if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	// 判断游戏结束
	function isgameover(){
		if(nospace(board) && nomove(board)){ 	// 格子满了还有相同的数 所有还要有函数来判断
			gamover();
		}
	}
	// 游戏结束函数
	function gamover(){
		$('.endTemplate').show(300);
		localStorage.setItem('scoreMax',scoreMax)

	}
	// 判断有没有相同的格子
	function nomove(board){
		if(canMoveLeft(board) ||
			canMoveRight(board) ||
			canMoveUp(board) ||
			canMoveDown(board) 
		){
			return false;
		}
		return true;
	}
	// 数字移动动画函数
	function showNumberWithAnimation(i,j,randNumber){
		var numberCell = $(`#number-cell-${i}-${j}`);
		var lattice = $(`#lattice-${i}-${j}`); // 获取当前坐标的格子
		numberCell.css('background-color',getNumberBackgroundColor(randNumber));
		numberCell.css('color',getNumberColor(randNumber));
		numberCell.text(randNumber);

		// 数字出现时使用动画
		numberCell.animate({
			width: wAndH+'vw',
			height: wAndH+'vw',
			top: parseInt(lattice.css('top'))+'px',
			left: parseInt(lattice.css('left'))+'px'
		},100);
	}
	// 移动动画
	function showMoveAnimation(fromx,fromy,tox,toy){
		var numberCell = $(`#number-cell-${fromx}-${fromy}`);
		numberCell.animate({
			top:getPosTop(tox,toy,numberCell),
			left:getPosLeft(tox,toy,numberCell)
		},200)
	}
	// 格子大小
	function wh(index){
		// 判断棋盘格式 赋予格子大小 
		if(index == 3){
			return 25;
		}else if(index == 4){
			return 20;	
		}else if(index == 5){
			return 15;
		}
	}
	// 分数刷新
	function updateScore(score){
		$('#score').text(score);
		if(score>scoreMax){
			scoreMax = score;
			$('#scoreMax').text(scoreMax);
		}
	}
})	
