function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		"deposito":"Depósito",
		"descricaoDeposito":"Descrição do Depósito"
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var deposito = form.getValue("deposito").trim();
	var constraints = [
	    DatasetFactory.createConstraint("deposito",deposito,deposito,ConstraintType.MUST)
   	];
	
	if (formMode == "MOD") {
		var documentId = form.getDocumentId();
		constraints.push(
			DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT)
		);
	}
	
	var dsCadastroDeposito = DatasetFactory.getDataset(
	    "DSCadastroDeposito",
		["deposito"],
		constraints,
		null
	).getMap().iterator();
	
	if (dsCadastroDeposito.hasNext()) {
		throw 'O depósito "' + deposito + '" não pode se repetir.';
	}
}