$(document).ready(
	function(){
		$('#cliente').autocomplete({
			source:"ajax/ingresos/clientes.php",
			select:function(event,ui){
				console.log(ui.item.id);
                //alert('entra1');
				/*$('#campocombon').attr('valorid',ui.item.id);*/
				$('#idcliente').val(ui.item.id);
				$('#idcuentac').val(ui.item.idcuenta);
                $('#escliente').val(ui.item.tipodato);
				
				if(parseInt($('#idcliente').val())>0){
					if($('#idpais').html()==1){
						$('#verretencion').fadeIn();
					}
					if($('#idpais').html()==27){
						$('#verdetraccion').fadeIn();
					}
				}
				
                if(ui.item.tipodato == 1){
				    BuscarFacturas();
                }else if(ui.item.tipodato == 2){
				    BuscarFacturasTar();
                }
				else{
					BuscarFacturaNum();
                }
			}
		});
	}
);

function BuscarFacturas(){
  //alert('entra');
	var cliente=$('#idcliente').val();
    var lote = $('#lote').val();
	var valorcli=$('#cliente').val();
	var splitvalor=valorcli.split('-');
	var esfactura='false';
	if(parseFloat(splitvalor[2])>0||parseFloat(splitvalor[1])>0||parseFloat(splitvalor[0])>0){
		esfactura='true';
	}else{
		esfactura='false';
	}
	$.ajax({
	  url: "ajax/ingresos/facturas.php",
	  data:{cli:cliente,lote:lote,esfact:esfactura}
	}).done(function(resp){
		$('#tablafacturas tbody').html('');
		console.log(resp);
		$('.line_det').remove();
			var mijson=JSON.parse(resp);
			if(mijson.length>1){
				$('#control_tarjetas_cliente').val(1);
			}
			
			for(var k=0;k<mijson.length;k++){
				if($('#tot_'+mijson[k].id).length==0){
					
				}
				
				var displayline='';
				  if(mijson[k].tarjeta != '' && mijson[k].tarjeta != null && mijson[k].tarjeta != 'null'){
				    var tarjeta = '('+mijson[k].tarjeta+')';
                    var vertarj = 'none';
                    var readtarj = 'readonly';
					var displayline = 'none';
					var kk = '_';
                  }else{
                    var tarjeta = '';
                    var vertarj = 'inline-block';
                    var readtarj = '';
					var displayline = '';
					var kk = '';
                  }
				  
				  // alert(mijson[k].tarjeta + ' <<   >> ' + displayline);
				 
				  if(mijson[k].id==0){
					  displayline='none';
				  }
				  
					var sindecimales=$('#sindecimales').val();
					var ndec=2;
					if(sindecimales==1){
						ndec=0;
					}
					var line="<tr class='line_det factura_con_tarjeta_"+mijson[k].id+"' style='display:"+displayline+"'><td style='text-align:left;'><input name='factID[]' value='"+mijson[k].num+"' style='display:none;'/><input name='CuentaCliente[]' value='"+mijson[k].cuentacli+"' style='display:none;'/><input name='factIDReal[]' value='"+mijson[k].id+"' style='display:none;'/>"+mijson[k].num+' '+tarjeta+"</td><td style='text-align:center;'>"+mijson[k].fecha+"</td><td style='text-align:center;'>"+mijson[k].lote+"</td><td style='text-align:right;' id='tot_"+mijson[k].id+"'>"+parseFloat(mijson[k].total).toFixed(ndec)+"</td><td style='text-align:right;' id='abo_"+mijson[k].id+"'>"+parseFloat(mijson[k].abono).toFixed(ndec)+"</td><td style='text-align:right;' id='sal_"+mijson[k].id+"'>"+parseFloat(mijson[k].saldo).toFixed(ndec)+"</td><td style='text-align:center;'><input onclick='this.select();' class='input-sm form-control misabonos soloFloat' name='abonosval[]' onkeyup='CalcularSaldo("+mijson[k].id+");' value='0.00' id='newabo_"+mijson[k].id+""+kk+"' "+readtarj+"/><div onclick='SaldoTotal("+mijson[k].id+");' class='btn btn-xs btn-primary' style='display: "+vertarj+";'><span class='glyphicon glyphicon-check'></span></div></td><td style='text-align:center;'><input class='input-sm form-control' id='saldof_"+mijson[k].id+""+kk+"' value='"+parseFloat(mijson[k].saldo).toFixed(ndec)+"' readonly style='text-align:right;' /></td></tr>";
					$('#tablafacturas').append(line);
			}
	});
    $('#saldoagregar').val(0);
    AgregaraIngreso();
}

