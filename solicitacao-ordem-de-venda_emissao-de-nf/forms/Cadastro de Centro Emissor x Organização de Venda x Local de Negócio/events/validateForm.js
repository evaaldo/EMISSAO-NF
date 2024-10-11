function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		"centroEmissor":"Centro Emissor",
		"descricaoCentroEmissor":"Descrição do Centro Emissor",
		"codigoOrganizacaoVenda":"Cód. Organização de Venda",
		"organizacaoVenda":"Organização de Venda",
		"localNegocio":"Local de Negócio"
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var centroEmissor = form.getValue("centroEmissor");
	var descricaoCentroEmissor = form.getValue("descricaoCentroEmissor");
	var codigoOrganizacaoVenda = form.getValue("codigoOrganizacaoVenda");
	var organizacaoVenda = form.getValue("organizacaoVenda");
	var localNegocio = form.getValue("localNegocio");
	
	var constraints = [
   		DatasetFactory.createConstraint("centroEmissor",centroEmissor,centroEmissor,ConstraintType.MUST),
   		DatasetFactory.createConstraint("descricaoCentroEmissor",descricaoCentroEmissor,descricaoCentroEmissor,ConstraintType.MUST),
   		DatasetFactory.createConstraint("codigoOrganizacaoVenda",codigoOrganizacaoVenda,codigoOrganizacaoVenda,ConstraintType.MUST),
   		DatasetFactory.createConstraint("organizacaoVenda",organizacaoVenda,organizacaoVenda,ConstraintType.MUST),
   		DatasetFactory.createConstraint("localNegocio",localNegocio,localNegocio,ConstraintType.MUST)
   	];
	
	if (formMode == "MOD") {
		var documentId = form.getDocumentId();
		constraints.push(DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT));
	}
	
	var dsCadastroCentro = DatasetFactory.getDataset(
		"DSCadastroCentroEmissorOrganizacaoVendaLocalNegocio",
		["centroEmissor"],
		constraints,
		null
	).getMap().iterator();
	
	if (dsCadastroCentro.hasNext()) {
		throw 'Já existe outro registro cadastrado com os dados informados.';
	}
}