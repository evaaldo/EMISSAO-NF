function validateForm(form){
	
	var formMode = form.getFormMode();
	var mensagem = "O campo %s é obrigatório.";
	
	var validarCampo = function(nomeCampo){
		return null == form.getValue(nomeCampo) || form.getValue(nomeCampo).trim() == ""; 
	}
	
	var campoObrigatorios = {
		//"tipoOrdem":"Tipo de Ordem",
		"processo":"Processo",
		"idFluxo":"ID Fluxo",
		"areaAtendimento":"Área de Atendimento"
	}
	
	for (var campo in campoObrigatorios) {
		if (validarCampo(campo)) {
			throw java.lang.String.format(mensagem,campoObrigatorios[campo]);
		}
	}
	
	var tipoOrdem = form.getValue("tipoOrdem");
	var processo = form.getValue("processo");
	var idFluxo = form.getValue("idFluxo");
	var areaAtendimento = form.getValue("areaAtendimento");
	var contaDespesa = form.getValue("contaDespesa");
	
	var constraints = [
        DatasetFactory.createConstraint("tipoOrdem",tipoOrdem,tipoOrdem,ConstraintType.MUST),
        DatasetFactory.createConstraint("processo",processo,processo,ConstraintType.MUST),
        DatasetFactory.createConstraint("idFluxo",idFluxo,idFluxo,ConstraintType.MUST),
        DatasetFactory.createConstraint("areaAtendimento",areaAtendimento,areaAtendimento,ConstraintType.MUST),
        DatasetFactory.createConstraint("contaDespesa",contaDespesa,contaDespesa,ConstraintType.MUST)
    ];
	           	
   	if (formMode == "MOD") {
   		var documentId = form.getDocumentId();
   		constraints.push(DatasetFactory.createConstraint("documentid",documentId,documentId,ConstraintType.MUST_NOT));
   	}
   	
   	var dsCadastroProcesso = DatasetFactory.getDataset(
		"DSCadastroProcessoContaDespesaTipoOrdem",
		["processo"],
		constraints,
		null
	).getMap().iterator();
   	
   	if (dsCadastroProcesso.hasNext()) {
		throw 'Já existe registro criado com Tipo de Ordem, Processo, ID Fluxo, Área de Atendimento e Conta Despesa informados.';
	}
}