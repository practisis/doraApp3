	onDeviceReady();
	function onDeviceReady(){
		var db = window.openDatabase("Database", "1.0", "appDora", 200000);
		db.transaction(iniciaDB, errorCB, successCB);
		console.log(db);
	} 

	function iniciaDB(tx){
		var db = window.openDatabase("Database", "1.0", "appDora", 200000);
		tx.executeSql('CREATE TABLE IF NOT EXISTS reportess (idabajo integer primary key AUTOINCREMENT,id integer UNIQUE , nombre text,descripcion ,inputs text,campo_combo text ,combo_local integer ,todos_local integer )');
		
	}

	function errorCB(err){
		console.log("Error processing SQL: "+err.message);
	}

	function successCB() {
		console.log("success!");
	}

	function verReporteIndividual(id){
		var idEmp = parametroURL2('idEmp');
		var direccion = parametroURL2('direccion');
		var empresa = parametroURL2('empresa'); 
		var ruta = 'reportes.html';
		window.location = ""+ruta+"?idEmp="+idEmp+"&direccion="+direccion+"&empresa="+empresa+"&idr="+id+" ";
	}
	
	$('.datepicker').datepicker({
		showAnim: 'slideDown',
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
	});
	
	
	function verReporteID(idr){
		var detectorInternet = $('#detectorInternet').val();
		if(detectorInternet == 1){
			var d = new Date();

			var month = d.getMonth()+1;
			var day = d.getDate();

			var output1 = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day; 
			
			var d2 = new Date();

			var month2 = d2.getMonth();
			var day2 = d2.getDate();
			
			var output2 = d2.getFullYear() + '/' + (month2<10 ? '0' : '') + month2 + '/' + (day2<10 ? '0' : '') + day2; 


			$('#cargaReportes').html('');
			var db = window.openDatabase("Database", "1.0", "appDora", 200000);
			db.transaction(function(tx){
				tx.executeSql('select id , nombre , inputs , campo_combo , combo_local , todos_local from reportess where id = ? order by nombre asc',[idr],function(tx,results){
					var registro = results.rows.length;
					//alert(registro);
					
					var tr = '';
					for(var j = 0; j < registro; j++){
					
						var row1 = results.rows.item(j);
						
						var nombre = row1.nombre;
						var id = row1.id;
						var inputs = row1.inputs;
						var campo_combo = row1.campo_combo;
						var combo_local = row1.combo_local;
						var todos_local = row1.todos_local;
						
						var expInputs = inputs.split('@');
						var n=0;
						tr += "<div class='col-md-12'>\
									<label>Nombre : </label> "+nombre+" \
								</div><br>";
								
						$.each(expInputs, function(key, val) {
							// alert(val[0]);
							if(val[0] == 1){
								if(n==0){
									tr += "	<div class='col-md-2'>\
												<label>Fecha Inicial:</label><br/><input type='text' id='fecha_inicial' class='form-control datepicker' name='fecha_inicial' readonly style='font-size:12px;font-family: Arial;' value='"+output2+"'/>\
											</div>";
								}else if (n==1){
									tr += "	<div class='col-md-2'>\
												<label>Hora Inicial:</label><br/><input type='text' id='hora_inicial' class='form-control' name='hora_inicial' style='font-size:12px;font-family: Arial;' value='00:00:00'/>\
											</div>";
								}else if (n == 2){
									tr += "	<div class='col-md-2'>\
												<label>Fecha Final:</label><br/><input type='text' id='fecha_final' class='form-control datepicker' name='fecha_final' style='font-size:12px; font-family: Arial;' readonly value='"+output1+"'/>\
											</div>";
								}else if (n == 3){
									tr += "	<div class='col-md-2'>\
												<label>Hora Final:</label><br/><input type='text' id='hora_final' class='form-control' name='hora_final' style='font-size:12px;font-family: Arial;' value='23:59:59'/>\
											</div>";
								}
								
							}
							n++;
						}); 
						tr += "<div id = 'recibeCampoCombo' >!</div>";
					}
					
					tr += "	<div class='col-md-2' style = 'text-align:right;'><br>\
								<button type='button' style='margin:3px;' class='btn btn-danger' onclick='Ejecutar("+idr+");'>EJECUTAR</button>\
								<button type='button' style='margin:3px;' class='btn btn-default' onclick='enviarRuta(2)'>REGRESAR</button>\
							</div>";
					$('#cargaReportes').html(tr);
					
				},errorCB,successCB);
			});
		}else{
			swal ( "Oops" ,  "No hay conexión a internet" ,  "error" )
		}
	}
	
	function Ejecutar(idr){
		var idEmp = parametroURL('idEmp');
		var direccion = parametroURL('direccion'); 
		var fecha_inicial = $('#fecha_inicial').val();
		var hora_inicial = $('#hora_inicial').val();
		var fecha_final = $('#fecha_final').val();
		var hora_final = $('#hora_final').val();
		var campocombo = $('#campocombo').val();
		var comboLocal = $('#comboLocal').val();
		var ident = 2;
		var ejecutarquery = 1;
		$('#recibeReporteDetalle').html('<center><h3>Espere cargando informacion!!!</h3></center>');
		$('#cargando').css('display','block');
		$('#cargando2').css('display','block');
		$.post("https://www.practisis.online/contabilidad/apiDoraApp/apiReportes.php",{ 
			idr : idr , idEmp : idEmp , direccion : direccion , ident : ident , fecha_inicial : fecha_inicial , hora_inicial : hora_inicial , 
			hora_final : hora_final , campocombo : campocombo , comboLocal : comboLocal , fecha_final : fecha_final , ejecutarquery : ejecutarquery
		}).done(function(data){
			// alert(data)
			$('#cargando').css('display','none');
			$('#cargando2').css('display','none');
			if(data == 'error'){
				alert ( "Oops , hay un error con el reporte que deseas ver, por favor contactate con soporte para que solucionen el inconveniente " );
			}else{
				$('#recibeReporteDetalle').html(data);
			}
		}).fail(function(xhr, status, error) {
			$('#cargando').css('display','none');
			$('#cargando2').css('display','none');
			swal ( "Oops" ,  "Hay un error en tu reporte  "+status+" "+error+" " ,  "error" )
		});	
	}
	function verReportes_(){
		var detectorInternet = $('#detectorInternet').val();
		if(detectorInternet == 1){
			$('#boletos_entrados').html('<tr><td colspan = "3" >Espere Cargando </td></tr>');
			var db = window.openDatabase("Database", "1.0", "appDora", 200000);
			db.transaction(function(tx){
				tx.executeSql('select id , nombre from reportess order by nombre asc',[],function(tx,results){
					var registro = results.rows.length;
					var tr = '';
					tr += '<tr  ><th colspan = "3" style = "border :1px solid #4a4a4a" >Reportes </th></tr>\
							<tr><th style = "border :1px solid #4a4a4a" >Id</th><th style = "border :1px solid #4a4a4a" >Nombre</th><th style = "border :1px solid #4a4a4a" >Opciones</th></tr>\
						';
					for(var j = 0; j < registro; j++){
					
						var row1 = results.rows.item(j);
						var nombre = row1.nombre;
						var id = row1.id;
						tr += '	<tr class = "localidadesBajadas" >\
									<td style = "border :1px solid #4a4a4a" >\
										'+id+'</td>\
									<td style = "text-align:left !important;border :1px solid #4a4a4a">\
										'+nombre+'\
									</td>\
									<td style = "text-align:center;border :1px solid #4a4a4a">\
										<button type="button" class="btn btn-default" onclick = "verReporteIndividual('+id+')" >Ver</button>\
									</td>\
								</tr>';
					}
					$('#boletos_entrados').html(tr);
					
				},errorCB,successCB);
			});
		}else{
			swal ( "Oops" ,  "No hay conexión a internet" ,  "error" )
		}
	}
