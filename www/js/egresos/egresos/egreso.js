$(document).ready(
	function(){
		$('#proveedor').autocomplete({
			source:"ajax/egresos/proveedores.php",
			select:function(event,ui){
				console.log(ui.item.id);
				/*$('#campocombon').attr('valorid',ui.item.id);*/
				$('#idproveedor').val(ui.item.id);
				$('#numdoccompra').val(ui.item.doc);
				//$('#idcuentac').val(ui.item.idcuenta);
				BuscarCompras();
			}
		});
	}
);

function BuscarCompras(){
	var ndec=2;
	if($('#sindecimales').val()==1)
		ndec=0;
	
	var proveedor=$('#idproveedor').val();
	var idcompra=$('#numdoccompra').val();
	var valorprov=$('#proveedor').val();
	var splitvalor=valorprov.split('-');
	var esfactura='false';
	if(parseFloat(splitvalor[2])>0||parseFloat(splitvalor[1])>0||parseFloat(splitvalor[0])>0){
		esfactura='true';
	}else{
		esfactura='false';
		idcompra=proveedor;
	}
	
	console.log(idcompra);
	
	$.ajax({
	  url: "ajax/egresos/compras.php",
	  data:{prov:idcompra,esfact:esfactura}
	}).done(function(resp){
		//console.log(resp);
		$('.line_det').remove();
		var mijson=JSON.parse(resp);
		for(var k=0;k<mijson.length;k++){
			var datanc='0';
			if(parseFloat(mijson[k].total)<0)
				datanc='1';
				
			var line="<tr class='line_det'><td style='text-align:left;width: 20%;'><input name='compID[]' value='"+mijson[k].num+"' style='display:none;'/><input name='compIDReal[]' value='"+mijson[k].id+"' style='display:none;'/>"+mijson[k].vencimiento+"</td><td style='text-align:right;' id='ven_"+mijson[k].id+"'>"+mijson[k].emision+"</td><td style='text-align:right;' id='num_"+mijson[k].id+"'>"+mijson[k].num+"</td><td style='text-align:right;' id='tot_"+mijson[k].id+"'>"+parseFloat(mijson[k].total).toFixed(ndec)+"</td><td style='text-align:right;' id='abo_"+mijson[k].id+"'>"+parseFloat(mijson[k].abono).toFixed(ndec)+"</td><td style='text-align:right;' id='sal_"+mijson[k].id+"'>"+parseFloat(mijson[k].saldo).toFixed(ndec)+"</td><td style='text-align:right;'><input onclick='this.select();' class='input-sm form-control misabonos' name='abonosval[]' onchange='CalcularSaldo("+mijson[k].id+");' value='0.00' style='text-align:right;' data-nc='"+datanc+"' id='newabo_"+mijson[k].id+"'/><div onclick='SaldoTotal("+mijson[k].id+");' class='btn btn-xs btn-primary'><span class='glyphicon glyphicon-check'></span></div></td><td style='text-align:right;'><input style='text-align:right;' class='input-sm form-control' id='saldof_"+mijson[k].id+"' value='"+parseFloat(mijson[k].saldo).toFixed(ndec)+"' readonly /></td></tr>";
			$('#tablacompras').append(line);
		}
	});
}

function CalcularSaldo(cual){
	
	var sindecimales=$('#sindecimales').val();
	var ndec=2;
	if(sindecimales==1){
		ndec=0;
	}

	var nuevoabono=parseFloat($('#newabo_'+cual).val());
	var saldo=parseFloat($('#sal_'+cual).html());

	if(nuevoabono>Math.abs(saldo)){
		if(saldo<0)
			nuevoabono=-saldo;
		else
			nuevoabono=saldo;

		$('#newabo_'+cual).val(Math.abs(nuevoabono));
		$('#newabo_'+cual).effect( "highlight" );
	}
		
	var newsaldo=saldo-nuevoabono;

	if(saldo<0)
		newsaldo=saldo+nuevoabono;

	$('#saldof_'+cual).val(newsaldo.toFixed(ndec));
	var todosabonos=0;
	$('.misabonos').each(function(){
		//console.log($(this).attr('data-nc'));
		if($(this).attr('data-nc')==0||$(this).attr('data-nc')==null)
			todosabonos+=parseFloat($(this).val());
		else
			todosabonos-=parseFloat($(this).val());
	});

	$('#saldoagregar').val(todosabonos.toFixed(ndec));
	AgregaraEgreso();
}

function SaldoTotal(cual){
	var sindecimales=$('#sindecimales').val();
	var ndec=2;
	if(sindecimales==1){
		ndec=0;
	}
	$('#newabo_'+cual).val(parseFloat(Math.abs($('#sal_'+cual).html())).toFixed(ndec));
	CalcularSaldo(cual);
}

function AgregaraEgreso(){
	var agregar=0;
	if($('#saldoagregar').val()!=null&&$('#saldoagregar').val()!='')
		agregar=parseFloat($('#saldoagregar').val());
	if(isNaN(agregar))
		agregar=0;

    var agregar2=0;
	if($('#saldoagregar2').val()!=null&&$('#saldoagregar2').val()!='')
		agregar2=parseFloat($('#saldoagregar2').val());
	if(isNaN(agregar2))
		agregar2=0;

	var sumadebe=0;
	$('.losdebe').each(function(){
		if($(this).val()!=''&&$(this).val()>0)
			sumadebe+=parseFloat($(this).val());
	});
	
	var sumahaber=0;
	$('.loshaber').each(function(){
		if($(this).val()!=''&&$(this).val()>0){
			var fila=$(this).parent().parent();
			var escaja=$(fila).find('[name="prodID[]"]').attr('data-caja');
			if(escaja==0)
				sumahaber+=parseFloat($(this).val());
		}
	});
	
	var egreso=(sumadebe-sumahaber);
	
	if(isNaN(egreso))
		egreso=0;

    //alert(agregar2)
	console.log(agregar+'/'+egreso+'/'+agregar2);
	console.log('round:'+Math.round((egreso+agregar-agregar2),2));
	separadorDecimalesInicial="."; //Modifique este dato para poder obtener la nomenclatura que utilizamos en mi pais
  separadorDecimales="."; //Modifique este dato para poder obtener la nomenclatura que utilizamos en mi pais
  separadorMiles=","; //Modifique este dato para poder obtener la nomenclatura que utilizamos en mi pais

  function arreglar(numero){
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
    for(a=0;a<cifras;a++){
      cifras2-=1;
      numeroo+=entero.charAt(a);
      if(cifras2%3==0 &&cifras2!=0){
        numeroo+=separadorMiles;
      }
    }
    if(partes.length>1){
      numeroo+=separadorDecimales+decimal;
    }
    return numeroo
  }
  
	var sindecimales=$('#sindecimales').val();
	var ndec=2;
	if(sindecimales==1){
		ndec=0;
	}
	$('#totaldebe').val((egreso+agregar-agregar2).toFixed(ndec));
	//$('#totaldebe1').val(arreglar((egreso+agregar-agregar2)).toFixed(2));

}