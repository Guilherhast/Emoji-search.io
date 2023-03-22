var subCats = {};

function addSubCat(card){
	if( subCats[card.bighead] === undefined){
		subCats[card.bighead] = new Set();
	}
	subCats[card.bighead].add(card.mediumhead);
}

function setCatg(evn){
	if(evn.target.tagName == "BUTTON"){
		$("#dropdown-label").html(evn.target.innerHTML);
		$("dropdown-button").click();
		filterEmojis();
	}
}

//Get functions
function getEmojiChar(el){
	return $(el).parents('.emj-card').find('.emj-char').html();
}

//Clipboard functions
function copyEmoji(evn){
	navigator.clipboard.writeText(getEmojiChar(evn.target));
}

//Filter functions
function filterEmojis(){
	const srchName = $("#search-dropdown").val().toLowerCase();
	const srchCatg = $("#dropdown-label").html();
	console.log(srchName, srchCatg);
	$(".emj-card").each(function(){
		const emjName=$(this).find(".emj-name").html();
		const emjCatg=$(this).find(".emj-catg").html();
		if( emjName.indexOf(srchName) != -1  && (srchCatg == "All categories" || srchCatg == emjCatg)) {
			$(this).show();
		}else{
			$(this).hide();
		}
	});
}

//Gen functions

function genCard(card){
	addSubCat(card);
	return  `
<div class="emj-card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<div class="flex justify-start px-6 pt-4 text-black dark:text-white"> ${card.rchars} </div>
            <div class="flex flex-col items-center pb-10">
                <span class="emj-char text-9xl">${card.chars}</span>
                <h5 class="emj-name mb-1 text-xl font-medium text-black dark:text-white">${card.name}</h5>
                <span class="emj-catg text-sm text-gray-500 dark:text-gray-300">${card.bighead}</span>
                <span class="text-sm text-gray-500 dark:text-gray-500">${card.mediumhead}</span>
                <div class="flex mt-4 space-x-3 md:mt-6">
                    <a onclick="copyEmoji(event)" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Copy emoji</a>
                </div>
            </div>
        </div>
	`;
}

function genCatgLi(catgName){
	return `
<li onclick="setCatg(event)">
	<button type="button"
		class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${catgName}</button>
</li>`;

}
