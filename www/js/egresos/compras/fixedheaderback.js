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
	
	if($('#registro').val()!='')
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
	if($(this).val() == 4){
		$('.notadecredito').slideDown('fast');
        $('#verretencion').fadeOut('fast');
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
          $(obj).closest('tr').find('[name="prodTotal[]"]').val(total.toFixed(4));
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
	
	if($('#esgas').is(':checked')){
		$('[name="totalgasto[]"]').each(function(){
			if($(this).val() != ''){
				var elid=$(this).attr('id');
				var dataid=elid.split('_');
				var elvaloriva=$('#subciva_'+dataid[1]).val();
				var elvalorsiniva=$('#subsiva_'+dataid[1]).val();
                var elvalorceroiva=$('#subceroiva_'+dataid[1]).val();
				if(elvaloriva!=''&&parseFloat(elvaloriva)!=0){
					subtotalConIVA += parseFloat(elvaloriva);
				}
				
				if(elvalorsiniva!=''&&parseFloat(elvalorsiniva)!=0){
					subtotalSinIVA += parseFloat(elvalorsiniva);
				}

                if(elvalorceroiva!=''&&parseFloat(elvalorceroiva)!=0){
					subtotalCeroIVA += parseFloat(elvalorceroiva);
				}

				
				/*if($(this).closest('tr').find('[name="subconiva[]"]').val() == 'true'){
					console.log("subconiva".$(this));
					subtotalConIVA += parseFloat($(this).val());
					}
				else{
					subtotalSinIVA += parseFloat($(this).val());
					}*/
			}
		});
	}else{
		$('[name="prodTotal[]"]').each(function(){
		if($(this).val() != ''){
			if($(this).closest('tr').find('[name="prodIVA[]"]').val() == 'true'){
				subtotalConIVA += parseFloat($(this).val());
				}
			else{
				subtotalSinIVA += parseFloat($(this).val());
				}
			}
		});
	}
	
		
	//console.log("siva"+subtotalConIVA);
	//console.log("s"+subtotalSinIVA);
	
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

	var ivaaux = parseFloat($('#ivaaux').val());
	IVA = ((subtotalConIVA - descuento2) + ice) * ivaaux;
	$('#firstSubSinIva').val(subtotalSinIVA.toFixed(2));
	$('#firstSubConIva').val(subtotalConIVA.toFixed(2));
	$('#finalSubSinIva').val((subtotalSinIVA - descuento).toFixed(2));
	$('#finalSubConIva').val((subtotalConIVA - descuento2).toFixed(2));
    $('#finalSubCeroIva').val((subtotalCeroIVA - descuento3).toFixed(2));
	$('#finalIVA').val(IVA.toFixed(2));
	//console.log(subtotalConIVA+"/"+descuento2+"/"+subtotalSinIVA+"/"+descuento+"/"+impverde+"/"+ice+"/"+IVA+"/yy"+otros+"/tt"+subtotalCeroIVA+"/"+descuento3);
	$('#finalTotal').html(parseFloat(((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + impverde + ice + IVA + parseFloat(subtotalCeroIVA - descuento3))+ otros).toFixed(2));
    console.log(parseFloat(((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + impverde + ice + IVA + parseFloat(subtotalCeroIVA - descuento3))+ otros).toFixed(2));
}

function CorrectQty(obj){
  //console.log($(obj).attr("name"))

  if($(obj).attr("name")=='prodQty[]'){
	if($(obj).val() <= 0){
		$(obj).val(1);
		}
  }else if($(obj).attr("name")=='prodTotal[]'){
	if($(obj).val() <= 0){
		$(obj).val(0);
		}
  }
    //CalculateCosts();
    AddCost($(obj).closest('tr'));
    if($(obj).hasClass('prodQty')){
    var cantidad = $(obj).closest('tr').find('[name="prodQty[]"]').val();
          var ppq = $(obj).closest('tr').find('[name="prodPrice[]"]').val();
          var total = cantidad*ppq;
          //console.log(total);
          $(obj).closest('tr').find('[name="prodTotal[]"]').val(total.toFixed(4));
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
		$(obj).find('[name="prodPrice[]"]').val((parseFloat(val)/parseFloat(qty)).toFixed(4));
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
			$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(4));
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
            if(ui.item.tieneiva){
              $(obj).find('[name="coniva[]"]').prop("checked", true);
            }else{
              $(obj).find('[name="coniva[]"]').prop("checked", false);
            }
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            $(obj).find('[name="prodPpq[]"]').val(ui.item.ppq);
			$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(4));
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
				$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(4));
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
			else if(idfor!=ui.item.id)		{
				$(obj).find('[name="prodQty[]"]').val('');
				$(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(4));
				$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
			}			
			$(obj).find('[name="prodID[]"]').val(ui.item.id);			
            $(obj).find('[name="prodQty[]"]').focus();
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
		BindAutocomplete(clone);
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

  document.getElementById('baseretiva').value = baseimponible.toFixed(4);
  document.getElementById('baseretivareal').value = baseimponible;
  document.getElementById('baseretsubciva').value = baseimponibleci.toFixed(4);
  document.getElementById('baseretsubcivareal').value = baseimponibleci;
  document.getElementById('baseretsubsiva').value = baseimponiblesi.toFixed(4);
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