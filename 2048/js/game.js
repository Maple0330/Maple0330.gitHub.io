window.onload = function () {
	var imgBox = document.querySelector('.carousel-img'); // 图片盒子
	var textBox = document.querySelector('.carousel-text'); // 文字盒子
	var lBtn = document.querySelector('.leftBtn') // 左右按钮
	var rBtn = document.querySelector('.rightBtn')
	var imgs = imgBox.querySelectorAll('img'); // 图片数组
	var index = 0; // 当前状态

	/* 左右切换 */
	rBtn.onclick = function () {
		index++;
		if(index>imgs.length-1){
			index = 0;
			imgBox.style.left = 0 + 'vw';
			textBox.style.left = 0 + 'vw';
			index++;
		}
		easeAnimation(imgBox,-51*index);
		easeAnimation(textBox,-51*index);	
	}
	lBtn.onclick = function () {
		index--;
		if(index<0){
			index = imgs.length-1;
			imgBox.style.left = -51*(imgs.length-1) + 'vw';
			textBox.style.left = -51*(imgs.length-1) + 'vw';
			index--;
		}
		easeAnimation(imgBox,-51*index);
		easeAnimation(textBox,-51*index);	
	}

	/* 开始游戏 */
	var start = document.querySelector('.start');
	start.onclick = function(){
		if(index==0){window.location.href = "index.html?"+4;}
		else if(index==1){window.location.href = "index.html?"+4;}
		else if(index==2){window.location.href = "index.html?"+4;}
	}

	/* 游戏设置 背景音乐 主题颜色 */
	/* 游戏规则   */
	$('.rule').click(function(){
		$('.rulesPopup').show(500);
	})
	$('.rulesPopup').click(function(){
		$('.rulesPopup').hide(200);
	})


	/* 缓动动画 */
	function easeAnimation(ele, target) {
		var timerId;
		clearInterval(timerId);
    timerId = setInterval(function() {
        let begin = parseInt(ele.style.left) || 0;
        let step = (target - begin) * 0.2;
        begin += step;
        if (Math.abs(Math.floor(step)) <= 1) {
            clearInterval(timerId);
            begin = target;
        }
        ele.style.left = begin + 'vw';
    }, 20)
}

}