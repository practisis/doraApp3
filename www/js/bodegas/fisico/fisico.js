function CalculateAdjustment(obj,val){
    document.getElementById('guarda').disabled=true;
	var currentValue = parseFloat($(obj).closest('tr').find('td').eq(5).html().replace(',',''));
	var newValue = parseFloat(parseFloat(val) - parseFloat(currentValue));

	if(isNaN(newValue)){
		newValue = 0;
		}
	//alert(parseFloat(newValue).toFixed(2));
	$(obj).closest('tr').find('td').eq(7).find('input').val(parseFloat(newValue).toFixed(5));
	}
	
function ChangeBodega(value){
	$('#chosenBodega').val(value);
}

function CreateExcelTemplate(){
	//var date = $('.datepicker').val();
    var date = $('#endDate').val();
	var category = $('[name="category"] option:selected').text();
	var local = $('[name="local"] option:selected').text();
	var lote = $('#productLote').val();
	
	$('#createExcel').html('Creando Excel según tus filtros... Fecha: '+ date +', Categoria: '+ category +', Bodega: '+ local+', Lote: '+ lote).slideDown();
	location.href='template/downloadExcelFisico.php?date='+ date +'&idbodega='+ $('[name="local"] option:selected').val() +'&category='+ $('[name="category"] option:selected').val()+'&bus='+$('#productName').val()+'&lote='+ lote;
	}
	
function AddTemporarily(obj,val,id,date,bodega,currentValue,lote){
	$("#endDate").datepicker().datepicker('disable');
	var ajuste = $(obj).parent().next('td').find('input').val();
	var isAlerted = 0;
    //alert(val);
    document.getElementById('guarda').disabled=true;

	if(currentValue > 0){
		var diffPercentage = Math.abs(parseFloat(100 - ((parseFloat(val) * 100)/parseFloat(currentValue))));
		if(diffPercentage >= 40){
			$(obj).closest('tr').addClass('inconvenient',500);
			$('.alert-danger').not('#uploaderrors').slideUp();
			$('#message-info').html('<b>Parece que te has equivocado!</b><br/>Las líneas marcado en amarillo tiene una differencia de cantidad que supera el 40% de tu stock anterior.<br/><br/><div style="text-align: center;"><button type="button" onclick="GoToLine(); return false;" class="btn btn-info"><span class="glyphicon glyphicon-pencil"></span> Quiero arreglar ahora!</button> <button onclick="$(\'.alert-info\').slideUp(); $(\'tr\').removeClass(\'inconvenient\',500); return false;" type="button" class="btn btn-info"><span class="glyphicon glyphicon-remove"></span> No, no me he equivocado</button></div>');
			$('.alert-info').not('#uploaderrors').slideDown();
			$('html,body').animate({
				scrollTop : 0
				});
			
			isAlerted = 1;
			}
		else{
			$(obj).closest('tr').removeClass('inconvenient',500);
			}
		}
		
		if(lote==null)
			lote='';
	
	$.ajax({
		type: 'POST',
		url: 'ajax/bodegas/fisico/ajaxAddToTempTable.php',
		data: 'id='+ id +'&date='+ date +'&bodega='+ bodega +'&fisico='+ val +'&ajuste='+ ajuste +'&isAlerted='+ isAlerted+'&lote='+lote,
		success: function(response){
			console.log("Respuesta");
			console.log(response);
			if(response=='true'){
				document.getElementById('guarda').disabled=false;
			}
			else{
				location.reload();
			}
			
			}
		});
	}
	
function GoToLine(){
	$('.alert-info').slideUp();
	$('tr').each(function(){
		if($(this).hasClass('inconvenient')){
			$(this).find('[name="qty[]"]').focus();
			$(this).removeClass('inconvenient',500);
			return false;
			}
		});
	}
	
/*$('[name="productName"]').autocomplete({
	source: 'ajax/bodegas/fisico/ajaxFetchProducts.php',
	select: function(event,ui){
		$('[name="productID"]').val(ui.item.id);
		},
	}).data('ui-autocomplete')._renderItem = function(ul,item){
		return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
		};*/
	
$('#excel').on('change', function(){
	$('#fileform').ajaxForm({
		success: function(response){ 
			var splitResponse = response.split('┼');
			if(splitResponse[1] != ''){
				$('#uploaderrors').html(splitResponse[1]);
				$('#uploaderrors').slideDown();
				$('#filter').trigger('click');
				}
			else{
				$('#filter').trigger('click');
				}
				$('#excel').val('');
			}
			
		}).submit();
	});
	
$('tr').each(function(){
	if($(this).hasClass('inconvenient')){
		$('.alert-danger').not('#uploaderrors').slideUp();
		$('#message-info').html('<b>Parece que te has equivocado!</b><br/>Las líneas marcado en amarillo tiene una differencia de cantidad que supera el 40% de tu stock anterior.<br/><br/><div style="text-align: center;"><button type="button" onclick="GoToLine(); return false;" class="btn btn-info"><span class="glyphicon glyphicon-pencil"></span> Quiero arreglar ahora!</button> <button onclick="$(\'.alert-info\').slideUp(); $(\'tr\').removeClass(\'inconvenient\',500); return false;" type="button" class="btn btn-info"><span class="glyphicon glyphicon-remove"></span> No, no me he equivocado</button></div>');
		$('.alert-info').not('#uploaderrors').slideDown();
		$('html,body').animate({
			scrollTop : 0
			});
		}
	});
	
	
