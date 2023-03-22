let tbody = document.getElementsByTagName("tbody")[0];
let trList = tbody.getElementsByTagName("tr");

let allEmojis = [];

let emojiKeys = [ "rchars", "code", "chars", "name" ];

let temp = {
	bighead: "",
	mediumhead: "",
};

function proccessTh(th){
	if( th.className != 'rchars'){
		temp[th.className] = th.firstChild.innerHTML;
	}
}

function proccessEmoji(tr){
	for ( const key of emojiKeys ){
		let data = tr.getElementsByClassName(key)[0];
		if ( key == "code" ) data = data.firstChild;
		temp[key] = data.innerHTML;
	}
}

function proccessTr(tr){
	if(tr.firstChild.tagName == 'TH'){
		proccessTh(tr.firstChild);
	}else{
		proccessEmoji(tr);
		allEmojis.push({...temp});
	}
}

function downloadEmojis(emojiList){
	let json = JSON.stringify(emojiList);
	let dataStr = 'data:text/json;charset=utf-8,' + json;

	let aDown = document.createElement('a');
	document.body.appendChild(aDown);

	aDown.setAttribute("href", dataStr);
	aDown.setAttribute("download", "emojis.json");

	aDown.click();
	aDown.remove();
}