function BuscarFacturasTar(){
  //alert('entra');
	var cliente=$('#idcliente').val();
    var lote = $('#lote').val();
	$.ajax({
	  url: "ajax/ingresos/facturastar.php",
	  data:{cli:cliente,lote:lote}
	}).done(function(resp){
		console.log(resp);
		$('.line_det').remove();
		var mijson=JSON.parse(resp);
		for(var k=0;k<mijson.length;k++){
			//alert($('#tot_'+mijson[k].id).length);
			if($('#tot_'+mijson[k].id).length==0){
				var line="<tr class='line_det'><td style='text-align:right;'><input name='factID[]' value='"+mijson[k].num+"' style='display:none;'/><input name='CuentaCliente[]' value='"+$('#idcuentac').val()+"' style='display:none;'/><input name='factIDReal[]' value='"+mijson[k].id+"' style='display:none;'/>"+mijson[k].num+"</td><td style='text-align:center;'>"+mijson[k].fecha+"</td><td style='text-align:center;'>"+mijson[k].lote+"</td><td style='text-align:right;' id='tot_"+mijson[k].id+"'>"+parseFloat(mijson[k].total).toFixed(2)+"</td><td style='text-align:right;' id='abo_"+mijson[k].id+"'>"+parseFloat(mijson[k].abono).toFixed(2)+"</td><td style='text-align:right;' id='sal_"+mijson[k].id+"'>"+parseFloat(mijson[k].saldo).toFixed(2)+"</td><td style='text-align:center;'><input onclick='this.select();' class='input-sm form-control misabonos' name='abonosval[]' onkeyup='CalcularSaldo("+mijson[k].id+");' value='0.00' id='newabo_"+mijson[k].id+"'/><div onclick='SaldoTotal("+mijson[k].id+");' class='btn btn-xs btn-primary'><span class='glyphicon glyphicon-check'></span></div></td><td style='text-align:center;'><input class='input-sm form-control' id='saldof_"+mijson[k].id+"' value='"+parseFloat(mijson[k].saldo).toFixed(2)+"' readonly style='text-align:right;' /></td></tr>";
				$('#tablafacturas').append(line);
			}
		}
	});
    $('#saldoagregar').val(0);
    AgregaraIngreso();
}


function BuscarFacturaNum(){
	var numf=$('#idcliente').val();
	$.ajax({
	  url: "ajax/ingresos/facturanum.php",
	  data:{fact:numf}
	}).done(function(resp){
		console.log(resp);
		$('.line_det').remove();
		var mijson=JSON.parse(resp);
		for(var k=0;k<mijson.length;k++){
			console.log("entra"+mijson[k].lote);
			//alert($('#tot_'+mijson[k].id).length);
			if($('#tot_'+mijson[k].id).length==0){
				var line="<tr class='line_det'><td style='text-align:right;'><input name='factID[]' value='"+mijson[k].num+"' style='display:none;'/><input name='CuentaCliente[]' value='"+mijson[k].cuentacliente+"' style='display:none;'/><input name='factIDReal[]' value='"+mijson[k].id+"' style='display:none;'/>"+mijson[k].num+"</td><td style='text-align:center;'>"+mijson[k].fecha+"</td><td style='text-align:center;'>"+mijson[k].lote+"</td><td style='text-align:right;' id='tot_"+mijson[k].id+"'>"+parseFloat(mijson[k].total).toFixed(2)+"</td><td style='text-align:right;' id='abo_"+mijson[k].id+"'>"+parseFloat(mijson[k].abono).toFixed(2)+"</td><td style='text-align:right;' id='sal_"+mijson[k].id+"'>"+parseFloat(mijson[k].saldo).toFixed(2)+"</td><td style='text-align:center;'><input onclick='this.select();' class='input-sm form-control misabonos' name='abonosval[]' onkeyup='CalcularSaldo("+mijson[k].id+");' value='0.00' id='newabo_"+mijson[k].id+"'/><div onclick='SaldoTotal("+mijson[k].id+");' class='btn btn-xs btn-primary'><span class='glyphicon glyphicon-check'></span></div></td><td style='text-align:center;'><input class='input-sm form-control' id='saldof_"+mijson[k].id+"' value='"+parseFloat(mijson[k].saldo).toFixed(2)+"' readonly style='text-align:right;'/></td></tr>";
				$('#tablafacturas').append(line);
			}
		}
	});
    $('#saldoagregar').val(0);
    AgregaraIngreso();
}

