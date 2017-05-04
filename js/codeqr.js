function init(){

	var token = "";

	user = getDataUser("user");
	user == undefined ? location.href = "../index.html" : console.log("estas logueado");

	$("#generateQR").click(function(){
		generateQRServices();
	});
}

function generateQR(code){
	$("#qr canvas").remove();
	$("#qr").qrcode({
		render : 'canvas',
		width: 500,
		height: 500,
		color : '#3AA',
		text : code
	});
}

window.onload = init;