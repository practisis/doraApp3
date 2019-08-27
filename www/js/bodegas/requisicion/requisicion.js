function filtarRequisicion(){
	var fechaDesde = $('#fechaDesde').val();
	var fechaHasta = $('#fechaHasta').val();
	var parametroBusqueda = $('#parametroBusqueda').val();
	//alert(fechaDesde +' '+ fechaHasta +' '+ parametroBusqueda);
	$.post('ajax/bodegas/requisicion/filtrarRequisicion.php',{
		fechaDesde : fechaDesde , fechaHasta : fechaHasta , parametroBusqueda : parametroBusqueda
	}).done(function(data){
		//alert(data.fecha);
		$('#recibeFiltros').html(data);
	});
}

importe_total = 0
	$(".prodTotal").each(
		function(index, value) {
			importe_total = importe_total + eval($(this).val());
			//alert(importe_total);
		}
	);
	$("#totalSumatoria").html(importe_total.toFixed(2));
	
	
	$("[name='traspasoCh']").bootstrapSwitch();
	$("[name='transformarCh']").bootstrapSwitch();
	$("[name='esAjustech']").bootstrapSwitch();
	var esAjuste = $('#esAjuste').val();
	if(esAjuste == 1){
		$('input[name="esAjustech"]').bootstrapSwitch('state', true);
		$('.contieneTraspaso').css('display','none');
		$('#contieneBodDestino').css('display','none');
		$('#contieneEvento').css('display','block');
		
	}else if(esAjuste ==''){
		$('input[name="traspasoCh"]').bootstrapSwitch('state', true);
		$('#contieneAjuste').css('display','none');
		$('#contieneBodDestino').css('display','block');
		$('#contieneEvento').css('display','none');
	}
	
	/*$('#fecha').datepicker({
		showAnim: 'slideDown',
		showOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		maxDate: '+0d'
	});*/
	
	$( "#bDestino" ).change(function() {
		var origen = $('#bOrigen').val();
		var destino = $('#bDestino').val();
		if(origen == destino){
			$('#alertaBodega').fadeIn('slow');
			setTimeout(function() {
				$('#alertaBodega').fadeOut('slow');
			}, 3000);
		}
	});
	$('input[name="esAjustech"]').on('switchChange.bootstrapSwitch', function(event, state) {
	  if(state == true){
		  
		 // alert('encendido');
		 $('#contieneAjuste').css('display','block');
		 $('#contieneEvento').css('display','block');
		 $('#contieneBodDestino').css('display','none');
		 $('.contieneTraspaso').css('display','none');
	  }else if(state == false){
		 // alert('apagado');
		 $('#contieneAjuste').css('display','none');
		  $('#contieneEvento').css('display','none');
		 $('#contieneBodDestino').css('display','block');
		 $('.contieneTraspaso').css('display','block');
	  }
	});
	
	$('input[name="traspasoCh"]').on('switchChange.bootstrapSwitch', function(event, state) {
	  if(state == true){
		 
		 // alert('encendido');
		 $('#contieneAjuste').css('display','none');
		 $('#contieneEvento').css('display','none');
		 $('#contieneBodDestino').css('display','block');
		 $('.contieneTraspaso').css('display','block');
	  }else if(state == false){
		 // alert('apagado');
		 $('#contieneAjuste').css('display','block');
		  $('#contieneEvento').css('display','block');
		 $('#contieneBodDestino').css('display','none');
		 $('.contieneTraspaso').css('display','none');
	  }
	});
	var i = 1;
$('.tableFixedBody').find('td').each(function(){
	$('.tableFixedHeader').find('th:nth-child('+ i +')').css('width',$(this).width());
	i++;
	});
	
i = 1;
$('#formtable').find('tr:first td').each(function(){
	$('.notadecredito > table').find('td:nth-child('+ i +')').css('width',$(this).width());
	i++;
	});

$('#comprobante').on('change',function(){
	if($(this).val() == 4){
		$('.notadecredito').slideDown('fast');
		$('.notadecredito').find('input').each(function(){
			$(this).addClass('obligated');
			});
		}
	else{
		$('.notadecredito').slideUp('fast');
		$('.notadecredito').find('input').each(function(){
			$(this).removeClass('obligated');
			});
		}
	});

BindAutocomplete($('#origLine')[0]);
	
