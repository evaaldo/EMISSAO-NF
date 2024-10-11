function inputFields(form){
	
	var centro = form.getValue("centro");
	var codigoBP = form.getValue("codigoBP");
	var razaoSocial = form.getValue("razaoSocial");
	
	form.setValue("descritor",java.lang.String.format("%s - %s - %s",centro,codigoBP,razaoSocial));
}