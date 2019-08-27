function paso(paso) {
  var menues = $('.paso');

  // manejador de click sobre todos los elementos

  // eliminamos active de todos los elementos
  menues.removeClass('active');
  // activamos el elemento clicado.
  $('.' + paso).addClass('active');
}

function mesaaux(act) {


  var esmesa = $(act).attr('data-esmesa');
  var activo = $(act).attr('data-activo');

  var id_mesas = $(act).attr('data-value');
  var mesaaux = '#mesaaux' + id_mesas;

  ///solo mostrar modal si el objeto es una mesa y si esta activo
  if ($(mesaaux).hasClass("activo")) {

    if (esmesa) {

      $('#modal-success').modal('show');

      $('#mesaselect').val(id_mesas);
      localStorage.setItem('idmesas', id_mesas);
      var parametros = {
        id_mesas: id_mesas,
        mexaaux: 'mexaaux'
      };
      jQuery
        .ajax({
          url: 'class/Contposmesas.php',
          type: 'POST',
          dataType: 'json',
          data: parametros
        })
        .done(function (respuesta) {
          console.log(respuesta);
          $('#modalauxin').val(respuesta.numeromesaaux);
        })
        .fail(function (resp) {
          console.log(resp);
        });
    }
  }
}

function agregarmesaaux() {
  var nrmesas = $('#touch2').val();

  var id_mesas =localStorage.getItem("idmesas")
  // $('#mesaselect').val();
  //numeromesaaux
  var parametros = {
    id_mesas: id_mesas,
    updmesas: 'updmesas',
    numeromesaaux: nrmesas
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'json',
      data: parametros
    })
    .done(function (respuesta) {
      console.log(respuesta)
      alertify.success('añadiste ' + nrmesas + ' Mesas Auxiliares');

      window.setTimeout(function () {
        //$(location).attr('href', '?modulo=facturacion&mesaid=' + id_mesas);
     $('#irpaso1').click();
      }, 1000);
      $('#modalauxin').val(nrmesas); 

      $('#mesaselect').val('');
    })
    .fail(function (resp) {
      console.log(resp);
    });

  // window.location.href = '?modulo=facturacion&mesaid=' + id_mesas + '';

  $('#modal-success').modal('hide');
  return false;
}

function displaymesa(act,paso) {
  var menues = $('.paso');

  // manejador de click sobre todos los elementos

  // eliminamos active de todos los elementos
  $('.paso').removeClass('active');
  // activamos el elemento clicado.
  $('.' + paso).addClass('active');

  if (act == 1) {


    $("#fondorow").removeClass('bg-mesas');
    $("#fondorow").addClass('bg-cambio');
    $("#fondorow").removeClass('bg-auxiliar');
    $("#fondorow").removeClass('bg-pedidos');
    $('#contenedor').css('display', 'none');

    $('#contenedor3').css('display', 'none');
    $('#contenedor4').css('display', 'none');
    $('#contenedor2').css('display', 'block');
    $('.titleHeader').text('Cambiar Mesas');
    $("#fondorow").removeClass('bg-cambio');

       // fondo mesas black
       $(".bordermesas").addClass('bgblack');
       removerfondos();
       //**************** */

  } else if (act == 2) {
    $('.titleHeader').text('Mesas');

    $("#fondorow").removeClass('bg-cambio');
    $("#fondorow").removeClass('bg-auxiliar');
    $("#fondorow").removeClass('bg-pedidos');
    $("#fondorow").addClass('bg-mesas');

    $('#contenedor2').css('display', 'none');
    $('#contenedor3').css('display', 'none');
    $('#contenedor4').css('display', 'none');
    $('#contenedor').css('display', 'block');

    $(".bordermesas").removeClass('bgblack');
    removerfondos();
    selectfondomesa();

  } else if (act == 3) {
    $("#fondorow").removeClass('bg-mesas');
    $("#fondorow").removeClass('bg-cambio');
    $("#fondorow").removeClass('bg-pedidos');
    $("#fondorow").addClass('bg-auxiliar');
    
    // fondo mesas black
    $(".bordermesas").addClass('bgblack');
    removerfondos();
    //**************** */
    $('.titleHeader').text('Mesas Auxiliares');

    $('#contenedor').css('display', 'none');
    $('#contenedor2').css('display', 'none');
    $('#contenedor4').css('display', 'none');
    $('#contenedor3').css('display', 'block');


  } else if (act == 4) {
    alertify.success('Escoge la mesa de donde vas a enviar productos');

    $('.titleHeader').text('Transferir Pedidos');

    $("#fondorow").removeClass('bg-mesas');
    $("#fondorow").removeClass('bg-cambio');
    $("#fondorow").removeClass('bg-auxiliar');
    $("#fondorow").addClass('bg-pedidos');

    $('#contenedor').css('display', 'none');
    $('#contenedor3').css('display', 'none');
    $('#contenedor2').css('display', 'none');
    $('#contenedor4').css('display', 'block');

       // fondo mesas black
       $(".bordermesas").addClass('bgblack');
       removerfondos();
       //**************** */
  }

}

