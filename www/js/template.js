	
	function parametroURL2(_par) {
	  var _p = null;
	  if (location.search) location.search.substr(1).split("&").forEach(function(pllv) {
		var s = pllv.split("="), //separamos llave/valor
		  ll = s[0],
		  v = s[1] && decodeURIComponent(s[1]); //valor hacemos encode para prevenir url encode
		if (ll == _par) { //solo nos interesa si es el nombre del parametro a buscar
		  if(_p==null){
		  _p=v; //si es nula, quiere decir que no tiene valor, solo textual
		  }else if(Array.isArray(_p)){
		  _p.push(v); //si ya es arreglo, agregamos este valor
		  }else{
		  _p=[_p,v]; //si no es arreglo, lo convertimos y agregamos este valor
		  }
		}
	  });
	  return _p;
	}
	function enviarRuta2(id){
		var idEmp = parametroURL2('idEmp');
		var direccion = parametroURL2('direccion');
		var empresa = parametroURL2('empresa'); 
		var idr = '';
		if(id == 1){
			ruta = 'dashboard.html';
			idr = '';
		}else if(id == 2){
			idr = "&idr=0";
			ruta = 'reportes.html';
		}else if(id == 3){
			ruta = 'epg.html';
			idr = '';
		}else if(id == 4){
			ruta = 'balance.html';
			idr = '';
		}
		
		window.location = ""+ruta+"?idEmp="+idEmp+"&direccion="+direccion+"&empresa="+empresa+""+idr+"";
	}
