$(document).ready(function(){
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
});

function ValidarFechas(){
		var fi=new Date($('#fecha_inicial').val()).getTime();
		var ff=new Date($('#fecha_final').val()).getTime();
		if(fi>ff)
			$('#fecha_final').val($('#fecha_inicial').val());
}