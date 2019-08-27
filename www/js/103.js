$(document).ready(function(){
	if($('#diseno').val()=='old'){
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
	}else{
		$('#desde').datepicker({
			changeMonth: true,
			changeYear: true,
			showButtonPanel: false,
			monthNames:['01','02','03','04','05','06','07','08','09','10','11','12'],
			//monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			format: 'mm-yyyy',
			viewMode: "months", 
			minViewMode: "months",
			onClose: function(dateText, inst) { 
				var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				$(this).datepicker('setDate', new Date(year, month, 1));
			}
		});
	}
});

function VerDetalle(id,cual){
	var tabla='#ret_compras ';
	if(cual==1)
		tabla='#ret_ventas ';
	if($(tabla+'#detalle_'+id).css('display')=='none'){
		$(tabla+'#detalle_'+id).slideDown();
		$(tabla+'#btn_'+id).html("<span class='glyphicon glyphicon-minus'>");
	}else{
		$(tabla+'#detalle_'+id).slideUp();
		$(tabla+'#btn_'+id).html("<span class='glyphicon glyphicon-plus'>");
	}
}


function Ejecutar(){
	$('#filtro').submit();
}

function ExportarExcel(){
	var fecha=$('#desde').val();
	window.location='template/exceltemplates/downloadExcel103.php?desde='+fecha;
}