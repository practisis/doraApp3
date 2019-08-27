
	var materiaProd = $('#materiaProd').val();
	var finalProd = $('#finalProd').val();
	var ivaProd = $('#ivaProd').val();
	if(materiaProd == 1){
		$('input[name="materiaProdch"]').bootstrapSwitch('state', true);
		if($('#id').val()!=0&&$('#id').val()!=''&&$('#id').val()!=null)
			  $('#btnconversion').fadeIn();
		
	}else{
		$('input[name="materiaProdch"]').bootstrapSwitch('state', false);
		$('#impuestoscompra,#btnconversion').fadeOut();
	}

	if(finalProd == 1){
		$('input[name="finalProdch"]').bootstrapSwitch('state', true);
		$('#celdaprec').fadeIn();
		
	}else{
		$('input[name="finalProdch"]').bootstrapSwitch('state', false);
		$('#impuestosventa').fadeOut();
		//$('#celdaprec').fadeOut();
	}
	
	if($('#id').val()==0||$('#id').val()==''||$('#id').val()==null){
		//$('#unidadGroup,#labelUnidad').css('display','none');
	}

	if(ivaProd == 1){
		$('input[name="ivaProdch"]').bootstrapSwitch('state', true);
	}else{
		$('input[name="ivaProdch"]').bootstrapSwitch('state', false);
	}
							
    $('input[name="materiaProdch"]').on('switchChange.bootstrapSwitch', function(event, state) {
	  if(state == true){
		  $('#materiaProd').val(1);
		  $('#impuestoscompra').fadeIn();
		  //console.log($('#id_prod').val());
          if($('#id').val()==0){
            //$('#conver').fadeIn();
          }
		  if($('#id').val()!=0&&$('#id').val()!=''&&$('#id').val()!=null){
			  $('#btnconversion').fadeIn();
          }
	  }else if(state == false){
		  $('#materiaProd').val(0);
		  $('#impuestoscompra,#btnconversion,#conver').fadeOut();
	  }
	});
	
	 $('input[name="finalProdch"]').on('switchChange.bootstrapSwitch', function(event, state) {
	  if(state == true){
		  $('#finalProd').val(1);
		  $('#impuestosventa,#celdaprec').fadeIn();
	  }else if(state == false){
		  $('#finalProd').val(0);
		  $('#impuestosventa,#celdaprec').fadeOut();
	  }
	 
	});
	
	$('input[name="ivaProdch"]').on('switchChange.bootstrapSwitch', function(event, state) {
	   if(state == true){
		  $('#ivaProd').val(1);
	  }else if(state == false){
		  $('#ivaProd').val(0);
	  }
	});
	
	$('.impventa').on('switchChange.bootstrapSwitch',function(event,state){
		 jsonimpuestosventa();
	});
	
	$('#codigoProd').change(function(){
		AdvertirCodigo();
	});
	
	$('#codigoProd,#precioSinImpuestos,#formulado_tipo').blur(function(){
		AdvertirCodigo();
	});
	
	$('#precioSinImpuestos').change(function(){
		jsonimpuestosventa();
	});
	$('#precioSinImpuestos').keyup(function(){
		jsonimpuestosventa();
	});
	
	$('#precioConImpuestos').change(function(){
		jsonimpuestosventa2();
	});
	
	$('#precioConImpuestos').keyup(function(){
		jsonimpuestosventa2();
	});
	
	function AdvertirCodigo(){
		var valorcode=$('#codigoProd').val();
		if(valorcode==null||valorcode==''){
			$('.alert-info').html('Si no coloca un número de código, el sistema le asignará uno, automáticamente.');
			$('.alert-info').slideDown();
		}else{
			$('.alert-info').html('');
			$('.alert-info').slideUp();
		}
	}
	
	
	function jsonimpuestosventa(){
		var arrayimpventa=new Array();
		var precioprod=parseFloat($('#precioSinImpuestos').val());
		//var nuevoprecio=precioprod;
		var nuevoprecio1=0;
		var nuevoprecio2=0;
		var nuevoprecio=0;
        //alert('iva');
		$('.impventa').each(function(){
			//console.log($(this).is(':checked'));
			var datoimp= new Array($(this).attr('data-id'),$(this).is(':checked').toString());
			arrayimpventa.push(datoimp);
			if($(this).is(':checked')){
				if($(this).attr('data-id')==1){
					//precioprod=parseFloat($('#precioSinImpuestos').val());
					var porcen=parseFloat($(this).attr('data-value'));
					nuevoprecio1=precioprod*porcen;
				}
				else if($(this).attr('data-id')==2){
					//precioprod=parseFloat($('#precioSinImpuestos').val());
					var porcen=parseFloat($(this).attr('data-value'));
					nuevoprecio2=precioprod*porcen;
				}else{
					var porcen=parseFloat($(this).attr('data-value'));
					nuevoprecio=precioprod*porcen;
				}
					
			}
		});
		precioprod+=nuevoprecio1+nuevoprecio2+nuevoprecio;
		//console.log(arrayimpventa);
		$('#jsonimpventa').val(JSON.stringify(arrayimpventa));
		console.log(precioprod);
		if($('#seisdec').val()==1)
			$('#precioConImpuestos').val(precioprod.toFixed(6));
		else
			$('#precioConImpuestos').val(precioprod.toFixed(2));
	}
	
	function jsonimpuestosventa2(){
		var arrayimpventa=new Array();
		var precioprodimp=parseFloat($('#precioConImpuestos').val());
		//var nuevoprecio=precioprod;
		var nuevoprecio=1;
		$('.impventa').each(function(){
			//console.log($(this).is(':checked'));
			var datoimp= new Array($(this).attr('data-id'),$(this).is(':checked').toString());
			arrayimpventa.push(datoimp);
			if($(this).is(':checked')){
				if($(this).attr('data-id')==1){
					//precioprod=parseFloat($('#precioSinImpuestos').val());
					var porcen=parseFloat($(this).attr('data-value'));
					nuevoprecio+=porcen;
				}
				if($(this).attr('data-id')==2){
					//precioprod=parseFloat($('#precioSinImpuestos').val());
					var porcen=parseFloat($(this).attr('data-value'));
					nuevoprecio+=porcen;
				}
				if($(this).attr('data-id')>2){
					//precioprod=parseFloat($('#precioSinImpuestos').val());
					var porcen=parseFloat($(this).attr('data-value'));
					nuevoprecio+=porcen;
				}
					
			}
		});
		precioprodimp=precioprodimp/nuevoprecio;
		//console.log(arrayimpventa);
		$('#jsonimpventa').val(JSON.stringify(arrayimpventa));
		console.log(precioprodimp);
		$('#precioSinImpuestos').val(precioprodimp.toFixed(4));
		//console.log("Ana"+precioprodimp);
		if($('#seisdec').val()==1)
			$('#precioSinImpuestos').val(precioprodimp.toFixed(6));
	}
	
	$(document).ready(function(){
	$("[name='materiaProdch']").bootstrapSwitch();
	$("[name='finalProdch']").bootstrapSwitch();
	$("[name='ivaProdch']").bootstrapSwitch();
	$(".impventa").bootstrapSwitch();
	jsonimpuestosventa();
    $.ajax({
        url: "ajax/productos/formulados_tipo_name.php",
        data: {id:1},
        dataType: "json",
        success: function(response){
            var data = $(response).map(function(){
                return {value: this.formulado};
            }).get();
 
            $('#formulado_tipo').autocomplete({
                source: data,
                minLength: 0,
                select: function(event,ui){
                    $('#formulado_tipo').val(ui.item.id);
                }
            });
        }
    });
	
	 /*$.ajax({
        url: "ajax/productos/formulados_unidad_name.php",
        data: {id:1},
        dataType: "json",
        success: function(response){
            var data = $(response).map(function(){
                return {value: this.unidad};
            }).get();
 
            $('#unidadProd').autocomplete({
                source: data,
                minLength: 0,
                select: function(event,ui){
                    $('#unidadProd').val(ui.item.id);
                }
            });
        }
    });*/
	
	
	if($('#finalProd').val()==1){
		
		$('#btnformulaciones').css('display','');
	}
	
	CalcularICE();
});
	// $(function() {
            // $("#formulado_tipo").autocomplete({
                // source: "ajax/bodegas/productos/formulados_tipo_name.php",
                // minLength: 1,
                // select: function(event, ui) {
                    // $('#formulado_tipo').val(ui.item.formulado);
                // }
            // }).data('ui-autocomplete')._renderItem = function(ul,item){
				// var forrmulado = item.formulado;
				// return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.formulado +'</a>').appendTo(ul);
				// $('#formulado_tipo').val(formulado);
            // };
        // });
	// function escojer(id){
		// alert(id);
		//$('#formulado_tipo').val(id);
	// }
	// $('#formulado_tipo').autocomplete({
      
        // select: function(event,ui){
            // $('[name="formulado_tipo[]"]').val(ui.item.formulado);
            // }
        // }).data('ui-autocomplete')._renderItem = function(ul,item){
            // return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.formulado +'</a>').appendTo(ul);
            // };

	 // $('#formulado_tipo').autocomplete({
        // source: 'ajax/bodegas/productos/formulados_tipo_name.php',
        // select: function(event,ui){
             // $(obj).find('[name="formulado_tipo"]').val(ui.item.formulado);
            // }
        // }).data('ui-autocomplete')._renderItem = function(ul,item){
            // return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.formulado +'</a>').appendTo(ul);
            // };
