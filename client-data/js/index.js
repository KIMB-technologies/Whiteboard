function boardlist(){
	var boardList = localStorage.hasOwnProperty('boardlist') ? JSON.parse(localStorage.getItem('boardlist')) : {}

	function convertOldList(){
		var added = false;
		Object.keys( localStorage ).forEach( (v) => {
			if( v.substring(0, 4) == "url_" ){
				var board = v.substring(4);
				if( !boardList.hasOwnProperty(board) ){
					boardList[board] = [ localStorage.getItem(v) , Date.now()];
					localStorage.removeItem(v);
					added = true;
				}
			}
		})
		if(added){
			localStorage.setItem('boardlist', JSON.stringify(boardList))
			localStorage.setItem('convertedOld', 'true')
		}
	}
	if( !localStorage.hasOwnProperty('convertedOld') || localStorage.getItem('convertedOld') != 'true' ){
		convertOldList();
	}

	var keyList = Object.keys(boardList)
	if(keyList.length > 0 ){
		keyList.sort((x,y) => boardList[y][1]-boardList[x][1]);	
		document.getElementById("recent-boards").innerHTML = '<ul>' + keyList.reduce((html, board) => html + '<li><a href="'+ boardList[board][0] +'" >'+ board +'</a></li>', "") + "</ul>";
		document.getElementById("recent-boards").classList.remove('hidden');
	}
}
boardlist();
