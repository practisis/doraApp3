function objetoAjax(){ 
	var xmlhttp=false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
		   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
  		}
	}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function quebloque(quien){
	console.log(quien);
	
  if(quien == 1){
    document.getElementById('retencion').style.display='none';
    $('#productos').fadeIn('slow');
	$('#poprelacionados').css('display','none');
  }else if(quien == 2){
    $('#productos').fadeOut('fast');
    $('#retencion').fadeIn('slow');
	$('#poprelacionados').css('display','none');
  }
}

function retiva(){
  var retencion = document.getElementById('retencioniva').value;
  var res = retencion.split("||");
  document.getElementById('porcretiva').value=res[1];
}
function ret(){
  var retencion = document.getElementById('reten').value;
  var res = retencion.split("||");
  document.getElementById('porcret').value=res[1];
}
function agregaretiva(quien){
	//console.log("hi");
    var numeroretencion = document.getElementById('numretencion').value;
    var retencion = document.getElementById('retencioniva').value;
    var res = retencion.split("||");
    var baseaux = document.getElementById('baseretiva').value;
    var base = parseFloat(document.getElementById('baseretiva').value);
    var basereal = parseFloat(document.getElementById('baseretivareal').value);
    var valor = 0;
    var basequeda = 0;
    var porcentaje = parseFloat(res[1]);


    var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
	//console.log(d);
      	for ( var i = 0; i < d.length; i++ ) {
          var ww=d[i].id;
          var tiva = ww.substr(0,5);
          //alert(tiva);
          if(tiva=='idret'){
            var quien = ww.substr(5);
            var idreten = document.getElementById('idret'+quien).value;
            if(res[0]==idreten){
                alert('No puede ingresar una misma retención.');
                return false;
            }
          }
          }
          //alert(totciva+'//'+totsiva);

    if(quien == 0){
      basereal = base;
    }

    if(numeroretencion==''){
      alert('Debe ingresar el numero de la retención.');
    }else if(quien == 1){
      if(base>basereal){
        alert('Debe ingresar una base imponible para la retención de : '+basereal);
        document.getElementById('baseretiva').value=basereal;
      }
    }
	//else
	if(retencion != '0' && baseaux!= '0' && baseaux!= '' && base > 0){
      valor = base*(porcentaje/100);
      if(quien == 1){
        basequeda = basereal-base;
      }else{
        basequeda = basereal-base;
      }
      if(basequeda < 0){
          basequeda = 0;
      }
      document.getElementById('baseretiva').value=basequeda.toFixed(4);
      document.getElementById('baseretivareal').value=basequeda.toFixed(4);
        //alert(res[0]+'**'+res[1]+'**'+res[2]+'**'+base+'**'+valor);

        //contm = parseInt(document.getElementById('cuenta').value);
		//alert("Ana");
        contm = 10000+res[0];
		//alert(contm);
        //contm++;
         //alert(tb);
        document.getElementById('cuenta').value=contm;
        myNewRow = document.getElementById('detalleretenciones').insertRow(-1);
        myNewRow.id='r_'+contm;
        myNewCell=myNewRow.insertCell(-1);
        myNewCell.innerHTML='<td><input type="text" name="nombreret'+contm+'" id="nombreret'+contm+'" class="form-control" style="width: 100%;height:25px;" value="'+res[2]+'" readonly="readonly"/><input type="hidden" name="idret'+contm+'" id="idret'+contm+'" value="'+res[0]+'"/></td>';
        myNewCell=myNewRow.insertCell(-1);
        myNewCell.innerHTML='<td><input type="text" name="porcentajeret'+contm+'" id="porcentajeret'+contm+'" class="form-control" style="width: 100%;text-align: right;height:25px;" value="'+res[1]+'" readonly="readonly"/><input type="hidden" name="aux'+contm+'" id="aux'+contm+'" value="1"/></td>';
        myNewCell=myNewRow.insertCell(-1);
        myNewCell.innerHTML='<td><input type="text" name="baseret'+contm+'" id="baseret'+contm+'" class="form-control" style="width: 100%;text-align: right;height:25px;" value="'+base+'" readonly="readonly"/><input type="hidden" name="baseciva'+contm+'" id="baseciva'+contm+'" value="'+base+'"/><input type="hidden" name="basesiva'+contm+'" id="basesiva'+contm+'" value="0"/></td>';
        myNewCell=myNewRow.insertCell(-1);
        myNewCell.innerHTML='<td><input type="text" name="valorret'+contm+'" id="valorret'+contm+'" class="form-control" style="width: 100%;text-align: right;height:25px;" value="'+(Math.round(valor * 100)/100).toFixed(2)+'" readonly="readonly"/></td>';
        myNewCell=myNewRow.insertCell(-1);
        myNewCell.innerHTML='<td><button type="button" onclick="RemoveRowIva('+contm+');" class="removeLine form-control input-sm fa fa-times"></button></td>';
    }
        sacatotal();
}
function RemoveRowIva(tb){
  var base = parseFloat(document.getElementById('baseret'+tb).value);
  var basereal = parseFloat(document.getElementById('baseretivareal').value);
  var total = 0;
  total = base+basereal;
  document.getElementById('baseretivareal').value=total;
  document.getElementById('baseretiva').value=total;
  //alert(tb);
  //document.getElementById('detalleretenciones').deleteRow(tb);
  var fila = document.getElementById('r_'+tb);
  fila.parentNode.removeChild(fila);
  sacatotal();
}
function agregaret(cual){
    var numeroretencion = document.getElementById('numretencion').value;
    var retencion = document.getElementById('reten').value;
    var res = retencion.split("||");
    var baseauxci = document.getElementById('baseretsubciva').value;
    var baseci = parseFloat(document.getElementById('baseretsubciva').value);
    var baserealci = parseFloat(document.getElementById('baseretsubcivareal').value);
    var baseauxsi = document.getElementById('baseretsubsiva').value;
    var basesi = parseFloat(document.getElementById('baseretsubsiva').value);
    var baserealsi = parseFloat(document.getElementById('baseretsubsivareal').value);
    var valor = 0;
    var basequeda = 0;
    var basetotal = 0;
    var porcentaje = parseFloat(res[1]);

    var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
	console.log(d);
    for ( var i = 0; i < d.length; i++ ) {
          var ww=d[i].id;
          var tiva = ww.substr(0,5);
          //alert(tiva);
          if(tiva=='idret'){
            var quien = ww.substr(5);
            var idreten = document.getElementById('idret'+quien).value;
			//alert(res[0]+'/'+idreten);
            if(res[0]==idreten){
                alert('No puede ingresar una misma retención.');
                return false;
            }
          }
    }

	//alert(totciva+'//'+totsiva);
	var pasaret=true;
    if(numeroretencion==''){
      alert('Debe ingresar el numero de la retención.');
    }else if(cual==1){
		//alert(baserealsi+"/"+baserealci);
		if (baserealci>0 || baserealsi>0){
			if(baseci>baserealci){
			  alert('Debe ingresar una base imponible c/iva para la retención de : '+baserealci);
			  document.getElementById('baseretsubciva').value=baserealci;
			  pasaret=false;
			}else if(basesi>baserealsi){
			  alert('Debe ingresar una base imponible s/iva para la retención de : '+baserealsi);
			  document.getElementById('baseretsubsiva').value=baserealsi;
			  pasaret=false;
			}
		}
		else{
			if(baseci==0 && basesi==0){
			  alert('Debe ingresar una base imponible c/iva o una base imponible s/iva para la retención de : '+baserealci);
			  document.getElementById('baseretsubciva').value=baserealci;
			  document.getElementById('baseretsubsiva').value=baserealsi;
			  pasaret=false;
			}
		}
	}

	if(pasaret==true){
		if(retencion != '0' && (baseauxci!= '0' || baseauxsi!= '0') && (baseauxci!= '' || baseauxsi!= '')){
			valor = (baseci+basesi)*(porcentaje/100);
			if(cual==1){
				if(baserealci>0 || baserealsi>0){
					basequedaci = baserealci-baseci;
					basequedasi = baserealsi-basesi;
					document.getElementById('baseretsubciva').value=basequedaci.toFixed(4);
					document.getElementById('baseretsubcivareal').value=basequedaci.toFixed(4);
					document.getElementById('baseretsubsiva').value=basequedasi.toFixed(4);
					document.getElementById('baseretsubsivareal').value=basequedasi.toFixed(4);
				}
			}else{
				basequedaci=0;
				basequedasi=0;
				if(baserealci>0 || baserealsi>0){
					document.getElementById('baseretsubciva').value=basequedaci.toFixed(4);
					document.getElementById('baseretsubcivareal').value=basequedaci.toFixed(4);
					document.getElementById('baseretsubsiva').value=basequedasi.toFixed(4);
					document.getElementById('baseretsubsivareal').value=basequedasi.toFixed(4);
				}
			}

			basetotal = baseci+basesi;

			//alert(res[0]+'**'+res[1]+'**'+res[2]+'**'+basetotal+'**'+valor);

			//contm = parseInt(document.getElementById('cuenta').value);
			contm = 10000+res[0];
			//contm++;
			 //alert(tb);
			document.getElementById('cuenta').value=contm;
			myNewRow = document.getElementById('detalleretenciones').insertRow(-1);
			myNewRow.id='r_'+contm;
			myNewCell=myNewRow.insertCell(-1);
			myNewCell.innerHTML='<td><input type="text" name="nombreret'+contm+'" id="nombreret'+contm+'" class="form-control input-sm" style="width: 100%;height:25px;" value="'+res[2]+'" readonly="readonly"/><input type="hidden" name="idret'+contm+'" id="idret'+contm+'" value="'+res[0]+'"/></td>';
			myNewCell=myNewRow.insertCell(-1);
			myNewCell.innerHTML='<td><input type="text" name="porcentajeret'+contm+'" id="porcentajeret'+contm+'" class="form-control input-sm" style="width: 100%;text-align: right;height:25px;" value="'+res[1]+'" readonly="readonly"/><input type="hidden" name="aux'+contm+'" id="aux'+contm+'" value="2"/></td>';
			myNewCell=myNewRow.insertCell(-1);
			myNewCell.innerHTML='<td><input type="text" name="baseret'+contm+'" id="baseret'+contm+'" class="form-control input-sm" style="width: 100%;text-align: right;height:25px;" value="'+basetotal+'" readonly="readonly"/><input type="hidden" name="baseciva'+contm+'" id="baseciva'+contm+'" value="'+baseci+'"/><input type="hidden" name="basesiva'+contm+'" id="basesiva'+contm+'" value="'+basesi+'"/></td>';
			myNewCell=myNewRow.insertCell(-1);
			myNewCell.innerHTML='<td><input type="text" name="valorret'+contm+'" id="valorret'+contm+'" class="form-control input-sm" style="width: 100%;text-align: right;height:25px;" value="'+(Math.round(valor * 100)/100).toFixed(2)+'" readonly="readonly"/></td>';
			myNewCell=myNewRow.insertCell(-1);
			myNewCell.innerHTML='<td><button type="button" onclick="RemoveRow('+contm+');" class="removeLine form-control input-sm fa fa-times"></button></td>';
		}
	}
    sacatotal();
}
function RemoveRow(tb){
  var baseci = parseFloat(document.getElementById('baseciva'+tb).value);
  var baserealci = parseFloat(document.getElementById('baseretsubcivareal').value);
  var basesi = parseFloat(document.getElementById('basesiva'+tb).value);
  var baserealsi = parseFloat(document.getElementById('baseretsubsivareal').value);
  var totalci = 0;
  var totalsi = 0;
  totalci = baseci+baserealci;
  totalsi = basesi+baserealsi;
  document.getElementById('baseretsubcivareal').value=totalci;
  document.getElementById('baseretsubciva').value=totalci;
  document.getElementById('baseretsubsivareal').value=totalsi;
  document.getElementById('baseretsubsiva').value=totalsi;
  //alert(tb);
  //document.getElementById('detalleretenciones').deleteRow(tb);
  var fila = $('#r_'+tb);
  console.log(fila);
  fila.remove();
  sacatotal();
}