function cambiarmesa(boton) {
  var esmesa = $(boton).attr('data-esmesa');

  ///solo mostrar modal si el objeto es una mesa
  if (esmesa === "true") {
    var valorin = $('#valorac').val();

    if (typeof valorin == 'undefined' || valorin === null || valorin === '') {
      var valor = $(boton).attr('data-value');
      var nombre = $(boton).attr('data-nombre');
      var mesa = '#mesacam' + valor;


      if ($(mesa).hasClass("activo")) {
        //alert("SE SELECCIONA LA MESA "+valor);
        $('#valorac').val(valor);
        $("#nombreMesaCambio").val(nombre);

        $(mesa).removeClass('fondoselec');
        $(mesa).addClass('fondoselect');


        //cambia css
      } else {
        alertify.warning('Seleccione una mesa Activa');

      }
    } else {
      var valor = $(boton).attr('data-value');
      var nombre = $(boton).attr('data-nombre');
      if (valorin == valor) {
        // alert("SELECCIONO LA MISMA MESA");
      } else {


        var valormesa = $('#valorac').val();
        var nombre2 = $("#nombreMesaCambio").val();
        var mesa2 = 'mesacam' + valormesa;
        var mesa = 'mesacam' + valor;


        if ($('#' + mesa).hasClass("activo")) {

          alertify.error('Esta mesa ya está ocupada');


        } else {


          $('#modal-info').modal('show');
          // alert("SE CAMBIA LA MESA "+valormesa+"  POR LA MESA "+valor);
          $('#nmesamodal2').val(valor);
          $('#nmesamodaln').val(valormesa);
          $('#nmesamodal2Visual').val(nombre);
          $('#nmesamodalnVisual').val(nombre2);

          var totalperm = '#totalperm' + valor;

          //cambia css
          $(mesa2).removeClass('fondoselec');
          $(mesa).removeClass('fondoreset');
          $(mesa).addClass('fondo');
          $(mesa).addClass('activo');
          //$('#' + mesa).css('background', '#13599b');
          //$('#' + mesa2).css('background', '#e2ecf6');

          $('#valorac').val('');

        }
      }
    }
  }
}

//funcion de seleccion de mesa

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion   Seleccionar Mesa                                 //
///////////////////////////////////////////////////////////////////////////////////
function selectmesa(boton) {

  var esmesa = $(boton).attr('data-esmesa');

  ///solo mostrar modal si el objeto es una mesa
  if (esmesa === "true") {
    var name = $(boton).attr('data-nombre');
    var valor = $(boton).attr('data-value');
    $('#nmesamodal').val(valor);
    $("#nameMesaModal").val(name)
    var mesa = '#mesae' + valor;
    var txtmesa = '#txtmesas' + valor;
    $(txtmesa).css('color', '#ffff');

    //cambia css
    $(mesa).addClass('fondoselec');

    ////////////////////////////////////// Darle valor al input para mandarlo a nubepost

    //alert(valor);
    ////////////////////////////////////// Darle valor al input para mandarlo a nubepost

    //console.log($(mesa).hasClass("activo"));
    if ($(mesa).hasClass("activo")) {
      $("#mesaid").val(valor);
      getmesasauxcountrow(valor, function (errorLanzado, idcomandar) {
        if (idcomandar > 0) {
          getmesasaux(valor,'mesa','principal');
          $('#modal-mesa').modal('show');
        }else{
          $("#auxiliar").val("normal");
          $("#eviarMesa").click();
        }
      });
    }else if(!$(mesa).hasClass("activo")){
      $("#mesaid").val(valor);
      getmesasauxcountrow(valor, function (errorLanzado, idcomandar) {
        if (idcomandar > 0) {
          $(mesa).removeClass('fondoselec');
          $(mesa).removeClass('fondoreset');
          $(mesa).addClass('fondoselect');
          getmesasaux(valor,'mesa','principal');
          $('#modal-mesa').modal('show');
        }else{
          $('#modal-base').modal('show');
        }
      });
    }
  }
}

//funcion cambiar mesa

//funcion asignar persona

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion   Asignar Persona Mesa                              //
///////////////////////////////////////////////////////////////////////////////////
function asignarPersona() {
  idmesa = $('#nmesamodal').val();
  var mesa = 'mesa' + idmesa;

  var totalperm = '#totalperm' + idmesa;

  var valorp = $('#touch').val();
  var addmesa = 'true';
  var idmesas = $('#nmesamodal').val();

  //esta funcion inserta en la BD
  addmesas(idmesas, valorp, addmesa, 1);
  //window.setTimeout(function () {
   // consultarmesas();
  //}, 500);

  //se oculta el modal
  $('#modal-base').modal('hide');
  var mesase = '#mesae' + idmesa;

  $(mesase).addClass('fondo');

  // se asigna valor al input
  $(totalperm).val(valorp);
  //se cambian css del total pers
  var tperm0 = '.tperm' + idmesa;
  //$(tperm0).css('display', 'block');
  $('#touch').val('2');
  $("#mesaid").val(idmesa);
  $("#auxiliar").val("normal");
 // $("#eviarMesa").click();

}

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion   Cancelar Mesa                                   //
////////////////////////////////////////////////////// ///////////////////////////
function mesacancelar(boton) {
  idmesa = $('#nmesamodal').val();
  var mesa = 'mesae' + idmesa;
  //console.log(mesa);
  //$('#' + mesa).css('background', '#e2ecf6');

  $('#' + mesa).removeClass('fondoselect');

  $(mesa).addClass('fondoselec');


  var tperm0 = '.tperm' + idmesa;
  $(tperm0).css('display', 'none');
}

