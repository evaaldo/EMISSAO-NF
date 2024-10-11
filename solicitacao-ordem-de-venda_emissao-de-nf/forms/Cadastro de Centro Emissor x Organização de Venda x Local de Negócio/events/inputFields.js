function inputFields(form){
	
	var centroEmissor = form.getValue("centroEmissor");
	var descricaoCentroEmissor = form.getValue("descricaoCentroEmissor");
	
	form.setValue("descritor",java.lang.String.format("%s - %s",centroEmissor,descricaoCentroEmissor));
}