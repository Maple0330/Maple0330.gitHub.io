window.onload = function(){
	var boxMap = document.querySelector('.box-map');

	var index = window.location.search; // 获取用户选择的地图
	index = index.slice(1,2)

	for(var i = 0;i < index; i++){
		for(var j = 0;j < index; j++){
			boxMap.innerHTML += `<div class="lattice${index}" id="lattice-${i}-${j}"></div>`;
		}
	}

	
}
	