function mesacancelarcambio(boton) {
  var idmesa = $('#nmesamodal2').val();
  var mesa = '#mesacam' + idmesa;
  var idmesa2 = $('#nmesamodaln').val();
  var mesa2 = '#mesacam' + idmesa2;
  $(mesa2).removeClass('fondoselect');
  $(mesa).removeClass('fondoselect');
  $(mesa2).addClass('fondoselec');
  $(mesa).addClass('fondoselec');
  //$('#' + mesa).css('background', '#e2ecf6');

  //$('#' + mesa2).css('background', '#e2ecf6');
  var tperm0 = '.tperm' + idmesa;
  $(tperm0).css('display', 'none');
}

// Initialize Bootstrap TouchSpin
$(function () {
  $('input[name="touchspin-1"]').TouchSpin();
  $('input[name="touchspin-2"]').TouchSpin({
    min: 1,
    max: 20,
    step: 0.1,
    decimals: 0,
    boostat: 5,
    maxboostedstep: 10,
    postfix: '%'
  });
  $('input[name="touchspin-3"]').TouchSpin({
    verticalbuttons: true
  });
  $('input[name="touchspin-4"]').TouchSpin({
    verticalbuttons: true,
    prefix: '$'
  });
  $('input[name="touchspin-5"], input[name="touchspin-7"]').TouchSpin();
  $('input[name="touchspin-6"], input[name="touchspin-8"]').TouchSpin({
    verticalbuttons: true
  });
});
// \\ Bootstrap TouchSpin

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion  Agregar  Mesa  A la BD                            //
////////////////////////////////////////////////////// ///////////////////////////

function addmesas(id_mesas, numpersonas, addmesa, inicia=0) {
  var parametros = {
    id_mesas: id_mesas,
    numpersonas: numpersonas,
    addmesa: addmesa
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',

      data: parametros
    })
    .done(function (respuesta) {
      console.log(respuesta);
	  if (inicia==1){
		consultarmesas();
		$("#eviarMesa").click();
	  }
    })
    .fail(function (resp) {
      console.log(resp);
    });
}

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion CAMBIAR M Mesa  EN la BD                            //
////////////////////////////////////////////////////// ///////////////////////////
function actualizacambio(boton) {
  var valor = $('#nmesamodal2').val();

  var valor2 = $('#nmesamodaln').val();
  var totalperm = '#totalperm' + valor;
  var valorp = $(totalperm).val();
  var addmesa = 'true';

  console.log(valor);
  //esta funcion inserta en la BD
  addmesas(valor, 2, addmesa);
  transferirConsumos(valor, valor2);
  var mesa = '#mesacam' + valor;
  var mesa2 = '#mesacam' + valor2;
  //cambia css
  $(mesa).removeClass('fondoselect');
  $(mesa2).removeClass('fondoselect');
  $(mesa).addClass('fondo');
  //$('#' + mesa).css('background', '#13599b');
  $('#modal-info').modal('hide');

  console.log('se actualiza ' + valor2);
  var parametros = {
    id_mesas: valor2,

    cambiarmesa: 'cambiarmesa'
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'JSON',
      data: parametros
    })
    .done(function (respuesta) {
      console.log(respuesta);
      alertify.success('Se  Realizó el cambio de Mesa Exitosamente');


      consultarmesas();
      window.setTimeout(function () {
     $('#irpaso1').click();
      }, 1000);

    })
    .fail(function (resp) {
      alertify.error('Ocurrio un Error .');
      location.reload();
      console.log(resp);

      console.log(resp.responseText);
    });
}

