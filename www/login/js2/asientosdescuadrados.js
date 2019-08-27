$(document).ready(function(){
	$('#desde').datepicker({
		    changeMonth: true,
			changeYear: true,
			showButtonPanel: false,
			dateFormat: 'yy-mm-dd'
	});
	
	$('#hasta').datepicker({
		    changeMonth: true,
			changeYear: true,
			showButtonPanel: false,
			dateFormat: 'yy-mm-dd'
	});
});

function Filtrar(){
	$('#filtro').submit();
}
