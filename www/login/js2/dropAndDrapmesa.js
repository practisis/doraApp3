// *********************DROP**************************************

interact('.dropzone').dropzone({
	// only accept elements matching this CSS selector
	accept: '.draggable',
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,

	// listen for drop related events:

	ondropactivate: function (event) {
		// add active dropzone feedback

		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		//alert("ondragenter");

		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
		//console.log(draggableElement.dataset.value);

		// feedback the possibility of a drop
		dropzoneElement.classList.add('rotar');
		window.setTimeout(function () {
			dropzoneElement.classList.add('rotar50');

			draggableElement.classList.add('two');
		}, 400);

		window.setTimeout(function () {
			dropzoneElement.classList.add('rotar0');
			dropzoneElement.classList.remove('rotar0');
			dropzoneElement.classList.remove('rotar');
			dropzoneElement.classList.remove('rotar50');
			draggableElement.classList.remove('two');
		}, 600);
		dropzoneElement.classList.add('colorremoveitem');
		draggableElement.classList.remove('colorremoveitem');
		// dropzoneElement.classList.add('two');

		//draggableElement.textContent = 'Dragged in';
		//varifico si se encuentra activa
		if (draggableElement.dataset.activa) {
			alertify.warning('Esta Mesa Se Encuentra Activa, No Se puede Eliminar');
		} else {
			if (draggableElement.dataset.value) {
				Deletemesa(draggableElement.dataset.value);

/*				window.setTimeout(function () {
					location.reload();
				}, 2000);
*/
				window.setTimeout(function () {
					draggableElement.remove();
				}, 500);
			} else {
				window.setTimeout(function () {
					draggableElement.remove();
				}, 500);
			}
		}
	},
	ondragleave: function (event) {
		// alert(" ondragleave");

		// remove the drop feedback style
		event.target.classList.remove('colorremoveitem');
		event.relatedTarget.classList.remove('colorremoveitem2');
		//event.relatedTarget.textContent = 'Dragged out';
	},
	ondrop: function (event) {
		//console.log(event);
		event.relatedTarget.textContent = 'Dropped';
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback

		event.target.classList.remove('draggable');
		event.target.classList.remove('drop-target');
	},
});

// ***********************************************************

var marginl = [];
var mesasnew = [];
$('#boton').click(function () {

	var i = 0;
	$('.contentdiv div').each(function () {
		var vx = this.attributes[3];
		//console.log(this.dataset);
		//  console.log(vx);
		//console.log(this.attributes[3].value)
		console.log(this.attributes);
		if (this.dataset.value) {
			marginl.push(this.dataset);
		}

		if (this.dataset.mesa) {
			mesasnew.push(this.dataset);
		}

		// console.log(i);
		i++;
	});

	//console.log(marginl);
	// console.log(datosmesas);
	//console.log(marginl) ;
	// var datos=JSON.parse(JSON.stringify(marginl[0].value));
	//console.log( datos);
	for (var i in marginl) {
		if (marginl[i].value && !marginl[i].mesa) {
			//console.log(marginl[i].value)
			updatePositionMesas(marginl[i].value, marginl[i].x, marginl[i].y, marginl[i].capacidad);
		}
	}

	for (var i in mesasnew) {
		if (mesasnew[i].mesa) {
			console.log('Nueva mesa x=' + mesasnew[i].x + 'mesa y=' + mesasnew[i].y + 'capacidad=' + mesasnew[i].capacidad);
			AddNewmesa(mesasnew[i].tipo, mesasnew[i].x, mesasnew[i].y, mesasnew[i].nombre, mesasnew[i].capacidad);

			// console.log(mesasnew[i].mesa)

			//updatePositionMesas(marginl[i].value,marginl[i].x,marginl[i].y);
		}
	}
	alertify.success('Se Guardaron los Cambios Exitosamente');
	window.setTimeout(function () {
		//alert($('#agenteinicio').length);
		if($('#agenteinicio').length>0){
			finalizar();
		}else{
/*			location.reload();
*/		}
		
	}, 3000);
	//  marginlnew.push(datax);
	//console.log( datax);
	marginl = [];
	mesasnew = [];

});

var element = document.getElementById('grid-snap'),
	x = 0,
	y = 0;

/*
$('.draggablecopy').draggable({
	helper: 'clone',
	revert: 'invalid',
	opacity: '0.5',
});

$(' .contentdiv').droppable({
	accept: $('.draggablecopy'),
	hoverClass: 'dropHover',


	
	drop: function(ev, ui) {
		var target = ev.target;
		var totalmesa = $('#totalmesas').val();
		totalmesa++;
		$('#totalmesas').val(totalmesa);
		var clase="mesanueva"+totalmesa;
		$(ui.draggable)
			.clone()
			.appendTo(this)
			.addClass('draggable objnew '+clase);
		$(this).removeClass('draggablecopy');

	var div=$(ui.draggable).attr('data-esmesa');
	$("."+clase).attr('data-idmesa',totalmesa);
		console.log(div);
		
if(div==="true")
	
	
		$('#modal-base').modal('show');
	},
});
/* $(".tab-content ").droppable({
        accept: $(".objnew"),
        hoverClass: "dropHover",
        
        drop: function (ev, ui) {
     
     


     
            
       
    
        }

    }) */