$(document).ready(function(){
	//$('#cargando').on('show.bs.modal',centerModal);
	$('#subemenu,#bajamenu').css('display','none');
	var cookiesmaller=getCookiejs('smaller');
	console.log("Anacook"+cookiesmaller);
	//document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
	/*if(cookiesmaller!=null&&cookiesmaller!=''){
		var smallerMenu=cookiesmaller;
	}else{*/
		if($("#diseno").val() == "old"){
			var smallerMenu = false;
		} else if($("#diseno").val() == "new"){
			var smallerMenu = true;
		}
	//}
	
	/*var dexp= new Date();
	dexp.setTime(dexp.getTime() + (8 * 24 * 60 * 60 * 1000));
	var expires = "expires="+dexp.toUTCString();
	document.cookie = "smaller="+smallerMenu+"; "+expires+"; path=/";*/
	
	//$('#cargando').modal('hide');
	$('#cargando,#cargando2').fadeOut();
	$(window).on('resize',function(){
		$('.modal').on('show.bs.modal', centerModal);
		if($(this).width() >= 768){
			$('#nav-container').data('isshown','false');
			}
	
		if($('#nav-container').data('isshown') == 'false'){
			if($(this).width() >= 768){
				$('#nav-container').css('left','0px');
				$('#content').css('left','220px');
				$('.menuItem').css('left','0px');
				smallerMenu = false;
				}
			else{
				$('#nav-container').css('left','-220px');
				$('#content').css('left','0px');
				$('.menuItem').css('left','0px');
				}
			}
			
		//modal boarding
		/*tamaño del modal abordaje*/
		var boarding=$('#modalabordaje .modal-dialog');
		$(boarding).css('margin',$('#header').css('height')+" auto");
		$(boarding).css("position","absolute");
		$(boarding).css('width',$('#content').css('width'));
		//$(boarding).css('left',$('#content').css('left'));
		$(boarding).css('min-height',$(window).height()-$('#header').height());
		$(boarding).css('background-color','rgba(40,40,41,0.8)');
		if($(window).width()>900){
			$('#derecha,#izquierda').css('width','50%');
			$(boarding).css('left',$('#content').css('left'));
			$('#btnasiento').css('font-size','28px');
			$('#rownomovil').css('display','');
			$('#icolab_3').css('display','none');
		}else{
			$('#derecha,#izquierda').css('width','100%');
			$(boarding).css('left','0px');
			$('#btnasiento').css('font-size','20px');
			$('#rownomovil').css('display','none');
			$('#icolab_3').css('display','');
		}
		
		
		});

	$('.menu-button').on('click',function(){
		if($('#nav-container').css('left') == '0px'){
			$('#nav-container').css('left','-220px').data('isshown','false');
			$('#content').css('left','0px');
			}
		else{
			$('#nav-container').css('left','0px').data('isshown','true');
			$('#content').css('left','220px');
			}
		});
		
	$('.toggle-min').on('click',function(){
		
		if ($('#nav-container, .menuItem, #content').is(':animated')){
			return false;
			}
	
		$('li').find('ul').slideUp('slow',function(){VerFlechas();});
	
		if(smallerMenu === false){
			$('#content').animate({
				left : '50px'
				});
			
			$('#nav-container').animate({
				left : '-220px',
				},function(){
					$('.menuItem').each(function(index,object){
						$(this).delay(index * 100);
						
						$(object).animate({
							left : '220px'},{
								duration: 800,
								easing: 'swing'
								});
						});
					});
			
			setTimeout(function(){
				$('.menuItem').animate({
					left : '170px'
					});
					
				$('#nav-container').animate({
					left : '-170px'
					},function(){VerFlechas();});
				},1500)
			/*if($("#diseno").val() == "new"){
				$("#nav-container").css({"width":"500px","z-index":"1"});					
			}*/
			smallerMenu = true;
			}
		else{
			$('li.open').find('ul').slideDown('slow',function(){VerFlechas();});
		
			$('#content').animate({
				left : '220px'
				});
			if($("#diseno").val() == "new"){
				$("#nav-container").css({"width":"auto","z-index":"98"});				
			}		
			$('#nav-container').animate({
				left : '0'
				});
			
			$('.menuItem').animate({
				left : '0px'
				});
				
			smallerMenu = false;
			}
			
			
			//seteo la cookie del menu
			/*var dexp= new Date();
			dexp.setTime(dexp.getTime() + (8 * 24 * 60 * 60 * 1000));
			var expires = "expires="+dexp.toUTCString();
			document.cookie = "smaller="+smallerMenu+"; "+expires+"; path=/";*/
		});
		
	$('#nav > li').on('mouseenter',function(){
		if(smallerMenu === true){
      $("#nav-container").css("z-index","9");
			if($(this).closest('li').children('ul').length > 0){
				var menu = '';
				var contador = 1;
				$(this).closest('li').children('ul').children('li').each(function(){
					
					var getHTML = $(this).html();
					var newHTML = $(getHTML);
					var url = newHTML.attr('href');
					newHTML.find('i').css({'padding' : '0px', 'padding-left' : '10px', 'padding-right' : '10px', 'text-align' : 'left','font-style':'normal'});
					if($(this).css('display')!='none'){
						menu += '<li style="text-align: left;"><a style="padding: 0px;" onclick = "enviarRuta2('+contador+')" >'+ newHTML.html() +'</a></li>';
					}
					contador++;
				});
					
				$(this).find('i:first').append('<div class="dynMenu" style="background-color: #f1f1f1; color: #333333; left: 50px; width: 200px; font-family:Lato,Roboto,Arial; box-shadow: 1px 0px 6px 0px rgba(50, 50, 50, 0.64); top:0px; position: absolute; z-index: 999999;"><ul style="display: block;">'+ menu +'</ul></div>');
				
				var wheight=$(window).height();
				var topmenu=$('.dynMenu').offset().top;
				var mheight=$('.dynMenu').height();
				
				if(topmenu+mheight>wheight){
					var diff=wheight-(topmenu+mheight)-50;
					$('.dynMenu').animate({top:diff},600,function(){});
				}
			}
		
		}
	});
		
	$('#nav > li').on('mouseleave',function(){
		$('.dynMenu').remove();
    $("#nav-container").css("z-index","1");
	});

	$('#nav li').on('click',function(event){
		//$('#cargando2,#cargando').fadeIn();
		if(smallerMenu === false){
			$('#cargando2,#cargando').fadeIn();
			event.stopPropagation();
			if($(this).find('a').attr('href') == '#'){
				if($(this).find('ul').length > 0){
					if($(this).find('ul').css('display') == 'block'){
						$('#nav-wrapper ul#nav li ul').removeClass('open');
						$('#nav-wrapper ul#nav li ul').slideUp('slow',function(){VerFlechas();});
						$('#cargando2,#cargando').fadeOut();
						}
					else{
						$('#nav-wrapper ul#nav li').removeClass('open');
						$('#nav-wrapper ul#nav li ul').slideUp('slow',function(){VerFlechas();});
						$(this).addClass('open');
						$(this).find('ul').slideDown('slow',function(){VerFlechas();});
						$('#cargando2,#cargando').fadeOut();
						}
					}
				}
			}
		else{
			//event.stopPropagation();
			/*if($(this).closest('li').children('ul').length > 0){
				$('.dynMenu').remove();
				var menu = '';
				$(this).closest('li').children('ul').children('li').each(function(){
					var getHTML = $(this).html();
					var newHTML = $(getHTML);
					newHTML.find('i').css({'padding' : '0px', 'padding-left' : '10px', 'padding-right' : '10px', 'text-align' : 'left'});
					
					menu += '<li style="text-align: left;">'+ newHTML.html() +'</li>';
					});
					
				$(this).find('i:first').append('<div class="dynMenu" style="background-color: #f1f1f1; color: #333333; left: 50px; width: 200px; font-family: Roboto,Arial,Helvetica,sans-serif; box-shadow: 1px 0px 6px 0px rgba(50, 50, 50, 0.64); top:0px; position: absolute; z-index: 999999;"><ul style="display: block;">'+ menu +'</ul></div>');
				
				
				var wheight=$(window).height();
				var topmenu=$('.dynMenu').offset().top;
				var mheight=$('.dynMenu').height();
				
				if(topmenu+mheight>wheight){
					var diff=wheight-(topmenu+mheight)-50;
					$('.dynMenu').animate({top:diff},600,function(){});
				}
				
				}*/
			}
		});
		
	$('.modal:visible').each(centerModal);
	
	$('.submit').on('click',function(){
		var errors = [
					'La direccion del correo electronico no es correcta',
					'Falta llenar campos obligatorios',
					'El numero de documento es incorrecto',
                    'Contraseñas no son iguales'
					]; 
					
		var submiterrors = new Array();
		var allowedToContinue = true;
		$('.obligated').css('border','1px solid #ccc');

		$('.obligated').each(function(){
			if($(this).val() == ''){
				$(this).css('border','1px solid #d30707');
				allowedToContinue = false;
				if($.inArray(1, submiterrors) === -1){
					submiterrors.push(1);
					}
				}
				
			if($(this).attr('name') == 'email'){
				if(!IsEmail($(this).val())){
					$(this).css('border','1px solid #d30707');
					allowedToContinue = false;
					if($.inArray(0, submiterrors) === -1){
						submiterrors.push(0);
						}
					}
				}
				
			if($(this).attr('name') == 'cedula' || $(this).attr('name') == 'ruc'){
				if(ValidarCedula($(this).val()) === false){
					$(this).css('border','1px solid #d30707');
					allowedToContinue = false;
					if($.inArray(2, submiterrors) === -1){
						submiterrors.push(2);
						}
					}
				}

             if($(this).attr('name') == 'pass'){
				if($('input:password[name=pass]').val() != $('input:password[name=pass2]').val()){
					$('input:password[name=pass2]').css('border','1px solid #d30707');
                    $(this).css('border','1px solid #d30707');
					allowedToContinue = false;
					if($.inArray(0, submiterrors) === -1){
						submiterrors.push(3);
						}
					}
				}
			});
			
		//alert(allowedToContinue);
		if(allowedToContinue === true){
				$('form').not('#fileform').submit();
			}
		else{
			var errorContents = '<ul>';
			$(submiterrors).each(function(key,value){
				errorContents += '<li>' + errors[value] +'</li>';
				});
				
			errorContents += '</ul>';
			$('#error-content').html(errorContents);
			$('.alert-danger').not('#uploaderrors').slideDown();
			}
		});
	
	
	// $('.datepicker,.datepickerNotLessThanFirst').datepicker({
	// 	showAnim: 'slideDown',
	// 	showOtherMonths: true,
	// 	dateFormat: 'yy-mm-dd',
	// 	dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
	// 	changeMonth: true,
	// 	changeYear: true
	// });
		
	$('.datepickerLimitToday').datepicker({
		showAnim: 'slideDown',
		showOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		changeMonth: true,
		changeYear: true
		//maxDate: 0,
		// onSelect: function(date){
			// var date2 = $('.datepickerLimitToday').datepicker('getDate');
            // //date2.setDate(date2.getDate() + 1);
            // date2.setDate(date2.getDate());
            // $('.datepickerNotLessThanFirst').datepicker('option','minDate',date2);
			// }
		});
		
		
	$('.datepicker').datepicker({
		showAnim: 'slideDown',
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
	});
		
	$('.soloInt').on('keydown',function(event,value){
		justInt(event,$(this).val());
		});
		
	$('.soloFloat').on('keydown',function(event,value){
		intOrFloat(event,$(this).val());
	});

    $('.soloFloatneg').on('keydown',function(event,value){
		intOrFloatneg(event,$(this).val());
	});
		
	$('.soloText').on('keydown',function(event,value){
		justText(event,$(this).val());
		});
		
		
	/*tamaño del modal abordaje*/
	var boarding=$('#modalabordaje .modal-dialog');
	$(boarding).css('margin',$('#header').css('height')+" auto");
	$(boarding).css("position","absolute");
	$(boarding).css('width',$('#content').css('width'));
	//$(boarding).css('left',$('#content').css('left'));
	$(boarding).css('min-height',$(window).height()-$('#header').height());
	$(boarding).css('background-color','rgba(40,40,41,0.8)');
	if($(window).width()>900){
		$('#derecha,#izquierda').css('width','50%');
		$(boarding).css('left',$('#content').css('left'));
		$('#btnasiento').css('font-size','28px');
		$('#rownomovil').css('display','');
		$('#icolab_3').css('display','none');
	}else{
		$('#derecha,#izquierda').css('width','100%');
		$(boarding).css('left','0px');
		$('#btnasiento').css('font-size','20px');
		$('#rownomovil').css('display','none');
		$('#icolab_3').css('display','');
	}
	
	$.ajax({
	  url: "ajax/tieneasientos.php",
	  data:{cual:1}
	}).done(function(resp){
		if(resp=='no'){
			$('#modalabordaje').modal('show');
			/*if($('.menu-button').css('display')!='none'){
				$('.menu-button').click();
			}*/
		}
	});
	
	$('#bajamenu').on('click',function(){
		moverMenu(1);
	});
	
	$('#subemenu').on('click',function(){
		moverMenu(2);
	});
	
	VerFlechas();
});


