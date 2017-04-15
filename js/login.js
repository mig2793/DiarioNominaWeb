function init(){

	function clickLoguin(){
		var element = idDom("loguin");
		element.addEventListener("click",loguin,false);
	}

	function loguin(){
		console.log("init");
		location.href = "../pages/hours.html"
	}

	var idDom = function(id){
		return document.getElementById(id);
	}

	clickLoguin();
}

window.onload = init;