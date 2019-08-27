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
function verfechaconciliacion(){
  var ver = document.getElementById('verfecha').checked;
  //alert(ver);
  if(ver==true){
    $('#verfechaconciliacion').fadeIn('slow');
  }else{
    $('#verfechaconciliacion').fadeOut('slow');
  }

}
function concilia(diario){
  var estado = document.getElementById('conciliar'+diario).checked;
  var fechad = document.getElementById('fechad').value;
  var fechah = document.getElementById('fechah').value;
  var fechaco = document.getElementById('fechacaonciliacion').value;
  var quefecha = document.getElementById('verfecha').checked;
  //alert(fechad+'**'+fechah+'**'+fechaco+'**'+quefecha);
  var ajaxconciliacion=objetoAjax();
        ajaxconciliacion.open("POST", "/contabilidad/ajax/contabilidad/bancos.php",true);
    	ajaxconciliacion.onreadystatechange=function() {
    		if (ajaxconciliacion.readyState==4) {
    			var respp=ajaxconciliacion.responseText;
                //alert(respp);
                var res = respp.split("|");
                if(res[0]=='ok'){
                  if(res[1]==1){
                    document.getElementById('ln'+diario).style.backgroundColor='#FFE0C0';
                    document.getElementById('con'+diario).innerHTML='Conciliado';
                  }else if(res[1]==2){
                    document.getElementById('ln'+diario).style.backgroundColor='#FF0000';
                    document.getElementById('con'+diario).innerHTML='Posfechado';
                  }else if(res[1]==0){
                    document.getElementById('ln'+diario).style.backgroundColor='#FFFFFF';
                    document.getElementById('con'+diario).innerHTML='Pendiente';
                  }

                  document.getElementById('fechacon'+diario).innerHTML=fechah;

                  document.getElementById('deposistoscuadrados').value=res[2];
                  document.getElementById('chequespagados').value=res[3];
                  document.getElementById('deposistoscuadradospost').value=res[4];
                  document.getElementById('chequespagadospost').value=res[5];
                  document.getElementById('deposistosentransito').value=res[6];
                  document.getElementById('chequespendientes').value=res[7];

                  document.getElementById('saldobancario').value=res[2]-res[3];
                  document.getElementById('saldobancariopost').value=res[9];
                  document.getElementById('saldopendiente').value=res[6]-res[7];

                  document.getElementById('saldolibro').value=res[10];
                  document.getElementById('depositoentra').value=res[6];
                  document.getElementById('chegirados').value=res[7];
                  document.getElementById('saldobanco').value=res[11];
                  //alert(res[11]);

                }
    		}
    	}
    	ajaxconciliacion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	ajaxconciliacion.send("&que=1&estado="+estado+"&diario="+diario+"&fechad="+fechad+"&fechah="+fechah+"&fechaco="+fechaco+"&quefecha="+quefecha);
}
$('#fechah').datepicker({
  showAnim: 'slideDown',
  showOtherMonths: true,
  dateFormat: 'yy-mm-dd',
  dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  maxDate: '+0d',
  changeMonth: true,
  changeYear: true
});
$('#fechad').datepicker({
  showAnim: 'slideDown',
  showOtherMonths: true,
  dateFormat: 'yy-mm-dd',
  dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  maxDate: '+0d',
  changeMonth: true,
  changeYear: true
});
$('#fechacaonciliacion').datepicker({
  showAnim: 'slideDown',
  showOtherMonths: true,
  dateFormat: 'yy-mm-dd',
  dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  maxDate: '+0d',
  changeMonth: true,
  changeYear: true
});


function ImprimirConciliacion(){
	var cuenta=$('#cuenta').val();
	var fechad=$('#fechad').val();
	var fechah=$('#fechah').val();
	var cuentanom=$("#cuenta option:selected").text();
	if(fechad&&fechah)
	 window.open("template/exceltemplates/printtemplate.php?tipo_imp=5&idcont="+cuenta+"&fechad="+fechad+"&fechah="+fechah+"&nomcuenta="+cuentanom);
}
function ExcelConciliacion(){
	var cuenta=$('#cuenta').val();
	var fechad=$('#fechad').val();
	var fechah=$('#fechah').val();
	var cuentanom=$("#cuenta option:selected").text();
	if(fechad&&fechah)
	 window.open("template/exceltemplates/downloadExcelReporteBancos.php?tipo_imp=5&idcont="+cuenta+"&fechad="+fechad+"&fechah="+fechah+"&nomcuenta="+cuentanom);
}
function PDFConciliacion(){
	var cuenta=$('#cuenta').val();
	var fechad=$('#fechad').val();
	var fechah=$('#fechah').val();
	var cuentanom=$("#cuenta option:selected").text();
	if(fechad&&fechah)
	 //window.open("template/exceltemplates/printtemplatepdf.php?tipo_imp=5&idcont="+cuenta+"&fechad="+fechad+"&fechah="+fechah+"&nomcuenta="+cuentanom);
     window.open("https://www.practisis.net/contabilidad/template/exceltemplates/pdfconciliacion.php?tipo_imp=5&idcont=164&fechad=2017-01-01&fechah=2017-01-31&nomcuenta=1.311.02.02.01%20Pacific%20%20National%20Bank");
}