function VerFlechas(){
	if($('#nav-container').position().left==0){
		var wheight=$(window).height();
		var mheight=$('#nav').height();

		if((mheight+60)>wheight){
			//alert($('#nav-container').position().top);
			if($('#nav-container').position().top<0){
				$('#subemenu').fadeIn('slow');
				$('#bajamenu').fadeOut('slow');
			}
			else{
				$('#subemenu').fadeOut('slow');
				$('#bajamenu').fadeIn('slow');
			}
		}else{
			$('#subemenu,#bajamenu').fadeOut();
			$('#nav-container').animate({top:60},500,function(){});
		}
	}else{
		$('#subemenu,#bajamenu').fadeOut();
		
	}
	
}


function SinBoarding(dcomo){
	$.ajax({
	  url: "ajax/tieneasientos.php",
	  data:{cual:2}
	}).done(function(resp){
		clearInterval(timerico);
		if(dcomo==1){
			window.location="?modulo=administrador&index=primerasiento";
		}
	});
}
	
function ActualizarHito(cual){
	if(cual==2)
		 $('body').hito({id : 1, path : 'Creacion de Productos',sendMailOnSuccess : false, sendMailOnFailure : false});
	if(cual==3){
		$('body').hito({id : 2, path : 'Descarga de App',sendMailOnSuccess : false, sendMailOnFailure : false,url:'../../configuracion/versiones/SetupPractisis3.exe',reload:true})
	}
		
}

