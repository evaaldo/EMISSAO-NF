function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		"atividade":"Atividade",
		"tipoAprovador":"Selecionar usuário/papel/grupo",
		"aprovador":"Informe o usuário/papel/grupo:"
	}
	
	var atividade = form.getValue("atividade");
	var todasOrdens = form.getValue("todasOrdens");
	
	if (atividade == "Adm. de Vendas" && todasOrdens != "1") {
		campoObrigatorios["tipoOrdem"] = "Tipo de Ordem";
	} else {
		campoObrigatorios["centroEmissor"] = "Descrição do Centro Emissor";
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var centroEmissor = form.getValue("centroEmissor");
	var tipoOrdem = form.getValue("tipoOrdem");
	
	var constraints = [
  		DatasetFactory.createConstraint("atividade",atividade,atividade,ConstraintType.MUST),
  		DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.MUST),
  		DatasetFactory.createConstraint("tipoOrdem",tipoOrdem,tipoOrdem,ConstraintType.MUST)
  	];
	           	
   	if (formMode == "MOD") {
   		var documentId = form.getDocumentId();
   		constraints.push(DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT));
   	}
   	
   	var dsCadastroAprovadores = DatasetFactory.getDataset(
		"DSCadastroAprovadoresAdmVendasFiscalAssUnidade",
		["atividade","centroEmissor","tipoOrdem"],
		constraints,
		null
	).getMap().iterator();
	
	if (dsCadastroAprovadores.hasNext()) {
		throw 'Atividade, Descrição do Centro Emissor e Tipo de Ordem não podem se repetir.';
	}
}