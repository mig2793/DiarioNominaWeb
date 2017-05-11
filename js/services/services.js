var text = "";
var state;
var ids = [];

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
                text = `No se encontró registro alguno en la base de datos. ${result.message}`;
                modal(text);
                hideload();
            }
        },
        error: function(equest, status, error){
            hideload();
            text = error;
            modal(text);
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
            hideload();
        	if(data.d.length>0){
	        	contentHoursfill(data.d)
        	}
        	else{
                text = "No se encontró registro alguno en la base de datos";
                modal(text);
        	}
        },
        error: function(equest, status, error){
            hideload();
            text = error;
            modal(text);
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
            hideload();
        	if(data.d.length>0){
        		contentHoursfill(data.d)
        	}
        	else{
                text = "No se encontró registro alguno en la base de datos";
                modal(text);
        	}
        },
        error: function(equest, status, error){
            hideload();
            text = error;
            modal(text);
        }
    });
}

function updateServicesHours(data,url){
    showload();
    var Jsondata = JSON.parse(data);
    state = Jsondata.estado;
    id = Jsondata.id;
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
                if(state == 4)
                    getItemsInsertAX(id)
                
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
            hideload();
            text = error;
            modal(text);
        }
    });   
}

function insertDyamicsAX(data){
    showload();
    data = data.d;
    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                 "<XMLScript Version=\"2.0\">";

    for(var i = 0; i < data.length; i++){
       xml += `<diario>
            <fecha>${data[i]._fecha.split(" ")[0]}</fecha>
            <proyecto>${data[i]._idProyecto}</proyecto>
            <proyectoArbol>${data[i]._proyectoArbol}</proyectoArbol>
            <destino>2</destino>
            <contrato>${data[i]._numContrato}</contrato>
            <propiedad>NOFACTURAB</propiedad>
            <horaInicial>${data[i]._horaEntrada}</horaInicial>
            <horaFinal>${data[i]._horaSalida}</horaFinal>
            <proyectoName>${data[i]._proyecto}</proyectoName>
            <actividad>${data[i]._numeroActividad}</actividad>
        </diario>`
    }

    xml += "</XMLScript>";

    var dataSend = `{"xml" : '${xml}'}`;

    $.ajax({
        url: urlservices + "insertDiariosNominaAX",
        type: "post",
        data: dataSend,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
            hideload();
            if(data.d>0){            
                text = "Se guardo la información a Dynamics AX de forma correcta";
                modal(text);
            }
            else{
                text = "Error al guardar la información en Dynamics, por favor colócate en contacto con el administrador del sistema";
                modal(text);
            }
        },
        error: function(equest, status, error){
            hideload();
            text = status;
            modal(text);
        }
    });  
}

function getItemsInsertAX(data){
    showload();
    datasend = `{"id" : [${data}]}`;
    $.ajax({
        url: urlservices + "getItemInsertAX",
        type: "post",
        data: datasend,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status){
            hideload();
            if(data.d.length>0){
                insertDyamicsAX(data)
                text = "Actualizado satisfactoriamente";
                modal(text);
            }
            else{
                text = "Hubo un error al procesar la información al guardarla en Dynamics.";
                modal(text);
            }
        },
        error: function(equest, status, error){
            hideload();
            text = status;
            modal(text);
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
            hideload();
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
            hideload();
            text = error;
            modal(text);
        }
    });   
}


