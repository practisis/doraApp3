function GuardarCambiosImpuestos(id){
	$('#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando2').fadeOut();
		}, 1000);

	var conimp=$('#conimp'+id).is(':checked');
	/*var conser=$('#conserv'+id).is(':checked');
	var presinimp=$('#preciosinimp_'+id).val();
	var preconimp=$('#precioconimp_'+id).val();*/
	$.ajax({
	  url: "ajax/productos/datosformuladosimpuestos.php",
	  data:{conimp:conimp.toString(),id:id}
	}).done(function(resp) {
	  //alert(resp);
		if(resp=='ok')
			$('#preciosinimp_'+id+',#precioconimp_'+id).effect('highlight',[],1000);
	});
}

function GuardarCambios(id){
	$('#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando2').fadeOut();
		}, 1000);

	var coniva=$('#coniva'+id).is(':checked');
	var conser=$('#conserv'+id).is(':checked');
	var presinimp=$('#preciosinimp_'+id).val();
	var preconimp=$('#precioconimp_'+id).val();
	$.ajax({
	  url: "ajax/productos/datosformulados.php",
	  data:{iva:coniva.toString(),sinimp:presinimp,conimp:preconimp,id:id,serv:conser.toString()}
	}).done(function(resp) {
	  //alert(resp);
		if(resp=='ok')
			$('#preciosinimp_'+id+',#precioconimp_'+id).effect('highlight',[],1000);
	});
}

$(document).ready(function(){
	
	//$(".impventa").bootstrapSwitch();
	$('.form-element').each(function(){
		$(this).change(function(){GuardarCambios($(this).attr('data-id'));});
	});
	$('.impventa').on('change', function(){
		var state=$(this).is(':checked');
		CalculaSwitch($(this).attr('data-id'),state);
		GuardarCambios($(this).attr('data-id'));
	});

   // $(".imptiene").bootstrapSwitch();
	$('.imptiene').on('change', function(){
		var state=$(this).is(':checked');
		CalculaSwitchNube($(this).attr('data-id'),state);
		GuardarCambiosImpuestos($(this).attr('data-id'));
	});
	
	$('#modalimportador,#modaleliminar').on('shown.bs.modal',centerModal);
	
	/*$('.miprecini').each(function(){
		CalculaConImp($(this).attr('data-id'));
	});*/
});


function CalculaSinImp(elid){
	/*if(e.keyCode==13){
	}*/
   // alert(elid);
	$('#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando2').fadeOut();
		}, 1000);
	var valorcon=parseFloat($('#precioconimp_'+elid).val());
	var finalval=1;
	if($('#coniva'+elid).is(':checked'))
		finalval+=parseFloat($('#coniva'+elid).attr('data-value'));
	if($('#coniva'+elid).attr('data-serv')=='1')
		finalval+=parseFloat($('#coniva'+elid).attr('data-valueserv'));
	$('#preciosinimp_'+elid).val((valorcon/finalval).toFixed(4));
	if($('#seisdec').val()==1)
		$('#preciosinimp_'+elid).val((valorcon/finalval).toFixed(6));

}

function CalculaConImp(elid){
	$('#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando2').fadeOut();
		}, 1000);
	console.log($('#coniva'+elid).attr('data-serv'));
	var valorcon=parseFloat($('#preciosinimp_'+elid).val());
	var finalval=1;
	if($('#coniva'+elid).is(':checked'))
		finalval+=parseFloat($('#coniva'+elid).attr('data-value'));
	if($('#coniva'+elid).attr('data-serv')=='1')
		finalval+=parseFloat($('#coniva'+elid).attr('data-valueserv'));
	$('#precioconimp_'+elid).val((valorcon*finalval).toFixed(2));
	if($('#seisdec').val()==1)
		$('#precioconimp_'+elid).val((valorcon*finalval).toFixed(6));
}

function CalculaSinImpNube(elid){
	/*if(e.keyCode==13){
	}*/
	$('#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando2').fadeOut();
		}, 1000);
	var valorcon=parseFloat($('#precioconimp_'+elid).val());
    var impuestoterminal=parseFloat($('#impuestoterminal').val());
    var valorsin = 0;
	if($('#conimp'+elid).is(':checked'))
		valorsin=(valorcon/impuestoterminal);
    else
		valorsin=(valorcon/1);
	
	$('#preciosinimp_'+elid).val(valorsin.toFixed(2));
	
	if($('#seisdec').val()==1)
		$('#preciosinimp_'+elid).val(valorsin.toFixed(6));
}

function CalculaConImpNube(elid){
	$('#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando2').fadeOut();
		}, 1000);
	var valorsin=parseFloat($('#preciosinimp_'+elid).val());
    var impuestoterminal=parseFloat($('#impuestoterminal').val());
    var valorcon = 0;
	if($('#conimp'+elid).is(':checked'))
		valorcon=(valorsin*impuestoterminal);
    else
		valorcon=(valorsin*1);
	$('#precioconimp_'+elid).val(valorcon.toFixed(2));
}

