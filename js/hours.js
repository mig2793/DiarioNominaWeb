var openform = "";
var heigthheader = "";
var container = "";
var logoffb = "";	
var content = "";
var interval = 0;
var scale = 10;
var open = false;
var lastScroll = 0;
var dateForm = new Array();
var Searchbutton;
var okhoras;
var url = "";
var dataList = {};
var user;

function initPage(){
	container = idDom("user-hours");
	heigthheader = idDom("header-content");
	logoffb = idDom("log-off");
	openform = idDom("open-form");
	dateForm[0] = idDom("date-i");
	dateForm[1] = idDom("date-f");
	okhoras = idDom("ok-horas");
	dateForm[0].value = getDateCurrent();
	dateForm[1].value = getDateCurrent();
	Searchbutton = idDom("search");
	user = getDataUser("user");
	validateDevice() == true ? heigthheader.className += " fixed" : console.log("devices");

	if(user != undefined){
		if(user.Nivel == "2")
			location.href = "../pages/CodigoQR.html"
	}else
		location.href = "../index.html"
}

function userInit(){
	$("#register div").remove();
	$("#registerincom div").remove();
	$("#noregister div").remove();		
	if(user.Nivel == "3")
		ServiceGetHours(2,user.idProyecto);
	else if(user.Nivel == "4")
		ServiceGetHours(3,user.idProyecto);
}

function permissions(){
	var getTypuser = validateUserGlobals();	
	if(user.Nivel == "3"){
		$(".timeinit, .timefinish, .novSupervisor").attr('disabled','disabled');
		$("#projectinput").remove();
	}else if(user.Nivel == "4" && user.idProyecto == "0001"){
		$("textarea,.novSupervisor, .nove_lider").attr('disabled','disabled');
	}else if(user.Nivel == "4"){
		$(".timeinit,.novSupervisor, .nove_lider").attr('disabled','disabled');
		$("#projectinput").remove();
	}
}

function events(){
	logoffb.addEventListener("click", logoff, false);
	if( validateDevice()){
		container.style.top = (heigthheader.offsetHeight + 20) +"px";
	    openform.addEventListener("click", openMenu);
	}else
	   document.addEventListener("scroll",scrollDocument,false);

	Searchbutton.addEventListener("click",search,false);
	okhoras.addEventListener("click",okHorasUsers,false);

	$("#date-i, #date-f").change(changeDates);
}


function changeDates(){
	$(this).css({
		"border-color" : "",
		"box-shadow" : ""
	});
}

function scrollDocument(e){
	var scrollBody = document.body.scrollTop;
	if(lastScroll > scrollBody){
		heigthheader.classList[3] == "fixed" ? console.log("Clase existe") : heigthheader.className += " fixed"	
		container.style.top = (heigthheader.offsetHeight + 20) +"px";			
	}else{
		heigthheader.classList.remove("fixed");
		container.style.top = "0px";
	}
	
	lastScroll = scrollBody;
}

function okHorasUsers(e){
	var ids = new Array();
	var getTypuser = validateUserGlobals();	
	if(dataList != undefined){
		var lengthids = dataList.length;
		for(var i = 0; i < lengthids; i++){
			ids.push(dataList[i]._id);
		}
		if(getTypuser == "lider"){
			data = `{'id': [${ids}],'estado': 3}`;
			url = "Approvehours";
			updateServicesHours(data,url)
		}else if(getTypuser == "GH" || getTypuser == "LacaroGH"){
			data = `{'id': [${ids}],'estado': 4}`;
			url = "Approvehours";
			updateServicesHours(data,url)
		}
	}
}

function approve(e){
	var ids = new Array();
	var getTypuser = validateUserGlobals();	
	var ids = e.target.id;
	if(getTypuser == "lider"){
		data = `{'id': [${ids}],'estado': 3}`;
		url = "Approvehours";
		updateServicesHours(data,url)
	}else if(getTypuser == "GH" || getTypuser == "LacaroGH"){
		data = `{'id': [${ids}],'estado': 4}`;
		url = "Approvehours";
		updateServicesHours(data,url)
	}	
}

