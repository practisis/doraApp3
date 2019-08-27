$(document).ready(function(){
	$('#tipotasa').autocomplete({
		source: function( request, response ) {
			$.ajax({
				type: "POST",
				url: 'ajax/ingresos/detraccionescode.php',
				dataType: "json",
				data: {
					term: request.term
				},
				success: function( data ) {
					response(data);
				}
			});
		},
		select: function(event,ui){
			$('#tipotasa').attr('data-id',ui.item.id);
			$('#impdetraccion').val(ui.item.porcentaje);
			//alert('viene');
			CalculaDetraccion();
		},open : function() {
			$("#impdetraccion").val(0);
			$('#tipotasa').attr('data-id','0');
			CalculaDetraccion();
		},
		close : function() {
			if($('#tipotasa').val()==''){
				$('#tipotasa').attr('data-id','0');
				$("#impdetraccion").val(0);
			}				
			CalculaDetraccion();
		}
	}).data('ui-autocomplete')._renderItem = function(ul,item){
		return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
	};
	
	$('#tipotasa').on('change',function(){
		if($('#tipotasa').val()==''){
			$("#impdetraccion").val(0);
			$('#tipotasa').attr('data-id','0');
			CalculaDetraccion();
		}	
	});
});

function CalculaDetraccion(){
	//alert('viene');
	var p=$('#impdetraccion').val();
	var base=$('#basedetraccion').val();
	var valordetraccion=base*p/100;
	console.log('detraccion:'+valordetraccion);
	$('#tasadetraccion').val(valordetraccion.toFixed(2));
}

function MaxDetraccion(){
	var base=$('#basedetraccion').val();
	var basemaxima=$('#basedetraccion').attr('data-real');
	if(parseFloat(base)>parseFloat(basemaxima)){
		$('#basedetraccion').val(basemaxima);
	}
	CalculaDetraccion();
}