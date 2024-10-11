function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		"processo":"Processo",
		"centroEmissor":"Descrição do Centro Emissor",
		"tipoOrdem":"Tipo de Ordem",
		"tipoAprovador":"Selecionar usuário/papel/grupo"
	}
	
	var tipoOrdem = form.getValue("tipoOrdem");
	
	if (tipoOrdem == "Y062") {
		
		campoObrigatorios["aprovadorTres"] = "Aprovador Três";
		campoObrigatorios["aprovadorRegional"] = "Aprovador Regional";
		campoObrigatorios["codAprovadorGestaoAdmVendas"] = "Aprovador Gestão Adm. de Vendas";
		
	} else if (/^(Y006|Y029)$/.test(tipoOrdem)) {
		
		// Label original: Aprovador ZINF - Positive Brands
		campoObrigatorios["aprovadorZINFPositiveBrands"] = "Aprovador O.V INFLUENCIADOR - Positive Brands";
		// Label original: Aprovador ZINF - Marketing 3C
		campoObrigatorios["aprovadorZINFMarketing3C"] = "Aprovador O.V INFLUENCIADOR - Marketing 3C";
		
	} else if (/^(Y024|Y025)$/.test(tipoOrdem)) {
		
		campoObrigatorios["aprovadorTributario"] = "Aprovador Tributário";
		campoObrigatorios["aprovador1"] = "Aprovador 1";
		
	} else {
		
		campoObrigatorios["aprovador1"] = "Aprovador 1";
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var centroEmissor = form.getValue("centroEmissor").trim();
	var processo = form.getValue("processo").trim();
	
	var constraints = [
  		DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.MUST),
  		//DatasetFactory.createConstraint("tipoOrdem",tipoOrdem,tipoOrdem,ConstraintType.MUST)
  		DatasetFactory.createConstraint("processo",processo,processo,ConstraintType.MUST)
  	];
	
	if (formMode == "MOD") {
		var documentId = form.getDocumentId();
		constraints.push(
			DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT)
		);
	}
	
	var dsCadastroAprovadores = DatasetFactory.getDataset(
		"DSCadastroAprovadoresProcesso",
		["centroEmissor"],
		constraints,
		null
	).getMap().iterator();
	
	if (dsCadastroAprovadores.hasNext()) {
		//throw 'Permitido informar um tipo de ordem por Centro emissor.';
		throw 'Permitido informar um processo por Centro emissor.';
	}
}