function openMenu(e){
	console.log("click");
	clearInterval(interval);
	if(!open)
		interval = setInterval(animate,80);
	else
		interval = setInterval(animatereverse,80);
	
}

function animate(){
	if(scale == 10){
		clearInterval(interval);
		open = true;
	}else{
		scale = scale + 2
		heigthheader.style.transform = "scale("+scale/10+")";
		container.style.top = (heigthheader.offsetHeight + 20) +"px";
	}
}

function animatereverse(){
	if(scale == 0){
		clearInterval(interval);
		open = false;
	}else{
		scale = scale - 2
		heigthheader.style.transform = "scale("+scale/10+")";
		container.style.top =  20 +"px";
	}
}

function logoff(){
	sessionStorage.clear();
	location.href = "../index.html"
}

function search(){
	var fechainical = $("#date-i").val().trim();
	var fechafinal = $("#date-f").val().trim();
	var proyecto = user.idProyecto;
	var estado = 0;
	var empleado = $("#employee").val().trim();
	dataList = {};

	if(user.Nivel == 3)
		estado = 2;
	else if (user.Nivel == 4)
		estado = 3;

	if($("#projectinput option:selected").text() != "Proyecto" && user.Nivel == "4" && user.idProyecto == "0001"){
		proyecto = $("#projectinput option:selected").val();
	}

	if(fechainical.length>0 && fechafinal.length>0){
		$("#register div").remove();
		$("#registerincom div").remove();
		$("#noregister div").remove();		
	 	ServiceGetHoursDate(estado,proyecto,fechainical,fechafinal,empleado)
	 }
	else{
        text = "Debes llenar los campos solicitados para realizar la busqueda";
        modal(text);
        hideload();
		$("#date-i, #date-f").css({
			"border-color" : "red",
			"box-shadow" : "1px 1px 5px red"
		});
	}
}

function updateHoras(documento){
	documento = documento.toString();
	console.log("entre!!" + documento);
}

function updateServices(e){
	var id = e.target.id;
	id = Number(id.split("-")[1]);
	var comentario = $("#nove_lider-"+id).val();
	var horaentrada =$("#horaentrada-"+id).val();
	var horasalida =$("#horasalida-"+id).val();
	var getUser = validateUserGlobals();

	if(user.Nivel = "3"){
		if(comentario.trim() == ""){
        	text = "Debes colocar un comentario antes de guardar";
        	modal(text);
		}else{
			var data = `{'id' : [${id}],'comentario' : '${comentario}','tipo' : 2}`
			url = "saveObservation";
			updateServicesHours(data,url);			
		}
	}else if(user.Nivel == "4"){
		var data = `{'id' : [${id}], 'horaentrada' : '', 'horasalida' : '${horasalida}','tipousuario' : 'GH'}`
		url = "UpdateHours";
		updateServicesHours(data,url);
	}else if(user.Nivel == "4" && user.idProyecto == "0001"){
		var data = `{'id' : [${id}],'horaentrada' : '${horaentrada}','horasalida' : '${horasalida}','tipousuario' : 'LacaroGH'}`
		url = "UpdateHours";
		updateServicesHours(data,url);
	}		
}

function getProjects(){
	if(user.Nivel == 4){
		url = "getAllProjects";
		GetProjects(url);
	}

}

function contentHoursfill(data){

	var jsonregister = {"horas": []};
	var jsonNoRegister = {"horas": []};
	var jsonIncomplete = {"horas": []};

	dataList = data;
	$("#register div").remove();
	$("#registerincom div").remove();
	$("#noregister div").remove();

	for(var i=0;i<data.length;i++){

		if(data[i]._horaSalida.trim().length <= 0 && data[i]._horaEntrada.trim().length <= 0)
			jsonNoRegister["horas"].push(data[i]);
		else if(data[i]._horaSalida.trim().length <= 0)
			jsonIncomplete["horas"].push(data[i]);
		else if(data[i]._horaSalida.trim().length > 0 && data[i]._horaEntrada.trim().length > 0)
			jsonregister["horas"].push(data[i]);
	}

	var contentR = jsonregister.horas.length > 0 ? llenarContenido(jsonregister.horas) : console.log("nti");
	var contentNR = jsonNoRegister.horas.length > 0 ? llenarContenido(jsonNoRegister.horas) : console.log("nti");
	var contentI = jsonIncomplete.horas.length > 0 ? llenarContenido(jsonIncomplete.horas): console.log("nti");

	$("#register").append(contentR);
	$("#registerincom").append(contentI);
	$("#noregister").append(contentNR);

	for(var i = 0; i<data.length;i++){
		$("#save-" + data[i]._id).click(updateServices);
	}

	permissions();
	$(".approve").click(approve);
}


