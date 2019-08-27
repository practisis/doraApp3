$(document).ready(function(){ 
        $('#fecha').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,        
            todayHighlight: true
        });        
    });

    $(document).on("click",".general",function(){
        var subtotal = parseFloat(0.00);
        var descuento = parseFloat(0.00);
        var iva = parseFloat(0.00);
        var otros_impuestos = parseFloat(0.00);
        var total = parseFloat(0.00);
        var subtotaliva = parseFloat(0.00);
        if(this.checked){
            $(".detalle").each(function(){
                $(this).prop("checked",true);
                var datos = $(this).attr("data");
                var dat = datos.split("&");
                subtotal = parseFloat(subtotal) + parseFloat(dat[0]);                
                descuento = parseFloat(descuento) + parseFloat(dat[1]);                
                iva = parseFloat(iva) + parseFloat(dat[2]);  
                if(dat[2] != 0){
                    subtotaliva = parseFloat(subtotaliva) + parseFloat(dat[0]);
                }              
                otros_impuestos = parseFloat(otros_impuestos) + parseFloat(dat[3]);                
                total = parseFloat(total) + parseFloat(dat[4]);                
            });
        } else {
            $(".detalle").each(function(){
                $(this).prop("checked",false);
            });
        }
        subtotal = number_format(subtotal,2,'.','');        
        $("#subtotal").val(subtotal);   
        descuento = number_format(descuento,2,'.','');
        $("#descuento").val(descuento);   
        iva = number_format(iva,2,'.','');
        $("#iva").val(iva);   
        otros_impuestos = number_format(otros_impuestos,2,'.','');
        $("#otros_impuestos").val(otros_impuestos);   
        total = number_format(total,2,'.','');
        $("#total").val(total);   
        subtotaliva = number_format(subtotaliva,2,'.','');
        $("#subtotaliva").val(subtotaliva);   
    });

    $(document).on("click",".detalle",function(){       
        var datos = $(this).attr("data");
        var dat = datos.split("&"); 
        var subtotaliva = $("#subtotaliva").val();
        if(this.checked){
            var subtotal = parseFloat($("#subtotal").val()) + parseFloat(dat[0]);
            var descuento = parseFloat($("#descuento").val()) + parseFloat(dat[1]);
            var iva = parseFloat($("#iva").val()) + parseFloat(dat[2]);
            if(dat[2] != 0){
                var subtotaliva = parseFloat(subtotaliva) + parseFloat(dat[0]);
            }       
            var otros_impuestos = parseFloat($("#otros_impuestos").val()) + parseFloat(dat[3]);
            var total = parseFloat($("#total").val()) + parseFloat(dat[4]);
        } else {        
            var subtotal = parseFloat($("#subtotal").val()) - parseFloat(dat[0]);
            var descuento = parseFloat($("#descuento").val()) - parseFloat(dat[1]);
            var iva = parseFloat($("#iva").val()) - parseFloat(dat[2]);
            if(dat[2] != 0){
                var subtotaliva = parseFloat(subtotaliva) - parseFloat(dat[0]);
            }
            var otros_impuestos = parseFloat($("#otros_impuestos").val()) - parseFloat(dat[3]);
            var total = parseFloat($("#total").val()) - parseFloat(dat[4]);
        }
        subtotal = number_format(subtotal,2,'.','');        
        $("#subtotal").val(subtotal);   
        descuento = number_format(descuento,2,'.','');
        $("#descuento").val(descuento);   
        iva = number_format(iva,2,'.','');
        $("#iva").val(iva);   
        otros_impuestos = number_format(otros_impuestos,2,'.','');
        $("#otros_impuestos").val(otros_impuestos);   
        total = number_format(total,2,'.','');
        $("#total").val(total); 
        subtotaliva = number_format(subtotaliva,2,'.','');
        $("#subtotaliva").val(subtotaliva); 
    });

    $(document).on("change","#fecha",function(){
        var fecha = $(this).val(); 
        $.ajax({
            type: "POST",
            url: "ajax/facturacion_global/consultas.php",
            data: {"fecha":fecha,"accion":"update_notas"},
            statusCode: {
                404: function () {
                    console.log("Ups! ha ocurrido un inconveniente, function");
                }
            }
        }).done(function(resp){                 
            $("#listnotas").html(resp);
        });
    });

    $(document).on("click",".regresar",function(){
        var f = $("#regresarfacturaglobal");
        f.submit();
    });    

    $(document).on("click",".crear",function(){ 
        if(validarFormulario()){ 
            var operaciones = "";
            $(".detalle").each(function(){
                if(this.checked){
                    operaciones = operaciones + $(this).attr("id") +"&";
                }
            });
            operaciones = operaciones.substr(0,operaciones.length-1);            
            $.ajax({
                type: "POST",
                url: "ajax/facturacion_global/consultas.php",
                data: {"accion":"guardar_factura","idcliente":$("#idcliente").val(),"total":$("#total").val(),"subtotal":$("#subtotal").val(),"descuento":$("#descuento").val(),"fecha":$("#fecha").val(),"subtotaliva":$("#subtotaliva").val(),"iva":$("#iva").val(),"otros_impuestos":$("#otros_impuestos").val(),"moneda":$("#moneda").val(),"operaciones":operaciones,"lugar_expedicion":$("#lugar_expedicion").val(),"regimen_fiscal":$("#regimen_fiscal").val()},
                statusCode: {
                    404: function () {
                        console.log("Ups! ha ocurrido un inconveniente, function");
                    }
                }
            }).done(function(resp){           
                if(resp=="bien"){
                    mensaje = "<li>La factura global fue creada con exito.</li>";
                    $("#mensaje").addClass("alert-success").html("Crear Factura...<div><ul>"+mensaje+"</ul></div>").fadeIn();
                    setTimeout(function(){
                        $("#mensaje").fadeOut().removeClass("alert-danger");                                                
                    },5000);                     
                    var fecha = $("#fecha").val(); 
                    $.ajax({
                        type: "POST",
                        url: "ajax/facturacion_global/consultas.php",
                        data: {"fecha":fecha,"accion":"update_notas"},
                        statusCode: {
                            404: function () {
                                console.log("Ups! ha ocurrido un inconveniente, function");
                            }
                        }
                    }).done(function(resp){                 
                        $("#listnotas").html(resp);
                    });
                    $("#subtotal").val("0.00");
                    $("#descuento").val("0.00");
                    $("#iva").val("0.00");
                    $("#otros_impuestos").val("0.00");
                    $("#total").val("0.00");
                    $("#subtotaliva").val("0.00");
                    $(".general").prop("checked",false);
                }
            }); 
        }
        
    });   

    function validarFormulario(){
        var validar = true;
        var mensaje = "";
        var cantidad_operaciones = "";                
        var fecha_documento = "1900-01-01";
        var fecha_actual = convertDateFormat($("#fecha_actual").val()); 
        $(".required").each(function(){
            if($(this).val() == ""){
                validar = false;
                $(this).css({"border":"1px solid rgb(211, 7, 7)"});
                mensaje = "<li>Falta llenar campos obligatorios.</li>";
            } else {
                $(this).css({"border":"1px solid rgb(204, 204, 204)"});                
            }            
        });        
        $(".detalle").each(function(){
            if(this.checked){
                cantidad_operaciones = parseInt(cantidad_operaciones) + 1;
                if(new Date($(this).attr("dat")).getTime() > new Date(fecha_documento).getTime()){
                    fecha_documento = $(this).attr("dat");
                }
            } 
        });   
        if($("#idcliente").val() == ""){
            validar = false;
            mensaje = mensaje+"<li>El receptor para crear la factura global debe ser Público General .</li>";
        }        
        if(cantidad_operaciones == 0){
            validar = false;
            mensaje = mensaje+"<li>Debe seleccionar al menos una operación para crear la factura global.</li>";
        }          
        var diff = new Date(fecha_actual).getTime() - new Date(fecha_documento).getTime();
        diff = diff/(1000*60*60);
        if(parseFloat(diff) > parseFloat(72.00)){
            validar = false;
            mensaje = mensaje+"<li>La operación mas reciente tiene más de 72 horas de cerrada.</li>";
        }
        if(validar){
            return true;            
        } else {
            $("#mensaje").addClass("alert-danger").html("Oops! Hubo un error...<div><ul>"+mensaje+"</ul></div>").fadeIn('slow');
            setTimeout(function(){
                $("#mensaje").fadeOut().removeClass("alert-danger");
            },5000);
            return false;
        }
    }

    function convertDateFormat(string) { 
        if(string!=""){
            var info = string.split('/').reverse().join('-');
            return info;
        }
    }

    function number_format(number,decimals,dec_point,thousands_sep) {
        number  = number*1;//makes sure `number` is numeric value
        var str = number.toFixed(decimals?decimals:0).toString().split('.');
        var parts = [];
        for ( var i=str[0].length; i>0; i-=3 ) {
            parts.unshift(str[0].substring(Math.max(0,i-3),i));
        }
        str[0] = parts.join(thousands_sep?thousands_sep:'');
        return str.join(dec_point?dec_point:'.');
    }