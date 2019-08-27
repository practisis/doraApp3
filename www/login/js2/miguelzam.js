/* FUNCION PARA GUARDAR LOS DATOS DEL CLIENTE MODAL nubepost.php*/

function GuardarDatosClientes() {
	var cedulaCliente = $('#cedulaCliente').val();
	var nombreCliente = $('#nombreCliente').val();
	var emailCliente = $('#emailCliente').val();
	var direccionCliente = $('#direccionCliente').val();
	var telefonoCliente = $('#telefonoCliente').val();
	var busqueda = document.getElementById('buscarCliente');

	if (cedulaCliente == '') {
		alert('Debe ingresar la cedula del cliente.');
	} else if (nombreCliente == '') {
		alert('Debe ingresar el nombre del cliente.');
	} else {
		var apiURL = 'ajax/pdv/consultas.php';
		$.post(apiURL, {
			action: 'GuardarDatosClientes',
			"cedulaCliente": cedulaCliente,
			"nombreCliente": nombreCliente,
			"emailCliente": emailCliente,
			"direccionCliente": direccionCliente,
			"telefonoCliente": telefonoCliente

		}).done(function (response) {

			console.log(response);
			var res = response.split("||");
			if (res[0] == 'ok') {
				busqueda.value = cedulaCliente + " - " + nombreCliente;
				$("#DatosCliente").modal("hide");
				document.getElementById("botonAlerta").style.display = "none";
			} else {
				alert('Hubo un error y el cliente no fue registrado.\nVuelve a intentarlo.');
			}

		}).fail(function () {});
	}

}
/* FUNCION PARA GUARDAR LOS DATOS DEL CLIENTE MODAL nubepost.php*/

/* FUNCION PARA BUSCAR DATOS DEL CLIENTE input nubepost.php*/

$(function () {
	$("#buscarCliente").keyup(function () {
		document.getElementById("livesearch").style.display = "block";
		$("#livesearch").html("")
		if ($(this).val() != "") {
			var datos = $.param({
				"cliente": $(this).val()
			});
			$.ajax({
				type: "POST",
				url: "ajax/pdv/buscador.php",
				data: datos,
				statusCode: {
					404: function () {
						console.log("Ups! ha ocurrido un inconveniente, function");
					}
				}
			}).done(function (resp) {
				json = jQuery.parseJSON(resp);
				if (json != "") {
					for (var i = 0; i < json.length; i++) {
						$("#livesearch").append(`<div class="resultBuscarCliente" attrData="` + json[i].ced + `,` + json[i].nom + `,` + json[i].ape + `,` + json[i].email + `,` + json[i].dire + `,` + json[i].telf + `">` + json[i].ced + ` - ` + json[i].nom + ` ` + json[i].ape + `</div>`)
					}

				} else {
					$("#livesearch").html("<div id='botonAlerta' class='alert alert-info'><strong>No se encontraron resultados, desea crear un nuevo cliente<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#DatosCliente'>Crear Cliente</button></strong></div>")
				}

			});
		}
	})
});

/* FUNCION PARA BUSCAR DATOS DEL CLIENTE input nubepost.php*/


/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE nubepost.php 

FUNCION NUEVA QUE CAMBIA EL VALOR DEL INPUT BUSCAR

*/

$(document).ready(function () {
	$(document).on("click", ".resultBuscarCliente", function () {
		document.getElementById("livesearch").style.display = "none";
		var data = $(this).attr("attrData");
		var data2 = data.split(",");
		$('#buscarCliente').val(data2[0] + " - " + data2[1] + " " + data2[2]);
		$('#cedula').val(data2[0]);
		$('#idCliente').val(data2[0]);
		//console.log(data.split(","))
	});
});

/* FUNCION VIEJA QUE LLENA EL MODAL 

$(document).ready(function(){
    $(document).on("click","#BotonBusCliente",function(){
		$('#DatosClienteBuscador').modal('show');
    	var data = $(this).attr("attrData");
    	console.log(data);
    	var data2 = data.split(",");
 		$('#cedulaClienteB').val(data2[0]);
 		$('#nombreClienteB').val(data2[1]+" "+data2[2]);
 		$('#emailClienteB').val(data2[3]);
 		$('#direccionClienteB').val(data2[4]);
 		$('#telefonoClienteB').val(data2[5]);

    	//console.log(data.split(","))
    });
});

/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE nubepost.php*/

/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE al crear un nuevo cliente nubepost.php*/

function reemplazarDatosCliente() {
	variable = document.getElementById("buscarCliente").value

	numero = isNaN(variable)

	if (numero == true) {


		document.getElementById("nombreCliente").value = document.getElementById("buscarCliente").value

	} else {


		document.getElementById("cedulaCliente").value = document.getElementById("buscarCliente").value

	};


}

/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE al crear un nuevo cliente nubepost.php*/

