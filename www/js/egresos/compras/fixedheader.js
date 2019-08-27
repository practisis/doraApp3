$(document).ready(function(){
	$("#ivanocredito").bootstrapSwitch();
	$("#ivanocredito").on('switchChange.bootstrapSwitch', function(event,state){
		if(state==true){
			$.ajax({
			type: 'POST',
			url: 'ajax/egresos/compras/ajaxCheckIvanoCredito.php',
			data: {},
			success: function(response){
			  //console.log(response);
				if(response != ''){
					if(response=='false'){
						$('.alert-danger').html("No tiene una asignada una cuenta para el iva no crédito tributario.");
						$('.alert-danger').slideDown();
						$('#ivanocredito').bootstrapSwitch('state',false,true);
						setTimeout(function(){$('.alert-danger').slideUp();},5000);
					}else{
						$('.alert-danger').html("");
						$('.alert-danger').slideUp();
					}
				}
			}
			});
		}
	});
	
	if($('#tieneivanocred').val()=='true')
		$('#ivanocredito').bootstrapSwitch('state', true,true);
	else
		$('#ivanocredito').bootstrapSwitch('state',false,true);
	
	if($('#registro').val()!=''&&$('#idasientocompra').val()>0)
		$('#ivanocredito').bootstrapSwitch('disabled', true);

});

var i = 1;
$('.tableFixedBody').find('td').each(function(){
	$('.tableFixedHeader').find('th:nth-child('+ i +')').css('width',$(this).width());
	i++;
	});
	
i = 1;
// $('#formtable').find('tr:first td').each(function(){
	// $('.notadecredito > table').find('td:nth-child('+ i +')').css('width',$(this).width());
	// i++;
	// });

$('#comprobante').on('change',function(){
	if($(this).val() == 4 || $(this).val() == 5){
		$('.notadecredito').slideDown('fast');
		if($(this).val() == 4)
			$('#verretencion').fadeOut('fast');
		else
			$('#verretencion').fadeIn('fast');
		
		$('.notadecredito').find('input').each(function(){
			$(this).addClass('obligated');
			});
	}else if($(this).val() == 31){
        $('#verretencion').fadeOut('fast');
	}else{
		$('.notadecredito').slideUp('fast');
        $('#verretencion').fadeIn('fast');
		$('.notadecredito').find('input').each(function(){
			$(this).removeClass('obligated');
			});
		}
	});
	
$('#excel').on('change', function(){
	
	$('#fileform').ajaxForm({
		success: function(response){
			var splitResponse = response.split('┼');
			$('#tableoverview tr:last').after(splitResponse[0]);
			$('#tableoverview tr').each(function(){
				if($(this).data('excel') == null || $(this).find('[name="prodCode[]"]').val() == ''){
					$(this).remove();
					}
				});
				
			if(splitResponse[1] != ''){
				$('#uploaderrors').html(splitResponse[1]);
				$('#uploaderrors').slideDown();
				}
			
			CalculateCosts($('#tableoverview tr:first')[0]);
			
			if(!($('#haycentrodecosto').val()=='true')){
				//alert('nocentro');
				$('#tableoverview tr').each(function(){
					$(this).find('td:eq(2)').css('display','none');
				});

				$('#tablegastos tr').each(function(){
					$(this).find('td:eq(1)').css('display','none');
				});

				$('.prim-header1').each(function(){
					$(this).find('th:eq(2)').css('display','none');
				});

				$('.prim-header2').each(function(){
					$(this).find('th:eq(1)').css('display','none');
				});

				$('#divcentrocosto').css('display','none');
			}
			
			
			}
		}).submit();
	});
	
$('#image').on('change', function(){
	$('#fileform2').ajaxForm({
		success: function(response){
			var miresp=JSON.parse(response);
			//alert(miresp);
			if(miresp.flag=='si'){
				$('#imagenpeq').attr('src','../integracioncontapp/archivos/'+miresp.ruta+'?x='+new Date().getTime());
			}
		}
	}).submit();
});
	
	
	
function enterlinea(obj,event){
  //alert(event.keyCode);
  if(event.keyCode == 13){
    AddNewLine(obj,event);
  }
}

