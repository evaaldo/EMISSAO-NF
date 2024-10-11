function inputFields(form){
	
	var tipoOrdem = form.getValue("tipoOrdem");
	var processo = form.getValue("processo");
	var descritores = [];
	
	if (null != tipoOrdem && tipoOrdem != "") {
		descritores.push(tipoOrdem);
	}
	
	descritores.push(processo);
	
	form.setValue("descritor",descritores.join(" - "));
}