/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE al crear un nuevo cliente nubepost.php*/

function reemplazarDatosSerial() {
	variable = document.getElementById("buscarCliente").value

	numero = isNaN(variable)

	if (numero == true) {


		document.getElementById("nombreCliente").value = document.getElementById("buscarCliente").value

	} else {


		document.getElementById("cedulaCliente").value = document.getElementById("buscarCliente").value

	};


}

/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE al crear un nuevo cliente nubepost.php*/


function actualizarDatosFactura() {
	$('#DatosFactura').modal('hide');


	var facturaserie = document.getElementById("serieFactura").value;
	var facturanum = document.getElementById("FacturaN").value;
	var fechadesde = document.getElementById("fechadesde").value;



	document.getElementById("nombre").value = "#" + facturanum + "-" + facturaserie + "   |   " + fechadesde;

}

/* FUNCION PARA LLENAR LOS DATOS DEL MODAL CLIENTE al crear un nuevo cliente nubepost.php*/

/* FUNCION PARA LIMPIAR LOS DATOS DEL MODAL nubepost.php*/

function LimpiarCampos() {
	$('#DatosCliente').modal('hide');
	$('#DatosFactura').modal('hide');
	document.getElementById("cedulaCliente").value = ""
	document.getElementById("nombreCliente").value = ""
	document.getElementById("emailCliente").value = ""
	document.getElementById("direccionCliente").value = ""
	document.getElementById("telefonoCliente").value = ""
}

/* FUNCION PARA LIMPIAR LOS DATOS DEL MODAL nubepost.php*/

/* FUNCION PARA SUMAR LOS VALORES DE LA FACTURA */
$(document).ready(function () {

	// CalcularSubTotal();
	// CalcularIVA();
	// CalcularTotal();

});


/*function CalcularSubTotal() {

document.querySelectorAll('.SubTotal').forEach(function (total) {


            var suma = 0;
            document.querySelectorAll('.ColumSubTotal').forEach(function (celda) {
                var valor = parseFloat(celda.innerHTML);
                suma += valor;
            });
            total.innerHTML = suma.toFixed(2);
            document.getElementById("facSubTotalFacturacion").value = suma;
    });
}
*/
function CalcularIVA() {

	document.querySelectorAll('.IVA').forEach(function (total) {

		var suma = 0;
		document.querySelectorAll('.ColumIVA').forEach(function (celda) {
			var valor = parseFloat(celda.innerHTML);
			suma += valor;
		});
		total.innerHTML = suma.toFixed(2);
		document.getElementById("ivaFacturacionspan").value = suma;

	});

}


function CalcularTotal() {

	var SubTotal = document.getElementById("facSubTotalFacturacion").value;
	var IVA = document.getElementById("ivaFacturacionspan").value;
	var Total = document.getElementById("totalTablaFactura").value = parseFloat(SubTotal) + parseFloat(IVA);
	Total = Total || 0.00
	totalTablaFactura.innerHTML = Total;

	document.getElementById("total").value = document.getElementById("totalTablaFactura").value;

}

/* FUNCION PARA SUMAR LOS VALORES DE LA FACTURA */


function BotonGuardar() {
	var NuevoBoton = "<button class='btn btn-success btn-md btnTablaFacturar guardarfac' id='Prueba' onclick='GuardarFactura();'>Guardar</button>";

	document.getElementById('Prueba').innerHTML = NuevoBoton;

}

function BotonFacturar() {

	var NuevoBoton = "<button class='btn btn-info btn-md btnTablaFacturar' id='Prueba' onclick='enviafactura();'>Facturar</button>";

	document.getElementById('Prueba').innerHTML = NuevoBoton;

}
 

function GuardarFactura() {
	var idCliente = $("#idclienteHidden").val();
	console.log(idCliente);
	$(".textCantidadProd").each(function (val, key) {
		//console.log("sefguro"+idCliente);
		var i = $(this),
			val = i.attr("attrPrecio"),
			iva = i.attr("attrIva"),
			tipo = i.attr("attrTitle"),
			idform = attr("attrTitle"),
			cant = i.val();
		console.log(val, " ", iva, " ", tipo, " ", cant)

		var apiURL = 'ajax/pdv/consultas.php';
		$.post(apiURL, {
			action: 'GuardarMontosMesa',
			"producto_his": tipo,
			"precio_his": val,
			"cantidad": cant,
			"porcentaje_impuestos": iva,
			"idCliente": idCliente,
			"idformulado": idform

		}).done(function (response) {

			location.href = "http://127.0.0.1/prometeo-master-PROM-67/index.php?modulo=mesas";

			console.log(response);
			var res = response.split("||");
			if (res[0] == 'ok') {
				console.log("registro");
			} else {
				alert('Hubo un error y el cliente no fue registrado.\nVuelve a intentarlo.');
			}

		}).fail(function () {});


	});
}