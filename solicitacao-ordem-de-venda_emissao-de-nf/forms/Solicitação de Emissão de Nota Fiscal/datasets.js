/**
 * Facilitar a manipulação de datasets do formulário (via scripts)
 */
var Datasets = {

	hanaEquipamentos : "DSHanaEquipamentos",
	hanaConsultarBP : "Hana_ConsultarBP",
	hanaCadastroTransporte : "DSCadastroTransporte",
	hanaCadastroInfluenciadores : "DSCadastroTransportadoresInfluenciadores",
	hanaDadosGeraisMateriais: "DSHanaMateriaisDadosGerais",
	hanaCentroMateriais: "DSHanaMateriaisCentro",
	hanaUnidMedidaMateriais: "DSHanaMateriaisUnidMedida",
	hanaAvaliacaoMateriais: "DSHanaMateriaisAvaliacao",
	cadastroCentroEmissor: "DSCadastroCentroEmissorOrganizacaoVendaLocalNegocio",
	cadastroProcesso: "DSCadastroProcessoContaDespesaTipoOrdem",
	cadastroAprovadoresProcesso : "DSCadastroAprovadoresProcesso",
	cadastroTransporte: "DSCadastroTransporte",
	cadastroCanalDistribuicao: "DSCadastroCanalDistribuicao",
	cadastroDeposito: "DSCadastroDeposito",
	
	constraintTypes : {
		"must" : ConstraintType.MUST,
		"should" : ConstraintType.SHOULD,
		"not" : ConstraintType.MUST_NOT
	},
	
	get: function(dataset,fields,constraints,order){
		
		var _constraints = [];
		
		for (var i in constraints) {
			
			var campo = constraints[i][0];
			var valorInicial = constraints[i][1];
			var valorFinal = valorInicial;
			var tipo = this.constraintTypes[constraints[i][2]];
			var like = constraints[i][3] || false;
			
			_constraints.push(DatasetFactory.createConstraint(campo,valorInicial,valorFinal,tipo,like))
		}
		
		return _dataset = DatasetFactory.getDataset(
			dataset,
			fields,
			_constraints,
			order
		).values;
	},
	
	getRow: function(dataset,fields,constraints,order){
		//if (null != constraints) {
		//	constraints.push(["sqlLimit",1,"must"]);
		//}
		var _dataset = this.get(dataset,fields,constraints,order);
		return undefined != _dataset && _dataset.length > 0 ? _dataset[0] : null;
	},
	
	getRows: function(dataset,fields,constraints,order){
		var _dataset = this.get(dataset,fields,constraints,order);
		return undefined != _dataset && _dataset.length > 0 ? _dataset : null;
	}
}