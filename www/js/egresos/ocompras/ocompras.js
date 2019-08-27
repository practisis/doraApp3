var i = 1;
$('.tableFixedBody').find('td').each(function(){
	$('.tableFixedHeader').find('th:nth-child('+ i +')').css('width',$(this).width());
	i++;
	});

/*$('.submit').on('click',function(){
	$('.compraObligated').css('border','1px solid #ccc');

    $('#comprobante').removeClass('obligated');

	});*/

$('.customSubmit').on('click',function(){
	$('.compraObligated').css('border','1px solid #ccc');
	if($(this).hasClass('importar')){
		$('#typeOfAction').attr('name','new').val('importacion');
	}else{
		$('#typeOfAction').attr('name','new').val('comprav');
	}
    //$('#typeOfAction').attr('name','new').val('compra');
	$('#typeOfId').attr('name','idorden');
	var allowedToContinue = true;
	$('.compraObligated').each(function(){
		if($(this).val() == ''){
			$(this).css('border','1px solid red');
			allowedToContinue = false;
			}
		});

	if(allowedToContinue === false){
		$('#typeOfAction').attr('name','update').val('ocompra');
		$('#typeOfId').attr('name','id');
		return false;
		}

    var cadid = $("input[name='prodID[]']").map(function(){return $(this).val();}).get().join(",");
	var cadiva = $("input[name='prodIVA[]']").map(function(){return $(this).val();}).get().join(",");
	var cadCode = $("input[name='prodCode[]']").map(function(){return $(this).val();}).get().join(",");
	var cadEmp = $("select[name='prodEmp[]']").map(function(){return $(this).val();}).get().join(",");
	var cadQty = $("input[name='prodQty[]']").map(function(){return $(this).val();}).get().join(",");
	var cadPrice = $("input[name='prodPrice[]']").map(function(){return $(this).val();}).get().join(",");
	var cadTotal = $("input[name='prodTotal[]']").map(function(){return $(this).val();}).get().join(",");
	var cadConversion = $("input[name='prodConversion[]']").map(function(){return $(this).val();}).get().join(",");

    var cadprodImp = $("select[name='prodImp[]']").map(function(){return $(this).val();}).get().join(",");
	var cadprodIDImp = $("input[name='prodIDImp[]']").map(function(){return $(this).val();}).get().join("|");

    $('#cadprodID').val(cadid);
	$('#cadprodIVA').val(cadiva);
	$('#cadprodCode').val(cadCode);
	$('#cadprodEmp').val(cadEmp);
	$('#cadprodQty').val(cadQty);
	$('#cadprodPrice').val(cadPrice);
	$('#cadprodTotal').val(cadTotal);
	$('#cadprodConversion').val(cadConversion);

    $('#cadprodImp').val(cadprodImp);
	$('#cadprodIDImp').val(cadprodIDImp);
    /*alert(cadprodImp+'**'+cadprodIDImp);
    return false;*/

	var amountOfRows = ($('#tableoverview tr').length);
	var x = 1;
	var tr;
	var noNotice = true;
	$('#tableoverview tr').each(function(){
		tr = $(this);
		$.ajax({
			type: 'POST',
			url: '../practipos2/ajax/bodegas/compras/ajaxCheckLastPrice.php',
			data: 'lastValue='+ $(tr).find('[name="prodPrice[]"]').val() +'&conv='+ $(tr).find('[name="prodConversion[]"]').val() +'&id='+ $(tr).find('[name="prodID[]"]').val(),
			success: function(response){
				if(response != ''){
					noNotice = false;
					$(tr).addClass('inconvenient',500);
					$('.alert-danger').not('#uploaderrors').slideUp();
					$('#message-info').html('<b>Parece que te has equivocado!</b><br/>Las líneas marcado en amarillo tiene un precio que supera el 25% de la última compra.<br/><br/><div style="text-align: center;"><button type="button" onclick="GoToLine(); return false;" class="btn btn-info"><span class="glyphicon glyphicon-pencil"></span> Espera, necesito arreglar estos lineas.</button> <button onclick="SubmitAnyway(); return false;" type="button" class="btn btn-info"><span class="glyphicon glyphicon-ok"></span> Quiero agregar esta compra</button></div>');
					$('.alert-info').not('#uploaderrors').slideDown();
					$('html,body').animate({
						scrollTop : 0
						});
					}

				//alert(x +' '+ amountOfRows);
				if(x == amountOfRows && noNotice === true){
					$.ajax({
						type: 'POST',
						url: '../practipos2/ajax/bodegas/compras/ajaxCheckProviderDocument.php',
						data: 'idprov='+ $('[name="proveedor"]').val() +'&documento='+ $('[name="documento"]').val() +'&idcompra='+ $('[name="idorden"]').val(),
						success: function(response){
							if(response == 1){
								$('#error-content').html('El número de documento con este proveedor ha sido utilizado anteriormente!');
								$('.alert-danger').not('#uploaderrors').slideDown();
								}
							else{
								$('form').not('#fileform').submit();
								}
							}
						});
					}

				x++;
				}
			});
		});
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

/*function AddNewLine(obj,event){
	if($(obj).is('.prodTotal:last')){
		if(event.keyCode == 13){
			if($(obj).val() != ''){
				var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');
				$(clone).removeClass('inconvenient');
				$(clone).removeAttr('id');
				//$(clone).find('[name="prodCode[]"]').focus();
                $(clone).find('[name="prodName[]"]').focus();
				$(clone).find('[name="prodQty[]"]').val('');
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
		    $(clone).find('[name="prodName[]"]').focus();
			CalculateCosts();
			}
		}

	AddCost($(obj).closest('tr'));
    $(clone).find('[name="prodName[]"]').focus();

}*/

function AddNewLine(obj,event){
	if($(obj).is('.prodTotal:last')){
		if(event.keyCode == 13){
			if($(obj).val() != ''){
				var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');
                /*setTimeout(function(){
                    CheckLastRowInputValue(obj,$(obj).closest('tr').find('[name="prodPrice[]"]').val(),$(obj).closest('tr').find('[name="prodID[]"]').val(),$(obj).closest('tr').find('[name="prodConversion[]"]').val());
                }, 1000);*/
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
				$(obj).find('input:first').focus();
				}
			}
		else{
			$(obj).closest('tr').removeClass('inconvenient');
			CalculateCosts();
			}
		}
	//else{
		if(event.keyCode == 13){
			if(!$(obj).is('.prodTotal:last')){
				//$('[name="prodCode[]"]').last().focus();
                //CheckLastRowInputValue(obj,$(obj).closest('tr').find('[name="prodPrice[]"]').val(),$(obj).closest('tr').find('[name="prodID[]"]').val(),$(obj).closest('tr').find('[name="prodConversion[]"]').val());
                //$('[name="prodName[]"]').last().focus();
                var conquien = $('input:radio[name=conquien]:checked').val();
                //alert(conquien);
                if(conquien==2){
				    $(clone).find('[name="prodCode[]"]').focus();
                }else{
                    $(clone).find('[name="prodName[]"]').focus();
                }
				}
			}
		$(obj).closest('tr').removeClass('inconvenient');
		CalculateCosts();
	  //	}

	AddCost($(obj).closest('tr'));
	}

function ChangeFocus(obj,event){
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

/*function CalculateCosts(obj){
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

	var subtotalSinIVA = 0;
	var subtotalConIVA = 0;
	var descuento = $('#firstDiscount').val() == '' ? 0 : parseFloat($('#firstDiscount').val());
	var descuento2 = $('#secondDiscount').val() == '' ? 0 : parseFloat($('#secondDiscount').val());
	var impverde = $('#impverde').val() == '' ? 0 : parseFloat($('#impverde').val());
	var ice = $('#ice').val() == '' ? 0 : parseFloat($('#ice').val());
	var IVA = 0;
	var total = 0;

	if(ice == 0){
		$('#ice').val('0.00');
		}

	if(impverde == 0){
		$('#impverde').val('0.00');
		}

	$('[name="prodTotal[]"]').each(function(){
		if($(this).closest('tr').find('[name="prodIVA[]"]').val() == 'true'){
			subtotalConIVA += parseFloat($(this).val());
			}
		else{
			subtotalSinIVA += parseFloat($(this).val());
			}
		});

	subtotalConIVA = isNaN(subtotalConIVA) ? 0 : subtotalConIVA;
	subtotalSinIVA = isNaN(subtotalSinIVA) ? 0 : subtotalSinIVA;

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

	IVA = ((subtotalConIVA - descuento2) + ice) * 0.12;
	$('#firstSubSinIva').val(subtotalSinIVA);
	$('#firstSubConIva').val(subtotalConIVA);
	$('#finalSubSinIva').val(subtotalSinIVA - descuento);
	$('#finalSubConIva').val(subtotalConIVA - descuento2);
	$('#finalIVA').val(IVA);
	$('#finalTotal').html(parseFloat((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + impverde + ice + IVA).toFixed(2));
	}*/

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

	var subtotalSinIVA = 0;
	var subtotalConIVA = 0;
	var descuento = $('#firstDiscount').val() == '' ? 0 : parseFloat($('#firstDiscount').val());
	var descuento2 = $('#secondDiscount').val() == '' ? 0 : parseFloat($('#secondDiscount').val());
	var impverde = $('#impverde').val() == '' ? 0 : parseFloat($('#impverde').val());
	var ice = $('#ice').val() == '' ? 0 : parseFloat($('#ice').val());
	var otros = $('#otros').val() == '' ? 0 : parseFloat($('#otros').val());
	var IVA = 0;
	var total = 0;

	if(ice == 0){
		$('#ice').val('0.00');
		}

	if(impverde == 0){
		$('#impverde').val('0.00');
		}

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

	subtotalConIVA = isNaN(subtotalConIVA) ? 0 : subtotalConIVA;
	subtotalSinIVA = isNaN(subtotalSinIVA) ? 0 : subtotalSinIVA;

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

    var ivaaux = parseFloat(document.getElementById('ivaaux').value);
	IVA = ((subtotalConIVA - descuento2) + ice) * ivaaux;
	$('#firstSubSinIva').val(subtotalSinIVA.toFixed(2));
	$('#firstSubConIva').val(subtotalConIVA.toFixed(2));
	$('#finalSubSinIva').val((subtotalSinIVA - descuento).toFixed(2));
	$('#finalSubConIva').val((subtotalConIVA - descuento2).toFixed(2));
	$('#finalIVA').val(IVA.toFixed(2));
	//alert(otros);
	$('#finalTotal').html(parseFloat((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + impverde + ice + IVA + otros).toFixed(2));
	}

function CorrectQty(obj){
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
	AddCost($(obj).closest('tr'));
}

function AddCost(obj){
	var qty = $(obj).find('[name="prodQty[]"]').val();
	var val = $(obj).find('[name="prodTotal[]"]').val();
	var conv = $(obj).find('[name="prodConversion[]"]').val();
	//alert('rv');
	if(val != '' && val != null){
		$(obj).find('[name="prodPrice[]"]').val((parseFloat(val)/parseFloat(qty)).toFixed(4));
		}

    CalculateCosts();
}
	function cargaProductosOcompra(){
		var bodegas22 = $('#bodegas22').val();
		var ingreso = $('#ingreso').val();
		
		if(bodegas22 == ''){
			alert('debe seleccionar una bodega');
		}
		
		if(ingreso == '' ){
			alert('debe seleccionar una fecha de ingreso a bodega');
		}
		
		if(bodegas22 == '' || ingreso == ''){
			
		}else{
			$('#tableoverview').html('<tr><td><center>Espere, cargando información</center></td></tr>');
			$.ajax({
				type: 'POST',
				url: '../practipos2/ajax/productos/prodOcompra.php',
				data: 'bodegas22='+ bodegas22 +'&ingreso='+ ingreso,
				success: function(response){
					// alert(response)
					if(response == 0){
						alert('no tiene configurado los maximos y minimos en sus productos');
						location.reload();
					}else{
						$('#tableoverview').html(response);
					}
					
				}
			});
			// $.post("ajax/productos/prodOcompra.php",{
				// bodegas22 : bodegas22 , ingreso : ingreso
			// }).done(function(data){
				// $('#tableoverview').html(data);
				// // setTimeout(function(){
					// // CalculateCosts($('#tableoverview tr:first')[0]);
				// // }, 2000);

			// });
		}
	}
function BindAutocomplete(obj){
  var productoprov = $('#proveedorproducto').val();
  if(productoprov == '1'){
    var urlnombre = '../practipos2/ajax/productos/productos_name_proveedor.php';
    var urlcode = '../practipos2/ajax/productos/productos_code_proveedores.php';
  }else{
    var urlnombre = '../practipos2/ajax/productos/productos_name.php';
    var urlcode = '../practipos2/ajax/productos/productos_code.php';
  }
	$(obj).find('.prodCode').autocomplete({
		source: function( request, response ) {
                $.ajax({
                    type: "POST",
                    url: urlcode,
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
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            $(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(4));
            $(obj).find('[name="prodQty[]"]').focus();
			},
		response: function(event,ui){
			if(ui.content.length == 1){
				ui.item = ui.content[0];
				$(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
				$(this).autocomplete('close');
				$(obj).find('[name="prodQty[]"]').focus();
				}
			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
			};

	$(obj).find('.prodName').autocomplete({
		source: function( request, response ) {
                $.ajax({
                    type: "POST",
                    url: urlnombre,
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
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            $(obj).find('[name="prodPrice[]"]').val(totalppq.toFixed(4));
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

			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
			};
	}

function ChangeConversion(obj){
	$(obj).closest('tr').find('[name="prodCode[]"]').val($(obj).find(':selected').data('codeconv'));
	$(obj).closest('tr').find('[name="prodConversion[]"]').val($(obj).find(':selected').data('conversion'));
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
		var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');
		$(clone).removeClass('inconvenient');
		$(clone).removeAttr('id');
		//$(clone).find('[name="prodCode[]"]').focus();
        var conquien = $('input:radio[name=conquien]:checked').val();
        if(conquien==2){
            $(clone).find('[name="prodCode[]"]').focus();
        }else{
            $(clone).find('[name="prodName[]"]').focus();
        }
        //$(clone).find('[name="prodName[]"]').focus();
		$(clone).find('[name="prodQty[]"]').val('');
		$(clone).find('[name="prodPrice[]"]').val('0.00000');
		$(clone).find('[name="prodTotal[]"]').val('');
		$(clone).find('[name="prodEmp[]"]').find('option').remove();
		BindAutocomplete(clone);
		}
	else{
		$('[name="prodName[]"]:last').focus();
		}

    CalculateCosts();
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

function SubmitAnyway(){
	var noNotice = true;
	$('.alert-info').slideUp();

	$.ajax({
		type: 'POST',
		url: '../practipos2/ajax/bodegas/compras/ajaxCheckProviderDocument.php',
		data: 'idprov='+ $('[name="proveedor"]').val() +'&documento='+ $('[name="documento"]').val() +'&idcompra='+ $('[name="idorden"]').val(),
		success: function(response){
			if(response == 1){
				$('#error-content').html('El número de documento con este proveedor ha sido utilizado anteriormente!');
				$('.alert-danger').not('#uploaderrors').slideDown();
				noNotice = false;
				}

			if(noNotice === true){
				$('form').not('#fileform').submit();
				}
			}
		});
}

function ExportarExcel(){
	var idorden=$('#idorden').val();
	window.location='template/downloadExcelOrdenCompra.php?id='+idorden;
}
function activallenado(id){
  BindAutocomplete($('#origLine'+id));
}
function cambiaiva(){
  var fecha = document.getElementById('ingreso').value;
  var splitResponse = fecha.split('-');
  //alert(fecha);
  //document.getElementById('ivaaux').value;
  var f1 = Date.parse(fecha);
  var f2 = Date.parse("2016-5-31");
  //console.log(f1+'***'+f2);
  if(f1 > f2){
      document.getElementById('ivaaux').value='0.14';
  }else{
    document.getElementById('ivaaux').value='0.12';
  }

  CalculateCosts();
}

function validaotros(){
 var otros = $('#otros').val();
 if(otros == ''){
    $('#otros').val('0.00');
 }
}