/*
 *	jQuery FullCalendar Extendable Plugin
 *	An Ajax (PHP - Mysql - jquery) script that extends the functionalities of the fullcalendar plugin
 *  Dependencies:
 *   - jquery
 *   - jquery Ui
 * 	 - jquery spectrum (since 2.0)
 *   - jquery timepicker (since 1.6.4)
 *   - jquery Fullcalendar
 *   - Twitter Bootstrap
 *  Author: Paulo Regina
 *  Website: www.pauloreg.com
 *  Contributions: Patrik Iden, Jan-Paul Kleemans, Bob Mulder
 *	Version 3.0, February - 2017
 *          3.1.2, February - 2018
 *          3.1.5, September - 2018
 *          3.1.5.2, January - 2019
 *  Fullcalendar 3.2.0
 *	Released Under Envato Regular or Extended Licenses
 */

!function(v,h){v.fn.extend({FullCalendar:function(e){var t="token="+v("#cal_token").val(),a={calendarSelector:"#calendar",loadingSelector:"#loading",lang:"es",token:"",ajaxJsonFetch:"subpages/reservas/listado_reservas.php?"+t,ajaxUiUpdate:"subpages/reservas/listado_actualizado.php?"+t,ajaxEventQuickSave:"subpages/reservas/save_reservas.php?"+t,ajaxEventDelete:"subpages/reservas/eliminar_reserva.php?"+t,ajaxEventEdit:"subpages/reservas/actualizar_reserva.php?"+t,ajaxEventExport:"includes/cal_export.php?"+t,ajaxRepeatCheck:"subpages/reservas/eliminar_reserva.php?"+t,ajaxRetrieveDescription:"subpages/reservas/detalle_reservacion.php?"+t,ajaxImport:"importer.php?"+t,jsonConfig:"includes/form.json",modalSelector:"#calendarModal",modalPromptSelector:"#cal_prompt",modalEditPromptSelector:"#cal_edit_prompt_save",formSearchSelector:"form#search",formAddEventSelector:"form#add_event",formFilterSelector:"form#filter-category select",formEditEventSelector:"form#edit_event",formSearchSelector:"form#search",newEventText:"Nueva Reservación",successAddEventMessage:"Successfully Added Event",successDeleteEventMessage:"Successfully Deleted Event",successUpdateEventMessage:"Successfully Updated Event",failureAddEventMessage:"Error al registrar la reserva intente de nuevo",failureDeleteEventMessage:"Failed To Delete Event",failureUpdateEventMessage:"Failed To Update Event",generalFailureMessage:"Error al ejecutar la acción",ajaxError:"Error al cargar el contenido",emptyForm:"Hay campos que deben ser llenados en el formulario",eventText:"Event: ",repetitiveEventActionText:"This is a repetitive event, what do you want to do?",isRTL:!1,weekNumberTitle:"W",defaultColor:"#587ca3",weekType:"agendaWeek",dayType:"agendaDay",listType:"listWeek",editable:!0,ignoreTimezone:!0,lazyFetching:!0,filter:!0,quickSave:!0,navLinks:!0,firstDay:0,gcal:!1,gcalUrlText:"View on Google",version:"modal",defaultView:"month",aspectRatio:1.35,weekends:!0,weekNumbers:!1,weekNumberCalculation:"iso",hiddenDays:[],theme:!1,themePrev:"circle-triangle-w",themeNext:"circle-triangle-e",titleFormatMonth:"",titleFormatWeek:"",titleFormatDay:"",columnFormatMonth:"",columnFormatWeek:"",columnFormatDay:"",timeFormat:"H:mm",weekMode:!0,allDaySlot:!0,allDayText:"all-day",axisFormat:"h(:mm)a",slotDuration:"00:30:00",minTime:"00:00:00",maxTime:"24:00:00",nextDayThreshold:"00:00:00",slotEventOverlap:!0,enableDrop:!0,enableResize:!0,savedRedirect:"index.php",removedRedirect:"index.php",updatedRedirect:"index.php",ajaxLoaderMarkup:'<div class="loadingDiv"></div>',prev:"left-single-arrow",next:"right-single-arrow",prevYear:"left-double-arrow",nextYear:"right-double-arrow",otherSource:!1,modalFormBody:v("#modal-form-body").html(),icons_title:!1,fc_extend:{},eventLimit:!0,eventLimitClick:"popover",palette:[["#0b57a4","#8bbdeb","#000000","#2a82d7","#148aa5","#3714a4","#587ca3","#a50516"],["#fb3c8f","#1b4f15","#1b4f15","#686868","#3aa03a","#ff0080","#fee233","#fc1cad"],["#7f2b14","#000066","#2b4726","#fd7222","#fc331c","#af31f2","#fc0d1b","#2b8a6d"],["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"]]},s=v.extend(a,e);1==s.gcal&&(s.weekType="",s.dayType="");var o={locale:s.lang,editable:s.editable,eventLimit:s.eventLimit,eventLimitClick:s.eventLimitClick,navLinks:s.navLinks,defaultView:s.defaultView,aspectRatio:s.aspectRatio,weekends:s.weekends,weekNumbers:s.weekNumbers,weekNumberCalculation:s.weekNumberCalculation,weekNumberTitle:s.weekNumberTitle,views:{month:{titleFormat:s.titleFormatMonth,columnFormat:s.columnFormatMonth},week:{titleFormat:s.titleFormatWeek,columnFormat:s.columnFormatWeek},day:{titleFormat:s.titleFormatDay,columnFormat:s.columnFormatDay}},isRTL:s.isRTL,hiddenDays:s.hiddenDays,theme:s.theme,buttonIcons:{prev:s.prev,next:s.next,prevYear:s.prevYear,nextYear:s.nextYear},themeButtonIcons:{prev:s.themePrev,next:s.themeNext},allDaySlot:s.allDaySlot,allDayText:s.allDayText,slotLabelFormat:s.axisFormat,slotDuration:s.slotDuration,minTime:s.minTime,maxTime:s.maxTime,slotEventOverlap:s.slotEventOverlap,fixedWeekCount:s.weekMode,timeFormat:s.timeFormat,header:{left:"prev,next",center:"title",right:"month,"+s.weekType+","+s.dayType+","+s.listType},monthNames:s.monthNames,monthNamesShort:s.monthNamesShort,dayNames:s.dayNames,dayNamesShort:s.dayNamesShort,buttonText:{today:s.today,month:s.month,week:s.week,day:s.day},ignoreTimezone:s.ignoreTimezone,firstDay:s.firstDay,lazyFetching:s.lazyFetching,selectable:s.quickSave,selectHelper:s.quickSave,eventStartEditable:s.enableDrop,eventDurationEditable:s.enableResize,nextDayThreshold:s.nextDayThreshold,loading:function(e){0==e?v(s.loadingSelector).hide():1==e&&v(s.loadingSelector).show()},select:function(e,t,a,o){calendar.view=o.name,"modal"==s.version&&(calendar.quickModal(e,t,a),v(s.calendarSelector).fullCalendar("unselect")),"month"!==o.name&&moment(e._d).format("HH:mm")!==moment(t._d).format("HH:mm")&&(v('#event-type option[value="false"]').prop("selected",!0),v("#event-type-select").show(),v("#event-type-selected").show())},eventSources:[s.otherSource,{url:s.ajaxJsonFetch}],eventDrop:function(e){var t=moment(e.start).format("YYYY-MM-DD"),a=moment(e.start).format("HH:mm"),o=moment(e.end).format("YYYY-MM-DD"),n=moment(e.end).format("HH:mm"),l=moment(e.end).isValid();null===e.end||"null"===e.end||0==l?Eend=t+" "+a:Eend=o+" "+n,EaD=e.allDay;var r="start="+t+" "+a+"&end="+Eend+"&id="+e.id+"&allDay="+EaD+"&original_id="+e.original_id;v.post(s.ajaxUiUpdate,r,function(e){v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")})},eventResize:function(e){var t=moment(e.start).format("YYYY-MM-DD"),a=moment(e.start).format("HH:mm"),o=moment(e.end).format("YYYY-MM-DD"),n=moment(e.end).format("HH:mm"),l=moment(e.end).isValid();null===e.end||"null"===e.end||0==l?(Eend=t+" "+a,EaD="false"):(Eend=o+" "+n,EaD=e.allDay);var r="start="+t+" "+a+"&end="+Eend+"&id="+e.id+"&allDay="+EaD+"&original_id="+e.original_id;v.post(s.ajaxUiUpdate,r,function(e){v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")})},eventRender:function(e,t,a){if(t.attr("href"))t.attr("data-toggle","modal"),t.attr("href","javascript:void(0)"),t.attr("onclick",'calendar.openModalGcal("'+encodeURI(e.title)+'","'+e.url+'");');else{if(1==s.icons_title){var o=t.find(".fc-title").text().replace(/\[(.*?)\]/gi,'<i class="$1"></i>');t.find(".fc-title").html(o)}var n=e.color,l=moment(e.start).format("YYYY-MM-DD"),r=moment(e.start).format("HH:mm"),d=moment(e.end).format("YYYY-MM-DD"),i=moment(e.end).format("HH:mm");if(0==moment(e.end).isValid())d=l,i=r;null!==e.end&&"month"==a.name&&("H:mm"!=s.timeFormat&&"h:mm"!=s.timeFormat||(timeformat=e.start.format("H:mm")+" - "+e.end.format("H:mm"),t.find(".fc-time").html(timeformat))),"modal"==s.version&&(t.attr("data-toggle","modal"),t.attr("href","javascript:void(0)"),t.attr("onclick",'calendar.openModal("'+encodeURI(e.title)+'","'+e.url+'","'+e.original_id+'","'+e.id+'","'+e.start+'","'+e.end+'","'+n+'","'+l+'","'+r+'","'+d+'","'+i+'");'))}}},n=v.extend(o,s.fc_extend);if(v(s.calendarSelector).fullCalendar(n),calendar.openModal=function(n,e,o,t,a,l,r,d,i,c,m){n=(1==s.icons_title&&(n=n.replace(/\[(.*?)\]/gi,'<i class="$1"></i>')),decodeURI(n)),v("#modal-form-body").hide(),v("#details-body").show(),calendar.title=n,calendar.id=o,calendar.rep_id=t,calendar.eventStart=a,calendar.eventEnd=l,ExpS=d+" "+i,ExpE=c+" "+m,v.ajax({type:"POST",url:s.ajaxRetrieveDescription,data:{id:calendar.id,mode:"edit"},cache:!1,beforeSend:function(){v(".loadingDiv").show(),v(".modal-footer").hide()},error:function(){v(".loadingDiv").hide(),alert(s.ajaxError);},success:function(e){v(".loadingDiv").hide(); var t=JSON.parse(e),nombre=t.nombre.replace("$null",""),fecha=t.fecha.replace("$null",""),hora=t.hora.replace("$null",""); $("#nombre").val(nombre); $("#fecha").val(fecha); $("#hora").val(hora); $("#hora_mostrar").val(hora); $("#mesas option[value='"+t.mesas+"']").prop("selected",true); $("#personas option[value='"+t.personas+"']").prop("selected",true); $("#area option[value='"+t.area+"']").prop("selected",true); $("#documento").val(t.cedula); $("#id_reservacion").val(t.id); $("#id_cliente").val(t.id_cliente); $("#observaciones").val(t.observaciones); var d=JSON.parse(JSON.stringify(t)); v("#details-body-title").html('Editar Reservación');var i="";v.getJSON(s.jsonConfig).then(function(e){if(0<v(".custom-fields").children().length&&0<Object.keys(d).length)for(var t in Object.keys(d).every(function(e){return""===d[e]||null===d[e]})||(i="<hr />"),d){var a=d[t],o=[];"file"==t&&(a=a!==h&&"undefined"!==a?'<a target="_blank" href="'+a+'">'+a+"</a>":"");var n=p(e,"<"+t+">");if(0<a.length||v.isArray(a)&&null!==a)if(v.isArray(a)&&null!==a){for(var l=0;l<a.length;l++)o.push(f(e,a[l]));i+="<h5><strong>"+n+"</strong></h5><p>"+o.join(", ")+'</p><p class="custom-field-sep" style="margin-bottom: 0; height: 2px;">&nbsp;</p>'}else i+="<h5><strong>"+n+"</strong></h5><p>"+a+'</p><p class="custom-field-sep" style="margin-bottom: 0; height: 2px;">&nbsp;</p>'}v("#details-body-content").html(r+i)}).fail(function(){v("#details-body-content").html(r)}),v("#delete-event, #save-changes").show(),v("#edit-event, #add-event,#export-event").hide(),v(".modal-footer").show(),v(s.modalSelector).modal("show");v("#modal-form-body").show();}}),v("#delete-event").off().on("click",function(e){calendar.remove(calendar.id),e.preventDefault()}),v("#export-event").off().on("click",function(e){calendar.exportIcal(calendar.id,calendar.title,calendar.description,ExpS,ExpE),e.preventDefault()}),v("#edit-event").off().on("click",function(e){document.getElementById("modal-form-body").reset(),v("#modal-form-body").html(s.modalFormBody),v("#export-event, #delete-event, #edit-event, #add-event").hide(),v("#save-changes").show().css("width","100%"),v("#details-body, #event-type-select").hide(),v("#repeat-type-select, #repeat-type-selected").hide(),v("#event-type-selected").show(),v("#modal-form-body").show(),v(s.modalSelector).modal("hide"),v("#modal-form-body :input").each(function(){var e=v(this).attr("name");switch(v(this)[0].tagName){case"SELECT":(a=calendar.data[e])!==h&&v('option[value="'+a.replace("&amp;","&")+'"]').attr("selected","selected");break;case"INPUT":e=e.replace(/\[.*?\]/g,"");var t=v(this).attr("type"),a=calendar.data[e];if("checkbox"==t&&a!==h)for(var o=a,n=0;n<o.length;n++)v('input[value="'+o[n]+'"]').prop("checked",!0);"radio"==t&&a!==h&&v('input[value="'+a+'"]').prop("checked",!0),"file"==t&&a!==h&&"undefined"!==a&&v(this).before('<p class="file-attachment"><a target="_blank" href="'+a+'">'+a+"</a></p>"),"text"==t&&(v('input[name="'+e+'"]').val(calendar.data[e]),v("input[name=title]").val(calendar.data.title),v("#colorp").spectrum("set",calendar.data.color),v("#startDate").val(d),v("input#startTime").val(i),v("#endDate").val(c),v("input#endTime").val(m));break;case"TEXTAREA":a=calendar.data[e];v('textarea[name="'+e+'"]').val(a),v('textarea[name="description"]').val(calendar.data.description_editable);break;default:v(':input[name="'+e+'"]').val(calendar.data[e])}}),v("#configuracion").off().on("click",function(e){console.log('prueba1');if(0==v("input[name=nombre]").val().length){alert(s.emptyForm);}else{ alert('prueba'); editFormData=new FormData;var t=v("#modal-form-body").serializeArray();v.each(t,function(e,t){if(v.isArray(t.value))for(var a=0;a<t.value.length;a++)editFormData.append(t.name+"[]",t.value[a]);else editFormData.append(t.name,t.value)});var a=v("#modal-form-body").find("input[type=checkbox]");v.each(a,function(e,t){v(this).is(":checked")||editFormData.append(v(t).attr("name"),"")}),v("#file")[0]&&editFormData.append("file",v("#file")[0].files[0]),calendar.update(o,editFormData)}e.preventDefault()})})},calendar.openModalGcal=function(e,t){v("#modal-form-body").hide(),v("#details-body").show(),v("#details-body-title").html(e),v("#details-body-content").html('<a target="_blank" href="'+t+'">'+s.gcalUrlText+"</a>"),v("#export-event, #delete-event, #edit-event").hide(),v("#save-changes, #add-event").hide(),v(".modal-footer").hide(),v(s.modalSelector).modal("show")},calendar.quickModal=function(e,t,a){document.getElementById("modal-form-body").reset(),v("#modal-form-body").html(s.modalFormBody);var o=moment(e).format("YYYY-MM-DD"),n=moment(e).format("HH:mm"),l=moment(t).format("YYYY-MM-DD"),r=moment(t).format("HH:mm");if(0==moment(t).isValid())l=o,r=n;v("#startDate").val(o),v("#startTime").val(n),v("#endDate").val(l),v("#endTime").val(r),v("#details-body").hide(),v("#event-type-select").show(),v("#event-type-selected").hide(),v("#repeat-type-select").show(),v("#repeat-type-selected").hide(),v("#export-event, #delete-event, #edit-event, #save-changes").hide(),v("#add-event").show().css("width","100%"),v(".modal-footer").show(),v("#modal-form-body").show(),v("#details-body-title").html(s.newEventText),v(s.modalSelector).modal("show"),v("#event-type").on("change",function(){var e=v(this).val();"false"==e?(v("#event-type-select").show(),v("#event-type-selected").show()):"true"==e&&(v("#event-type-select").show(),v("#event-type-selected").hide())}),v("#repeat_select").on("change",function(){var e=v(this).val();"no"!==e?(v("#repeat-type-select").show(),v("#repeat-type-selected").show()):"no"==e&&(v("#repeat-type-select").show(),v("#repeat-type-selected").hide())}),v("#add-event").off().on("click",function(e){(0==v("input[name=nombre]").val().length || 0==v("input[name=hora]").val().length)?alert(s.emptyForm):(formData=new FormData(v("#modal-form-body").get(0)),v("#file")[0]&&formData.append("file",v("#file")[0].files[0]),calendar.quickSave(formData)),e.preventDefault()})},calendar.quickSave=function(e){$("#add-event").html('Reservando por favor espere...'); v.ajax({url:s.ajaxEventQuickSave,data:e,type:"POST",cache:!1,processData:!1,contentType:!1,beforeSend:function(){v(".loadingDiv").show(),v(".modal-footer").show()},error:function(){$("#add-event").html('Reservar'); v(".loadingDiv").hide(),alert(s.ajaxError)},success:function(e){ $("#add-event").html('Reservas'); v(".loadingDiv").hide(),1==e?(v(s.modalSelector).modal("hide"),v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")):(alert(e),v(".modal-footer").show())}})},calendar.update=function(t,a){var e="id="+t;v.ajax({type:"POST",url:s.ajaxRepeatCheck,data:e,cache:!1,beforeSend:function(){v(".loadingDiv").show()},error:function(){v(".loadingDiv").hide(),alert(s.ajaxError)},success:function(e){v(".loadingDiv").hide(),"REP_FOUND"==e?(v(s.modalSelector).modal("hide"),v(s.modalEditPromptSelector+" .modal-header").html("<h4>"+s.eventText+calendar.title+"</h4>"),v(s.modalEditPromptSelector+" .modal-body-custom").css("padding","15px").html(s.repetitiveEventActionText),v(s.modalEditPromptSelector).modal("show"),v('[data-option="save-this"]').unbind("click").on("click",function(e){calendar.update_this(t,a),v(s.modalEditPromptSelector).modal("hide"),v(s.modalSelector).modal("hide"),e.preventDefault()}),v('[data-option="save-repetitives"]').unbind("click").on("click",function(e){calendar.update_this(t,a,"true"),v(s.modalEditPromptSelector).modal("hide"),v(s.modalSelector).modal("hide"),e.preventDefault()})):calendar.update_this(t,a)},error:function(e){alert(s.generalFailureMessage)}})},calendar.update_this=function(e,t,a){a===h?editFormData.append("id",e):(editFormData.append("id",e),editFormData.append("rep_id",calendar.rep_id),editFormData.append("method","repetitive_event")),v.ajax({type:"POST",url:s.ajaxEventEdit,data:t,cache:!1,processData:!1,contentType:!1,beforeSend:function(){v(".loadingDiv").show()},error:function(){v(".loadingDiv").hide(),alert(s.ajaxError)},success:function(e){v(".loadingDiv").hide(),""==e?(v(s.modalSelector).modal("hide"),v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")):alert(s.failureUpdateEventMessage)},error:function(e){alert(s.failureUpdateEventMessage)}})},calendar.remove=function(a){var t="id="+a;v.ajax({type:"POST",url:s.ajaxRepeatCheck,data:{id:a},cache:!1,beforeSend:function(){v(".loadingDiv").show()},error:function(){v(".loadingDiv").hide(),alert(s.ajaxError)},success:function(e){v(".loadingDiv").hide(),"REP_FOUND"==e?(v(s.modalSelector).modal("hide"),v(s.modalPromptSelector+" .modal-header").html("<h4>"+s.eventText+calendar.title+"</h4>"),v(s.modalPromptSelector+" .modal-body").html(s.repetitiveEventActionText),v(s.modalPromptSelector).modal("show"),v('[data-option="remove-this"]').unbind("click").on("click",function(e){calendar.remove_this(t),v(s.modalPromptSelector).modal("hide"),e.preventDefault()}),v('[data-option="remove-repetitives"]').unbind("click").on("click",function(e){var t="id="+a+"&rep_id="+calendar.rep_id+"&method=repetitive_event";calendar.remove_this(t),v(s.modalPromptSelector).modal("hide"),e.preventDefault()})):calendar.remove_this(t)},error:function(e){alert(s.generalFailureMessage)}})},calendar.remove_this=function(e){console.log(e); v.ajax({type:"POST",url:s.ajaxEventDelete,data:e,cache:!1,beforeSend:function(){v(".loadingDiv").show()},error:function(){ v(".loadingDiv").hide(),alert(s.ajaxError)},success:function(e){console.log(e);v(".loadingDiv").hide(),""==e?(v(s.modalSelector).modal("hide"),v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")):alert(s.failureDeleteEventMessage)}})},calendar.exportIcal=function(e,t,a,o,n){var l=o,r=n,d="&method=export&id="+encodeURIComponent(e)+"&title="+encodeURIComponent(t)+"&description="+encodeURIComponent(a)+"&start_date="+encodeURIComponent(l)+"&end_date="+encodeURIComponent(r);window.location=s.ajaxEventExport+d},calendar.calendarImport=function(){txt="import="+encodeURIComponent(v("#import_content").val()),v.post(s.ajaxImport,txt,function(e){alert(e),v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents"),v("#cal_import").modal("hide"),v("#import_content").val("")})},calendar.removeObjProp=function(e,t){for(var a=0;a<t.length;a++)e.hasOwnProperty(t[a])&&delete e[t[a]]},1==s.filter){function l(){value=v(s.formSearchSelector+" input").val(),construct="search="+encodeURIComponent(value),v.post("includes/loader.php",construct,function(e){v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")})}v(s.formFilterSelector).on("keyup",function(e){selected_value=v(this).val(),construct="filter="+encodeURIComponent(selected_value),v.post("subpages/reservas/listado_actualizado.php",construct,function(e){v(s.calendarSelector).fullCalendar("removeEvents"),v(s.calendarSelector).fullCalendar("refetchEvents")}),e.preventDefault()}),v(s.formSearchSelector).keypress(function(e){13==e.which&&(l(),e.preventDefault())}),v(s.formSearchSelector+" button").on("click",function(e){l()}),window.onbeforeunload=function(){var e=new FormData;e.append("search",""),e.append("filter",v(s.formFilterSelector+" option:selected").val()),navigator.sendBeacon("includes/loader.php",e)}}function p(e,t){var a="";for(var o in e)if(e.hasOwnProperty(o)){var n=e[o].fields;for(var l in n)n.hasOwnProperty(l)&&Object.keys(n).forEach(function(e){if(!n[e].includes(t)&&!n[e].includes(t.replace(">","[]>")))return!1;a=e})}return a}function f(e,t){var a=[];for(var o in e)e.hasOwnProperty(o)&&("object"==typeof e[o]?a=a.concat(f(e[o],t)):o==t&&a.push(e[o]));return a}}})}(jQuery);var editFormData,formData,calendar={};
