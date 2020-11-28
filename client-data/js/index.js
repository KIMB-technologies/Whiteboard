function boardlist(){
	var boardList = localStorage.hasOwnProperty('boardlist') ? JSON.parse(localStorage.getItem('boardlist')) : {}

	function convertOldList(){
		var added = false;
		Object.keys( localStorage ).forEach( (v) => {
			if( v.substr(0, 4) == "url_" ){
				var board = v.substr(4);
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
	keyList.sort((x,y) => boardList[y][1]-boardList[x][1]);	
	document.getElementById("recentBoards").innerHTML = keyList.reduce((html, board) => html + '<li><a href="'+ boardList[board][0] +'" >'+ board +'</a></li>', "")
}
boardlist();