BindAutocomplete($('#origLine')[0]);
function AddNewLine(obj,event){

	if($(obj).is('.prodTotal:last')){
		if(event.keyCode == 13){
	
			if($(obj).val() != ''){
				var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');
                setTimeout(function(){
                    CheckLastRowInputValue(obj,$(obj).closest('tr').find('[name="prodPrice[]"]').val(),$(obj).closest('tr').find('[name="prodID[]"]').val(),$(obj).closest('tr').find('[name="prodConversion[]"]').val());
                }, 1000);
	
				$(clone).removeClass('inconvenient');
				$(clone).removeAttr('id');
                var conquien = $('input:radio[name=conquien]:checked').val();
                if(conquien==2){
				    $(clone).find('[name="prodCode[]"]').focus();
                }else{
                    $(clone).find('[name="prodName[]"]').focus();
                }
				$(clone).find('[name="prodQty[]"]').val('1.00000');
				$(clone).find('[name="prodPrice[]"]').val('0.00000');
				$(clone).find('[name="prodTotal[]"]').val('');
				$(clone).find('[name="prodEmp[]"]').find('option').remove();
				BindAutocomplete(clone);
			
				}
			else{
				$(obj).find('input:first').focus();
				}
		
			}
		else{
			$(obj).closest('tr').removeClass('inconvenient');
			CalculateCosts();
			}
		}
	else{
		if(event.keyCode == 13){
			if(!$(obj).is('.prodTotal:last')){
	
				//$('[name="prodCode[]"]').last().focus();
                CheckLastRowInputValue(obj,$(obj).closest('tr').find('[name="prodPrice[]"]').val(),$(obj).closest('tr').find('[name="prodID[]"]').val(),$(obj).closest('tr').find('[name="prodConversion[]"]').val());
                $('[name="prodName[]"]').last().focus();
				}
			}
		$(obj).closest('tr').removeClass('inconvenient');
		CalculateCosts();
		}

	AddCost($(obj).closest('tr'));

	}
	
function ChangeFocus(obj,event){
	$('.autocomplete-ui').each(function(){
		if($(this).css('display')=='block')
			console.log($(this).css('top'));
	});
	// console.log("Ana"+$('.autcomplete-ui').css('top'));
	if(event.keyCode == 13){
		if($(obj).hasClass('prodCode')){
			$(obj).closest('tr').find('[name="prodQty[]"]').focus();
			}
			
		if($(obj).hasClass('prodName')){
			$(obj).closest('tr').find('[name="prodQty[]"]').focus();
			}
			
		if($(obj).hasClass('prodQty')){
		  var cantidad = $(obj).closest('tr').find('[name="prodQty[]"]').val();
          var ppq = $(obj).closest('tr').find('[name="prodPrice[]"]').val();
          var total = cantidad*ppq;
          //console.log(total);
          $(obj).closest('tr').find('[name="prodTotal[]"]').val(total.toFixed(2));
			$(obj).closest('tr').find('[name="prodTotal[]"]').focus();
            //return false;
		  }
		}
		
	if(event.keyCode == 8){
		if($(obj).val() == ''){
			$(obj).closest('tr').find('input').each(function(){
				$(this).val('');
				});
			CalculateCosts();
			}
		}
	}
	