function AddNewLine(obj,event){
	if($(obj).is('.prodTotal:last')){
		if(event.keyCode == 13){
			if($(obj).val() != ''){
				var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');

                var conquien = $('input:radio[name=conquien]:checked').val();
                //alert(conquien);
                if(conquien==2){
                    $(clone).find('[name="prodCode[]"]').focus();
                }else{
                    $(clone).find('[name="prodName[]"]').focus();
                }
				//$(clone).find('[name="prodName[]"]').focus();
				$(clone).find('[name="prodCode[]"]').val('');
				$(clone).find('[name="prodName[]"]').val('');
				$(clone).find('[name="prodEmp[]"]').val('');
				$(clone).find('[name="prodID[]"]').val('');
				$(clone).find('[name="ppq[]"]').val('');
				$(clone).find('[name="idForCon[]"]').val('');
				$(clone).find('[name="conversion[]"]').val('');
				$(clone).find('[name="prodQty[]"]').val('1.00000');
				$(clone).find('[name="prodPrice[]"]').val('0.00000');
				$(clone).find('[name="prodTotal[]"]').val('0.00000');
				$(clone).find('[name="labLote[]"]').css("display", 'none');
				$(clone).find('[name="prodName[]"]').attr('data-lote','');
				AlistarPop();
				BindAutocomplete(clone);
				}
			else{
				$(obj).find('[name="prodName[]"]').focus();
				}
			}
		}
	
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
			$(obj).closest('tr').find('[name="prodTotal[]"]').focus();
			}
		}
    /*if(event.keyCode == 106){
    var precio = $(obj).closest('tr').find('[name="prodTotal[]"]').val();
      alert(precio);
    }*/
		
	if(event.keyCode == 8){
		if($(obj).val() == ''){
			$(obj).closest('tr').find('input').each(function(){
				$(this).val('');
				});
			CalculateCosts();
			}
		}
	}
	
function AddCost(obj){
	var qty = $(obj).find('[name="prodQty[]"]').val();
	var precio = $(obj).find('[name="prodPrice[]"]').val();
	var total = (parseFloat(precio)*parseFloat(qty)).toFixed(2);
	if(precio != '' && precio != null){
		$(obj).find('[name="prodTotal[]"]').val(total);
		CalculateCosts();
	}
}
	
function CalculateCosts(obj){
	importe_total = 0
			$(".prodTotal").each(
				function(index, value) {
					importe_total = importe_total + eval($(this).val());
					//alert(importe_total);
				}
			);
			$("#totalSumatoria").html(importe_total.toFixed(2));
	}
	
function CorrectQty(obj){
	var valor = $('input:radio[name=requisicion]:checked').val();
    if(valor==1){
    	if($(obj).val() <= 0){
    		$(obj).val(1);
		}
    }else if(valor==2){
      if($(obj).val() == ''){
    		$(obj).val(0);
		}
    }
	AddCost($(obj).closest('tr'));
	}
	