function CalcularSaldo(cual){
	var strnewabo=$('#newabo_'+cual).val();
	strnewabo=strnewabo.replace(',','');
	var nuevoabono=parseFloat(strnewabo);
	var strsaldo=$('#sal_'+cual).html();
	strsaldo=strsaldo.replace(',','');
	var saldo=parseFloat(strsaldo);
	
	//fila
	
	if(nuevoabono==null||isNaN(nuevoabono)){
		nuevoabono=0;
		$('#newabo_'+cual).val('0.00');
		$('.newabo_'+cual).val('0.00');
	}
	
	if(nuevoabono>saldo){
		nuevoabono=saldo;
		$('#newabo_'+cual).val(nuevoabono);
		$('#newabo_'+cual).effect( "highlight" );		
		$('.newabo_'+cual).val(nuevoabono);
		$('.newabo_'+cual).effect( "highlight" );
	}

	var ndec=2;
	if($('#sindecimales').val()==1){
		ndec=0;
	}
	
	var newsaldo=saldo-nuevoabono;
	$('#saldof_'+cual).val(newsaldo.toFixed(ndec));
	$('.saldof_'+cual).val(newsaldo.toFixed(ndec));
	var todosabonos=0;
	$('.misabonos').each(function(){
		var fila=$(this).parent().parent();
		var nombrefact=$(fila).find("input[name='factID[]']");
		console.log(fila);
		console.log($(fila).find("input[name='factID[]']"));
		console.log($(nombrefact).val());
		var valor=$(nombrefact).val();
		if(valor.indexOf('(NC)')>=0){
			todosabonos-=parseFloat($(this).val());
		}else{
			todosabonos+=parseFloat($(this).val());
		}
	});
	
	$('#saldoagregar').val(todosabonos.toFixed(2));
	AgregaraIngreso();
}

function SaldoTotal(cual){
	var strsal=$('#sal_'+cual).html();
	strsal=strsal.replace(',','');
	$('#newabo_'+cual).val(strsal);
	$('.newabo_'+cual).val(strsal);
	CalcularSaldo(cual);
}

function AgregaraIngreso(){
	var agregar=parseFloat($('#saldoagregar').val());
	var ingreso=parseFloat($('#saldodirecto').val());
    var agregar2=0;
	if($('#saldoagregar2').val()!=null&&$('#saldoagregar2').val()!='')
		agregar2=parseFloat($('#saldoagregar2').val());
	if(isNaN(agregar2))
		agregar2=0;
	console.log(agregar+'/'+ingreso+'/'+agregar2);
	/*var anter=$('#totaldebe').val();
	if(anter==null){
		anter=0;
	}*/
	
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;

	$('#totaldebe').val((ingreso+agregar-agregar2).toFixed(ndec));

	separadorDecimalesInicial="."; //Modifique este dato para poder obtener la nomenclatura que utilizamos en mi pais
	separadorDecimales="."; //Modifique este dato para poder obtener la nomenclatura que utilizamos en mi pais
	separadorMiles=","; //Modifique este dato para poder obtener la nomenclatura que utilizamos en mi pais

	function arreglar(numero)
	{
	var numeroo="";
	numero=""+numero;
	partes=numero.split(separadorDecimalesInicial);
	entero=partes[0];
	if(partes.length>1)
	{
	decimal=partes[1];
	}
	cifras=entero.length;
	cifras2=cifras
	for(a=0;a<cifras;a++)
	{
	cifras2-=1;
	numeroo+=entero.charAt(a);
	if(cifras2%3==0 &&cifras2!=0)
	{
	numeroo+=separadorMiles;
	}
	}
	if(partes.length>1)
	{
	numeroo+=separadorDecimales+decimal;
	}
	return numeroo
	}
	
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;

	var forFix = (ingreso+agregar-agregar2).toFixed(ndec);
	$('#totaldebe').val(forFix);
	
    if(parseFloat($('#totaldebe').val()) > 0){
		if($('#idpais').html()==1){
			$('#verretencion').fadeIn();
		}
		if($('#idpais').html()==27){
			$('#verdetraccion').fadeIn();
		}
    }else{
		if(parseInt($('#idcliente').val())>0)
			if($('#idpais').html()==1){
				$('#verretencion').fadeIn();
			}
			if($('#idpais').html()==27){
				$('#verdetraccion').fadeIn();
			}
		else{
			$('#verdetraccion').fadeOut();
		}
			
    }
	

    //alert('rv');
}