function VerReporte(id){
	    $('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  window.location='?modulo=reportes&index=reporte_view&id='+id+"&"+$('#filtro').serialize();
		}, 1000);
	
}

function VerReporteTarjetas(id){
	//$('#cargando,#cargando2').fadeIn();
		setTimeout(function() {
			  window.location='?modulo=reportes&index=reporte_view_tarj&id='+id+"&"+$('#filtro').serialize();
		}, 1000);
	
}

function Ejecutar(){
	$('#cargando,#cargando2').fadeIn();
	$('#ejecutarquery').val('1');
	$('#offset').val('0');
	$('#filtro').submit();
}
$(document).ready(function(){
	var ancho = $( window ).width();
	$('#contieneTarjetas').css('css',ancho);
	$('#fecha_inicial').datepicker({
		showAnim: 'slideDown',
		showOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		changeMonth: true,
		changeYear: true
		});
	$('#fecha_final').datepicker({
		showAnim: 'slideDown',
		showOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		changeMonth: true,
		changeYear: true
		});
	$('#fecha_inicial').change(function(){	
		ValidarFechas();
	});
	$('#fecha_final').change(function(){	
		ValidarFechas();
	});
	
	function ValidarFechas(){
		var fi=new Date($('#fecha_inicial').val()).getTime();
		var ff=new Date($('#fecha_final').val()).getTime();
		if(fi>ff)
			$('#fecha_final').val($('#fecha_inicial').val());
	}
	
	$('#excelExpJacob').click(function(){
		//('#loading').show();
		$('#cargando,#cargando2').fadeIn();
		var id = $('#entryID').val();
		var startDate = $('#fecha_inicial').val();
		var endDate = $('#fecha_final').val();
		var combo = $('#campocombo').val();
		var comboText = $('#campocombo :selected').text();
		var comboloc=$('#comboLocal').val();
		var combolocText=$('#comboLocal :selected').text();
		var combo2=$('#campocomb2').val();
		var comboText2=$('#campocomb2 :selected').text();
		var horainicial=$('#hora_inicial').val();
		var horafinal=$('#hora_final').val();
		window.location='template/downloadExcelReportes.php?'+'id='+ id +'&startDate='+ startDate +'&endDate='+ endDate +'&combo='+ combo +'&comboText='+ comboText+'&comboloc='+comboloc+'&combolocText='+combolocText+'&combo2='+combo2+'&comboText2='+comboText2+"&horaini="+horainicial+"&horafin="+horafinal;
		$('#cargando,#cargando2').fadeOut();
	});
	//$('#cargando,#cargando2').fadeIn();
	
	/*si existe campo combo hacer autocomplete*/
	if($('#campocombon')){
		var valor=$('#campocombon').attr('valorid');
		var idreporte=$('#entryID').val();
		$('#campocombon').autocomplete({
			source:"ajax/reportes/autocompletereporte.php?rep="+idreporte,
			select:function(event,ui){
				console.log(ui.item.id);
				$('#campocombon').attr('valorid',ui.item.id);
				$('#campocombo').val(ui.item.id);
			}
		});
	}
	
	/**/
	//alert('hola');
	/*if($("#diseno").val() == "new")
		$('#nav-container').css('width','220px');*/
	
});


function exportarPdf(cual){
	
		var afechaini='';
		var afechafin='';
		var ahoraini='';
		var ahorafin='';
		var alocal=''; 
		var aparam='';
		var aparam2='';
		var text1='';
		var text2='';
		var textlocal='';
		if(document.getElementById('fecha_inicial')!=null && document.getElementById('fecha_inicial').value!='')
			afechaini=document.getElementById('fecha_inicial').value;
		if(document.getElementById('fecha_final')!=null && document.getElementById('fecha_final').value!='')
			afechafin=document.getElementById('fecha_final').value;
		if(document.getElementById('hora_final')!=null && document.getElementById('hora_final').value!='')
			ahorafin=document.getElementById('hora_final').value;
		if(document.getElementById('hora_inicial')!=null && document.getElementById('hora_inicial').value!='')
			ahoraini=document.getElementById('hora_inicial').value;
		if(document.getElementById('campocombo')!=null && document.getElementById('campocombo').value!=''){
			aparam=document.getElementById('campocombo').value;
			text1=$('#campocombo option:selected').text();
		}
		if(document.getElementById('campocomb2')!=null && document.getElementById('campocomb2').value!=''){
			aparam2=document.getElementById('campocomb2').value;
			text2=$('#campocomb2 option:selected').text();
		}
		if(document.getElementById('comboLocal')!=null && document.getElementById('comboLocal').value!=''){
			alocal=document.getElementById('comboLocal').value;
			textlocal=$('#comboLocal option:selected').text();
		}
			
		$('#cargando,#cargando2').fadeIn();
		window.open("lib/PdfLibrary/downloadPdfReportes.php?id="+cual+"&fechaini="+afechaini+"&fechafin="+afechafin+"&horaini="+ahoraini+"&horafin="+ahorafin+"&local="+alocal+"&parametro="+aparam+"&parametro2="+aparam2+"&combotext1="+text1+"&combotext2="+text2+"&textlocal="+textlocal);
		$('#cargando,#cargando2').fadeOut();
}

function FiltrarReportes(){
	//$('#cargando,#cargando2').fadeIn();
		/*setTimeout(function() {
			  $('#cargando').modal('hide');
		}, 1000);*/
	$('#offset').val('0');
	$('#filtro').submit();
}