function centerModal(){   
	var $dialog = $(this).find(".modal-dialog");
	var offset = ($(window).height() - $dialog.height()) / 2;
	// Center modal vertically in window
	$dialog.css("margin-top", offset);
}


$(window).on('resize', function (){
	$('.modal:visible').each(centerModal);
	});
	
function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
	}
	
function ValidarCedula(numero){
	if (contryppt==25){
		//panama
		return true;
	}
	else if(contryppt==18){	
		//guatemala
		if(numero=='CF'){
			return true;
		}
		else{			
			var nd, add=0;
			if(nd =  /^(\d+)\-?([\dk])$/i.exec(numero)){
				nd[2] = (nd[2].toLowerCase()=='k')?10:parseInt(nd[2]);
				for (var i = 0; i < nd[1].length; i++) {
					add += ( (((i-nd[1].length)*-1)+1) * nd[1][i] );
				}
				return ((11 - (add % 11)) % 11) == nd[2];
			}else{
				return false;
			}
		}
	}
	else if(contryppt==23){	
		//Mexico
		var rfc         = numero.trim().toUpperCase();
		var rfcCorrecto=rfcValido(rfc)
		if (rfcCorrecto) {
			return true;
		}else{
					return true;

		}

	}

	else if(contryppt==13){
		//Costa Rica
		var numCedula  =numero;
        //cedulaValida = /^[1-9]-?\d{4}-?\d{4}$/;
        if(numCedula.length<10)
			return false;
		
		for(var i;i<numCedula.length;i++){
			if(isNaN(numCedula[i]))
				error++;
		}
		
		error=0;
		if(error==0)
			return true;
		else
			return false;
	}
	else if(contryppt==27){		
		//Perú
		//
 	    var primercaracter = numero.substr(0,1);
		if(numero=='DNI'){
			return true;
		}else if(primercaracter == 'p' || primercaracter == 'P'){
            return true;
		}else{
			if(numero.length == 11){
				var hash = [ 5, 4, 3, 2, 7, 6, 5, 4, 3, 2 ];
				var addition = 0;
				var identificationLength=numero.length;
				var identificationComponent=Array.from(numero);
				var firstDigits=parseInt(numero.substr(0,2));
				if(firstDigits==10 || firstDigits==15 || firstDigits==16 || firstDigits==17 || firstDigits==20 ){
					for (var i = 0; i <identificationLength-1; i++)
					{
						addition += identificationComponent[i] * hash[i];					
						//echo $identificationComponent[$i]."*".$hash[$i]."<br>";					
					}
					var verificador=11-(addition % 11);
					if(verificador>9){
						if((verificador-10)==parseInt(identificationComponent[identificationLength-1])){
							//echo "RUC válido";
							return true;
						}
						else{
							//echo "RUC no válido";
							return false;
						}
					}
					else{
						if(verificador==parseInt(identificationComponent[identificationLength-1])){
							//echo "RUC válido";
							return true;
						}
						else{
							//echo "RUC no válido";
							return false;
						}
					}
				}
				else{
					return false;
				}
			}
			else{
				var addition = 0;
				var hash = [ 2,3,4,5,6,7,2,3 ];
		 
				var identificationDocumentLength=numero.length-1;
				var identificationDocument=Array.from(numero);
				var identificationComponent = Array.from(numero);
				identificationComponent=identificationComponent.reverse(); 
				var identificationComponentLength = identificationComponent.length-1;
				for (var i = 1; i <=identificationComponentLength; i++)
				{
					addition += identificationComponent[i] * hash[i-1];
				}
				
				addition = 11 - (addition % 11);
				var last = (identificationDocument[identificationDocumentLength]);
				if (!isNaN(last))
				{
					var hashNumbers = [ '6', '7', '8', '9', '0', '1', '1', '2', '3', '4', '5' ];
					//return last.Equals(hashNumbers[addition]);
					
					if(last==hashNumbers[addition]){
						//echo "true ".$last." ".$hashNumbers[$addition];
						//echo "DNI válido";
						return true;
					}
					else{
						//echo "false ".$last." ".$hashNumbers[$addition];
						//echo "DNI no válido";
						return false;
					}
				}
				else if (isNaN(last))
				{
					var hashLetters = [  'K', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
					if(last==hashLetters[addition]){
						//echo "true ".$last." ".$hashLetters[$addition];
						//echo "DNI válido";
						return true;
					}
					else{
						//echo "false ".$last." ".$hashLetters[$addition];
						//echo "DNI no válido";
						return false;
					}
					//return last.Equals($hashLetters[$addition]);
				}
				else{
					//echo "DNI no válido";
					return false;
				}
			}
		}
	} else if(contryppt==23){
		cadena =numero.replace(/-/g,"");
	    cadena =numero.replace(/ /g,"");
	    cadena =numero.replace(/[.]/g,"");
	    if (cadena.length > 11 && cadena.length < 14){
	    	var nombre = cadena.substr(0,4).toLowerCase();									
			if (nombre.match(/^[a-zA-Z]+$/)){
				var anio = cadena.substr(4,2);
	        	if (anio.match(/^[0-9]+$/)){
	        		var mes = cadena.substr(6,2);
	        		if (mes.match(/^[0-9]+$/) && (parseInt(mes) >= 1) && (parseInt(mes) <= 12)){
	        			var dia = cadena.substr(8,2);
	    				if (dia.match(/^[0-9]+$/)){        					
	    					if(((mes == "01") || (mes == "03") || (mes == "05") || (mes == "07") || (mes == "08") || (mes == "10") || (mes == "12")) && (parseInt(dia) >= 1) && (parseInt(dia) <= 31)){
	    						return true;
	    					} else if(((mes == "04") || (mes == "06") || (mes == "09") || (mes == "11")) && (parseInt(dia) >= 1) && (parseInt(dia) <= 30)){    						
	    						return true;
	    					} else if((mes == "02") && (parseInt(dia) >= 1) && (parseInt(dia) <= 29)){
	    						return true;
	    					} else {
	    						return false;
	    					}   					
	    				} else {
	    					return false;
	    				}					
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				var nombre = cadena.substr(0,3).toLowerCase();										
				if (nombre.match(/^[a-zA-Z]+$/)){
					var anio = cadena.substr(3,2);
	        		if (anio.match(/^[0-9]+$/)){
	        			var mes = cadena.substr(5,2);
	        			if (mes.match(/^[0-9]+$/) && (parseInt(mes) >= 1) && (parseInt(mes) <= 12)){
	        				var dia = cadena.substr(7,2);
	        				if (dia.match(/^[0-9]+$/)){        					
	        					if(((mes == "01") || (mes == "03") || (mes == "05") || (mes == "07") || (mes == "08") || (mes == "10") || (mes == "12")) && (parseInt(dia) >= 1) && (parseInt(dia) <= 31)){
	    							return true;
	    						} else if(((mes == "04") || (mes == "06") || (mes == "09") || (mes == "11")) && (parseInt(dia) >= 1) && (parseInt(dia) <= 30)){
	    							return true;
	    						} else if((mes == "02") && (parseInt(dia) >= 1) && (parseInt(dia) <= 29)){
	    							return true;
	    						} else {
	    							return false;
	    						}
	        				} else {
	        					return false;
	        				}
	        			} else {
	        				return false;
	        			}
	        		} else {
	        			return false;
	        		}
				} else {
					return false;
				}			
			}
		} else {
	        return false;
	    }
	} else if(contryppt==13){
		cadena =numero.replace(/-/g,"");
	    cadena =numero.replace(/ /g,"");
	    cadena =numero.replace(/[.]/g,"");
	    if (cadena.length == 10){
	    	if (cadena.match(/^[0-9]+$/)){
	    		return true;
	    	} else {
	    		return false;
	    	}
	    } else {
	    	return false;
	    }
	}else if(contryppt==12){
		return VerificarColombiaNit(numero);
	}
	else{
		//default ecuador
	if(numero != ''){
	  if(numero=='9999999999999')
    	return true;
      if(numero.indexOf("p")==0||numero.indexOf("P")==0)
    	return true;
      if($.isNumeric(numero.substr(0,1))==false)
    	return false;

		var suma = 0;
		var residuo = 0;
		var pri = false;
		var pub = false;
		var nat = false;
		var numeroProvincias = 24;
		var modulo = 11;
		var ok = 1;
		d1 = numero.substr(0,1);
		d2 = numero.substr(1,1);
		d3 = numero.substr(2,1);
		d4 = numero.substr(3,1);
		d5 = numero.substr(4,1);
		d6 = numero.substr(5,1);
		d7 = numero.substr(6,1);
		d8 = numero.substr(7,1);
		d9 = numero.substr(8,1);
		d10 = numero.substr(9,1);


		if(d3 == 7 || d3 == 8){
			console.log("entra al d3");
			return false;
			}

		if (d3 < 6){
			nat = true;
			p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
			p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
			p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
			p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
			p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
			p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
			p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
			p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
			p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
			modulo = 10;
			}

		else if(d3 == 6){
			pub = true;
			p1 = d1 * 3;
			p2 = d2 * 2;
			p3 = d3 * 7;
			p4 = d4 * 6;
			p5 = d5 * 5;
			p6 = d6 * 4;
			p7 = d7 * 3;
			p8 = d8 * 2;
			p9 = 0;
			}

		else if(d3 == 9) {
			pri = true;
			p1 = d1 * 4;
			p2 = d2 * 3;
			p3 = d3 * 2;
			p4 = d4 * 7;
			p5 = d5 * 6;
			p6 = d6 * 5;
			p7 = d7 * 4;
			p8 = d8 * 3;
			p9 = d9 * 2;
			}

		suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
		residuo = suma % modulo;

		digitoVerificador = residuo==0 ? 0: modulo - residuo;
 
		if (digitoVerificador >= 10) digitoVerificador -= 9;
		if(pub == true){
			if(digitoVerificador != d9){
				console.log("entra al d9:"+digitoVerificador+"/"+d9);
				/*calcula de nuevo el digito verificador*/
				p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
				p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
				p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
				p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
				p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
				p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
				p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
				p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
				p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
				modulo = 10;
				suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
				residuo = suma % modulo;
				digitoVerificador = residuo==0 ? 0: modulo - residuo;
				if (digitoVerificador >= 10) digitoVerificador -= 9;
				console.log("Valida por digito 10:"+digitoVerificador+"/"+d10);
				if(digitoVerificador != d10){
					console.log("entra al d10:"+digitoVerificador+"/"+d10);
					return false;
				}
				
			}
				
			if(numero.length >10 && numero.substr(10,3) != '001'){
				console.log("entra al 001");
				return false;
			}
		}
		else if(pri == true){
			if(digitoVerificador != d10){
				console.log("entra al digito verificador.");
				return false;
			}
			if(numero.substr(10,3) != '001'){
				console.log("entra al 001 dos");
				return false;
			}
		}
		else if(nat == true){
			if (digitoVerificador != d10){
				console.log("entra al digito verificador nat.");
				return false;
			}
			if(numero.length >10 && numero.substr(10,3) != '001'){
				console.log("entra al 001 tres");
				return false;
			}
		}			
		return true;
	}
	else{
		console.log("entra al ''");
		return false;
		}
		}
	}
	
function intOrFloat(e,value){
    if(value.indexOf('.') !== -1 && (e.keyCode == 190 || e.keyCode == 110)){
        e.preventDefault();
        }

    if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 46 || e.keyCode == 190 || e.keyCode == 110 || e.keyCode == 13){
        return;
        }
    else{
        e.preventDefault();
        }
    }

function intOrFloatneg(e,value){
//alert(e.keyCode);
  if(value.indexOf('.') !== -1 && (e.keyCode == 190 || e.keyCode == 110)){
      e.preventDefault();
      }

  if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 46 || e.keyCode == 190 || e.keyCode == 110 || e.keyCode == 13 || e.keyCode == 109){
      return;
      }
  else{
      e.preventDefault();
      }
}

function justInt(e,value){
    if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 13)){
        return;
        }
    else{
        e.preventDefault();
        }
    }
	
