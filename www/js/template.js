	
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
	
	$(".datepicker").datepicker({
		dateFormat: 'yy-mm-dd',
		firstDay: 1
	}).datepicker("setDate", new Date());


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




function centerModal(){   
	var $dialog = $(this).find(".modal-dialog");
	var offset = ($(window).height() - $dialog.height()) / 2;
	// Center modal vertically in window
	$dialog.css("margin-top", offset);
}


$(window).on('resize', function (){
	$('.modal:visible').each(centerModal);
	});
	

	










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