//consultarmesas();

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion  Consultar Mesa  A la BD                            //
////////////////////////////////////////////////////// ///////////////////////////
function consultarmesas() {
  consulta = 'true';
  var parametros = {
    consultam: consulta
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'JSON',
      data: parametros
    })
    .done(function (data) {
      var arraym = [];
      $('#frmDatos').find(':input').each(function () {
        var input = this;
        var nuvin = input.id.replace('totalperm', '');
        //arraym.push(nuvin);
        $('.tperm' + nuvin).val(0);
        //$('.tperm' + nuvin).css('display', 'none');
        $('#tpermcam' + nuvin).val(0);
        $('#tpermcam' + nuvin).css('display', 'none');
        var mesaD = '#mesad' + nuvin;
        var mesa = '#mesae' + nuvin;
        var mesasel = '#mesae' + nuvin;
        var mesaaux2 = '#mesaaux' + nuvin;
        var mesaaux = '#mesaaux2' + nuvin;
        var mesacam2='#mesacam2' + nuvin;
        var mesacam = '#mesacam' + nuvin;
        var transf = '#transf' + nuvin;
        var transf2 = '#transf2' + nuvin;
        //$('#' + mesaaux).css('background', '#e2ecf6');
        //$('#' + mesa).css('background', '#e2ecf6');
        $(mesacam2).removeClass('fondo');
        $(mesacam2).removeClass('fondoselec');
        $(mesacam2).removeClass('activo');
        $(mesacam2).removeClass('fondotaburete');
     

        $(mesaD).removeClass('fondo');
        $(mesaD).removeClass('fondoselec');
        $(mesaD).removeClass('activo');

        $(mesacam).removeClass('fondo');
        $(transf).removeClass('fondo');
        $(transf).removeClass('fondoselec');
        $(transf2).removeClass('fondo');
        $(transf2).removeClass('fondoselec');
        $(mesacam).removeClass('fondoselec');
        $(mesacam).removeClass('activo');
        $(mesa).removeClass('fondoselec');
        $(transf).removeClass('activo');
        $(transf2).removeClass('activo');
        $(mesaaux).removeClass('fondo');
        $(mesaaux).removeClass('activo');
        $(mesa).removeClass('fondo');
        $(mesaaux2).removeClass('fondo');
        $(mesaaux2).removeClass('activo');

        $(transf).removeClass('fondoredonda');
        $(mesa).removeClass('fondoredonda');
        $(mesaaux).removeClass('fondoredonda');

        $(mesacam).removeClass('fondoredonda');

        $(transf).removeClass('fondorectangular');
        $(mesacam).removeClass('fondorectangular');
        $(mesaaux).removeClass('fondorectangular');
        $(mesa).removeClass('fondorectangular');


        $(transf).removeClass('fondocuadrado');
        $(mesa).removeClass('fondocuadrado');
        $(mesaaux).removeClass('fondocuadrado');
        $(mesacam).removeClass('fondocuadrado');


        $(transf).addClass('fondoreset');
        $(mesa).addClass('fondoreset');
        $(mesacam).addClass('fondoreset');
        $(mesaaux).addClass('fondoreset');
        $(mesaaux2).addClass('fondoreset');
        var txttransf = "#txttransf" + nuvin;
        var txtmesacam = '#txtmesascam' + nuvin;
        var txtmesaax = '#txtmesasax' + nuvin;
        var txtmesa = '#txtmesas' + nuvin;

        $(txttransf).css('color', ' #17202A');
        $(txtmesa).css('color', ' #17202A');
        $(txtmesacam).css('color', '#17202A');
        $(txtmesaax).css('color', '#17202A');
      });
      var idbd = [];
      for (var i in data) {
        //console.log(data)
        // A partir de la Consulta se Asigna Valor a los input
        var totalperm = '#totalperm' + data[i].id_mesas;
        var totalpermbd = 'totalperm' + data[i].id_mesas;
        // console.log(data[i].id_mesas);
        idbd.push(data[i].id_mesas);

        $(totalperm).val(data[i].numpersonas);
        var tperm0 = '.tperm' + data[i].id_mesas;

        var mesaD = '#mesad' + data[i].id_mesas;
        var mesa = '#mesae' + data[i].id_mesas;
        var mesaaux = '#mesaaux' + data[i].id_mesas;
        var mesaaux2 = '#mesaaux2' + data[i].id_mesas;
        var transf = '#transf' + data[i].id_mesas;
        var transf2 = '#transf2' + data[i].id_mesas;
        var mesacam = '#mesacam' + data[i].id_mesas;
        var mesacam2 = '#mesacam2' + data[i].id_mesas;
        //$('#' + mesaaux).css('background', '#13599b');
        if (data[i].activo == true) {
          if (data[i].tipomesa === 'taburete') {
          $(mesacam2).addClass('fondotaburete');
          $(mesaD).addClass('fondotaburete');
          $(mesa).addClass('fondotaburete');
          $(mesaaux).addClass('fondotaburete');
          $(mesaaux2).addClass('fondotaburete');
          $(mesacam).addClass('fondotaburete');
          $(transf).addClass('fondotaburete');
          $(transf2).addClass('fondotaburete');

          $(transf2).addClass('activo');
          $(mesacam2).addClass('activo');
          $(mesaD).addClass('activo');
          $(mesaaux).addClass('activo');
          $(mesaaux2).addClass('activo');
          $(mesacam).addClass('activo');
          $(transf).addClass('activo');
          $(mesa).addClass("activo");
        }else{
            $(mesaaux2).addClass('activo');
            $(mesacam2).addClass('fondoselec');
            $(mesaD).addClass('fondoselec');
            $(mesa).addClass('fondoselec');
            $(mesaaux2).addClass('fondoselec');
            $(mesaaux).addClass('fondoselec');
            $(mesacam).addClass('fondoselec');

            $(transf2).addClass('fondoselec');
            $(transf).addClass('fondoselec');

            $(mesacam2).addClass('activo');
            $(mesacam).addClass('activo');
            $(mesa).addClass("activo");
            $(mesaaux).addClass('activo');
            $(transf).addClass('activo');
            $(transf2).addClass('activo');
          }
        }else if(data[i].activo == false && data[i].tieneaux > 0 && data[i].d_m_d_act != false){
          $(mesaaux2).addClass('activo');
          $(mesacam2).addClass('fondoselec');
          $(mesaD).addClass('fondoselec');
          $(mesa).addClass('fondoselec');
          $(mesaaux2).addClass('fondoselec');
          $(mesaaux).addClass('fondoselec');
          $(mesacam).addClass('fondoselec');

          $(transf2).addClass('fondoselec');
          $(transf).addClass('fondoselec');

          $(mesacam2).addClass('activo');
          $(mesacam).addClass('activo');
          $(mesa).addClass("activo");
          $(mesaaux).addClass('activo');
          $(transf).addClass('activo');
          $(transf2).addClass('activo');
        }




        




        //$('#' + mesa).css('background', '#13599b');
        // $(tperm0).css('display', 'block');
        var txtmesa = '#txtmesas' + data[i].id_mesas;
        var txtmesacam = '#txtmesascam' + data[i].id_mesas;
        var txtmesaax = '#txtmesasax' + data[i].id_mesas;
        var txttransf = "#txttransf" + data[i].id_mesas;
        $(txttransf).css('color', '#1B2631');
        $(txtmesa).css('color', '#1B2631');
        $(txtmesacam).css('color', '#1B2631');
        $(txtmesaax).css('color', '#1B2631');
        // A partir de la Consulta se Asigna Valor a los input
        var totalperm = '#totalperm0' + data[i].id_mesas;
        // console.log(data[i].id_mesas);

        $(totalperm).val(data[i].numpersonas);
        var tperm0 = '#tperm0' + data[i].id_mesas;
        var mesa = 'mesacam' + data[i].id_mesas;
        //$('#' + mesa).css('background', '#13599b');
        //$(tperm0).css('display', 'block');
      }

      // console.log(idbd[i]);
      //console.log( idbd[i]+"bd");

      /*       $(totalperm).change(function() {


 $("#"+mesa).css("background", "#13599b");

$(tperm0).css("display", "block");
})
        */
    })
    .fail(function (resp) {
      console.log(resp.responseText);
    });
}