function justText(e,value){
    if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 9 || e.which == 0 || e.keyCode == 32){
        return;
        }
    else{
        e.preventDefault();
        }
    }
	
function SetOffset(offset){
	$('#cargando,#cargando2').fadeIn();
	if($('#filtro').find('[name="offset"]').length <= 0){
		if($('#filtro').find('#offset').length <= 0){
			$('#filtro').append('<input type="hidden" name="offset" id="offset" value="'+ offset +'"/>');
			}
		else{
			if($('#filtro').attr('name') == 'offset'){
				$('#filtro').find('#offset').val(offset);
				}
			else{
				$('#filtro').find('#offset').attr('name','offset').val(offset);
				}
			}
		}
	else{
		$('#filtro').find('[name="offset"]').val(offset);
		}
		
	$('#filtro').submit();
	
}


//envia el mail de soporte
function EnviaMailSoporte(){
	var asunto=$('#asuntosoporte').val();
	var mensaje=$('#mensajesoporte').val();
	if(asunto!=''&&mensaje!=''){
		$.ajax({
		  method: "POST",
		  url: "ajax/enviarmailsoporte.php",
		  data:{asunto:asunto,mensaje:mensaje}
		}).done(function(responsetext ) {
			$('#alertasoporte').attr('class','alert alert-info');
		    $('#alertasoporte').html(responsetext);
			$('#alertasoporte').slideDown();
			$('#asuntosoporte').val('');
			$('#mensajesoporte').val('');
		});
	}else{
		$('#alertasoporte').attr('class','alert alert-danger');
		$('#alertasoporte').html('Por favor ingrese todos los campos.');
		$('#alertasoporte').slideDown();
		
	}
}