function CalculateCosts(obj){
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;
	
	if($(obj).attr('id') == 'firstDiscount'){
		if($('#firstSubSinIva').val() == 0){
			$(obj).val(0);
			return false;
			}
		}
		
	if($(obj).attr('id') == 'secondDiscount'){
		if($('#firstSubConIva').val() == 0){
			$(obj).val(0);
			return false;
			}
		}

    if($(obj).attr('id') == 'firstDiscountCero'){
		if($('#firstSubCeroIva').val() == 0){
			$(obj).val(0);
			return false;
			}
		}

	var subtotalSinIVA = 0;
	var subtotalConIVA = 0;
    var subtotalCeroIVA = 0;
	var descuento = $('#firstDiscount').val() == '' ? 0 : parseFloat($('#firstDiscount').val());
	var descuento2 = $('#secondDiscount').val() == '' ? 0 : parseFloat($('#secondDiscount').val());
    var descuento3 = $('#firstDiscountCero').val() == '' ? 0 : parseFloat($('#firstDiscountCero').val());
	var impverde = $('#impVerde').val() == '' ? 0 : parseFloat($('#impVerde').val());
	var ice = $('#ice').val() == '' ? 0 : parseFloat($('#ice').val());
    var otros = $('#otros').val() == '' ? 0 : parseFloat($('#otros').val());
	var IVA = 0;
	var total = 0;
	
	if(ice == 0){
		$('#ice').val('0.00');
	}
		
	if(impverde == 0){
		$('#impVerde').val('0.00');
	}

	if($('#esgas').is(':checked') && $('#escompra').is(':checked')){
		calcularCompras()
		calcularGastos();
		
		
	}else if($('#esgas').is(':checked') && $('#escompra').is(':checked')==false ){
		
		calcularGastos();


	}else{
	
		calcularCompras()
	}
function calcularGastos(){
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;

	$('[name="totalgasto[]"]').each(function(){
		if($(this).val() != ''){
			var elid=$(this).attr('id');
			var dataid=elid.split('_');
			var elvaloriva=$('#subciva_'+dataid[1]).val();
			var elvalorsiniva=$('#subsiva_'+dataid[1]).val();
			var elvalorceroiva=$('#subceroiva_'+dataid[1]).val();

			if(elvaloriva!=''&&parseFloat(elvaloriva)!=0){
				if($('#multiple_iva').val()==1){
					if($('#prodIDImpg_'+dataid[1]).val() == '0'){
						subtotalCeroIVA += parseFloat(elvaloriva);
					}else{
						subtotalConIVA += parseFloat(elvaloriva);
					}
				}else{
					subtotalConIVA += parseFloat(elvaloriva);
				}
			}

			console.log(elvaloriva+'//'+elvalorsiniva+'//'+$('#prodIDImpg_'+dataid[1]).val());

			if(elvalorsiniva!=''&&parseFloat(elvalorsiniva)!=0){
				subtotalSinIVA += parseFloat(elvalorsiniva);
			}

			if($('#multiple_iva').val()==0){
				if(elvalorceroiva!=''&&parseFloat(elvalorceroiva)!=0){
					subtotalCeroIVA += parseFloat(elvalorceroiva);
				}
			}
		}
	});

}


function calcularCompras(){
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;

	$('[name="prodTotal[]"]').each(function(){
		if($(this).val() != ''){

		console.log($(this).closest('tr').find('[name="prodIDImp[]"]').val()+'//');

			if($(this).closest('tr').find('[name="prodIVA[]"]').val() == 'true'){ 
				
				if($(this).closest('tr').find('[name="prodIDImp[]"]').val() == '0'){
					subtotalCeroIVA += parseFloat($(this).val());
				
				}else{
					subtotalConIVA += parseFloat($(this).val());
					
				}
			}else{
				
				if($('#colocarcero').is(':checked')) 
					subtotalCeroIVA += parseFloat($(this).val());
				else
					subtotalSinIVA += parseFloat($(this).val());
			}
		}
	});

}
		
	console.log("siva"+subtotalConIVA);
	console.log("s"+subtotalSinIVA);
	
	subtotalConIVA = isNaN(subtotalConIVA) ? 0 : subtotalConIVA;
	subtotalSinIVA = isNaN(subtotalSinIVA) ? 0 : subtotalSinIVA;
    subtotalCeroIVA = isNaN(subtotalCeroIVA) ? 0 : subtotalCeroIVA;
	
	if(descuento == 0){
		$('#firstDiscount').val('0.00');
		}
		
	if(descuento > subtotalSinIVA){
		descuento = subtotalSinIVA;
		$('#firstDiscount').val(subtotalSinIVA);
		}
		
	if(descuento2 == 0){
		$('#secondDiscount').val('0.00');
		}

	if(descuento2 > subtotalConIVA){
		descuento2 = subtotalConIVA;
		$('#secondDiscount').val(subtotalConIVA);
		}

    if(descuento3 == 0){
		$('#firstDiscountCero').val('0.00');
		}

	if(descuento3 > subtotalCeroIVA){
		descuento3 = subtotalCeroIVA;
		$('#secondDiscount').val(subtotalCeroIVA);
		}
	var sumaimp=0;
	if($('#esgas').is(':checked') && $('#escompra').is(':checked')==false){

	
		if($('#multiple_iva').val()==1){
			sumaimp=0;
			$('.prodImpg').each(function(){
				var select=$(this).find('option:selected');
				var porcentaje=parseFloat(select.attr('data-value'));
				var fila=$(this).parent().parent();
				var inputtot=$(fila).find('.subconiva');
				var tot=parseFloat(inputtot.val());
				if(isNaN(tot))
					tot=0;
				sumaimp+=tot*porcentaje;
				console.log("ana"+tot+'/'+porcentaje);
			});
		}else{
			var ivaaux = parseFloat($('#ivaaux').val());
			sumaimp = ((subtotalConIVA - descuento2) + ice) * ivaaux;
		}
		
	}else if($('#esgas').is(':checked') && $('#escompra').is(':checked')){

	
		if($('#multiple_iva').val()==1){
			sumaimp=0;
			$('.prodImpg').each(function(){
				var select=$(this).find('option:selected');
				var porcentaje=parseFloat(select.attr('data-value'));
				var fila=$(this).parent().parent();
				var inputtot=$(fila).find('.subconiva');
				var tot=parseFloat(inputtot.val());
				if(isNaN(tot))
					tot=0;
				sumaimp+=tot*porcentaje;
				console.log("ana"+tot+'/'+porcentaje);
			});

		
			$('.prodImp').each(function(){
				var select=$(this).find('option:selected');
				var porcentaje=parseFloat(select.attr('data-value'));
				var fila=$(this).parent().parent();
				var inputtot=$(fila).find('.prodTotal');
				var tot=parseFloat(inputtot.val());
				if(isNaN(tot))
					tot=0;
					ssumaimp+=tot*porcentaje;
				console.log(sumaimp);
			});
		
		}else{
	
			var ivaaux = parseFloat($('#ivaaux').val());
			sumaimp = ((subtotalConIVA - descuento2) + ice) * ivaaux;
			console.log(sumaimp+"  iva" +ivaaux );
		}




	}else{
		if($('#multiple_iva').val()==1){
			sumaimp=0;
			$('.prodImp').each(function(){
				var select=$(this).find('option:selected');
				var porcentaje=parseFloat(select.attr('data-value'));
				var fila=$(this).parent().parent();
				var inputtot=$(fila).find('.prodTotal');
				var tot=parseFloat(inputtot.val());
				if(isNaN(tot))
					tot=0;
				sumaimp+=tot*porcentaje;
				console.log(sumaimp);
			});
		}else{
			var ivaaux = parseFloat($('#ivaaux').val());
			sumaimp = ((subtotalConIVA - descuento2) + ice) * ivaaux;
		}
	}
	

	/*var ivaaux = parseFloat($('#ivaaux').val());
	IVA = ((subtotalConIVA - descuento2) + ice) * ivaaux;*/
	IVA=sumaimp;
	$('#firstSubSinIva').val(subtotalSinIVA.toFixed(ndec));
	$('#firstSubConIva').val(subtotalConIVA.toFixed(ndec));
    $('#firstSubCeroIva').val(subtotalCeroIVA.toFixed(ndec));
	$('#finalSubSinIva').val((subtotalSinIVA - descuento).toFixed(ndec));
	$('#finalSubConIva').val((subtotalConIVA - descuento2).toFixed(ndec));

	$('#finalSubConIva').val((subtotalConIVA - descuento2).toFixed(ndec));
  
	$('#finalSubCeroIva').val((subtotalCeroIVA - descuento3).toFixed(ndec));
	$('#finalIVA').val(IVA.toFixed(ndec));
	//console.log(subtotalConIVA+"/"+descuento2+"/"+subtotalSinIVA+"/"+descuento+"/"+impverde+"/"+ice+"/"+IVA+"/yy"+otros+"/tt"+subtotalCeroIVA+"/"+descuento3);
	
	$('#finalTotal').html(parseFloat(((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + impverde + ice + IVA + parseFloat(subtotalCeroIVA - descuento3))+ otros).toFixed(ndec));
    console.log(parseFloat(((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + impverde + ice + IVA + parseFloat(subtotalCeroIVA - descuento3))+ otros).toFixed(ndec));
}

function CorrectQty(obj){
  console.log($(obj).attr("name"))

  if($(obj).attr("name")=='prodQty[]'){
	if($(obj).val() <= 0){
		$(obj).val(1);
		}
  }else if($(obj).attr("name")=='prodTotal[]'){
	if($(obj).val() <= 0){
		$(obj).val(0);
		}
  }else if($(obj).attr("name")=='prodImp[]'){
	  console.log($(obj).val());
	  if($(obj).val()>0){
		var fila=$(obj).parent().parent();
		var opt=$(obj).find('option:selected');
		console.log(opt+'entra1');
		$(fila).find('[name="prodIDImp[]"]').val($(opt).attr('data-value'));
	  }
  }
    //CalculateCosts();
    AddCost($(obj).closest('tr'));
    if($(obj).hasClass('prodQty')){
		var cantidad = $(obj).closest('tr').find('[name="prodQty[]"]').val();
        var ppq = $(obj).closest('tr').find('[name="prodPrice[]"]').val();
        var total = cantidad*ppq;
        //console.log(total);
        $(obj).closest('tr').find('[name="prodTotal[]"]').val(total.toFixed(2));
		$(obj).closest('tr').find('[name="prodTotal[]"]').focus();
            //return false;
    }
}

function Correcttotal(obj){
  //alert($(obj).val())
	if($(obj).val() <= 0){
		$(obj).val(1);
		}
	}

$('.ui-autocomplete').on('focus',function(){
	if($('.ui-state-focus').length){
		$(this).css("background-color","#000");
	}
});
	
function AddCost(obj){

	var qty = $(obj).find('[name="prodQty[]"]').val();
	var val = $(obj).find('[name="prodTotal[]"]').val();
	var conv = $(obj).find('[name="prodConversion[]"]').val();

    //console.log(qty+'**'+val);
	
	if(val != '' && val != null){
		$(obj).find('[name="prodPrice[]"]').val((parseFloat(val)/parseFloat(qty)).toFixed(2));
	}

    var preciomax = $('#preciomax').val();
    if(preciomax == '1'){
        //alert(preciomax);
        var precio = $(obj).find('[name="prodPrice[]"]').val();
	    var idprod = $(obj).find('[name="prodID[]"]').val();

    	$.ajax({
    		type: 'POST',
    		url: 'ajax/egresos/compras/ajaxCheckLastPriceMaximo.php',
    		data: 'precio='+precio+'&idprod='+idprod,
    		success: function(response){
    		  console.log(response+'**'+precio+'**'+idprod);
              //alert(response);
    			if(response != ''){
    				$(obj).closest('tr').addClass('inconvenient',500);
    				$('.alert-danger').not('#uploaderrors').slideUp();
    				$('#message-info').html('<b>Te has equivocado!</b><br/>La línea marcado en naranja tiene un precio que supera su precio máximo de '+response+'.<br/>');
    				$('.alert-info').not('#uploaderrors').slideDown();
    				$('html,body,#content').animate({
    					scrollTop : 0
    				});
                    return false;
    			}else{
                   $(obj).closest('tr').removeClass('inconvenient',500);
                   $('.alert-info').not('#uploaderrors').slideUp();
                   $('#btnguardacomp').prop("disabled",false);
    			}
    		}
    	});
    }

    CalculateCosts();
}
	
function BindAutocomplete(obj){
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;
	
	
    var productoprov = $('#proveedorproducto').val();
    console.log(productoprov);

	var idfor=parseInt($(obj).find('[name="prodID[]"]').val());
	if (isNaN(idfor)) {
		idfor=-1;
	}
	console.log(parseInt($(obj).find('[name="prodID[]"]').val()));

    if(productoprov == '1'){

        $(obj).find('.prodCode').autocomplete({
		source: function( request, response ) {
                $.ajax({
                    type: "POST",
                    url: 'ajax/productos/productos_code_proveedores.php',
                    dataType: "json",
                    data: {
                        term: request.term,idprov: $('#proveedor').val()
                    },
                    success: function( data ) {
                        response(data);
                    }
                });
            },
		select: function(event,ui){
			var selected = '';
			var key, count = 0;
            var conv = 0;
			for(key in ui.item.unidad) {
				if(ui.item.unidad.hasOwnProperty(key)){
					selected = '';
					if(ui.item.unidad[key].standard == true){
					//if(ui.item.codigo == true){
						selected = 'selected="selected"';
						$(obj).find('[name="prodConversion[]"]').val(ui.item.unidad[key].conversion);
                        conv = ui.item.unidad[key].conversion;
						}

					$(obj).find('[name="prodEmp[]"]').append('<option data-codeconv="'+ ui.item.unidad[key].codigoconv +'" data-conversion="'+ ui.item.unidad[key].conversion +'" '+ selected +' value="'+ key +'">'+ ui.item.unidad[key].emp +'</option>');
					count++;
					}
				}
			var totalppq = 0
            totalppq = ui.item.ppq*conv;
			$(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			$(obj).find('[name="prodQty[]"]').val('');
			$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
            if(ui.item.tieneiva){
              $(obj).find('[name="coniva[]"]').prop("checked", true);
            }else{
              $(obj).find('[name="coniva[]"]').prop("checked", false);
            }
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            $(obj).find('[name="prodPpq[]"]').val(ui.item.ppq);
			$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(ndec));
            $(obj).find('[name="prodQty[]"]').focus();
			},
		response: function(event,ui){
			if(ui.content.length == 1){
				ui.item = ui.content[0];
				$(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
				$(this).autocomplete('close');
                //alert('rv');
				$(obj).find('[name="prodQty[]"]').focus();
				}
			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a style="background-color:#000;">'+ item.label +'</a>').appendTo(ul);
		};

        $(obj).find('.prodName').autocomplete({
		source: function( request, response ) {
                $.ajax({
                    type: "POST",
                    url: 'ajax/productos/productos_name_proveedor.php',
                    dataType: "json",
                    data: {
                        term: request.term,idprov: $('#proveedor').val()
                    },
                    success: function( data ) {
                        response(data);
                    }
                });
            },
		select: function(event,ui){
			var selected = '';
			var key, count = 0;
            var conv = 0;
			for(key in ui.item.unidad) {
				if(ui.item.unidad.hasOwnProperty(key)){
					selected = '';
					if(ui.item.unidad[key].standard == true){
						selected = 'selected="selected"';
						$(obj).find('[name="prodConversion[]"]').val(ui.item.unidad[key].conversion);
                        conv = ui.item.unidad[key].conversion;
						}

					$(obj).find('[name="prodEmp[]"]').append('<option data-codeconv="'+ ui.item.unidad[key].codigoconv +'" data-conversion="'+ ui.item.unidad[key].conversion +'" '+ selected +' value="'+ key +'">'+ ui.item.unidad[key].emp +'</option>');
					count++;
					}
				}
			var totalppq = 0
            totalppq = ui.item.ppq*conv;
			$(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			$(obj).find('[name="prodQty[]"]').val('');
			$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
			
			if(ui.item.lotecaducidad==true){
				$(obj).find('[name="labLote[]"]').css('display','');
			}else{
				$(obj).find('[name="labLote[]"]').css('display','none');
			}
			
            if(ui.item.tieneiva){
              $(obj).find('[name="coniva[]"]').prop("checked", true);
            }else{
              $(obj).find('[name="coniva[]"]').prop("checked", false);
            }
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            $(obj).find('[name="prodPpq[]"]').val(ui.item.ppq);
			$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(ndec));
            $(obj).find('[name="prodQty[]"]').focus();
			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
		};

    }else{

	$(obj).find('.prodCode').autocomplete({
		source: 'ajax/productos/productos_code.php',
		select: function(event,ui){
			var selected = '';
			var key, count = 0;
            var conv = 0;
			for(key in ui.item.unidad) {
				if(ui.item.unidad.hasOwnProperty(key)){
					selected = '';
					if(ui.item.unidad[key].standard == true){
					//if(ui.item.codigo == true){
						selected = 'selected="selected"';
						$(obj).find('[name="prodConversion[]"]').val(ui.item.unidad[key].conversion);
                        conv = ui.item.unidad[key].conversion;
						}

					$(obj).find('[name="prodEmp[]"]').append('<option data-codeconv="'+ ui.item.unidad[key].codigoconv +'" data-conversion="'+ ui.item.unidad[key].conversion +'" '+ selected +' value="'+ key +'">'+ ui.item.unidad[key].emp +'</option>');
					count++;
					}
				}
			var totalppq = 0
            totalppq = ui.item.ppq*conv;	
			
			$(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			if (idfor==0){
				
			}
			else if(idfor!=ui.item.id){				
				$(obj).find('[name="prodQty[]"]').val('');
				$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(2));
				$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
			}			
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            $(obj).find('[name="prodQty[]"]').focus();
            $(obj).find('[name="centroCostod[]"]').val(ui.item.centrocosto);
			},
		response: function(event,ui){
			if(ui.content.length == 1){
				ui.item = ui.content[0];
				$(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
				$(this).autocomplete('close');
                //alert('rv');
				$(obj).find('[name="prodQty[]"]').focus();
				}
			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a style="background-color:#000;">'+ item.label +'</a>').appendTo(ul);
			};
			
	$(obj).find('.prodName').autocomplete({
		source: 'ajax/productos/productos_name.php',
		select: function(event,ui){
			var selected = '';
			var key, count = 0;
            var conv = 0;
			for(key in ui.item.unidad) {
				if(ui.item.unidad.hasOwnProperty(key)){
					selected = '';
					if(ui.item.unidad[key].standard == true){
						selected = 'selected="selected"';
						$(obj).find('[name="prodConversion[]"]').val(ui.item.unidad[key].conversion);
                        conv = ui.item.unidad[key].conversion;
						}

					$(obj).find('[name="prodEmp[]"]').append('<option data-codeconv="'+ ui.item.unidad[key].codigoconv +'" data-conversion="'+ ui.item.unidad[key].conversion +'" '+ selected +' value="'+ key +'">'+ ui.item.unidad[key].emp +'</option>');
					count++;
					}
				}
			var totalppq = 0
            totalppq = ui.item.ppq*conv;
			$(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			if (idfor==0){
				
			}
			else if(idfor!=ui.item.id){
				$(obj).find('[name="prodQty[]"]').val('');
				$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(2));
				$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
				
				if(ui.item.lotecaducidad==true){
					$(obj).find('[name="labLote[]"]').css('display','');
				}else{
					$(obj).find('[name="labLote[]"]').css('display','none');
				}
			
                if(ui.item.tieneiva){
                  $(obj).find('[name="coniva[]"]').prop("checked", true);
                }else{
                  $(obj).find('[name="coniva[]"]').prop("checked", false);
                }

			}
			
			$(obj).find('[name="prodID[]"]').val(ui.item.id);			
            $(obj).find('[name="prodQty[]"]').focus();

			var sel=$(obj).find('[name="prodImp[]"]');
			var opt=$(sel).find('option');
			var i=0;
			opt.each(function(){
				if($(obj).find('[name="prodIVA[]"]').val()=='true'){
					if($(this).val()==0)
						$(this).css('display','none');
					else{
						if(i==0){
							$(this).prop('selected',true);
							$(obj).find('[name="prodIDImp[]"]').val($(this).attr('data-value'));
						}
						$(this).css('display','');
						i++;
					}
				}else{
					if($(this).val()>0)
						$(this).css('display','none');
					else{
						if(i==0){
							$(this).prop('selected',true);
							$(obj).find('[name="prodIDImp[]"]').val($(this).attr('data-value'));
						}
						$(this).css('display','');
						i++;
					}
				}
			});
			
			$(obj).find('[name="centroCostod[]"]').val(ui.item.centrocosto);
			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
			};

    }
}
	
function ChangeConversion(obj){
	$(obj).closest('tr').find('[name="prodCode[]"]').val($(obj).find(':selected').data('codeconv'));
	$(obj).closest('tr').find('[name="prodConversion[]"]').val($(obj).find(':selected').data('conversion'));
    //alert($(obj).find(':selected').data('conversion'));
	AddCost($(obj).closest('tr'));
	}
	
function RemoveLine(obj){
	if($(obj).closest('tr').attr('id') == 'origLine'){
		$(obj).closest('tr').find('input').val('');
		$(obj).closest('tr').find('option').remove();
		}
	else{
		$(obj).closest('tr').remove();
		}
	CalculateCosts();
	}
	
function AddLine(){
	if($('[name="prodID[]"]:last').val() != ''){
		var lastObj = $('[name="prodID[]"]:last');
		CheckLastRowInputValue($(lastObj),$(lastObj).closest('tr').find('[name="prodPrice[]"]').val(),$(lastObj).closest('tr').find('[name="prodID[]"]').val(),$(lastObj).closest('tr').find('[name="prodConversion[]"]').val());
		var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');
		$(clone).removeClass('inconvenient');
		$(clone).removeAttr('id');
		var conquien = $('input:radio[name=conquien]:checked').val();
        //alert(conquien);
        if(conquien==2){
            $(clone).find('[name="prodCode[]"]').focus();
        }else{
            $(clone).find('[name="prodName[]"]').focus();
        }
		$(clone).find('[name="prodQty[]"]').val('1.00000');
		$(clone).find('[name="prodPrice[]"]').val('0.00000');
		$(clone).find('[name="prodTotal[]"]').val('');
		$(clone).find('[name="prodEmp[]"]').find('option').remove();
		$(clone).find('[name="labLote[]"]').css("display", 'none');
		$(clone).find('[name="prodName[]"]').attr('data-lote','');
		$(clone).find('[name="prodName[]"]').attr('data-fechacaducidad','');
		BindAutocomplete(clone);
		AlistarPop();
		}
	else{
		//$('[name="prodCode[]"]:last').focus();
        CheckLastRowInputValue($(lastObj),$(lastObj).closest('tr').find('[name="prodPrice[]"]').val(),$(lastObj).closest('tr').find('[name="prodID[]"]').val(),$(lastObj).closest('tr').find('[name="prodConversion[]"]').val());
        $('[name="prodName[]"]:last').focus();
		}
        CalculateCosts();
}
	
function CheckLastRowInputValue(obj,lastvalue,id,conv){

    var preciomax = $('#preciomax').val();
    if(preciomax != '1'){
	    $.ajax({
		type: 'POST',
		url: 'ajax/egresos/compras/ajaxCheckLastPrice.php',
		data: 'lastValue='+ lastvalue +'&conv='+ conv +'&id='+ id,
		success: function(response){
		  //console.log(response);
			if(response != ''){
				$(obj).closest('tr').addClass('inconvenient',500);
				$('.alert-danger').not('#uploaderrors').slideUp();
				$('#message-info').html('<b>Parece que te has equivocado!</b><br/>La línea marcado en amarillo tiene un precio que supera el 25% de la última compra.<br/><br/><div style="text-align: center;"><button type="button" onclick="GoToLine(); return false;" class="btn btn-info"><span class="glyphicon glyphicon-pencil"></span> Quiero arreglar ahora!</button> <button onclick="$(\'.alert-info\').slideUp(); $(\'tr\').removeClass(\'inconvenient\',500); return false;" type="button" class="btn btn-info"><span class="glyphicon glyphicon-remove"></span> No, no me he equivocado</button></div>');
				$('.alert-info').not('#uploaderrors').slideDown();
				$('html,body').animate({
					scrollTop : 0
					});
				}
			}
		});

    }
}
function enviaNuevoProv(){
	 $('#formNuevoProv').submit();
}
function GoToLine(){
	$('.alert-info').slideUp();
	$('tr').each(function(){
		if($(this).hasClass('inconvenient')){
			$(this).find('[name="prodTotal[]"]').focus();
			$(this).removeClass('inconvenient',500);
			return false;
			}
		});
	}
function activallenado(id){
  BindAutocomplete($('#origLine'+id));
}
/*	function verProveedor(){
		//alert('hola');
		//$('#contieneProveedor').fadeIn('slow');
		$('#myModalProv').modal('show');
		$('#popupProv').animate({
			marginTop : 0
		},1000);
	}
	function cerrarProveedor(){
		$('#contieneProveedor').fadeOut('slow');
	}*/
	
function cargadatos(){
  var baseimponible = document.getElementById('finalIVA').value;
  var baseimponibleci = document.getElementById('finalSubConIva').value;
  var baseimponiblesiaux = document.getElementById('finalSubSinIva').value;
  var baseimponiblesicero = document.getElementById('finalSubCeroIva').value;
  var baseimponiblesi = parseFloat(baseimponiblesiaux)+parseFloat(baseimponiblesicero);
  console.log(baseimponiblesi);
  var baseimpoiva = 0;
  var baseimpociva = 0;
  var baseimposiva = 0;
  var ndec=2;
  if($('#sindecimales').val()==1)
	  ndec=0;

   var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
  var cuenta = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,3);
      //alert(tiva);
      if(tiva=='aux'){
        var quien = ww.substr(3);
        var aux = parseFloat(document.getElementById('aux'+quien).value);
        if(aux==1){
          baseimpoiva += parseFloat(document.getElementById('baseciva'+quien).value);
        }else if(aux==2){
          baseimpociva += parseFloat(document.getElementById('baseciva'+quien).value);
          baseimposiva += parseFloat(document.getElementById('basesiva'+quien).value);
        }
      }
    }

    //alert(baseimpoiva+'**'+baseimpociva+'**'+baseimposiva);

  baseimponible = baseimponible-baseimpoiva;
  baseimponibleci = baseimponibleci-baseimpociva;
  baseimponiblesi = baseimponiblesi-baseimposiva;

  document.getElementById('baseretiva').value = baseimponible.toFixed(ndec);
  document.getElementById('baseretivareal').value = baseimponible;
  document.getElementById('baseretsubciva').value = baseimponibleci.toFixed(ndec);
  document.getElementById('baseretsubcivareal').value = baseimponibleci;
  document.getElementById('baseretsubsiva').value = baseimponiblesi.toFixed(ndec);
  document.getElementById('baseretsubsivareal').value = baseimponiblesi;

  $('#div_anular').tooltip('hide');

}

function cambiaiva(){
  var fecha = document.getElementById('ingreso').value;
  var splitResponse = fecha.split('-');
  //alert(fecha);
  //document.getElementById('ivaaux').value;
  var f1 = Date.parse(fecha);
  var f2 = Date.parse("2016-5-31");
  document.getElementById('ivaaux').value=parseFloat($('#queiva').html())/100;
  //console.log(f1+'***'+f2);
 /* if(f1 > f2){
      document.getElementById('ivaaux').value='0.14';
  }else{
    document.getElementById('ivaaux').value='0.12';
  }*/

  CalculateCosts();

}

function validaotros(){
 var otros = $('#otros').val();
 if(otros == ''){
    $('#otros').val('0.00');
 }
}

function listacuentas(obj){
	$(obj).autocomplete({
    source: 'ajax/plancuentas_gasto.php',
    select: function(event,ui){
    	$("#idcuentagastoret").val(ui.item.id);
    }
    });


}
function vercuenta(){
	var cuentagasto = $('#cuentagastoret').val();
    if(cuentagasto == ''){
        $('#idcuentagastoret').val('0');
    }

}
function conivacompra(obj){
	if($(obj).closest('tr').find('[name="coniva[]"]').length>0){
		 var tieneiva = $(obj).closest('tr').find('[name="coniva[]"]').is(':checked');
		$(obj).closest('tr').find('[name="prodIVA[]"]').val(tieneiva);
	}else{
		if($(obj).val()>0){
			var fila=$(obj).parent().parent();
			var opt=$(obj).find('option:selected');
			console.log(opt+'entra1');
			$(fila).find('[name="prodIDImp[]"]').val($(opt).attr('data-value'));
		}
	}

  CalculateCosts(obj);
}