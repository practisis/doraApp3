angular
  .module("listmesas", [])
  .controller("mesaController", function($scope, $http) {
    $scope.posts = [];
    $scope.clase = "mesa1";
    $scope.capacidadmesas = 0;
    $scope.pedidosleft = [];
    $scope.pedidosrigth = [];
    $scope.count = 0;
    $scope.pedidosremov = [];
    $scope.marginr;
    $scope.mesaleft;
    $scope.mesaright;

    $scope.checkbox = {
      value: false
    };

    $scope.nuevoPedidoRight = {};
    $scope.nuevoPedidoLeft = {};
    $scope.addcapacidad = function() {
      $scope.count = capacidadmesas;
    };
    $scope.selectChanged = function() {
      // $scope.count.capacidadmesa= capacidadmesas;
    };

    /*************AJAX GET MESAS DATOS************** */
    var countInicial = 0;
    $scope.cargarMesas = function(){
      $http
        .post("class/Contposmesas.php", {
          mesasactivas: "true"
        })
        .success(function(data, status, headers, config) {
          $scope.posts = data;
          if(countInicial == 0){
            $("#totalmesas").val(data.length);
            countInicial = 1;                        
          }
        })
        .error(function(error) {
          console.log(error);
        });      
    }    
    $scope.cargarMesas();

    window.setInterval(function() {         
      $scope.cargarMesas();
      $scope.$apply();
    },10000);

    $scope.refrescarCdrMesas = function(){
      countInicial = 0;
      var set = setInterval(function(){
        if($("#actualizarCdrMesas").val() != 0){
          $scope.cargarMesas();
          $scope.$apply();
          $(".mesanuevaDelete").remove();
          countInicial = 1;
          clearInterval(set);
        }
      },100);
    }

    var removeItem = function(array, item) {
      /*
        $scope.pedidosleft.filter(function (pedido){

            return pedido !==item;
        });*/

      delete array[item];
    };
    /*************TRANSFERIR PEDIDOS RIGTH************** */
    $scope.addPedidoRight = function(datos) {

      console.log(datos)
      var pedido=datos.pedidos;
      // alert($scope.nuevoPedidoRight.id)

          var id        = pedido.id;
          var cantidad  = pedido.cantidad;
          var producto  = pedido.producto_his;
          var idmesa    = pedido.id_mesa;
          var box       = pedido.box;
          var nuevo     = pedido.nuevo=true;
          var key       = datos.$index;
          var notas     = pedido.notas;
          var haskey    = pedido.id_mesa;
         // var idcomanda = $(input).attr("data-idcomanda");

        
         
            $scope.nuevoPedidoRight.id           = id;
      
            $scope.nuevoPedidoRight.producto_his = producto;
            $scope.nuevoPedidoRight.nuevo        = true;
            $scope.nuevoPedidoRight.ifnuevo      = true;
            $scope.nuevoPedidoRight.precio_his   = pedido.precio_his;
            
            $scope.nuevoPedidoRight.id_mesa      = idmesa;
            $scope.nuevoPedidoRight.box          = box;
            $scope.nuevoPedidoRight.notas        = notas;
            $scope.nuevoPedidoRight.id_mesa_aux  = pedido.id_mesa_aux;
            $scope.nuevoPedidoRight.guardar      = false;
            $scope.nuevoPedidoRight.id_auxcamb   =   parseInt($scope.idauxiliaright);
           // $scope.nuevoPedidoRight.$$hashKey = haskey;
            $scope.nuevoPedidoRight.mesacamb     = $scope.mesaright;
            $scope.nuevoPedidoRight.idcomanda;
           var pedidosrigth= $scope.pedidosrigth;

           /*
           * Si hay mas de un producto restar cantidad
           */
           if(cantidad>1){
            $scope.pedidosleft[key]['cantidad']--;
            $scope.pedidosleft[key]['edit']=true;
            $scope.nuevoPedidoRight.guardar      = true;
          
          }else{
          
          $scope.nuevoPedidoRight.cantidad     = cantidad;
         
            $scope.nuevoPedidoRight.guardar      = false;

            if (pedidosrigth.length)
        { 

            /*
           * Recorrer la otra mesa,verificar si es el mismo product
           */
            for (const i in pedidosrigth ) {
             if(pedidosrigth[i].id===id)
                {
           
                 pedidosrigth[i]["guardar"]=false;
           
                  break;
                }
            }
          }
            removeItem($scope.pedidosleft, key);
            $("#linea" + id).remove();
          }

          var ingresar=true;
          var keyrigth;
          
          
              /*
           * Solo si la otra mesa tiene productos
           */
        if (pedidosrigth.length)
        { 

            /*
           * Recorrer la otra mesa,verificar si es el mismo product
           */
            for (const i in pedidosrigth ) {
             if(pedidosrigth[i].id===id)
                {
                  ingresar=false;
                  keyrigth=i;
              
                  break;
                }else
                {
                  $scope.nuevoPedidoRight.cantidad     = 1;
              
                  ingresar=true;
                }
            }
          }
                if(ingresar){
                $scope.nuevoPedidoRight.cantidad     = 1;
              
                $scope.pedidosrigth.push($scope.nuevoPedidoRight);

                }else{
              
                  pedidosrigth[keyrigth]["cantidad"]++;  
                }

           // 
       
           

            console.log( $scope.pedidosleft);
            console.log($scope.pedidosrigth);
            $scope.nuevoPedidoRight = {};
   
  

      //alert(idpedido)
    };

    /*************TRANSFERIR PEDIDOS LEFT************** */
    $scope.addPedidoleft = function(datos) {
   
      // alert($scope.nuevoPedidoRight.id)
      datos.pedido.nuevo=true;
      var pedido=datos.pedido;

      console.log(datos)


        var id       = pedido.id;
        var cantidad = pedido.cantidad;
        var producto = pedido.producto_his;
        var idmesa   = pedido.id_mesa;
        var box      = pedido.box;
        var nuevo    = true;
        $scope.nuevoPedidoRight.ifnuevo      = true;

        var key      = datos.$index;
        var idcomanda= pedido.idcomanda;
        var notas    = pedido.notas;
        var haskey   = pedido.id_mesa;
       
         $scope.nuevoPedidoLeft.id_mesa_aux      = pedido.id_mesa_aux; 
         $scope.nuevoPedidoLeft.id            = id;
         $scope.nuevoPedidoLeft.cantidad      = cantidad;
         $scope.nuevoPedidoLeft.producto_his  = producto;
         $scope.nuevoPedidoLeft.nuevo         = true;
         $scope.nuevoPedidoLeft.ifnuevo       = true;
         $scope.nuevoPedidoLeft.precio_his    =  pedido.precio_his;
         
         $scope.nuevoPedidoLeft.id_mesa       = idmesa;
         $scope.nuevoPedidoLeft.idcomanda     = idcomanda;
         $scope.nuevoPedidoLeft.box           = box;
         $scope.nuevoPedidoLeft.notas         = notas;
         //$scope.nuevoPedidoLeft.$$hashKey     = haskey;
         $scope.nuevoPedidoLeft.id_auxcamb    =  parseInt($scope.idauxiliarleft);
         $scope.nuevoPedidoLeft.mesacamb      = $scope.mesaleft;
         var  pedidosleft =$scope.pedidosleft;



              /*
           * Si hay mas de un producto restar cantidad
           */
          if(cantidad>1){
            $scope.pedidosrigth[key]['cantidad']--;
            $scope.pedidosrigth[key]['edit']=true;
            $scope.nuevoPedidoLeft.guardar      = true;
          
          }else{
          
          $scope.nuevoPedidoLeft.cantidad     = cantidad;
         
            $scope.nuevoPedidoLeft.guardar      = false;

            if (pedidosleft.length)
        { 

            /*
           * Recorrer la otra mesa,verificar si es el mismo product
           */
            for (const i in pedidosleft ) {
             if(pedidosleft[i].id===id)
                {
           
                  pedidosleft[i]["guardar"]=false;
           
                  break;
                }
            }
          }
          $("#fila" + id).remove();

          removeItem($scope.pedidosrigth, key);
          }


          var ingresar=true;
          var keyrigth;
          
          
              /*
           * Solo si la otra mesa tiene productos
           */
        if (pedidosleft.length)
        { 

            /*
           * Recorrer la otra mesa,verificar si es el mismo product
           */
            for (const i in pedidosleft ) {
             if(pedidosleft[i].id===id)
                {
                  ingresar=false;
                  keyrigth=i;
              
                  break;
                }else
                {
                  $scope.nuevoPedidoLeft.cantidad     = 1;
              
                  ingresar=true;
                }
            }
          }
                if(ingresar){
                $scope.nuevoPedidoLeft.cantidad     = 1;
              
                $scope.pedidosleft.push($scope.nuevoPedidoLeft);

                }else{
              
                  pedidosleft[keyrigth]["cantidad"]++;  
                }

           // 

       

         console.log($scope.nuevoPedidoLeft);
         console.log(  $scope.pedidosleft);
         console.log($scope.pedidosrigth);

         $scope.nuevoPedidoLeft = {};
     /* $(".pedidosrigth")
        .find(":input")
        .each(function() {
          var input = this;
          var valor = $(input).attr("data-valor");
          var nuevo = $(input).attr("data-nuevo");
          var id = $(input).attr("data-idv");
          var cantidad = $(input).attr("data-cantidad");
          var producto = $(input).attr("data-producto");
          var idmesa = $(input).attr("data-idmesa");
          var box = $(input).attr("data-box");
          var key = $(input).attr("data-key");
          var idcomanda = $(input).attr("data-idcomanda");
         // var haskey = $(input).attr("data-haskey");
          if (valor === "true") {
            //console.log("id="+id+"cantidad="+cantidad+"producto ="+producto+"valor="+valor)
            $scope.nuevoPedidoLeft.id = id;
            $scope.nuevoPedidoLeftcantidad = cantidad;
            $scope.nuevoPedidoLeft.producto_his = producto;
            $scope.nuevoPedidoLeft.nuevo = nuevo;
            $scope.nuevoPedidoLeft.id_mesa = idmesa;
            $scope.nuevoPedidoLeft.idcomanda = idcomanda;
            $scope.nuevoPedidoLeft.box = box;
            $scope.nuevoPedidoLeft.$$hashKey = haskey;
            $scope.nuevoPedidoLeft.mesacamb = $scope.mesaleft;

            $scope.pedidosleft.push($scope.nuevoPedidoLeft);

            $("#fila" + id).remove();

            removeItem($scope.pedidosrigth, key);

            console.log($scope.nuevoPedidoLeft);
            console.log($scope.pedidosleft);

            $scope.nuevoPedidoLeft = {};
          }
        }); */

      //alert(idpedido)
    };
    /*************COSULTAR PEDIDOS************** */
    $scope.consultarpedidos = function() {
     
      $scope.ifauxiliarleft= $("#ifauxiliarleft").val();
      $scope.idauxiliarleft= $('#idauxiliarleft').val();
      $scope.idauxiliaright= $('#idauxiliaright').val();
      $scope.ifauxiliaright= $('#ifauxiliaright').val();


      if (typeof  $scope.ifauxiliarleft == 'undefined' ||  $scope.ifauxiliarleft === null ||  $scope.ifauxiliarleft === '') {
        $scope.ifauxiliarleft=false;
      }
      if (typeof  $scope.idauxiliarleft == 'undefined' ||  $scope.idauxiliarleft === null ||  $scope.idauxiliarleft === '') {
        $scope.idauxiliarleft=0;
      }

      if (typeof  $scope.idauxiliaright == 'undefined' ||  $scope.idauxiliaright === null || $scope.idauxiliaright === '') {
        $scope.idauxiliaright=0;
      }
      if (typeof  $scope.ifauxiliaright == 'undefined' ||  $scope.ifauxiliaright === null ||  $scope.ifauxiliaright === '') {
        $scope.ifauxiliaright=false;
      }
      $("#modalpedidos").addClass("form-loading");
      $scope.mesaleft = $("#mesaleft").val();
   
      $scope.mesaright = $("#mesaright").val();
      console.log($scope.mesaright);
      console.log($scope.mesaleft);

      /*************PEDIDOS LEFT************** */
      $http
        .post("class/Contposmesas.php", {
          getpedidoscambioleft: true,
          mesaleft: $scope.mesaleft,
          ifauxiliarleft: $scope.ifauxiliarleft,
          idauxiliarleft: $scope.idauxiliarleft
        
        })
        .success(function(data, status, headers, config) {
          console.log(status)
          console.log(headers)
          console.log(data)
          $scope.pedidosleft = data;
          if (
            typeof data.length == "undefined" ||
            data.length === null ||
            data.length === ""
          ) {

            var datosx = new Array();
           
            $scope.pedidosleft =  datosx;
            console.log(datosx)
          }

          $("#modalpedidos").removeClass("form-loading");
        })
        .error(function(error) {
          console.log(error);
          $("#modalpedidos").removeClass("form-loading");
        });

      //******************************** */

      /*************PEDIDOS RIGTH************** */
      $http
        .post("class/Contposmesas.php", {
          getpedidoscambioright: true,
          mesaright: $scope.mesaright,
          ifauxiliaright: $scope.ifauxiliaright,
          idauxiliaright: $scope.idauxiliaright

        })
        .success(function(data, status, headers, config) {
          $scope.pedidosrigth = data;
          console.log(data);
          if (
            typeof data.length == "undefined" ||
            data.length === null ||
            data.length === ""
          ) {

            var datosx = new Array();
         
            console.log(datosx)
            $scope.pedidosrigth = datosx;
          }

          $("#modalpedidos").removeClass("form-loading");
        })
        .error(function(error) {
          console.log(error);
          $("#modalpedidos").removeClass("form-loading");
        });
    }; //fin consulta pedidos left */

    /*************GUARDAR CAMBIOS PEDIDOS***************/
    $scope.GuardarCambiosPedidos = function() {
      /*************PEDIDOS LEFT************** */
      var pedidosleft = JSON.stringify($scope.pedidosleft);
      var pedidosrigth = JSON.stringify($scope.pedidosrigth);
      console.log(pedidosrigth);
      $("#modalpedidos").addClass("form-loading");
      $http
        .post("class/Contposmesas.php", {
          guardarcambiosped: true,
          mesaleft: pedidosleft,
          mesarigth: pedidosrigth
        })
        .success(function(data, status, headers, config) {
          $("#modalpedidos").removeClass("form-loading");
          console.log(data);

          $("#modal-pedidost").modal("hide");
         location.reload();
        })
        .error(function(error) {
          $("#modal-pedidost").modal("hide");
          $("#modalpedidos").removeClass("form-loading");
          //console.log(error);
        location.reload();
        });

      //******************************** */
    }; //fin guardar cambio transferir*/

    /*************FIN CONTROLLER LIST MESAS************** */
  })
  .controller("pedidos", function($scope, $http, $filter, $interval) {
    $scope.mesa = "Mesa 1";
    $scope.pedidos = [];
    $scope.productos = [];
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.data = [];
    $scope.q = "";
    $scope.timeini = 0;
    $scope.timewarning = 0;
    $scope.hora;

    $http
      .post("class/Contposmesas.php", {
        listpedidos: "true"
      })
      .success(function(data, status, headers, config) {
        $scope.pedidos = data.mesas;

        datos = JSON.parse(JSON.stringify(data.productos));
        $scope.productos = datos;
        console.log(data);
        $scope.data = datos;
        console.log($scope.productos.length);
      })
      .error(function(error) {
        console.log(error);
      });

    var getTimeconfig = function() {
      $http
        .post("class/Contposmesas.php", {
          getconfigestado: "true"
        })
        .success(function(data, status, headers, config) {
          $scope.timeini = data.timeini;
          $scope.timewarning = data.timewarning;
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.ShowModal = function() {
      getTimeconfig();

      /* PAGINACION */

      $("#modal-pedidos").modal("show");

      // aqui un conflicto en el merge.
      //   $('#modal-pedidos').modal('show');
      // var getDataPedidos = function () {
    };

    getTimeconfig();
    $interval(getTimeconfig, 30000);

    /* PAGINACION */

    var getDataPedidos = function() {
      $http
        .post("class/Contposmesas.php", {
          listpedidos: "true"
        })
        .success(function(data, status, headers, config) {
          $scope.pedidos = data.mesas;
          console.log(data);

          datos = JSON.parse(JSON.stringify(data.productos));
          $scope.productos = datos;
          $scope.data = datos;
        })
        .error(function(error) {});
    };
    getDataPedidos();

    $interval(getDataPedidos, 5000);

    $scope.getData = function() {
      return $filter("filter")($scope.data, $scope.q);
    };

    $scope.numberOfPages = function() {
      return Math.ceil($scope.getData().length / $scope.pageSize);
    };

    $scope.$watch(
      "q",
      function(newValue, oldValue) {
        if (oldValue != newValue) {
          $scope.currentPage = 0;
        }
      },
      true
    );

    /* FIN PAGINACION*/
  })
  .filter("startFrom", function() {
    return function(input, start) {
      start = +start;
      return input.slice(start);
    };
  })
  .controller("TimeCtrl", function($scope, $interval) {
    var tick = function() {
      $scope.clock = Date.now();
    };
    tick();
    $interval(tick, 1000);
  })
  .filter("caltime", function() {
    return function(fecha, tiempo) {
      var fechaarr = fecha.split("/");
      var timearr = tiempo.split(":");
      var mes = fechaarr[1] - 1;
      var mes = fechaarr[1] - 1;
      moment.defineLocale("en-foo", {
        parentLocale: "es"
      });

      /*var hora = moment().hour();
      var min = moment().minute();*/
      var fechaHoy = moment([
        fechaarr[2],
        mes,
        fechaarr[0],
        timearr[0],
        timearr[1]
      ]);

      return fechaHoy.fromNow(true);
    };
  })
  .filter("transctime", function() {
    return function(fecha, tiempo, init, warning) {
      var fechaarr = fecha.split("/");
      var timearr = tiempo.split(":");
      var mes = fechaarr[1] - 1;
      var mes = fechaarr[1] - 1;
      moment.defineLocale("en-foo", {
        parentLocale: "es"
      });
      /*var hora = moment().hour();
      var min = moment().minute();*/
      var timetransc = moment([
        fechaarr[2],
        mes,
        fechaarr[0],
        timearr[0],
        timearr[1]
      ]);
      var timeresult = timetransc.fromNow(true);
      var arraytime = timeresult.split(" ");
      var minutos = arraytime[0];
      var txttiempo = arraytime[1];
      var minuto;
      var txtminuto;
      var clase;
      switch (minutos) {
        case "un":
          minuto = 1;
          break;
        case "unos":
          minuto = 1;
          break;
        default:
          minuto = minutos;
      }

      switch (txttiempo) {
        case "segundos":
          txtminuto = "minutos";

        default:
          txtminuto = txttiempo;
      }

      if (
        minuto <= init        &&
        txtminuto != "hora"   &&
        txtminuto != "horas"  &&
        txtminuto != "días"   &&
        txtminuto != "día"    &&
        txtminuto != "mes"
      ) {
        clase = "panel-success";
      } else if (
        minuto > init         &&
        minuto <= warning     &&
        txtminuto != "hora"   &&
        txtminuto != "horas"  &&
        txtminuto != "días"   &&
        txtminuto != "día"    &&
        txtminuto != "mes"
      ) {
        clase = "panel-warning";
      } else {
        clase = "panel-danger";
      }

      return clase;
    };
  })
  .filter("timeclass", function() {
    return function(fecha, tiempo, init, warning) {
      var fechaarr = fecha.split("/");
      var timearr = tiempo.split(":");
      var mes = fechaarr[1] - 1;

      moment.defineLocale("en-foo", {
        parentLocale: "es"
      });

      /*var hora = moment().hour();
      var min = moment().minute();*/
      var timetransc = moment([
        fechaarr[2],
        mes,
        fechaarr[0],
        timearr[0],
        timearr[1]
      ]);
      var timeresult = timetransc.fromNow(true);
      var arraytime = timeresult.split(" ");
      var minutos = arraytime[0];
      var txttiempo = arraytime[1];
      var minuto;
      var txtminuto;
      var clase;
      switch (minutos) {
        case "un":
          minuto = 1;
          break;
        case "unos":
          minuto = 1;
          break;
        default:
          minuto = minutos;
      }

      switch (txttiempo) {
        case "segundos":
          txtminuto = "minutos";

        default:
          txtminuto = txttiempo;
      }

      if (
        minuto <= init      &&
        txtminuto != "hora" &&
        txtminuto != "horas"&&
        txtminuto != "días" &&
        txtminuto != "día"  &&
        txtminuto != "mes"
      ) {
        clase = "success";
      } else if (
        minuto > init       &&
        minuto <= warning   &&
        txtminuto != "hora" &&
        txtminuto != "horas"&&
        txtminuto != "días" &&
        txtminuto != "día"  &&
        txtminuto != "mes"
      ) {
        clase = "warning";
      } else {
        clase = "danger";
      }

      return clase;
    };

    //CONTROLADOR APLICACIONES
  }).controller("appv", function ($scope, $http) {
    //variables
    $scope.listapps = [];
    $scope.prueba="Orueba";
    $scope.buscar="";
    
  
    var getAplicaciones= function(param) {
    /*************AJAX GET APLICACIONES************** */
    $http
      .post("class/Contposmesas.php", {
        getaplicaciones: true,
        param:param
      })
      .success(function(data, status, headers, config) {
        console.log(data);

        if(data.result){
          console.log(data.datos)
          $scope.listapps=data.datos;
        }else{
          $scope.listapps=[];
        }
    
        window.setTimeout(function () {
    
           data=data.datos;
          for (const key in  data) {
        
            
            if(data[key].estatus)
            {
              console.log(".btn"  +   data[key].tipoapp) 
              $(".btn"  +   data[key].tipoapp).css("display", "block");
              $(".icon" +   data[key].tipoapp).removeClass("fas fa-minus");
              $(".icon" +   data[key].tipoapp).addClass("fas fa-check");
              $(".cir"  +   data[key].tipoapp).removeClass("bgdesactivar");
              $(".cir"  +   data[key].tipoapp).addClass("bgactivo");
			  $("#etiqueta"  +   data[key].tipoapp).css("display", "none");
			  $("#etiquetaSi"  +   data[key].tipoapp).css("display", "block");   
			  $("#imagen"  +   data[key].tipoapp).css("display", "none");
			  $("#imagenSi"  +   data[key].tipoapp).css("display", "block");
			  $("#texto"  +   data[key].tipoapp).css("display", "none");
			  $("#textoSi"  +   data[key].tipoapp).css("display", "block");
			  $("#ins"  +   data[key].tipoapp).css("display", "none");			  
            }
                
            
          }



        }, 500);
     
       
      })
      .error(function(data, status, headers, config) {
        console.log(status);
      });
    }
    getAplicaciones('ALL');

    $scope.selectChanged = function() {

      if($scope.buscar.length>1){
        $scope.listapps = [];
        getAplicaciones($scope.buscar.toLowerCase());
      }else{
        getAplicaciones('ALL');
      }
      //alert($scope.buscar)

    };
    
    //APP GIFTCARD
}).controller("giftcard", function ($scope, $http) {
  //variables
  $scope.giftcard = [];

  

  var getGiftCard= function() {
  /*************AJAX GET APLICACIONES************** */
  $http
    .post("subpages/giftCard/consultasBD.php", {
      data: "getGifCard"

    })
    .success(function(data, status, headers, config) {
   
      $scope.giftcard= data;
   /*   if(data.result){
        console.log(data.datos)
        $scope.giftcard=data.datos;
      }else{
        $scope.giftcard=[];
      } 
  */

     
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
  }

  getGiftCard();


  $scope.GuardarGiftCard = function() {

    var validado = $("#form-add-card").valid();
    if(validado){
  


   var tactiva= $('input[name=activargift]:checked').val();
  if(tactiva){
      tactiva=true;
  }else{
      tactiva=false;
  }

  var parametros = {
      action:'addCard',
      codigo: $("#codigo").val(),
      saldo:$("#saldo").val(),
      activa:tactiva
    };
    
    $http
    .post("subpages/giftCard/consultasBD.php", {
      data:parametros

    })
    .success(function(data, status, headers, config) {
console.log(data)
      if(data.registrado){
        $("#codigo").val(' ');
  $("#saldo").val('0');
        getGiftCard();
        alertify.success(data.msj);
        $("#modalgift").hide();


      }else{
        alertify.error('Ocurrio un error intentalo de Nuevo');
    }


    
      
     
    })
    .error(function(err) {
      console.log(err);
      alertify.error('Ocurrio un error intentalo de Nuevo');
      $("#modalgift").hide();
      //location.reload();

    });

  }
  }


  $scope.ActivarGift = function() {

    getGiftCard();
  }
}).filter('conditional', function() {
  return function(condition, ifTrue, ifFalse) {
    return condition ? ifTrue : ifFalse;
  };
});