function MostrarImportador(){
	//alert("Ana");
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#modalimportador').modal('show');
}

function CalculaSwitch(id,state){
	var valorsin=parseFloat($('#preciosinimp_'+id).val());
	var valorcon=parseFloat($('#precioconimp_'+id).val());
	if(state==true)
		valorcon=valorcon+(valorsin*$('#coniva'+id).attr('data-value'));
	else
		valorcon=valorcon-(valorsin*$('#coniva'+id).attr('data-value'));
	$('#precioconimp_'+id).val(valorcon.toFixed(2));
}

function CalculaSwitchNube(id,state){
	var valorsin=parseFloat($('#preciosinimp_'+id).val());
	var valorcon=parseFloat($('#precioconimp_'+id).val());
    var impuestoterminal=parseFloat($('#impuestoterminal').val());
	if(state==true)
		valorcon=(valorsin*impuestoterminal);
	else
		valorcon=(valorsin*1);
	$('#precioconimp_'+id).val(valorcon.toFixed(2));
}

function centerModal(){
	var $dialog = $(this).find(".modal-dialog");
	//console.log($dialog.height());
	var offset = ($(window).height() - $dialog.height()) / 2;
	// Center modal vertically in window
	$dialog.css("margin-top", offset);
}

$(window).on("resize", function (){
	$('.modal:visible').each(centerModal);
});

$('#excel').on('change', function(){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#fileform').ajaxForm({
		success: function(response){
			$('#loader').fadeOut();
			console.log(response);
			var resp=response.split('|');
			if(resp[0]=='ok'&&resp[1]==''){
				$('#jsalert').html("Productos importados con éxito.");
				$('#jsalert').slideDown();
                location.reload(true);
			}else{
				$('#jsalert').html("El importador, no ha subido las siguientes líneas erróneas:"+resp[1]);
				$('#jsalert').slideDown();
			}
		}
	}).submit();
});

function EliminarProducto(){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#loaderelim').fadeIn();
	var id=$('#idprodeliminar').val();
	$.ajax({
	  url: "ajax/productos/eliminarproducto.php",
	  data:{id:id}
	}).done(function(resp){
		$('#loaderelim').fadeOut();
		var data=resp.split('|');
        //alert(data);
		if(data[0]=='ok'){
			$('#jsalertelim').html("El producto se ha eliminado con éxito.");
			$('#jsalertelim').slideDown();
			setTimeout(function(){window.location.reload();},4000);
		}else if (data[0]=='error'){
			if(data[1]=='cardex')
				$('#jsalertelim').html("El producto no se puede eliminar ya que presenta movimientos en el cardex"+data[2]);
			else if(data[1]=='formulacion')
				$('#jsalertelim').html("El producto no se puede eliminar ya que está siendo usado para formulaciones"+data[2]);
			else if(data[1]=='diseno')
				$('#jsalertelim').html("El producto no se puede eliminar ya que está siendo usado en el diseño de menú"+data[2]);
			$('#jsalertelim').slideDown();
		}
	});
}

function ConfirmaEliminar(id){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#modaleliminar').modal('show');
	$('#nameprodeliminar').html($('#fname'+id).html());
	$('#idprodeliminar').val(id);
	$('#jsalertelim').html("");
	$('#jsalertelim').css("display","none");
}

function VerProducto(id){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			$('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#idselec').val(id);
	$('#filtro').attr('action','?modulo=inventario&index=productos_config');
	$('#filtro').submit();
}

function VerDisenoMenu(id){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			 $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#idselec').val(id);
	$('#idp').val(id);
	$('#filtro').attr('action','?modulo=productos&index=disenomenu');
	$('#filtro').submit();
}

function VerDisenoMenuNube(id){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			 $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#idselec').val(id);
	$('#idp').val(id);
	$('#filtro').attr('action','?modulo=productos&index=disenomenu_nube');
	$('#filtro').submit();
}

function VerFormulacion(id){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#idselec').val(id);
	$('#idp').val(id);
	$('#filtro').attr('action','?modulo=inventario&index=formulacion');
	$('#filtro').submit();
}

function VerServicio(id){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	if($('#conserv'+id).is(':checked')){
		$('#coniva'+id).attr('data-serv','1');
		//$('#coniva'+id).change();
	}else{
		$('#coniva'+id).attr('data-serv','0');
		//$('#coniva'+id).change();
	}
	CalculaConImp(id);
}

function FiltrarProductos(){
	$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  $('#cargando,#cargando2').fadeOut();
		}, 1000);
	$('#offset').val('0');
	$('#filtro').submit();
}
function cargaconversion(){
	$('#myModalc').modal('show');
}