function editarformuladotipo(cual){
	//$('#nuevacategoria').css('display','block');
	$('#tipoparametrizar').modal('show');
	if(cual>=0){
		var bd = document.getElementById('bd').value;
		$('#popemp').html("Parametrizar por Tipo de Producto");
		$('#formuladotipo').html($('#tipo'+cual).html());
		$('#idtipo').html(cual);
		$.ajax({
		  method: "POST",
		  url: "ajax/administrador/apiparametrizar.php",
		  data: { rvpass:16, bd:bd,idtipo:cual}
		})
		  .done(function(responsetext ) {
		    //alert(responsetext);
			 $('#paralocales').html('');
			 $('#paralocales').html(responsetext);
		});
	}
}

function actualizartipo(){
  var bd = document.getElementById('bd').value;
  var idtipo = $('#idtipo').html();

  var d = document.getElementById('paralocales').getElementsByTagName('select');
      //alert(d.length);
      var locales = '';
        	for ( var i = 0; i < d.length; i++ ) {
            var ww=d[i].id;
            var loc = ww.substr(0,6);
            //alert(ww);
            if(loc=='valorx'){
              var quien = ww.substr(6);
              var activo = document.getElementById('valorx'+quien).value;
              if(activo!=''){
                var valorloc = document.getElementById('valorx'+quien).value;
                locales += quien+'//'+valorloc+'|'
              }
            }
          }

      //alert(locales);

      var dsi = document.getElementById('paralocales').getElementsByTagName('select');
      //alert(dsi.length);
      var localessi = '';
        	for ( var isi = 0; isi < dsi.length; isi++ ) {
            var wwsi=dsi[isi].id;
            var locsi = wwsi.substr(0,7);
            //alert(wwsi);
            if(locsi=='valorsi'){
              var quiensi = wwsi.substr(7);
              var activosi = document.getElementById('valorsi'+quiensi).value;
              if(activosi!=''){
                var valorlocsi = document.getElementById('valorsi'+quiensi).value;
                localessi += quiensi+'//'+valorlocsi+'|'
              }
            }
          }

      //alert(localessi);

      var dv = document.getElementById('paralocales').getElementsByTagName('select');
      //alert(dv.length);
      var localesv = '';
        	for ( var iv = 0; iv < dv.length; iv++ ) {
            var wwv=dv[iv].id;
            var locv = wwv.substr(0,6);
            //alert(wwv);
            if(locv=='valorv'){
              var quienv = wwv.substr(6);
              var activov = document.getElementById('valorv'+quienv).value;
              if(activov!=''){
                var valorlocv = document.getElementById('valorv'+quienv).value;
                localesv += quienv+'//'+valorlocv+'|'
              }
            }
          }

      //alert(localesv);

      var dco = document.getElementById('paralocales').getElementsByTagName('select');
      var localesco = '';
        	for ( var ico = 0; ico < dco.length; ico++ ) {
            var wwco=dco[ico].id;
            var locco = wwco.substr(0,7);
            //alert(wwco);
            if(locco=='valorco'){
              var quienco = wwco.substr(7);
              var activoco = document.getElementById('valorco'+quienco).value;
              if(activoco!=''){
                var valorlocco = document.getElementById('valorco'+quienco).value;
                localesco += quienco+'//'+valorlocco+'|'
              }
            }
          }

      //alert(localesco);

      var dceco = document.getElementById('paralocales').getElementsByTagName('select');
      var localesceco = '';
        	for ( var iceco = 0; iceco < dceco.length; iceco++ ) {
            var wwceco=dceco[iceco].id;
            var locceco = wwceco.substr(0,9);
            //alert(wwceco);
            if(locceco=='valorceco'){
              var quienceco = wwceco.substr(9);
              var activoceco = document.getElementById('valorceco'+quienceco).value;
              if(activoceco!=''){
                var valorlocceco = document.getElementById('valorceco'+quienceco).value;
                localesceco += quienceco+'//'+valorlocceco+'|'
              }
            }
          }

      //alert(localesceco);

	$.ajax({
		  method: "POST",
		  url: "ajax/administrador/apiparametrizar.php",
		  data: { rvpass:17, bd:bd,idtipo:idtipo,datos:locales,datossi:localessi,datosc:localesv,datosco:localesco,datosceco:localesceco}
	})
	.done(function(responsetext) {
        $('#tipoparametrizar').modal('hide');
		$('#paralocales').html("<tr><td style='text-align:center;'><img src='gfx/loader.gif' width='40px'/></td></tr>");
	});
}