// *********************DRAP**************************************

// target elements with the "draggable" class
interact('.draggable').draggable({
	accept: '.draggablecopy',

	snap: {
		targets: [interact.createSnapGrid({
			x: 20,
			y: 20
		})],
		range: Infinity,
		relativePoints: [{
			x: 0,
			y: 0
		}],
	},
	// enable inertial throwing
	inertia: true,
	// keep the element within the area of it's parent

	restrict: {
		restriction: 'parent',
		endOnly: true,
		elementRect: {
			top: 0,
			left: 0,
			bottom: 1,
			right: 1
		},
	},

	// enable autoScroll
	autoScroll: true,
	activeClass: 'drop-area',

	// call this function on every dragmove event
	onmove: dragMoveListener,
	// call this function on every dragend event
	onend: function (event) {
		//console.log(event.target);
		var elemento = $(event.target);
		var posicion = elemento.position();
		//	console.log('left: ' + posicion.left + ', top: ' + posicion.top);
		var textEl = event.target.querySelector('p');

		//event.target.classList.remove('objnew');

		var left = Math.round(posicion.left);
		// textEl && (textEl.textContent='left: '+left );
		/*textEl && (textEl.textContent =
        ''
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
			.toFixed(2) + 'px'); */

		$(".rating2").css("visibility", "visible");
		$(".rating").css("visibility", "visible");
		$("#tperm02").css("visibility", "visible");

	},
});

function dragMoveListener(event) {
	var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// translate the element
	target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
	//$(".rating2").css("display","none");
	//$(".rating").css("display","none");
	//console.log('event left: ' + x + ', eventtop: ' + y);

	$(".rating2").css("visibility", "hidden");
	$(".rating").css("visibility", "hidden");
	$("#tperm02").css("visibility", "hidden");

	// update the posiion attributes
	var totalm = $('#totalmesas').val();
	//target.setAttribute('data-idmesa', totalm);
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

function CapacidadMesas() {
	var totalm = $('#totalmesas').val();
	var clase = ".mesanueva" + totalm;
	var cap = $('.capacidadmesas').val();
	var name = $("#nombreMesaS").val();

	$(clase).attr('data-capacidad', cap);
	$('#modal-base').modal('hide');
	$(clase).attr('data-nombre', name);
	$(clase+" > p").html(name);
	$('#totalmesas').val(parseInt(totalm)+1);
	$("#nombreMesaS").val("");
	$(".capacidadmesas").val(0);
}

function deleteMesasNew(){
	var totalm = $('#totalmesas').val();
	$("#nombreMesaS").val("");
	$(".capacidadmesas").val(0);
	$(".mesanueva"+totalm).remove();	
}

function agregarCapacidad(cap) {
	var mesaselct = $(cap).attr('data-mesaselect');
	var idtotal = $(cap).data('idtotal');
	var accion = $(cap).data('accion');
	if (accion == "sumar") {

		var capacidad = $("#" + idtotal).val()
		capacidad++;
		$("#" + idtotal).val(capacidad);
		$("#" + mesaselct).attr('data-capacidad', capacidad);



	} else {
		var capacidad = $("#" + idtotal).val()
		capacidad--;
		$("#" + idtotal).val(capacidad);
		$("#" + mesaselct).attr('data-capacidad', capacidad);
	}

}


$(document).on("click",".rating3",function(){
	var id = $(this).attr("attrId"),
	name = $("#nameMesas"+id).val();	
	if($("#nameMesas"+id).hasClass("oculto")){
		var tipo = "edit";
		$("#edit"+id).removeClass("fa-pencil").addClass("fa-save");
		$("#nameMesas"+id).addClass("mostrar").removeClass("oculto").attr("disabled",false);
		$("#pencilName"+id).removeClass("penEdit").addClass("penSave");
	}else{
		var tipo = "save";
		$("#edit"+id).removeClass("fa-save").addClass("fa-pencil");
		$("#nameMesas"+id).addClass("oculto").removeClass("mostrar").attr("disabled",true);
		$("#pencilName"+id).addClass("penEdit").removeClass("penSave");
	}

	if(tipo == "save"){
	    var datos = $.param({"validar": true,"function": "editar_mesa","id":id,"name":name});
	    $.ajax({
	        type: "POST",
	        url: "subpages/facturacion/nubepos/ajax/editarMesas.php",
	        data: datos,
	        statusCode: {
	            404: function () {
	                console.log("Ups! ha ocurrido un inconveniente, function denominacion_moneda");
	            }
	        }
	    }).done(function (resp) {
			alertify.success('Se Guardaron los Cambios Exitosamente');
	    });

	}
/**/
})
