function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		"centro":"Centro",
		"codigoBP":"Código BP (Transportadora)",
		"razaoSocial":"Razão Social",
		"tipoPn":"Tipo PN"
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var centro = form.getValue("centro");
	//var codigoBP = form.getValue("codigoBP");
	
	var constraints = [
   		DatasetFactory.createConstraint("centro",centro,centro,ConstraintType.MUST)
   		//DatasetFactory.createConstraint("codigoBP",codigoBP,codigoBP,ConstraintType.SHOULD)
   	];
	
	if (formMode == "MOD") {
		var documentId = form.getDocumentId();
		constraints.push(DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT));
	}
	
	var dsCadastroTransportadores = DatasetFactory.getDataset(
		"DSCadastroTransportadoresInfluenciadores",
		["centro","codigoBP"],
		constraints,
		null
	).getMap().iterator();
	
	if (dsCadastroTransportadores.hasNext()) {
		throw 'O Centro emissor não pode se repetir.';
		//var cadastroTransportadores = dsCadastroTransportadores.next();
		//if (cadastroTransportadores.get("centro") == centro) {
		//	throw 'O Centro emissor não pode se repetir.';
		//}
		//else if (cadastroTransportadores.get("codigoBP") == codigoBP) {
		//	throw 'Permitido informar apenas uma transportadora (código BP) por Centro Emissor.';
		//}
	}
}