function Cargar(cual){
	if(cual==1)
		$('#tableeventos').html("<tr><td style='text-align:center;'>Cargando...<br/><img src='gfx/loader.gif' width='40px'/></td></tr>");
	if(cual==2)
		$('#contentretenciones').html("<div style='text-align:center;'>Cargando...<br/><img src='gfx/loader.gif' width='40px'/></div>");
	if(cual==3)
		$('#contentfacturacion').html("<div style='text-align:center;'>Cargando...<br/><img src='gfx/loader.gif' width='40px'/></div>");
	/*if(cual==4)
		$('#contentcentrodecostos').html("<div style='text-align:center;'>Cargando...<br/><img src='gfx/loader.gif' width='40px'/></div>");*/
	$.ajax({
		  method: "POST",
		  url: "ajax/administrador/cargarparametrizar.php",
		  data: {que:cual}
	})
	.done(function(response) {
        if(cual==1){
			$('#tableeventos').html(response);
		}
		if(cual==2){
		  //alert(response);
			$('#contentretenciones').html(response);
		}

		if(cual==3){
			$('#contentfacturacion').html(response);
			//console.log("readuy");
			var abonoabajo=$('#cuentaabonosabajo').val();
			if(abonoabajo>0){
				$('#contabilizaabono').prop('checked',true);
			}else{
				$('#contabilizaabono').prop('checked',false);
			}
		}

	});
}

function parametrizaevento(cual){
  var bd = document.getElementById('bd').value;
  var cuenta = document.getElementById('cuentaevento'+cual).value;
  //alert(cual+'**'+bd+'**'+cuenta);

	$.ajax({
		method: "POST",
		url: "ajax/administrador/apiparametrizar.php",
		data: { rvpass:18, bd:bd,idevento:cual,cuenta:cuenta}
	}).done(function(response) {
		console.log(response);
		if(response=="ok"){
			$('#cuentaevento'+cual).effect();
		}
	});
}

function GuardarRetenciones(){
	$("#btnguardarret").html('Guardando...');
	var form=$('#formretenciones');
	$.ajax({
		method: "POST",
		url: "ajax/administrador/apiparametrizar.php",
		data: form.serialize()
	}).done(function(response) {
		console.log(response);
		if(response=="OK"){
			$("#btnguardarret").html('Guardar');
		}
	});
}

function GuardarFacturacion(){
	$('#btnguardafact').html("Guardando....");
	var cont=0;
	var cadena='';
	var cadenacards='';
	var cadenaotras='';
	var bd = document.getElementById('bd').value;
	$('.cajasventa').each(function(){
		//if($(this).val()>0){
			if(cont>0)
				cadena+='@';
			cadena+=$(this).attr('id')+"_"+$(this).val();
			cont++;
		//}
	});

	cont=0;
	$('.cards').each(function(){
		//if($(this).val()>0){
			if(cont>0)
				cadenacards+='@';
			cadenacards+=$(this).attr('id')+"_"+$(this).val();
			cont++;
		//}
	});

	cont=0;
	$('.otras').each(function(){
		//if($(this).val()>0){
			if(cont>0)
				cadenaotras+='@';
			cadenaotras+=$(this).attr('id')+"_"+$(this).val();
			cont++;
		//}
	});

	var contab=0;
	if($('#contabilizaabono').is(':checked')){
		contab=1;
	}

	var cadenaabono=contab+"|"+$('#cuentaabonosabajo').val();

	var miiva=14;
	$('.micheck').each(function(){
		if($(this).is(':checked')){
			miiva=$(this).val();
		}
	});
	miiva=document.getElementById("eliva").value;
	//console.log('ips'+miiva);



	var vextranjero='false';
	if($('#vextranjero').is(':checked')){
		vextranjero='true';
	}

	$.ajax({
		  method:"POST",
		  url: "ajax/administrador/apiparametrizar.php",
		  data: { rvpass:21,cajaventas:cadena,bd:bd,tarjetas:cadenacards,otras:cadenaotras,cuentaiva:$('#cuentaiva').val(),cuentaser:$('#cuentaser').val(),cuentaprop:$('#cuentaprop').val(),contabonos:cadenaabono,valoriva:miiva,ventasextranjero:vextranjero,cuentaivacomp:$('#cuentaivacomp').val(),cuentaiceven:$('#cuentaiceven').val(), cuentaicecom:$('#cuentaicecom').val()}
	}).done(function(response) {
	    //console.log(response);
		if(response=='OK')
			$('#btnguardafact').html("Guardar");


	});
}

