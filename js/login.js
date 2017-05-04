function init(){
	clickLoguin();
}

function clickLoguin(){
	var element = idDom("loguin");
	element.addEventListener("click",loguin,false);
}

function loguin(){
	var user = $("#document").val().trim();
	var data = `{"documento" : "${user}"}`;
	var url = "getuserDynamics";
	loginServices(data,url);
}

function ValidateUser(data){
	var dataUser = JSON.parse(data);
	var passwordInput = $("#password").val();
	if(dataUser.usuarios[0].Password == passwordInput && (dataUser.usuarios[0].Nivel == "3" || dataUser.usuarios[0].Nivel == "4" )){
		location.href = "../pages/hours.html";
		sessionStorage.setItem("user",JSON.stringify(dataUser.usuarios[0]));
	}else if(dataUser.usuarios[0].Password == passwordInput && (dataUser.usuarios[0].Nivel == "2")){
		location.href = "../pages/CodigoQR.html";
		sessionStorage.setItem("user",JSON.stringify(dataUser.usuarios[0]));
	}
	else{
        text = "Usuario y/o contraseña incorrectos.";
        modal(text);
	}	
}

var idDom = function(id){
	return document.getElementById(id);
}

window.onload = init;