//////////////////////////////////////////////////////////////////////////////////
//                   Funcion  Consultar Estatus Mesa A la BD                    //
////////////////////////////////////////////////////// ///////////////////////////

function consultarEstatus() {
  consulta = 'estatus';
  var parametros = {
    estatus: consulta
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'JSON',
      data: parametros
    })
    .done(function (data) {
      for (var i in data) {
        // A partir de la Consulta se Asigna Valor a los input
        var totalperm = '#totalperm' + data[i].id_mesas;
        // console.log(data[i].id_mesas);

        $(totalperm).val('0');
        var tperm0 = '.tperm' + data[i].id_mesas;
        var mesa = '#mesae' + data[i].id_mesas;
        $(mesa).addClass('fondo');

        //$('#' + mesa).css('background', '#e2ecf6');
        $(tperm0).css('display', 'none');
      }
    })
    .fail(function (resp) {
      console.log(resp.responseText);
    });
}
//-----------------------------------------

//////////////////////////////////////////////////////////////////////////////////
//                  ACTUALIZAR MARGIN LEFT Y TOP Mesa EN la BD                    //
////////////////////////////////////////////////////// ///////////////////////////

function updatePositionMesas(idmesa, marginl, margint, capacidad) {
  consulta = 'actulizarmes';
  var parametros = {
    updateposition: consulta,
    id_mesas: idmesa,
    marginl: marginl,
    margint: margint,
    capacidad: capacidad
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'JSON',
      data: parametros
    })
    .done(function (data) {
      console.log(data);
    })
    .fail(function (resp) {
      console.log(resp.responseText);
    });
}

//-----------------------------------------

//////////////////////////////////////////////////////////////////////////////////
//                 DEL  Mesa EN la BD                    //
////////////////////////////////////////////////////// ///////////////////////////

function Deletemesa(id_tipomesa) {
  consulta = 'deletmesas';
  var parametros = {
    deletmesas: consulta,
    id: id_tipomesa
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'JSON',
      data: parametros
    })
    .done(function (data) {
      console.log(data);
    })
    .fail(function (resp) {
      console.log(resp);

      console.log(resp.responseText);
    });
}

//-----------------------------------------

function AddNewmesa(id_tipomesa, marginl, margint, nombremesa, capacidad) {
  consulta = 'newmesas';
  var parametros = {
    newmesas: consulta,
    id_tipomesa: id_tipomesa,
    marginl: marginl,
    margint: margint,
    capacidad: capacidad,
    nombremesa: nombremesa
  };
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'JSON',
      data: parametros
    })
    .done(function (data) {
      console.log(data);
      $("#actualizarCdrMesas").val(1);
    })
    .fail(function (resp) {
      console.log(resp.responseText);
    });
}