function GuardarCentrodeCosto(){
	var bd = document.getElementById('bd').value;
	var nombre = document.getElementById('nombreCentrodeCosto').value;
	var id = document.getElementById('idcc').value;
	$.ajax({
		  method: "POST",
		  url: "ajax/administrador/editcentrocosto.php",
		  data: { action:2, bd:bd,id:id, centrocosto:nombre }
		})
		  .done(function(responsetext ) {
		    alert(responsetext);
			location.reload();
		});
}

function NuevoCentrodeCosto(){
	var bd = document.getElementById('bd').value;
	var nombre = document.getElementById('centrocostoName').value;
	$.ajax({
		  method: "POST",
		  url: "ajax/administrador/editcentrocosto.php",
		  data: { action:2, bd:bd,centrocosto:nombre }
		})
		  .done(function(responsetext ) {
		    alert(responsetext);
			location.reload();
		});
}

function editarcentrodecosto(id){
	$('#centrocostoModal').modal('show');
	var bd = document.getElementById('bd').value;
	//var nombre = document.getElementById('centrocostoName').value;
	$.ajax({
	  method: "POST",
	  url: "ajax/administrador/editcentrocosto.php",
	  data: { action:1,bd:bd,id:id }
	})
	  .done(function(responsetext ) {
		var result=jQuery.parseJSON(responsetext);
	    document.getElementById('nombreCentrodeCosto').value=result.centrocosto;
		document.getElementById('idcc').value=result.id;
		console.log(result);
	});
}

function editarRenta(id){
	$('#tablarentaModal input').css('border', 'gray solid 1px');
	$('#tablarentaModal').modal('show');
	var bd = document.getElementById('bd').value;
	//var nombre = document.getElementById('centrocostoName').value;
	$.ajax({
	  method: "POST",
	  url: "ajax/administrador/editrenta.php",
	  data: { action:'Show',bd:bd,id:id }
	})
	  .done(function(responsetext ) {
		var result=jQuery.parseJSON(responsetext);
	    document.getElementById('parametro').value=result.parametro;
		document.getElementById('idrenta').value=result.id;
		document.getElementById('valor').value=result.valor;
		document.getElementById('desde').value=result.desde;
		document.getElementById('hasta').value=result.hasta;
		document.getElementById('porcentaje').value=result.porcentaje;
		document.getElementById('anio').value=result.anio;
		if(!result.es_base.localeCompare('t'))
		{
			document.getElementById('es_base').checked=true;
		}
		else{
			document.getElementById('es_base').checked=false;
		}
		console.log(result);
	});
}

function GuardarRenta(){
	var bd = document.getElementById('bd').value;
	var id = document.getElementById('idrenta').value;
	//var nombre = document.getElementById('centrocostoName').value;
	var fields=true;
	$('#tablarentaModal input').each(function() {
		if ($(this).val() != '') {
			console.log('all inputs filled');
		}
		else{
			console.log('theres an empty input');
			console.log(this.name);
			$(this).css("border", "red solid 1px");
			if(this.name!='es_base'){
				fields=false;
			}
		}
	});
	if(fields){
		$.ajax({
		  method: "POST",
		  url: "ajax/administrador/editrenta.php",
		  data: $('#rentaForm').serialize() + "&action=Edit&bd="+bd+"&id="+id
		})
		  .done(function(responsetext ) {
			//console.log(responsetext);
			alert(responsetext);
			location.reload();
		});
	}
	else{
		alert("Ingrese toda la información");
	}

}
