$(document).ready(function(){
	$('#desde').datepicker({
		    changeMonth: true,
			changeYear: true,
			showButtonPanel: false,
			dateFormat: 'MM-yy',
			monthNames:['01','02','03','04','05','06','07','08','09','10','11','12'],
			//monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			onClose: function(dateText, inst) { 
				var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				$(this).datepicker('setDate', new Date(year, month, 1));
			}
	});
});

function Filtrar(){
	$('#filtro').submit();
}

function Guardar(){
	$('#new').val('presupuestos');
	$('#filtro').submit();
}