$(document).ready(function(){
	
	$('#bodegad').val($('#local').val());
	$('#fechah').val($('#endDate').val());
	
	$('#endDate').change(function(){
		$('#fechah').val($(this).val());
	});
	
	$('#local').change(function(){
		$('#bodegad').val($(this).val());
	});

});
	
	
function FiltrarFisico(){
	$('#cargando,#cargando2').fadeIn();
	$('#offset').val('0');
	$('#filtro').submit();
}
function ingresacantidad(nombre,id,conv,nomemp,nomuni){
  $('#popupcantidad').modal('show');
  document.getElementById('nombre').innerHTML=nombre;
  document.getElementById('idp').value=id;
  document.getElementById('uni').innerHTML=conv;
  document.getElementById('nomemp').innerHTML=nomemp;
  document.getElementById('nomuni').innerHTML=nomuni;
  var lote='';
	if(id.indexOf('_')>0){
		var partes=id.split('_');
		lote=partes[1];
	}
	
	 document.getElementById('lotep').value=lote;
}
function agregacantidad(){
  var empaque = document.getElementById('empa').value;
  var unidad = document.getElementById('unid').value;
  var unidadvalor = parseFloat(document.getElementById('unid').value);
  var conversion = parseFloat(document.getElementById('uni').innerHTML);
  var idp = document.getElementById('idp').value;
   var milote = document.getElementById('lotep').value;
  if(empaque=='' && unidad==''){
    $('#error').fadeIn('slow');
  }else{
    if(unidad!=''){
      var unidadaux = unidadvalor/conversion;
    }else{
      var unidadaux = 0;
    }
    if(empaque!=''){
      var empaquevalor = parseFloat(document.getElementById('empa').value);
    }else{
      var empaquevalor = 0;
    }
    var fecha = $('input:text[name=endDate]').val();
    var cantidad = empaquevalor+unidadaux;
    //alert(cantidad);
    document.getElementById('qty'+idp).value=cantidad;
	var bodega=$('#local').val();
    CalculateAdjustment(document.getElementById('qty'+idp),cantidad);
	var obj=document.getElementById('qty'+idp);
	var ajuste=$(obj).closest('tr').find('td').eq(6).find('input').val();
	console.log(ajuste+'/'+bodega);
    AddTemporarily(document.getElementById('qty'+idp),cantidad,idp,fecha,bodega,ajuste,milote);
    $('#popupcantidad').modal('hide');
    $('#error').fadeOut('slow');
    document.getElementById('empa').value='';
    document.getElementById('unid').value='';
  }
}
function baja(event,obj,id){
  //alert(event.keyCode);
  if(event.keyCode==40){
    var arrayids = document.getElementById('arraryids').value;
    var res = arrayids.split("|");
    var cb = parseInt($(obj).attr('data-valor'));
    cb += 1;
      //alert(res[cb]);
      $('#qty'+res[cb]).focus();
  }
  if(event.keyCode==38){
    var arrayids = document.getElementById('arraryids').value;
    var res = arrayids.split("|");
    var cb = parseInt($(obj).attr('data-valor'));
    cb -= 1;
      //alert(res[cb]);
      $('#qty'+res[cb]).focus();
  }
}
function agregacantida(idp){
  var empaque = document.getElementById('cantemp'+idp).value;
  var unidad = document.getElementById('cantund'+idp).value;
  var unidadvalor = parseFloat(document.getElementById('cantund'+idp).value);
  var conversion = parseFloat(document.getElementById('conv'+idp).value);

  if(empaque=='' && unidad==''){
    $('#error').fadeIn('slow');
  }else{
    if(unidad!=''){
      var unidadaux = unidadvalor/conversion;
    }else{
      var unidadaux = 0;
    }
    if(empaque!=''){
      var empaquevalor = parseFloat(document.getElementById('cantemp'+idp).value);
    }else{
      var empaquevalor = 0;
    }
    var fecha = $('input:text[name=endDate]').val();
    var local = $('select[name=local]').val()
    var cantidad = empaquevalor+unidadaux;
    //alert(unidadvalor+'**'+local);
    document.getElementById('qty'+idp).value=cantidad;
    CalculateAd(document.getElementById('qty'+idp),cantidad);
    AddTemporarily(document.getElementById('qty'+idp),cantidad,idp,fecha,local,'0');
  }
}
function CalculateAd(obj,val){
	var currentValue = parseFloat($(obj).closest('tr').find('td').eq(7).html().replace(',',''));
	var newValue = parseFloat(parseFloat(val) - parseFloat(currentValue));

	if(isNaN(newValue)){
		newValue = 0;
		}
	//alert(parseFloat(newValue).toFixed(2));
	$(obj).closest('tr').find('td').eq(11).find('input').val(parseFloat(newValue).toFixed(5));
}
function guarda(){
  setTimeout(function(){ document.getElementById("guardar").submit(); }, 1000);
}