$('#modalsoporte').on('hidden.bs.modal', function () {
	$('#alertasoporte').html('');
	$('#alertasoporte').css('display','none');
});

var pasoicono=0;
var timerico;
$('#modalabordaje').on('shown.bs.modal', function () {
	if($(window).width()>900){
		var liegreso=$('#nav>li')[2];
		liegreso.click();
	}
	timerico=setInterval(function(){
		//$('#ico_'+pasoicono).effect('highlight',{color: '#5cb85c'},2000);
		$('#ico_'+pasoicono).fadeToggle(1000);
		$('#icolab_'+pasoicono).fadeToggle(1000);
		$('#ico_'+pasoicono).fadeToggle(500);
		$('#icolab_'+pasoicono).fadeToggle(500);
		//$('#ico_'+pasoicono).effect('Shake');
		//$('#icolab_'+pasoicono).effect('highlight',{color: '#5cb85c'},2000);
		if(pasoicono<2)
			pasoicono++;
		else
			pasoicono=0;
	},5000);
	
	
});

function ControlaBloqueo(input){
	// alert('entra:'+$(input).val());
	var fechabloq=$('#bloqueoperiodo').val();
	var fechafact=$(input).val();
	if(fechabloq!=null&&fechabloq!=''){
		if(fechabloq>fechafact){
			$(input).val(fechabloq);
			$(input).effect( "highlight",{},3000);
			//$(input).fadeTo(100, 0.1).fadeTo(200, 1.0);
		}
	}
}

