var text = "";

//Services Login*******************************************

function loginServices(data,url){

    showload();
    $.ajax({
        url: urlservices + url,
        type: "POST",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
            var result = JSON.parse(data.d);
            if(result.usuarios.length>0){
                hideload();
                ValidateUser(data.d);
            }
            else{
                text = "No se encontró registro alguno en la base de datos";
                modal(text);
                hideload();
            }
        },
        error: function(equest, status, error){
            alert(status);
        }
    });    
}

//Services editar horas************************************************

function ServiceGetHours(estado,proyecto)
{
    showload();

    var data  = "{ 'estado': " + estado + ", 'proyecto':'"+ proyecto +"' }" 

    $.ajax({
        url: urlservices + "GetHoras",
        type: "POST",
        data: data,
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
        	if(data.d.length>0){
        		hideload();
	        	contentHoursfill(data.d)
        	}
        	else{
                text = "No se encontró registro alguno en la base de datos";
                modal(text);
        		hideload();
        	}
        },
        error: function(equest, status, error){
        	alert(status);
        }
    });
}

function ServiceGetHoursDate(estado,proyecto,fechainical,fechafinal,empleado,)
{
    showload();

    var data  = "{ 'estado': " + estado + ", 'proyecto':'" + proyecto + "', 'fechainical':'" + fechainical + "', 'fechafinal':'" + fechafinal + "', 'documento':'" + empleado + "' }"; 

    $.ajax({
        url: urlservices + "GetHorasdate",
        type: "POST",
        data: data,
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
        	if(data.d.length>0){
        		contentHoursfill(data.d)
        		hideload();
        	}
        	else{
                text = "No se encontró registro alguno en la base de datos";
                modal(text);
        		hideload();
        	}
        },
        error: function(equest, status, error){
        	alert(status);
        }
    });
}

function updateServicesHours(data,url){
    showload();
    $.ajax({
        url: urlservices + url,
        type: "post",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
            if(data.d>0){
                hideload();
                userInit();
                text = "Actualizado satisfactoriamente";
                modal(text);
            }
            else{
                text = "Error al guardar la información. Intentelo nuevamente por favor";
                modal(text);
                hideload();
            }
        },
        error: function(equest, status, error){
            alert(status);
        }
    });   
}

function GetProjects(url){
    showload();
    $.ajax({
        url: urlservices + url,
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
            var dataJson = JSON.parse(data.d);
            if(dataJson.projects.length>0){
                hideload();
                for(i=0;i<dataJson.projects.length;i++){
                    if(dataJson.projects[i].Proyecto.trim() != ""){
                        $('#projectinput').append($('<option>', {
                            value: dataJson.projects[i].idProyecto,
                            text: dataJson.projects[i].Proyecto
                        }));
                    }
                }
            }
            else{
                text = "Hubo un error al traer los proyectos";
                modal(text);
                hideload();
            }
        },
        error: function(equest, status, error){
            text = error;
            modal(text);
        }
    });      
}


//Services generar QR************************************

function generateQRServices(){
    showload();
    $.ajax({
        url: urlservices + "Gettoken",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
            if(data.d.length>0){
                hideload();
                console.log(data);
                generateQR(data.d[0]._token);
            }
            else{
                alert("Error al conectar con el servidor");
                hideload();
            }
        },
        error: function(equest, status, error){
            alert(status);
        }
    });   
}