function agregarObjeto(data) {
  var esmesa = $(data).attr('data-esmesa');
  var tipomesa = $(data).attr('data-nombre');
  var totalm = $('#totalmesas').val();

  switch (tipomesa) {
    case "mesaCuadrada":
      $(".contentdiv").append('<div class="draggable   mesacuadrada mesanuevaDelete mesanueva' + totalm + ' " id="" data-mesa="true" data-valuenew="0" data-x="0" data-y="0" data-tipo="2"  data-capacidad="0" data-idmesa="0" data-esmesa="true" data-nombre="mesaCuadrada"><p class="txtmesas"></p></div>');
      $('#modal-base').modal('show');
      break;
    case "mesaRectangular":
      $(".contentdiv").append('<div class="draggable mesarectangular mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-valuenew="0" data-x="10" data-y="10" data-tipo="3"  data-capacidad="0" data-idmesa="0" data-esmesa="true" data-nombre="mesaRectangular"><p class="txtmesas"></p></div>');
      $('#modal-base').modal('show');
      break;

    case "mesaRedonda":
      $(".contentdiv").append('<div class="draggable  mesaredonda mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-valuenew="0" data-x="10" data-y="10" data-tipo="5"	data-nombre="mesaRedonda"  data-capacidad="0" data-idmesa="0" data-esmesa="true" ><p class="txtmesas"></p></div>');
      $('#modal-base').modal('show');
      break;
    case "objetoplanta":
      $(".contentdiv").append('<div class="draggable  planta mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-capacidad="0" data-valuenew="0" data-x="10" data-y="10" data-tipo="6"	data-nombre="objetoplanta" data-esmesa="false" >');

      break;
    case "objetocaja":
      $(".contentdiv").append('	<div class="draggable caja mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-capacidad="0" data-valuenew="0" data-x="10" data-y="10" data-tipo="9" data-nombre="objetocaja"  data-esmesa="false" ></div>');

      break;

    case "malebath":
      $(".contentdiv").append('	<div class="draggable malebath mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-capacidad="0"  data-valuenew="0" data-x="10" data-y="10" data-tipo="14" data-nombre="malebath"  data-esmesa="false" ></div>');

      break;

    case "femalebath":
      $(".contentdiv").append('<div class="draggable femalebath mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-capacidad="0"  data-valuenew="0" data-x="10" data-y="10" data-tipo="13" data-nombre="femalebath"  data-esmesa="false" ></div>');

      break;

    case "waiter01":
      $(".contentdiv").append('<div class="draggable waiter01 mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-capacidad="0"  data-valuenew="0" data-x="10" data-y="10" data-tipo="15" data-nombre="waiter01"  data-esmesa="false" ></div>');

      break;

    case "waiter02":
      $(".contentdiv").append('<div class="draggable waiter02 mesanuevaDelete mesanueva' + totalm + '"  data-mesa="true"  data-capacidad="0" data-valuenew="0" data-x="10" data-y="10" data-tipo="16" data-nombre="waiter02"  data-esmesa="false" ></div>');

      break;
    case "waiter03":
      $(".contentdiv").append('<div class="draggable waiter03 mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-capacidad="0" data-valuenew="0" data-x="10" data-y="10" data-tipo="17" data-nombre="waiter03"  data-esmesa="false" ></div>');


      break;

    case "taburete":
      $(".contentdiv").append('<div class="draggable  taburete mesanuevaDelete mesanueva' + totalm + '" id="" data-mesa="true" data-valuenew="0" data-x="10" data-y="10" data-tipo="19"	data-nombre="taburete"  data-capacidad="0" data-idmesa="0" data-esmesa="true" ></div>');


      break;
  }

  $('#totalmesas').val(totalm++);
}




function selectfondomesa() {
  var fondo = Cookies.get('fondomesas');
  if (fondo) {

    $(".contentdiv").data("fondo", fondo);
    $(".contentdiv").removeClass('fondomesas');
    $(".contentdiv").removeClass('fondomesas1');
    $(".contentdiv").removeClass('fondomesas2');
    $(".contentdiv").removeClass('fondomesas3');
    $(".contentdiv").removeClass('fondomesas4');
    $(".contentdiv").removeClass('fondomesas5');
    $(".contentdiv").addClass(fondo);
    $(".bordermesas").removeClass('fondomesas');
    $(".bordermesas").removeClass('fondomesas1');
    $(".bordermesas").removeClass('fondomesas2');
    $(".bordermesas").removeClass('fondomesas3');
    $(".bordermesas").removeClass('fondomesas4');
    $(".bordermesas").removeClass('fondomesas5');
    $(".bordermesas").addClass(fondo);
    

    $(".modalfondos").removeClass('fondomesas');
    $(".modalfondos").removeClass('fondomesas1');
    $(".modalfondos").removeClass('fondomesas2');
    $(".modalfondos").removeClass('fondomesas3');
    $(".modalfondos").removeClass('fondomesas4');
    $(".modalfondos").removeClass('fondomesas5');
    $(".modalfondos").addClass(fondo);



  }
}

