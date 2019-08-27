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
			dateFormat: 'MM-yy',
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
	// $("#filtro1").on("submit", function (e) {
  //   e.preventDefault();
	// 	alert('Submit')
	// })
});

function Filtrar(cont){
	$('#filtro'+cont+'').submit();
}
// function submitFormAndWait(i) {
//     //this is your code to submit
//
// 		$('#new').val('presupuestos'+i+'');
// 		$('#filtro'+i+'').submit();
//     // wait some time and call next form
//     if (i <= 12) {
//         setTimeout(function(){ submitFormAndWait(i + 1); }, 7000);
//     }
// }
function Guardar(cont){
	var data = $('#filtro'+cont+'').serialize()+"&new=presupuestos" + cont
	$.ajax({
   type: 'POST',
   url: 'handler/formhandler.php',
   data: data,   // I WANT TO ADD EXTRA DATA + SERIALIZE DATA
   success: function(data){
		 console.log(data)
   }
});
	// var current = parseInt($('#current_month').val());
	// $.post('../contabilidad/handler/formhandler.php', $('#filtro1').serialize())
	// for (var i = current; i <= 12; i++){
	// 	alert(i)
	// 	$('#new').val('presupuestos'+i+'');
	// 	$('#filtro'+i+'').submit();
	// }
}
