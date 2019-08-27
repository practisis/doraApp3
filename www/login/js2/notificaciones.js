

var pedidosActual =-1;
var notificar =true;
Push.Permission.get();

                   
//iniciar worker
if (window.Worker) { //Chequea si el navegador soporta el api Worker

var worker = new Worker("workers.js");

//worker.postMessage('hola mundo!');


worker.onmessage = function(evento){
console.log(evento.data)
var result =evento.data;

if(result)
pushn({num:1});
}

}else{  //entra aqui si abre el worker

// Iniciamos el ciclo de consultas con una primera petición que esperará nuevos datos

setInterval(()=>{ 
consultar((data)=>{


if(pedidosActual !=-1 &&  data.num > pedidosActual){
   
    pushn(data,audio);
    //console.log("Hay un nuevo registro");
    pedidosActual=data.num
    notificar=true;
}else if(data.num >0 && data.data.tiempo==5 && notificar){

    pushn(data,audio);
    pedidosActual=data.num
    notificar=false;

}else if(data.num >0 && data.data.tiempo==10 && notificar){

  pushn(data,audio);
    pedidosActual=data.num
    notificar=false;

}else if(data.num >0 && data.data.tiempo >=14 && notificar){

  pushn(data,audio);
    pedidosActual=data.num
    notificar=false;
}else{
    pedidosActual=data.num


}
   

});

}, 7000);

}

 function consultar(calb){
    

    var parametros = {
        action: 'numpedidos',
    };
    $.ajax({
        url: "./ajax/callcenter/ConsultaPedidos.php",
        type: "GET",
        dataType: "JSON",
        data: parametros,
        beforeSend: function () {
        }
    })
        .done(function (data) {
                //calb(data);
        });
 
};

function pushn(data){
        Push.create("#"+data.num+" Nuevo pedido a Domicilio", {
        body: "Haga click aqui para ver los pedidos",
        icon: './images/loginlogo.png',
        requireInteraction:true,
    
        silent:false,
    
        onClick: function () {
            notificar=false;
            mostrarModalDocilios();
            window.focus();
            this.close();
        }
    });
    var audio = new Audio();
    audio.src="./js/SD_ALERT_24.mp3";
    
            audio.play();
       
          
       
      
    

   

}
function mostrarModalDocilios(){

    var parametros = {
        action: 'getPedidos',
    }; 
    $.ajax({
        url: "./ajax/callcenter/ConsultaPedidos.php",
        type: "GET",
        dataType: "JSON",
        data: parametros,
        beforeSend: function () {
        }
    })
        .done(function (data) {


            var html="";
            $("#tablaPedidos > tbody:last").html("");
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                var formaPago = "Paypal";
         
                if (element.id_forma_pago == 2) {
                    formaPago = "Tarjeta de Credito";
                 
        
                    } else if (element.id_forma_pago == 1) {
                  
                    formaPago = "Efectivo al Entregar";
                    }
                    
             
                html=' <tr><th scope="row">'+ (index+1) +'</th>'+
                '<td>'+element.nombre+' ' +element.apellido+'</td>'+
               '<td>'+formaPago+'</td>'+
                '<td> <button type="button" onclick="mostrarConsumosDomicilios('+element.id+')" class="btn btn-info">Facturar</button></td>'+
             ' </tr>';
                $("#tablaPedidos > tbody:last").append(html);
            }
       
     

                $("#pDomicilios").modal('show');
        });
    


}

function mostrarConsumosDomicilios(id){

    var parametros = {
        action: 'getPedidosCallCenter',
        id:id
    };
    $.ajax({
        url: "./ajax/callcenter/ConsultaPedidos.php",
        type: "GET",
        dataType: "JSON",
        data: parametros,
        beforeSend: function () {
        }
    })
        .done(function (data) {
         
 

       
            var html="";
            $(".tabla-facturacion > tbody:last").html("");
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
             
                html+='<tr id="trFactura'+element.id+'" class="cont'+element.id+' guardado" attrId="'+element.id+'" attrUnique="'+element.id+'" attrIva="'+element.impuesto+'" attrIdFormu="'+element.id+'" attrServicio="0">'+
                '<td scope="col" class="p-8-20" style="width: 30%"><input disabled class="nominacionesUS form-control text-center" id="textCantidadProd'+element.id+'" type="text" attrPrecio="'+element.p1+'" value="'+element.cantidad+'" data-desc="'+conversionDecimales(+element.cantidad*element.p1).toFixed(2)+'" /></td>'+
                '<td scope="col" id="tdTitleFactura'+element.id+'" class="p-8-20 tdTitleFactura'+element.id+'" attrUnique="'+element.id+'" attrTitle="'+element.formulado+'" attrId="'+element.id+'" attrIdFormu="'+element.id+'" attrPrecio="'+conversionDecimales(+element.cantidad*element.p1).toFixed(2)+'" attrCant="'+element.cantidad+'" style="width: 30%">'+element.formulado+'</td>'+
                '<td scope="col" class="tdTotalFactura ColumSubTotal" style="width:30%">$<span class="classTdTotalFactura" id="tdTotalFactura'+element.id+'" attrIva="'+element.impuesto+'" attrServicio="0" data-precio="'+conversionDecimales(parseFloat(element.p1).toFixed(2))+'" attrImpuesto="id:1,id_formulados:undefined,nombre:IVA,valor:'+element.impuesto+'|." data-desc="'+conversionDecimales(+element.cantidad*element.p1).toFixed(2)+'">'+conversionDecimales(+element.cantidad* element.p1).toFixed(2)+'</span></td>'+
                    '<td scope="col" style="width:10%"><a onclick="ElimiarConsumo(this)" data-id="'+element.id+'" data-numcomponente="0" id="idconsumos"><i class="fa fa-times " attrid="30"></i></a></td></tr>';
       

           
            }
 
 
            $("#pDomicilios").modal('hide');
                            
            $("#contenCantProductos").html("");
            $("#contenCantProductos").append(html);
            $("#color-2").attr('checked', true);
            $("#savePedido").val(0);
            $("#id_callcenter").val(id);
            


            setTimeout(()=>{ 
            contadorTotalTablaFactura();
        }, 1000);
        
        var datos=data[0];
        $("#nombreDomicilio").val(datos.nombre);
        $("#apellidoDomicilio").val(datos.apellido);
        $("#cedulaDomicilio").val(datos.cedula);
        $("#telefonoDomicilio").val(datos.telefono);
     
        $("#emailDomicilio").val(datos.email);
 
        $("#direccionDomicilio").val(datos.direccion);

              
        });
    


}