function getmesasaux(id_mesas, caso, donde) {

  var parametros = {
    id_mesas: id_mesas,
    getmexaaux: 'mexaaux'
  };

  if(caso==="mesa"){ 
  jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'json',
      data: parametros,
      beforeSend: function () {

        $('#btnmodalaux').append('<div class="progress"><div class="progress-bar progress-bar-striped active" style="width: 95%"></div></div>');

      }
    })
    .done(function (respuesta) {
      
      $("#titulo-modal").text("Mesa a Comandar");
      $(".progress").remove();
      console.log(respuesta);

      for (var i in respuesta) {
        $('.botonmesas').remove();
      }

      for (var i in respuesta) {

        console.log(respuesta);
		console.log("es"+i);
		if (respuesta[i].activo==true && respuesta[i].numeromesaaux==0){
			$('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa=' + respuesta[i].numeromesaaux + '  data-idmesa=' + respuesta[i].id + ' onclick="comandarmesasaux(this)">Mesa Principal</button>');
		}else if(respuesta[i].activo==false && respuesta[i].numeromesaaux > 0){
      $('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa=' + respuesta[i].numeromesaaux + '  data-idmesa=' + respuesta[i].id + ' onclick="comandarmesasaux(this)">Mesa Auxiliar ' + respuesta[i].numeromesaaux + '</button>');
    }else{
			$('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa=' + respuesta[i].numeromesaaux + '  data-idmesa=' + respuesta[i].id + ' onclick="comandarmesasaux(this)">Mesa Auxiliar ' + respuesta[i].numeromesaaux + '</button>');
		}
      }
    })
    .fail(function (resp) {
      $(".progress").remove();
      console.log(resp);
    });



  }else if(caso=="trasferirPedidos" && donde=="left"){
    jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'json',
      data: parametros,
      beforeSend: function () {

        $('#btnmodalaux').append('<div class="progress"><div class="progress-bar progress-bar-striped active" style="width: 95%"></div></div>');

      }
    })
    .done(function (respuesta) {
      $("#titulo-modal").text("Seleccione un Mesa");
      
      $(".progress").remove();
      console.log(respuesta);
      var nombre_mesa = $(`#transf${parametros.id_mesas}`).data("nombre");

      for (var i in respuesta) {
        $('.botonmesas').remove();
      }

      for (var i in respuesta) {

        console.log(respuesta);
		console.log("es"+i);
		if (respuesta[i].activo==true && respuesta[i].numeromesaaux==0){
			$('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa="' + respuesta[i].numeromesaaux + '"  data-idmesa="' + id_mesas + '" data-auxiliar="' +false + '" data-nombreMesa="Mesa Principal" onclick="asignarIDpedido(this)" data-nombre="'+nombre_mesa+'">Mesa Principal</button>');
		}else if(respuesta[i].activo==false && respuesta[i].numeromesaaux > 0){
      $('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa="' + respuesta[i].numeromesaaux + '"  data-idmesa="' + id_mesas + '" data-auxiliar="' +true + '" data-nombreMesa="Mesa Auxiliar ' + respuesta[i].numeromesaaux + '" onclick="asignarIDpedido(this)" data-nombre="'+nombre_mesa+'">Mesa Auxiliar ' + respuesta[i].numeromesaaux + '</button>');
    }else{
			$('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa="' + respuesta[i].numeromesaaux + '"  data-idmesa="' +id_mesas + '" data-auxiliar="' +true + '"  data-nombreMesa="Mesa Auxiliar ' + respuesta[i].numeromesaaux + '" onclick="asignarIDpedido(this)" data-nombre="'+nombre_mesa+'">Mesa Auxiliar ' + respuesta[i].numeromesaaux + '</button>');
		}
      }
    })
    .fail(function (resp) {
      $(".progress").remove();
      console.log(resp);
    });




  }else if(caso=="trasferirPedidos" && donde=="right"){
    jQuery
    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'json',
      data: parametros,
      beforeSend: function () {

        $('#btnmodalaux').append('<div class="progress"><div class="progress-bar progress-bar-striped active" style="width: 95%"></div></div>');

      }
    })
    .done(function (respuesta) {

      $("#titulo-modal").text("Seleccione un Mesa");
      
      $(".progress").remove();
      console.log(respuesta);
      var nombre_mesa = $(`#transf${parametros.id_mesas}`).data("nombre");

      for (var i in respuesta) {
        $('.botonmesas').remove();
      }

      for (var i in respuesta) {

        console.log(respuesta);
		console.log("es"+i);
		if (respuesta[i].activo==true && respuesta[i].numeromesaaux==0){
			$('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa="' + respuesta[i].numeromesaaux + '"  data-idmesa="' + id_mesas + '" data-auxiliar="' +false + '" data-nombreMesa="Mesa Principal" onclick="asignarIDpedidoR(this)" data-nombre="'+nombre_mesa+'">Mesa Principal</button>');
		}else if(respuesta[i].activo==false && respuesta[i].numeromesaaux > 0){
      $('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa="' + respuesta[i].numeromesaaux + '"  data-idmesa="' + id_mesas + '" data-auxiliar="' +true + '" data-nombreMesa="Mesa Auxiliar ' + respuesta[i].numeromesaaux + '" onclick="asignarIDpedidoR(this)" data-nombre="'+nombre_mesa+'">Mesa Auxiliar ' + respuesta[i].numeromesaaux + '</button>');
    }else{
			$('.btn-mesa-primary').after('   <button type="button" class="btn btn-block btn-sm btn-primary botonmesas" id="botonmesas" data-nummesa="' + respuesta[i].numeromesaaux + '"  data-idmesa="' +id_mesas + '" data-auxiliar="' +true + '"  data-nombreMesa="Mesa Auxiliar ' + respuesta[i].numeromesaaux + '" onclick="asignarIDpedidoR(this)" data-nombre="'+nombre_mesa+'">Mesa Auxiliar ' + respuesta[i].numeromesaaux + '</button>');
		}
      }
    })
    .fail(function (resp) {
      $(".progress").remove();
      console.log(resp);
    });


  }

}

function getmesasauxcountrow(id_mesas, callback) {

  var parametros = {
    id_mesas: id_mesas,
    mexaaux: 'mexaauxpri'
  };
  jQuery

    .ajax({
      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'json',
      data: parametros
    })
    .done(function (respuesta) {
      console.log(respuesta);
      callback(null, respuesta.nummesa);
      var resultado = respuesta.nummesa;
      $("#rowaux").val(resultado);

    })
    .fail(function (resp) {

      callback(resp, null);
      console.log(resp);
    }); 



}


function transferirConsumos(idmesas, idmesaold) {

  var parametros = {
    transferirconsumos: true,
    id_mesas: idmesas,
    idmesaold: idmesaold
  };
  jQuery

    .ajax({

      url: 'class/Contposmesas.php',
      type: 'POST',
      dataType: 'json',
      data: parametros
    })
    .done(function (respuesta) {

      console.log(respuesta);





    })
    .fail(function (resp) {
      console.log(resp);

    });



}

function comandarmesas() {
  $("#auxiliar").val("normal");
  $("#eviarMesa").click();
}

