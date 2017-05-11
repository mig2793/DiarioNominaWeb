
window.urlservices = "http://localhost:60930/horasNomina.asmx/";

var date = new Date();

function getDateCurrent(){

	var month = Number(date.getUTCMonth()+1).toString();
	var day = date.getUTCDate().toString();
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

function showload(){
	$(".brackground-load").show();
}

function hideload(){
	$(".brackground-load").hide();
}

function accordion(){
	var acc = document.getElementsByClassName("accordion");
	var i;
	for (i = 0; i < acc.length; i++) {
	  acc[i].onclick = function() {
	    this.classList.toggle("active");
	    var panel = this.nextElementSibling;
	    if (panel.style.maxHeight){
	      panel.style.maxHeight = null;
	    } else {
	      panel.style.maxHeight = panel.scrollHeight + "px";
	    } 
	  }
	} 		
}

function getDataUser(data){
	var user = sessionStorage.getItem(data);
	user = JSON.parse(user);
	return user;
}

function validateUserGlobals(){
	var getTypeUser = "Asistentes gestion humana";
	var getproject = "laasdo";

	var cargo;

	if(getTypeUser.indexOf("Ingeniero") >= 0)

		cargo = "lider";

	else if((getTypeUser.indexOf("Asistentes gestion humana") >= 0 || 
			  getTypeUser.indexOf("Profesionales gestion humana") >= 0 ||
			  getTypeUser.indexOf("coordinador de gestion humana") >= 0 ||
			  getTypeUser.indexOf("administrador de obra") >= 0 ||
			  getTypeUser.indexOf("director gestion humana ") >= 0) && getproject == "la caro")

		cargo = "LacaroGH";
	
	else if(getTypeUser.indexOf("Asistentes gestion humana") >= 0 || 
			  getTypeUser.indexOf("Profesionales gestion humana") >= 0 ||
			  getTypeUser.indexOf("coordinador de gestion humana") >= 0 ||
			  getTypeUser.indexOf("administrador de obra") >= 0 ||
			  getTypeUser.indexOf("director gestion humana ") >= 0)

		cargo = "GH";

	else
		cargo = "Error";
		
	return cargo;
}


function modal(text){
	var modal = `<!-- Modal -->
				<div id="myModal" class="modal fade" role="dialog">
				  <div class="modal-dialog">

				    <!-- Modal content-->
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				        <h4 class="modal-title">¡Alerta!</h4>
				      </div>
				      <div class="modal-body">
				        <p>${text}</p>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>

				  </div>
				</div>`;
	$("#popup").append(modal);
	$('#myModal').modal('show');
	$("#myModal button").click(function(){
	$(".modal-backdrop,#myModal").remove();
	});
}

