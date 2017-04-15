
var date = new Date();

function getDateCurrent(){

	var month = Number(date.getUTCMonth()+1).toString();
	var day = date.getUTCDate();
	var fullyear = date.getUTCFullYear();
	month = month.length <= 1 ? '0' + month : month;
	day = day.length <= 1 ? '0' + day : day;
	var dateCurrent =  fullyear + "-" + month + "-" + day;

	return dateCurrent
}

var idDom = function(id){
	return document.getElementById(id);
}


function validateDevice(){
	if( navigator.userAgent.match(/Android/i)
	|| navigator.userAgent.match(/webOS/i)
	|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)
	|| navigator.userAgent.match(/iPod/i)
	|| navigator.userAgent.match(/BlackBerry/i)
	|| navigator.userAgent.match(/Windows Phone/i)
	)
		return true;
	else
		return false
}
