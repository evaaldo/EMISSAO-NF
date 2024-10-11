function inputFields(form){
	
	var atividade = form.getValue("atividade");
	var centroEmissor = form.getValue("centroEmissor");
	var tipoOrdem = form.getValue("tipoOrdem").trim();
	var campos = [];
	
	if (centroEmissor != "") {
		campos.push(centroEmissor);
	}
		
	if (tipoOrdem != "") {
		campos.push(tipoOrdem);
	}
	
	campos.push(atividade);
	
	var descritor = campos.join(" - ");
	
	form.setValue("descritor",descritor);
}