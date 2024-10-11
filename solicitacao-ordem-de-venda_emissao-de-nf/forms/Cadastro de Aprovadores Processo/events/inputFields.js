function inputFields(form){
	
	var processo = form.getValue("processo");
	var centroEmissor = form.getValue("centroEmissor");
	var tipoOrdem = form.getValue("tipoOrdem");
	
	form.setValue("descritor",java.lang.String.format("%s - %s - %s",processo,tipoOrdem,centroEmissor));
}