function mostrarconversion(){
	var id=$('#id').val();
	$('#frameconve').attr('src','../formulados/index.php?idFormulado='+id);
	$('#myModal').modal('show');
}

function VerProducto(id){
	$('#idselec').val(id);
	$('#filtro').attr('action','?modulo=productos&index=productos_config');
	$('#filtro').submit();
}
function cargaconversion(){
	$('#myModalc').modal('show');
}

function VerificarProd(){
	if(($('#materiaProd').val()==''&&$('#finalProd').val()=='')||($('#materiaProd').val()==0&&$('#finalProd').val()==0)){
		//alert("materia prima");
		$('.alert-danger').html("Por favor indique si el producto es materia prima o producto final.");
		$('.alert-danger').slideDown();
	}else{
		if($('#formulado_tipo').val()==''){
			$('.alert-danger').html("Por favor seleccione una categoría para el producto.");
			$('.alert-danger').slideDown();
		}else{
			//alert('pasa');
			$('#formconfig').submit();
		}
		
	}
}
function cargaunidad(){
  var unidad = document.getElementById('unidadProd').value;
  document.getElementById('muestra_unidad').innerHTML=unidad;
}

function VerFormulaciones(idp){
	//$('#frameformulaciones').attr('src','../rvformulados/formulacion.php?pr='+idp);
	$('#myModal2').modal('show');
	setTimeout(function(){
			  $('#cargando,#cargando2').fadeOut();
	}, 1000);
}