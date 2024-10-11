function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		"canalDistribuicao":"Canal de Distribuição",
		"descricaoCanalDistribuicao":"Descrição do Canal de Distribuição"
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var canalDistribuicao = form.getValue("canalDistribuicao").trim();
	var constraints = [
	    DatasetFactory.createConstraint("canalDistribuicao",canalDistribuicao,canalDistribuicao,ConstraintType.MUST)
   	];
	
	if (formMode == "MOD") {
		var documentId = form.getDocumentId();
		constraints.push(
			DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT)
		);
	}
	
	var dsCadastroCanalDistribuicao = DatasetFactory.getDataset(
	    "DSCadastroCanalDistribuicao",
		["canalDistribuicao"],
		constraints,
		null
	).getMap().iterator();
	
	if (dsCadastroCanalDistribuicao.hasNext()) {
		throw 'O canal de distribuição "' + canalDistribuicao + '" não pode se repetir.';
	}
}