function sacatotal(){
  var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
  var total = 0;
  var totaltotal = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,8);
      //alert(tiva);
      if(tiva=='valorret'){
        var quien = ww.substr(8);
        var valorret = parseFloat(document.getElementById('valorret'+quien).value);
        total += valorret;
      }
    }
    //document.getElementById('totalretencion').value=(Math.round(total * 100)/100).toFixed(2);
    document.getElementById('totalretencion').value=total.toFixed(2);
    var totalret = parseFloat($('#totaltotal').val());
    totaltotal = totalret - total;
    console.log(totalret+'**'+total+'**'+totaltotal+'suma1');
    $('#totaldebe').val(totaltotal.toFixed(2));
}
function validarretencion(){

  $('.alert-danger').not('#uploaderrors').fadeOut('slow');

  var datosretenciones = '';
  var datosdetalleretenciones = '';

  var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
  var cuenta = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,5);
      //alert(tiva);
      if(tiva=='idret'){
        var quien = ww.substr(5);
        var aux = parseFloat(document.getElementById('aux'+quien).value);
        var idret = parseFloat(document.getElementById('idret'+quien).value);
        var nombreret = document.getElementById('nombreret'+quien).value;
        var porcentajeret = parseFloat(document.getElementById('porcentajeret'+quien).value);
        var baseciva = parseFloat(document.getElementById('baseciva'+quien).value);
        var basesiva = parseFloat(document.getElementById('basesiva'+quien).value);

        datosdetalleretenciones += idret+'||'+nombreret+'||'+porcentajeret+'||'+baseciva+'||'+basesiva+'||'+aux+'@@';

        cuenta += 1;
      }
    }
    //alert(datosdetalleretenciones);
    if(cuenta>0){
      var numeroretencion = document.getElementById('numretencion').value;
      var ingreso = document.getElementById('ingresoret').value;
      var sri = document.getElementById('sriret').value;
      var serie = document.getElementById('serieret').value;
      var caduca = document.getElementById('caducaret').value;
      var totalretencion = parseFloat(document.getElementById('totalretencion').value);

      datosretenciones = numeroretencion+'||'+serie+'||'+sri+'||'+ingreso+'||'+caduca+'||'+totalretencion;
	  
	  //alert(ingreso);

      if(numeroretencion==''){
        //console.log('uno');
        $('#error-content').html('Debe ingresar el numero de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(ingreso==''){
        //console.log('dos');
        $('#error-content').html('Debe ingresar la fecha de ingreso de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(sri==''){
        //console.log('tres');
        $('#error-content').html('Debe ingresar el numero de autorización de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(serie==''){
        //console.log('cuatro');
        $('#error-content').html('Debe ingresar el numero de serie de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(caduca==''){
        //console.log('cinco');
        $('#error-content').html('Debe ingresar la fecha de caducidad de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else{
        document.getElementById('datosretencion').value = datosretenciones;
        document.getElementById('datosdetalleretencion').value = datosdetalleretenciones;
        document.getElementById('tieneretencion').value = 1;
        //$( "#grabareal" ).click();
        continua_egreso();
      }
    }else{
        document.getElementById('datosretencion').value = '';
        document.getElementById('datosdetalleretencion').value = '';
        document.getElementById('tieneretencion').value = 0;
       // $( "#grabareal" ).click();
	    continua_egreso();
		console.log("DSD2");
    }

}

function verbases(iva,subci,subsi){
  var baseiva = parseFloat(document.getElementById('baseretiva').value);
  var baseci = parseFloat(document.getElementById('baseretsubciva').value);
  var basesi = parseFloat(document.getElementById('baseretsubsiva').value);

  baseiva = baseiva-iva;
  baseci = baseci-subci;
  basesi = basesi-subsi;

  document.getElementById('baseretiva').value = baseiva.toFixed(4);
  document.getElementById('baseretivareal').value = baseiva.toFixed(4);
  document.getElementById('baseretsubciva').value = baseci.toFixed(4);
  document.getElementById('baseretsubcivareal').value = baseci.toFixed(4);
  document.getElementById('baseretsubsiva').value = basesi.toFixed(4);
  document.getElementById('baseretsubsivareal').value = basesi.toFixed(4);

}
function guardaret(id,idcli){
  $('.alert-danger').not('#uploaderrors').fadeOut('slow');

  var datosretenciones = '';
  var datosdetalleretenciones = '';

  var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
  var cuenta = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,5);
      //alert(tiva);
      if(tiva=='idret'){
        var quien = ww.substr(5);
        var aux = parseFloat(document.getElementById('aux'+quien).value);
        var idret = parseFloat(document.getElementById('idret'+quien).value);
        var nombreret = document.getElementById('nombreret'+quien).value;
        var porcentajeret = parseFloat(document.getElementById('porcentajeret'+quien).value);
        var baseciva = parseFloat(document.getElementById('baseciva'+quien).value);
        var basesiva = parseFloat(document.getElementById('basesiva'+quien).value);

        datosdetalleretenciones += idret+'||'+nombreret+'||'+porcentajeret+'||'+baseciva+'||'+basesiva+'||'+aux+'@@';

        cuenta += 1;
      }
    }
    //alert(datosdetalleretenciones);
    if(cuenta>0){
      var numeroretencion = document.getElementById('numretencion').value;
      var ingreso = document.getElementById('ingresoret').value;
      var sri = document.getElementById('sriret').value;
      var serie = document.getElementById('serieret').value;
      var caduca = document.getElementById('caducaret').value;
      var totalretencion = parseFloat(document.getElementById('totalretencion').value);
      var asiento = parseFloat(document.getElementById('idasiento').value);

      datosretenciones = numeroretencion+'||'+serie+'||'+sri+'||'+ingreso+'||'+caduca+'||'+totalretencion+'||'+asiento;
      //alert(datosretenciones);

      if(numeroretencion==''){
        $('#error-content').html('Debe ingresar el numero de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(ingreso==''){
        $('#error-content').html('Debe ingresar la fecha de ingreso de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(caduca==''){
        $('#error-content').html('Debe ingresar la fecha de caducidad de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else{
        document.getElementById('datosretencion').value = datosretenciones;
        document.getElementById('datosdetalleretencion').value = datosdetalleretenciones;
        document.getElementById('tieneretencion').value = 1;
        var ajaxp=objetoAjax();
        ajaxp.open("POST", "/contabilidad/ajax/retenciones.php",true);
    	ajaxp.onreadystatechange=function() {
    		if (ajaxp.readyState==4) {
    			var respp=ajaxp.responseText;
                console.log(respp);
                location.reload(true);
    		}
    	}
    	ajaxp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	ajaxp.send("&datosretencion="+datosretenciones+"&datosdetalleretencion="+datosdetalleretenciones+"&id="+id+"&idcli="+idcli+"&tieneretencion=1&que=1");
      }
    }
}

$(document).ready(function(){
	LigarAutocomplete();
	if($('#total_1')){
		if($('#total_1').val()>0){
			console.log('Entra 1');
			CalcularSublinea($('#subsiva_1'));
		}

	}
});

function CalcularSublinea(elemento){
	var atr_id=$(elemento).attr('id');
	var partes=atr_id.split('_');
	
	var ivaaux = parseFloat(document.getElementById('ivaaux').value);
	if($('#multiple_iva').val()==1){
		var selt=$('#prodImpg_'+partes[1]);
		var opt=$(selt).find('option:selected');
		ivaaux=parseFloat(opt.attr('data-value'));
		//alert("Ana");
		$('#prodIDImpg_'+partes[1]).val(ivaaux);
	}

	var misubciva=0;
	$('.subconiva').each(function(){
		misubciva+=parseFloat($(this).val());
	});

	var misubsiva=0;
	$('.subsiniva').each(function(){
		misubsiva+=parseFloat($(this).val());
	});

	var miiva=0;
	/*$('.subconiva').each(function(){
		miiva+=parseFloat($(this).val())*ivaaux;
	});*/
    miiva = (misubciva-=parseFloat($('#secondDiscount').val()))*ivaaux;

    var misubceroiva=0;
	if($('#multiple_iva').val()==0){
		$('.subceroiva').each(function(){
			misubceroiva+=parseFloat($(this).val());
		});
	}else{
		$('.prodImpg').each(function(){
			var opt=$(this).find('option:selected');
			var ivanow=parseFloat(opt.attr('data-value'));
			var atr_idg=$(this).attr('id');
			var partesg=atr_idg.split('_');
			if(ivanow==0&$(this).val()>0){
				misubceroiva+=parseFloat($('#subciva_'+partesg[1]).val());
			}
		});
	}
	
	if(misubceroiva>0&&$('#multiple_iva').val()==1){
		misubciva=0;
	}

	var elsubcero=0;
    if($('.subceroiva').length>0){
		elsubcero=parseFloat($('#subceroiva_'+partes[1]).val());
	}
	
	var suma=parseFloat($('#subsiva_'+partes[1]).val())+(parseFloat($('#subciva_'+partes[1]).val())*(1+ivaaux))+elsubcero;
	console.log(suma);
	$('#total_'+partes[1]).val(suma.toFixed(2));
	
	$('#firstSubConIva').val(misubciva.toFixed(4));
	$('#firstSubSinIva').val(misubsiva.toFixed(4));
    $('#firstSubCeroIva').val(misubceroiva.toFixed(4));
    /*$('#finalSubConIva').val(misubciva.toFixed(4));
	$('#finalSubSinIva').val(misubsiva.toFixed(4));
    $('#finalSubCeroIva').val(misubceroiva.toFixed(4));*/
	$('#finalIVA').val(miiva.toFixed(4));
    //alert(miiva)
    //console.log($('#firstDiscount'));
    CalculateCosts($('#firstDiscount'));
    CalculateCosts($('#secondDiscount'));
    CalculateCosts($('#firstDiscountCero'));
	MisTotales();
}

function AddLineGasto(){
	var filas=$('#tablegastos tr');
	var maxfilas=1;
	for(var n=0;n<filas.length;n++){
		var miidfila=filas[n].id;
		var idfila=miidfila.split('_');
		var datafila=idfila[1];
		if(parseInt(datafila)>maxfilas)
			maxfilas=parseInt(datafila);
	}
	var lineas=parseInt(maxfilas)+1;
	var clone =$('.origLineg').clone().find('input').val('0.00').end().insertAfter('#tablegastos tr:last');
	clone.removeAttr('class');
	clone.attr('id','fila_'+lineas);
	clone.find('.cuentas').attr('id','cuenta_'+lineas);
	clone.find('.idcuentas').attr('id','idcuenta_'+lineas);
	$('#cuenta_'+lineas+",#idcuenta_"+lineas).val('');
	clone.find('.subconiva').attr('id','subciva_'+lineas);
	clone.find('.subsiniva').attr('id','subsiva_'+lineas);
    clone.find('.subceroiva').attr('id','subceroiva_'+lineas);
	clone.find('.totales').attr('id','total_'+lineas);
	clone.find('.eliminargasto').attr('id','eliminar_'+lineas);
	clone.find('.selcentroc').attr('id','centrocosto_'+lineas);
	clone.find('.prodIDImpg').attr('id','prodIDImpg_'+lineas);
	clone.find('.prodImpg').attr('id','prodImpg_'+lineas);
    //clone.find('.selcentroc').attr('value',$('#auxcentroc').val());
    $('#centrocosto_'+lineas).val($('#centrocosto_1').val());
	LigarAutocomplete();
}

function LigarAutocomplete(){
	$('.cuentas').each(function(){
		$(this).autocomplete({
			source:"subpages/contabilidad/ajaxplannew.php",
			select:function(event,ui){
				console.log(ui.item.id);
				/*$('#campocombon').attr('valorid',ui.item.id);*/
				var atr_id=$(this).attr('id');
				var partes=atr_id.split('_');
				$('#idcuenta_'+partes[1]).val(ui.item.id);
				$('#subciva_'+partes[1]).focus();
				$('#subciva_'+partes[1]).select();
			}
		});
	});
}

function MisTotales(){
	var subtotalSinIVA=parseFloat($('#firstSubSinIva').val());
	var descuento=parseFloat($('#firstDiscount').val());
	var descuento2=parseFloat($('#secondDiscount').val());
	var subtotalConIVA=parseFloat($('#firstSubConIva').val());
    var subtotalCeroIVA=parseFloat($('#firstSubCeroIva').val());
	var descuento3=parseFloat($('#firstDiscountCero').val());
	var ice=parseFloat($('#ice').val());
	var verde=parseFloat($('#impVerde').val());
	var IVA=parseFloat($('#finalIVA').val());
    var otros = $('#otros').val() == '' ? 0 : parseFloat($('#otros').val());
	console.log(ice);
	console.log(subtotalConIVA - descuento2 + 'entra 0');
	$('#finalTotal').html(parseFloat(((subtotalConIVA - descuento2) + (subtotalSinIVA - descuento) + parseFloat((subtotalCeroIVA - descuento3)) + IVA + ice + verde)+otros).toFixed(2));
}

function EliminarFilaGasto(elemento){
	var atr_id=$(elemento).attr('id');
	var partes=atr_id.split('_');
	var fila=$('#fila_'+partes[1]);
	if(parseInt(partes[1])>1){
		$(fila).remove();
	}else{
		$(fila).find("td input").each(function(){$(this).val('')});
		$(fila).find("td select").each(function(){$(this).val('0')});
		$(fila).find('.soloFloat').each(function(){$(this).val('0.00')});
	}
	CalcularSublinea($('#tablegastos .origLineg'));
}

function guardaretingreso(){
  $('.alert-danger').not('#uploaderrors').fadeOut('slow');

  var datosretenciones = '';
  var datosdetalleretenciones = '';

  var d = document.getElementById('detalleretenciones').getElementsByTagName('input');
  var cuenta = 0;
  	for ( var i = 0; i < d.length; i++ ) {
      var ww=d[i].id;
      var tiva = ww.substr(0,5);
      //alert(tiva);
      if(tiva=='idret'){
        var quien = ww.substr(5);
        var aux = parseFloat(document.getElementById('aux'+quien).value);
        var idret = parseFloat(document.getElementById('idret'+quien).value);
        var nombreret = document.getElementById('nombreret'+quien).value;
        var porcentajeret = parseFloat(document.getElementById('porcentajeret'+quien).value);
        var baseciva = parseFloat(document.getElementById('baseciva'+quien).value);
        var basesiva = parseFloat(document.getElementById('basesiva'+quien).value);

        datosdetalleretenciones += idret+'||'+nombreret+'||'+porcentajeret+'||'+baseciva+'||'+basesiva+'||'+aux+'@@';

        cuenta += 1;
      }
    }
    //alert(datosdetalleretenciones);
    if(cuenta > 0){
      var numeroretencion = document.getElementById('numretencion').value;
      var ingreso = document.getElementById('ingresoret').value;
      var sri = document.getElementById('sriret').value;
      var serie = document.getElementById('serieret').value;
      var caduca = document.getElementById('caducaret').value;
      var totalretencion = parseFloat(document.getElementById('totalretencion').value);
      var asiento = parseFloat(document.getElementById('idasiento').value);
      var idcliente = document.getElementById('idcliente').value;

      datosretenciones = numeroretencion+'||'+serie+'||'+sri+'||'+ingreso+'||'+caduca+'||'+totalretencion+'||'+asiento;
     // alert(datosretenciones);

      if(idcliente==''){
        $('#error-content').html('Debe ingresar el cliente para la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(numeroretencion==''){
        $('#error-content').html('Debe ingresar el numero de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(ingreso==''){
        $('#error-content').html('Debe ingresar la fecha de ingreso de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else if(caduca==''){
        $('#error-content').html('Debe ingresar la fecha de caducidad de la retención para poder guardar.');
		$('.alert-danger').not('#uploaderrors').slideDown();
		$('#btnguarda').prop('disabled',false);
		$("#content").scrollTop(0);
      }else{
        /*alert(datosretenciones+'**'+datosdetalleretenciones);
        return false;*/
        document.getElementById('datosretenciones').value=datosretenciones;
        document.getElementById('datosdetalleretenciones').value=datosdetalleretenciones;
        //setTimeout(function(){$('form').not('#fileform').submit(); }, 2000);

        console.log('entra al submit0');
		//$('form').not('#fileform').submit();
		var cont=0;
		var elem=$('#tablatarjetas .misabonos,#tablafacturas .misabonos');
		var tam=elem.length;
		console.log("tamaño"+tam);
		if(tam>0){
			$(elem).each(function(){
				if($(this).val()=='0.00' || parseFloat($(this).val())==0){
					$(this).parent().parent().remove();
				}else{
                  //console.log($(this).val());
				}
				if(cont==tam-1){
					//$('#formingreso').submit();
                    setTimeout(function(){ $('form').not('#fileform').submit(); },500);
                    //$('form').not('#fileform').submit();
				}
				cont++;
			});
		}else{
			//$('#formingreso').submit();
            $('form').not('#fileform').submit();
		}

      }
    }else{
		console.log('entra al submit');
		//$('form').not('#fileform').submit();
		var cont=0;
		var elem=$('#tablatarjetas .misabonos,#tablafacturas .misabonos');
		var tam=elem.length;
		console.log("tamaño:"+tam);
		if(tam>0){
			$(elem).each(function(){
				if($(this).val()=='0.00' || parseFloat($(this).val())==0){
					$(this).parent().parent().remove();
				}else{
                  //console.log($(this).val());
				}
				if(cont==tam-1){
					//$('#formingreso').submit();
                    setTimeout(function(){ $('form').not('#fileform').submit(); },500);
                    //$('form').not('#fileform').submit();
				}
				cont++;
			});
		}else{
			//$('#formingreso').submit();
            $('form').not('#fileform').submit();
		}
		
    }
}