function comandarmesasaux(datos) {

  var idmesa = $(datos).attr('data-idmesa');

  var numaux = $(datos).attr('data-nummesa');
  $("#mesaidaux").val(numaux);
  //$("#mesaid").val(idmesa);
  
  if (numaux > 0) {
    $("#auxiliar").val("auxiliar");
    $("#eviarMesa").click();
  } else {
    $("#auxiliar").val("normal");
    $("#eviarMesa").click();
  }



}

function transferirpedidos(boton) {

  var esmesa = $(boton).attr('data-esmesa');

  ///solo mostrar modal si el objeto es una mesa
  if (esmesa === "true") {
    var valorin = $('#valormesa').val();


    if (typeof valorin == 'undefined' || valorin === null || valorin === '') {
      var valor = $(boton).attr('data-value');
      var mesa = '#transf' + valor;
      var nombreMesa = $(boton).attr('data-nombre');   

          //# Solo si la Mesa Se encuentra Activa
      if ($(mesa).hasClass("activo")) {
        //# Consultar si tiene mesa auxiliar
        getmesasauxcountrow(valor, function (errorLanzado, idcomandar) {
    
          //# Si Hay mesas Auxiliar, Listarla y Mostrar modal
        if (idcomandar > 0) {
            getmesasaux(valor,'trasferirPedidos','left');
            $('#modal-mesa').modal('show');
         
         
          }else{
            //# Si no, Seleccionarla
            $('#valormesa').val(valor);
            $("#valorNombreMesa").val(nombreMesa);
/*            alertify.success('Seleccionaste la ' + nombreMesa );
*/
            alertify.success('Ahora escoge una mesa para recibir productos');
            $(mesa).removeClass('fondoselec');
            $(mesa).addClass('nombreMesa');
    
         
          }
        });


        //
        //cambia css
      } else {
        alertify.warning('Seleccione una mesa Activa');
        $(mesa).removeClass('fondoselect');

      }
    } else {
      //Ya selecciono la Primera mesa



      var valor = $(boton).attr('data-value');
      var nombreMesa2 = $(boton).attr('data-nombre');   

      if (valorin == valor) {
     
        getmesasauxcountrow(valor, function (errorLanzado, idcomandar) {
          if (idcomandar > 0) {
            getmesasaux(valor,'trasferirPedidos','right');
            $('#modal-mesa').modal('show');
         
         
          }

        });

      } else {
        var mesa = '#transf' + valor;
        var mesa2 = '#transf' + valormesa;
        var totalperm = '#totalperm' + valor;

          //# Solo si la Segunda Mesa Se encuentra Activa
        if ($(mesa).hasClass("activo")) {

          getmesasauxcountrow(valor, function (errorLanzado, idcomandar) {

     
            if (idcomandar > 0) {
              getmesasaux(valor,'trasferirPedidos','right');
              $('#modal-mesa').modal('show');
           
           
            }else{
             
          

        
              $('#mesaright').val(valor);
              $('#modal-pedidost').modal('show');
              $('#consultarpedidos').click();
              // alert("SE CAMBIA LA MESA "+valormesa+"  POR LA MESA "+valor);

              $('#headermesa2').text(nombreMesa2); //rigth
              $('#nmesamodaln').val(valormesa);
          }
             
          });
         
        
         
          var nombreMesa1 = $("#valorNombreMesa").val();

          //$('#' + mesa).css('background', '#13599b');
          //$('#' + mesa2).css('background', '#e2ecf6');
          $('#headermesa').text(nombreMesa1); //left
          var valormesa = $('#valormesa').val();
          $('#mesaleft').val(valormesa);
          $('#valormesa').val('');



        } else {
          alertify.error('Seleccione una Mesa Activa');


        }


      }
    }
  }




}

function removerfondos(){
  $(".bordermesas").removeClass('fondomesas');
  $(".bordermesas").removeClass('fondomesas1');
  $(".bordermesas").removeClass('fondomesas2');
  $(".bordermesas").removeClass('fondomesas3');
  $(".bordermesas").removeClass('fondomesas4');
  $(".bordermesas").removeClass('fondomesas5');
}

function asignarIDpedido(datos) {
  console.log(datos);
  $(datos).data('nummesa');
  $(datos).data('nombremesa');
  $(datos).data('nombremesa');
  $("#ifauxiliarleft").val( $(datos).data('auxiliar'))
  $('#mesaleft').val($(datos).data('idmesa'));
  console.log('idmesa'+$(datos).data('idmesa')+'nummesa'+ $(datos).data('nummesa')+'nombre mesa'+ $(datos).data('nombremesa'));
  $('#valormesa').val($(datos).data('idmesa'));
  $('#idauxiliarleft').val($(datos).data('nummesa'));
  
  $("#valorNombreMesa").val($(datos).data('nombre')+" - "+$(datos).data('nombremesa'));
  $('#modal-mesa').modal('hide');
  alertify.success('Ahora escoge una mesa para recibir productos');
}

function asignarIDpedidoR(datos){        
  $(datos).data('nombremesa');
  $('#mesaright').val($(datos).data('idmesa'));
  $("#ifauxiliaright").val( $(datos).data('auxiliar'))
  $('#idauxiliaright').val($(datos).data('nummesa'));
  
  $("#headermesa2").text($(datos).data('nombre')+" - "+$(datos).data('nombremesa'));
  $('#modal-mesa').modal('hide');
  $('#modal-pedidost').modal('show');
  $('#consultarpedidos').click();
  $('#valormesa').val('');

}