function llenarContenido(data){
	var firtDocument = data[0]._documento.trim();
	var contentheader = "";
	var contentbottom = "";
	var contentHours = "";
	var ids = new Array();
	content = "";
	contentheader += `<div class="user-period">
						<span class="text-left">${data[0]._nombreEmpleado}</span><br>
						<span class="text-right">${data[0]._documento}</span>
						<span class="text-right">${data[0]._numContrato}</span>
						<div class="table-responsive">
							<table class="table table-striped table-hover">
								<tr>
				                    <th>Fecha</th>
				                    <th>Hora entrada</th>
				                    <th>Hora salida</th>
				                    <th>Novedad supervisor</th>
				                    <th>Novedad Lider P.</th>
				                    <th>Actividad</th>
				                    <th>&ensp;</th>
			                  	</tr>`;
	contentHours += contentheader;

	for(var i = 0; i<data.length;i++){
		if(firtDocument == data[i]._documento.trim()){
			content += `<tr>
	                    <td id="fecha">${data[i]._fecha.split(" ")[0]}</td>
	                    <td><input type="time" class="timeinit" id="horaentrada-${data[i]._id}" name="hour-f" value="${data[i]._horaEntrada}"></td>
	                    <td><input type="time" class="timefinish" id="horasalida-${data[i]._id}" name="hour-i" value="${data[i]._horaSalida}"></td>
	                    <td>
	                      <textarea id="nove_supervisor" class="novSupervisor" placeholder="Escriba su novedad">${data[i]._ComentarioSupervisor}</textarea>
	                    </td>
	                    <td>
	                      <textarea class="nove_lider" id="nove_lider-${data[i]._id}" placeholder="Escriba su novedad">${data[i]._ComentarioIngeniero}</textarea>
	                    </td>
	                    <td id="${data[i]._numeroActividad}">${data[i]._actividad}</td>
	                    <td><button type="button" class="button-save" id="save-${data[i]._id}" class="btn btn-info btn-xs">Guardar</button></td>
	                  </tr>`;	
	        ids.push(data[i]._id);		
		}else{
			contentHours += content;
			contentbottom = `	</table>
				              </div>
				              <button type="button" id="save-all-${data[i-1]._documento}" class="btn-save-all btn btn btn-info">Guardar</button>
				              <button type="button" id="${ids}" class="btn btn btn-success approve">Aprobar horas</button>
				            </div>`
			contentHours += contentbottom;
			contentHours += `<div class="user-period">
								<span class="text-left" id="empleado">${data[i]._nombreEmpleado}</span><br>
								<span class="text-right" id="documento">${data[i]._documento}</span>
								<span class="text-right" id="contrato">${data[i]._numContrato}</span>
								<div class="table-responsive">
								<table class="table table-striped table-hover">
									<tr>
				                    	<th>Fecha</th>
				                    	<th>Hora entrada</th>
					                    <th>Hora salida</th>
					                    <th>Novedad supervisor</th>
					                    <th>Novedad Lider P.</th>
					                    <th>Actividad</th>
					                    <th>&ensp;</th>
				                  	</tr>`;
			firtDocument = data[i]._documento.trim();
			i--;
			content="";
			ids = [];
		}

	}
	contentbottom = `	</table>
				       </div>
				      <button type="button" id="save-all-${data[data.length-1]._documento}" class="btn-save-all btn btn btn-info">Guardar</button>
				      <button type="button" id="${ids}" class="btn btn btn-success approve">Aprobar horas</button>
				    </div>`

	contentHours += content;
	contentHours += contentbottom;

	return contentHours;

}

var init = function(){

	accordion();
	initPage();
	events();
	userInit();
	getProjects();
}

window.onload = init;