function BindAutocomplete(obj){
	$(obj).find('.prodCode').autocomplete({
		source: 'ajax/productos/productos_code.php',
		select: function(event,ui){
			var selected = '';
			var key, count = 0;
			for(key in ui.item.unidad) {
				if(ui.item.unidad.hasOwnProperty(key)){
					selected = '';
					if(ui.item.unidad[key].standard == true){
						selected = 'selected="selected"';
						//$(obj).find('[name="prodConversion[]"]').val(ui.item.unidad[key].conversion);
                        $(obj).find('[name="prodEmp[]"]').val(ui.item.unidad[key].emp);
                        $(obj).find('[name="idForCon[]"]').val(key);
			            $(obj).find('[name="conversion[]"]').val(ui.item.unidad[key].conversion);
						}

					//$(obj).find('[name="prodEmp[]"]').append('<option data-codeconv="'+ ui.item.unidad[key].codigoconv +'" data-conversion="'+ ui.item.unidad[key].conversion +'" '+ selected +' value="'+ key +'">'+ ui.item.unidad[key].emp +'</option>');
					count++;
					}
				}

            $(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			$(obj).find('[name="prodQty[]"]').val('');
            $(obj).find('[name="prodQty[]"]').focus();
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
            var conversion = $(obj).find('[name="conversion[]"]').val();
            $(obj).find('[name="ppq[]"]').val(ui.item.ppq);
            var ppq = $(obj).find('[name="ppq[]"]').val();
			var conversion = $(obj).find('[name="conversion[]"]').val();
			var cantidadVisible = (ppq*conversion);
			$(obj).find('[name="prodPrice[]"]').val(parseFloat(cantidadVisible).toFixed(4));
            //$(obj).find('[name="prodPrice[]"]').val(cantidadVisible);

			var qty = $(obj).find('[name="prodQty[]"]').val();
			var precio = $(obj).find('[name="prodPrice[]"]').val();
			var total = (parseFloat(precio)*parseFloat(qty)).toFixed(2);
			if(precio != '' && precio != null){
				$(obj).find('[name="prodTotal[]"]').val(parseFloat(total).toFixed(2));
				CalculateCosts();
			}
			importe_total = 0
			$(".prodTotal").each(
				function(index, value) {
					importe_total = importe_total + eval($(this).val());
					//alert(importe_total);
				}
			);
			$("#totalSumatoria").html(importe_total.toFixed(2));

			/*$(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			$(obj).find('[name="prodQty[]"]').val('1.00000');
			$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
			$(obj).find('[name="prodPrice[]"]').val(ui.item.ppq);*/
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
		source: 'ajax/productos/productos_name.php',
		select: function(event,ui){
			var selected = '';
			var key, count = 0;
			for(key in ui.item.unidad) {
				if(ui.item.unidad.hasOwnProperty(key)){
					selected = '';
					if(ui.item.unidad[key].standard == true){
						selected = 'selected="selected"';
						//$(obj).find('[name="prodConversion[]"]').val(ui.item.unidad[key].conversion);
                        $(obj).find('[name="prodEmp[]"]').val(ui.item.unidad[key].emp);
                        $(obj).find('[name="idForCon[]"]').val(key);
			            $(obj).find('[name="conversion[]"]').val(ui.item.unidad[key].conversion);
						}

					$(obj).find('[name="prodEmp[]"]').append('<option data-codeconv="'+ ui.item.unidad[key].codigoconv +'" data-conversion="'+ ui.item.unidad[key].conversion +'" '+ selected +' value="'+ key +'">'+ ui.item.unidad[key].emp +'</option>');
					count++;
					}
				}

            $(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			$(obj).find('[name="prodName[]"]').attr('data-lote','');
			$(obj).find('[name="prodQty[]"]').val('');
            $(obj).find('[name="prodQty[]"]').focus();
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
			
			if(ui.item.lotecaducidad==true){
				$(obj).find('[name="labLote[]"]').css('display','');
				var arrlotes=ui.item.lotes;
				if(arrlotes!=null){
					if(arrlotes.length>0){
						$(obj).find('[name="labLote[]"]').attr('data-options',JSON.stringify(ui.item.lotes));
					}
				}
			}else{
				$(obj).find('[name="labLote[]"]').css('display','none');
			}
			
            var conversion = $(obj).find('[name="conversion[]"]').val();
            $(obj).find('[name="ppq[]"]').val(ui.item.ppq);
            var ppq = $(obj).find('[name="ppq[]"]').val();
			var conversion = $(obj).find('[name="conversion[]"]').val();
			var cantidadVisible = (ppq*conversion);
			$(obj).find('[name="prodPrice[]"]').val(parseFloat(cantidadVisible).toFixed(4));
            //$(obj).find('[name="prodPrice[]"]').val(cantidadVisible);

			var qty = $(obj).find('[name="prodQty[]"]').val();
			var precio = $(obj).find('[name="prodPrice[]"]').val();
			var total = (parseFloat(precio)*parseFloat(qty)).toFixed(2);
			if(precio != '' && precio != null){
				$(obj).find('[name="prodTotal[]"]').val(parseFloat(total).toFixed(2));
				CalculateCosts();
			}
			importe_total = 0
			$(".prodTotal").each(
				function(index, value) {
					importe_total = importe_total + eval($(this).val());
					//alert(importe_total);
				}
			);
			$("#totalSumatoria").html(importe_total.toFixed(2));

			/*$(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			$(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			$(obj).find('[name="prodQty[]"]').val('1.00000');
			$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
			$(obj).find('[name="prodID[]"]').val(ui.item.id);
			$(obj).find('[name="prodPrice[]"]').val(ui.item.ppq);*/
			}
		}).data('ui-autocomplete')._renderItem = function(ul,item){
			return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
			};

	// $(obj).find('.prodCode').autocomplete({
		// source: 'ajax/productos/productos_code.php',
		// select: function(event,ui){
			// $(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			// $(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			// $(obj).find('[name="prodEmp[]"]').val(ui.item.unidad);
			// $(obj).find('[name="prodQty[]"]').val('1.00000');
			// $(obj).find('[name="ppq[]"]').val(ui.item.ppq);
			// var ppq = $(obj).find('[name="ppq[]"]').val();
			// $(obj).find('[name="prodIVA[]"]').val(ui.item.idconversion);
			// $(obj).find('[name="prodID[]"]').val(ui.item.id);
			// $(obj).find('[name="idForCon[]"]').val(ui.item.idconversion);
			// $(obj).find('[name="conversion[]"]').val(ui.item.conversion);
			// var conversion = $(obj).find('[name="conversion[]"]').val();
			// var cantidadVisible = (ppq*conversion);
			// $(obj).find('[name="prodPrice[]"]').val(cantidadVisible);

			// var qty = $(obj).find('[name="prodQty[]"]').val();
			// var precio = $(obj).find('[name="prodPrice[]"]').val();
			// var total = (parseFloat(precio)*parseFloat(qty)).toFixed(2);
			// if(precio != '' && precio != null){
				// $(obj).find('[name="prodTotal[]"]').val(total);
				//CalculateCosts();
			// }
			// importe_total = 0
			// $(".prodTotal").each(
				// function(index, value) {
					// importe_total = importe_total + eval($(this).val());
					//alert(importe_total);
				// }
			// );
			// $("#totalSumatoria").html(importe_total);
		// }
	// }).data('ui-autocomplete')._renderItem = function(ul,item){
			// return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
			// };

	// $(obj).find('.prodName').autocomplete({
		// source: 'ajax/productos/productos_name.php',
		// select: function(event,ui){
			// $(obj).find('[name="prodCode[]"]').val(ui.item.codigo);
			// $(obj).find('[name="prodName[]"]').val(ui.item.formulado);
			// $(obj).find('[name="prodEmp[]"]').val(ui.item.unidad);
			// $(obj).find('[name="prodQty[]"]').val('1.00000');
			// var cantidad = $(obj).find('[name="prodQty[]"]').val();
			//$(obj).find('[name="prodIVA[]"]').val(ui.item.tieneiva);
			// $(obj).find('[name="prodID[]"]').val(ui.item.id);
			// $(obj).find('[name="idForCon[]"]').val(ui.item.idconversion);
			// $(obj).find('[name="conversion[]"]').val(ui.item.conversion);
			// var conversion = $(obj).find('[name="conversion[]"]').val();
			// var cantidadVisible = (cantidad*conversion);
			// $(obj).find('[name="prodPrice[]"]').val(cantidadVisible);

			// var qty = $(obj).find('[name="prodQty[]"]').val();
			// var precio = $(obj).find('[name="prodPrice[]"]').val();
			// var total = (parseFloat(precio)*parseFloat(qty)).toFixed(2);
			// if(precio != '' && precio != null){
				// $(obj).find('[name="prodTotal[]"]').val(total);
			// }
			// importe_total = 0
			// $(".prodTotal").each(
				// function(index, value) {
					// importe_total = importe_total + eval($(this).val());
				// }
			// );
			// $("#totalSumatoria").html(importe_total);

		// }
	// }).data('ui-autocomplete')._renderItem = function(ul,item){
			// return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
			// };
	}
	function AddLine(){
	if($('[name="prodID[]"]:last').val() != ''){
		var clone = $('#origLine').clone().find('input').val('').end().insertAfter('#tableoverview tr:last');
		$(clone).removeAttr('id');
        var conquien = $('input:radio[name=conquien]:checked').val();
        //alert(conquien);
        if(conquien==2){
            $(clone).find('[name="prodCode[]"]').focus();
        }else{
            $(clone).find('[name="prodName[]"]').focus();
        }
		//$(clone).find('[name="prodName[]"]').focus();
		$(clone).find('[name="prodQty[]"]').val('1.00000');
		$(clone).find('[name="prodPrice[]"]').val('0.00000');
		$(clone).find('[name="prodTotal[]"]').val('');
		$(clone).find('[name="prodEmp[]"]').find('option').remove();
		$(clone).find('[name="labLote[]"]').css("display", 'none');
		$(clone).find('[name="prodName[]"]').attr('data-lote','');
		AlistarPop();
		BindAutocomplete(clone);
		}
	else{
		$('[name="prodName[]"]:last').focus();
		}
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
	
	
function ExportarExcel(){
	//alert("Ana");
	window.location='template/downloadExcelRequisicion.php?idreq='+$('#registro').val();
}
function CantidadB(obj,event){
  var auxcantemp = $(obj).closest('tr').find('[name="cantemp[]"]').val();
  var cantemp = parseFloat($(obj).closest('tr').find('[name="cantemp[]"]').val());
  var auxcantund = $(obj).closest('tr').find('[name="cantund[]"]').val();
  var cantund = parseFloat($(obj).closest('tr').find('[name="cantund[]"]').val());
  var conversion = $(obj).closest('tr').find('[name="conversion[]"]').val();
  if(auxcantemp==''){
    cantemp = 0;
  }
  if(auxcantund==''){
    cantund = 0;
  }else{
    cantund = cantund/conversion;
  }
  var total = cantemp+cantund;
  //alert(cantemp+'**'+cantund+'**'+conversion);
  $(obj).closest('tr').find('[name="prodQty[]"]').val(total.toFixed(2));
  AddCost($(obj).closest('tr'));
}