function rfcValido(rfc, aceptarGenerico = true) {
    const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var   validado = rfc.match(re);

    if (!validado)  //Coincide con el formato general del regex?
        return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
          rfcSinDigito      = validado.slice(1).join(''),
          len               = rfcSinDigito.length,

    //Obtener el digito esperado
          diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
          indice            = len + 1;
    var   suma,
          digitoEsperado;

    if (len == 12) suma = 0
    else suma = 481; //Ajuste para persona moral

    for(var i=0; i<len; i++)
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - suma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificador != digitoEsperado)
     && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
        return false;
    return rfcSinDigito + digitoVerificador;
}

function moverMenu(hacia){
	/**cambiar top menu según alto**/
	var wheight=$(window).height();
	var topmenu=$('#nav').offset().top;
	var mheight=$('#nav').height();

	//alert(mheight+'/'+wheight);
	
	if(hacia==1){
		var diff=wheight-(mheight);
		$('#nav-container').animate({top:diff},500,function(){$('#subemenu').fadeIn();$('#bajamenu').fadeOut();});
	}else{
		$('#nav-container').animate({top:60},500,function(){$('#bajamenu').fadeIn();$('#subemenu').fadeOut();});
	}
}

function getCookiejs(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function VerificarColombiaNit(numero){
	if(numero=='9999999999999'||numero=='9999999999')
		return true;
	var primos=[71,67,59,53,47,43,41,37,29,23,19,17,13,7,3];
	var numero=numero.replace("-","");
	//console.log(numero);
	if(numero.length<8){
		//console.log("no 10");
		return false;
	}else{
		var dim=numero.length;
		if(dim==10){
			var validar=numero.substring(0,9);
			validar="000000"+validar;
		}else if(dim==9){
			var validar=numero.substring(0,8);
			validar="0000000"+validar;
		}
		else if(dim==8){
			console.log('entra al ocho');
			var validar=numero;
			validar="0000000"+validar;
		}
			
		console.log(validar);
		var suma=0;
		for(var i=0;i<=14;i++){
			suma+=parseInt(validar[i])*primos[i];
		}
		//console.log(suma);
		var res=suma%11;
		var digitocheck=0;
		if(res==0||res==1){
			digitocheck=res;
		}else{
			digitocheck=11-res;
		}
		
		console.log('digitochekc'+digitocheck);
		if(dim==8)
			numero=numero+digitocheck;
		if(digitocheck==numero[numero.length-1]){
			return true;
		}
		else{
			//console.log(res+"/"+numero[9]);
			return false;
		}
	}
}

function ReemplazarMoneda(){
	$('.money').each(function(){
		var cambiar=$('.money').html();
		var simbol='$';
		if(contryppt==27){
			simbol='S/.';
		}
		var cambiar=cambiar.replace('$',simbol);
	});
}

