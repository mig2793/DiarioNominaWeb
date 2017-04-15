var init = function(){

	var openform = "";
	var heigthheader = "";
	var container = "";
	var logoffb = "";
	var interval = 0;
	var scale = 10;
	var open = false;
	var lastScroll = 0;
	var dateForm = new Array();

	function initPage(){
		container = idDom("user-hours");
		heigthheader = idDom("header-content");
		logoffb = idDom("log-off");
		openform = idDom("open-form");
		dateForm[0] = idDom("date-i");
		dateForm[1] = idDom("date-f");
		dateForm[0].value = getDateCurrent();
		dateForm[1].value = getDateCurrent();
		validateDevice() == true ? heigthheader.className += " fixed" : console.log("devices");
	}

	function events(){
		logoffb.addEventListener("click", logoff, false);
		if( validateDevice()){
			container.style.top = (heigthheader.offsetHeight + 20) +"px";
		    openform.addEventListener("click", openMenu);
		}else
		   document.addEventListener("scroll",scrollDocument,false);
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
		console.log("init");
		location.href = "../index.html"
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

	accordion();
	initPage();
	events()
}

window.onload = init;