$('#productCode').autocomplete({
	source: 'ajax/productos/productos_code.php',
	select: function(event,ui){
		$(this).val(ui.item.codigo);
		$('#productName').val(ui.item.formulado);
		$('[name="productID"]').val(ui.item.id);
		$('#filtro').submit();
		},
	}).data('ui-autocomplete')._renderItem = function(ul,item){
		return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
		};
			
$('#productName').autocomplete({
	source: 'ajax/productos/productos_name.php',
	select: function(event,ui){
		$(this).val(ui.item.formulado);
		$('#productCode').val(ui.item.codigo);
		$('[name="productID"]').val(ui.item.id);
		$('#filtro').submit();
		}
	}).data('ui-autocomplete')._renderItem = function(ul,item){
		return $('<li></li>').data('item.autocomplete',item).append('<a>'+ item.label +'</a>').appendTo(ul);
		};
		
function ExportarExcel(){
		var startDate=$('#startDate').val();
		var endDate=$('#endDate').val();
		var productid=$('#productID').val();
		var local=$('#local').val();
		var productName=$('#productName').val();
		window.location="template/exceltemplates/downloadExcelCardex.php?startDate="+startDate+"&endDate="+endDate+"&productID="+productid+"&local="+local+"&productName="+productName;
}

function irfactura(id){
  //  window.location.href='?modulo=cajero&index=historialfacturacion_view_cardex&id='+id;
  var fechad = document.getElementById('startDate').value;
  var fechah = document.getElementById('endDate').value;
  var cod = document.getElementById('productCode').value;
  var name = document.getElementById('productName').value;
  var idp = document.getElementById('productID').value;
  var loc = document.getElementById('local').value;
  document.getElementById('id').value=id;
  document.getElementById('startDated').value=fechad;
  document.getElementById('endDateh').value=fechah;
  document.getElementById('productCodec').value=cod;
  document.getElementById('productNamen').value=name;
  document.getElementById('productIDp').value=idp;
  document.getElementById('locall').value=loc;
  document.getElementById("verfactura").submit();
}

function irCompra(id){
  
 
  document.getElementById('id').value=id;
  var fechad = document.getElementById('startDate').value;
  var fechah = document.getElementById('endDate').value;
  var cod = document.getElementById('productCode').value;
  var name = document.getElementById('productName').value;
  var idp = document.getElementById('productID').value;
  var loc = document.getElementById('local').value;
  var que = document.getElementById('que').value;
  

  location.href = '?id='+id+'&modulo=cegresos&index=compras_edit&startDate='+fechad+'&endDate='+fechah+'&productCode='+cod+'&productName='+name+'&productID='+idp+'&local='+loc+'&que='+que;
  
}