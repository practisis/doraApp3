function VerModalImport(){
	$('#modalimportador').modal('show');
}


$('#excel').on('change', function(){
	$('#fileform').ajaxForm({
		success: function(response){
			$('#loader').fadeOut();
			console.log(response);
			var resp=response.split('|');
			if(resp[0]=='ok'&&resp[1]==''){
				$('#jsalert').html("Cuentas importadas con éxito.");
				$('#jsalert').slideDown();
			}else{
				$('#jsalert').html("El importador, no ha subido las siguientes líneas erróneas: "+resp[1]);
				$('#jsalert').slideDown();
			}
		}
	}).submit();
});

$('#modalimportador').on('hidden.bs.modal', function () {
  window.location.reload();
})