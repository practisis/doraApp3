$(document).ready(function(){    
        $('#fechaDesde').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,        
            todayHighlight: true
        });

        $('#fechaHasta').datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,        
            todayHighlight: true
        });

        $(function () {
            $("#receptor").keyup(function () {
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
                            $("#livesearch").html("<div id='botonAlerta' style='margin:10px 15px;' class='alert alert-info'><strong>No se encontraron resultados.</strong></div>")
                        }

                    });
                }
            })
        });

        $(document).on("click", ".resultBuscarCliente", function () {
            document.getElementById("livesearch").style.display = "none";
            var data = $(this).attr("attrData");
            var data2 = data.split(",");
            $('#receptor').val(data2[0] + " - " + data2[1] + " " + data2[2]);
            $('#cedula').val(data2[0]);
            //$('#idCliente').val(data2[0]);
            //console.log(data.split(","))
        });

        $(document).on("click",".filtrar",function(){
            var f = $("#formfacturaglobal");
            f.submit();
        });

        $(document).on("click",".crear",function(){
            var f = $("#crearfactura");
            f.submit();
        });

        $(document).on("click",".fa-file-code",function(){
            var id = $(this).attr("data");
            $.ajax({
                type: "POST",
                url: "ajax/facturacion_global/consultas.php",
                data: {"id":id,"accion":"ver_xml"},
                statusCode: {
                    404: function () {
                        console.log("Ups! ha ocurrido un inconveniente, function");
                    }
                }
            }).done(function (resp) {     
                if(resp == "bien"){
                    var f = $("#generarxml");                                
                    f.submit();
                } 
            });
        });

        $(document).on("click",".timbrar",function(){   
            var factura = "";
            $(".detalle").each(function(){
                if(this.checked){
                    factura = $(this).val();                    
                }
            });              
            if(factura != ""){
                $(".containerloader").fadeIn('slow');
                $.ajax({
                type: "POST",
                url: "ajax/facturacion_global/consultas.php",
                data: {"factura":factura,"accion":"timbrar_facturas"},
                statusCode: {
                    404: function () {
                        console.log("Ups! ha ocurrido un inconveniente, function");
                    }
                }
            }).done(function (resp) {   
                $(".containerloader").fadeOut('slow');                  
                var resp = JSON.parse(resp);
                var uuid = resp.UUID[0];
                console.log(resp.UUID[0]);                
                if(resp.result == "error"){                    
                    $("#mensaje").addClass("alert-danger").html("Oops! Hubo un error...<div><ul><li>"+resp.msj+"</li></ul></div>").fadeIn('slow');
                    setTimeout(function(){
                        $("#mensaje").fadeOut().removeClass("alert-danger");
                    },5000);    
                }       
                if(resp.result == "success"){       
                    setTimeout(function(){
                        $("#mensaje").addClass("alert-success").html("Factura Global Timbrada...<div><ul><li>La factura fue timbrada con exito</li></ul></div>").fadeIn('slow');
                    },1000);    
                    $.ajax({
                        type: "POST",
                        url: "ajax/facturacion_global/consultas.php",
                        data: {"factura":factura,"uuid":uuid,"accion":"update_factura"},
                        statusCode: {
                            404: function () {
                                console.log("Ups! ha ocurrido un inconveniente, function");
                            }
                        }
                    }).done(function (resp) {     
                       if(resp == "bien"){
                        var f = $("#formfacturaglobal");
                        f.submit();
                       }
                    });                             
                    setTimeout(function(){
                        $("#mensaje").fadeOut().removeClass("alert-success");
                    },5000);    
                }       
            });     
            } else {
                var mensaje = "<li>Debe seleccionar al menos una factura para proceder a timbrar.</li>";
                $("#mensaje").addClass("alert-danger").html("Oops! Hubo un error...<div><ul>"+mensaje+"</ul></div>").fadeIn('slow');
                setTimeout(function(){
                    $("#mensaje").fadeOut().removeClass("alert-danger");
                },5000);
            }
        });
    });